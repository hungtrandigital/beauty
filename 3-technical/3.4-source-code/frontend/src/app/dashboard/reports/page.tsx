'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/api';

interface RevenueReport {
  totalRevenue: number;
  totalBills: number;
  averageBillValue: number;
  revenueByDay: Array<{ date: string; revenue: number; bills: number }>;
}

export default function ReportsPage() {
  const [revenueReport, setRevenueReport] = useState<RevenueReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reporting/revenue', {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        });
        setRevenueReport(response.data);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Báo cáo</h1>
        <p className="text-gray-600 mt-1">Xem báo cáo doanh thu và hiệu suất</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Báo cáo doanh thu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-4">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
                <p className="text-gray-600">Đang tải...</p>
              </div>
            </div>
          ) : revenueReport ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-brand-teal">
                      {formatCurrency(revenueReport.totalRevenue)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Tổng số hóa đơn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {revenueReport.totalBills.toLocaleString('vi-VN')}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Giá trị trung bình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(revenueReport.averageBillValue)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Doanh thu theo ngày</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Số hóa đơn</TableHead>
                        <TableHead>Doanh thu</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenueReport.revenueByDay.map((day) => (
                        <TableRow key={day.date}>
                          <TableCell>
                            {new Date(day.date).toLocaleDateString('vi-VN')}
                          </TableCell>
                          <TableCell>{day.bills}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(day.revenue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-gray-500">Không có dữ liệu</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

