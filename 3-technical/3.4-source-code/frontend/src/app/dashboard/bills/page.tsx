'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/api';

interface Bill {
  id: string;
  billNumber: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await api.get('/bills');
        setBills(response.data);
      } catch (error) {
        console.error('Failed to fetch bills:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Hóa đơn</h1>
          <p className="text-gray-600 mt-1">Quản lý tất cả hóa đơn</p>
        </div>
        <Link href="/dashboard/bills/new">
          <Button>Tạo hóa đơn mới</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
                <p className="text-gray-600">Đang tải...</p>
              </div>
            </div>
          ) : bills.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Số hóa đơn</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.billNumber}</TableCell>
                    <TableCell>{formatCurrency(bill.total)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          bill.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : bill.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {bill.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          bill.paymentStatus === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {bill.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(bill.createdAt).toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/bills/${bill.id}`}>
                        <Button variant="outline" size="sm">
                          Xem
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có hóa đơn nào</p>
              <Link href="/dashboard/bills/new" className="mt-4 inline-block">
                <Button>Tạo hóa đơn đầu tiên</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

