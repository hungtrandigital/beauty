'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/api';

interface BillItem {
  type: 'PRODUCT' | 'SERVICE';
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function NewBillPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('');
  const [items, setItems] = useState<BillItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = 0; // [GUESS: Discount from promotions - will be auto-applied]
  const total = subtotal - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/bills', {
        branchId: 'current-branch-id', // [GUESS: Get from user context]
        customerId: customerId || null,
        items: items.map((item) => ({
          type: item.type,
          itemId: item.itemId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      });
      router.push('/dashboard/bills');
    } catch (error) {
      console.error('Failed to create bill:', error);
      alert('Tạo hóa đơn thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Tạo hóa đơn mới</h1>
        <p className="text-gray-600 mt-1">Thêm sản phẩm và dịch vụ vào hóa đơn</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Mã khách hàng (QR code hoặc ID)"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Quét QR code hoặc nhập mã"
              />
              <p className="text-sm text-gray-500">
                Để trống nếu khách hàng vãng lai
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tổng kết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Giảm giá:</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-brand-teal">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Danh sách sản phẩm/dịch vụ</CardTitle>
              <Button type="button" variant="secondary">
                Thêm sản phẩm
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {items.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn giá</TableHead>
                    <TableHead>Thành tiền</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(item.total)}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setItems(items.filter((_, i) => i !== index));
                          }}
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Chưa có sản phẩm/dịch vụ nào</p>
                <Button type="button" variant="secondary">
                  Thêm sản phẩm đầu tiên
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={items.length === 0 || isSubmitting}
            isLoading={isSubmitting}
          >
            Tạo hóa đơn
          </Button>
        </div>
      </form>
    </div>
  );
}

