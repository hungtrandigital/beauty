import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { createClient } from 'redis';

@Injectable()
export class HealthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async check() {
    const status = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: await this.checkDatabase(),
        redis: await this.checkRedis(),
        couchdb: await this.checkCouchDB(),
      },
    };

    // Overall status is 'ok' only if all services are healthy
    const allHealthy = Object.values(status.services).every(
      (service) => service.status === 'ok',
    );

    return {
      ...status,
      status: allHealthy ? 'ok' : 'degraded',
    };
  }

  private async checkDatabase(): Promise<{ status: string; message?: string }> {
    try {
      await this.connection.query('SELECT 1');
      return { status: 'ok' };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  private async checkRedis(): Promise<{ status: string; message?: string }> {
    try {
      const redisHost = process.env.REDIS_HOST || 'localhost';
      const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);
      const client = createClient({
        socket: {
          host: redisHost,
          port: redisPort,
        },
      });

      await client.connect();
      await client.ping();
      await client.quit();

      return { status: 'ok' };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  private async checkCouchDB(): Promise<{ status: string; message?: string }> {
    try {
      const couchdbHost = process.env.COUCHDB_HOST || 'localhost';
      const couchdbPort = process.env.COUCHDB_PORT || '5984';
      const couchdbUser = process.env.COUCHDB_USER || 'admin';
      const couchdbPassword = process.env.COUCHDB_PASSWORD || 'password';

      const url = `http://${couchdbUser}:${couchdbPassword}@${couchdbHost}:${couchdbPort}/_up`;

      // Use native fetch (available in Node.js 20+)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          return { status: 'ok' };
        } else {
          return {
            status: 'error',
            message: `CouchDB returned status ${response.status}`,
          };
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}

