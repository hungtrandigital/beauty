'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/lib/api';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  images: string[];
}

export default function CustomerServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/mobile/services');
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Dịch vụ</h1>
          <p className="text-gray-600">Xem danh sách dịch vụ và giá cả</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
              <p className="text-gray-600">Đang tải...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {service.images && service.images.length > 0 && (
                    <div className="mb-4 aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-400">Hình ảnh</span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-brand-navy mb-2">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-teal">
                      {formatCurrency(service.price)}
                    </span>
                    <button className="px-4 py-2 bg-brand-navy text-white rounded-md hover:bg-navy-dark transition-colors">
                      Đặt lịch
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

