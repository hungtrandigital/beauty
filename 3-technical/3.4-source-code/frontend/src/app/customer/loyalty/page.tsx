'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/api';

interface LoyaltyData {
  points: number;
  membershipTier: string;
  transactions: Array<{
    id: string;
    type: string;
    points: number;
    description: string;
    createdAt: string;
  }>;
}

export default function CustomerLoyaltyPage() {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    // [GUESS: Get customer ID from auth or QR code]
    const fetchLoyaltyData = async () => {
      if (!customerId) return;

      try {
        const response = await api.get(`/mobile/customer/${customerId}/points`);
        setLoyaltyData(response.data);
      } catch (error) {
        console.error('Failed to fetch loyalty data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoyaltyData();
  }, [customerId]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM':
        return 'bg-purple-100 text-purple-800';
      case 'GOLD':
        return 'bg-brand-gold/20 text-brand-gold';
      case 'SILVER':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Điểm thưởng</h1>
          <p className="text-gray-600">Xem điểm tích lũy và lịch sử giao dịch</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
              <p className="text-gray-600">Đang tải...</p>
            </div>
          </div>
        ) : loyaltyData ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Điểm hiện tại</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-brand-teal mb-2">
                    {loyaltyData.points.toLocaleString('vi-VN')}
                  </div>
                  <p className="text-sm text-gray-500">điểm</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hạng thành viên</CardTitle>
                </CardHeader>
                <CardContent>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getTierColor(
                      loyaltyData.membershipTier,
                    )}`}
                  >
                    {loyaltyData.membershipTier}
                  </span>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lịch sử giao dịch</CardTitle>
              </CardHeader>
              <CardContent>
                {loyaltyData.transactions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Loại</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Ngày</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loyaltyData.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                transaction.type === 'EARNED'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {transaction.type === 'EARNED' ? 'Tích lũy' : 'Đổi điểm'}
                            </span>
                          </TableCell>
                          <TableCell
                            className={
                              transaction.type === 'EARNED'
                                ? 'text-green-600 font-medium'
                                : 'text-red-600 font-medium'
                            }
                          >
                            {transaction.type === 'EARNED' ? '+' : '-'}
                            {Math.abs(transaction.points).toLocaleString('vi-VN')}
                          </TableCell>
                          <TableCell>{transaction.description || '-'}</TableCell>
                          <TableCell>
                            {new Date(transaction.createdAt).toLocaleString('vi-VN')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Chưa có giao dịch nào
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                Vui lòng đăng nhập hoặc quét QR code để xem điểm thưởng
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

