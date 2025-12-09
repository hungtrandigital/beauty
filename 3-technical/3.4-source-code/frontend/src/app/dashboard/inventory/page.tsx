'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/api';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  locationType: string;
  branchId?: string;
  branchName?: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState<'all' | 'central' | 'branch'>('all');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/inventory');
        setInventory(response.data);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter((item) => {
    if (locationFilter === 'central') return item.locationType === 'CENTRAL_WAREHOUSE';
    if (locationFilter === 'branch') return item.locationType === 'BRANCH';
    return true;
  });

  const lowStockItems = filteredInventory.filter(
    (item) => item.availableQuantity <= item.lowStockThreshold,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">Kho hàng</h1>
          <p className="text-gray-600 mt-1">Quản lý tồn kho tại kho trung tâm và các chi nhánh</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={locationFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => setLocationFilter('all')}
          >
            Tất cả
          </Button>
          <Button
            variant={locationFilter === 'central' ? 'primary' : 'outline'}
            onClick={() => setLocationFilter('central')}
          >
            Kho trung tâm
          </Button>
          <Button
            variant={locationFilter === 'branch' ? 'primary' : 'outline'}
            onClick={() => setLocationFilter('branch')}
          >
            Chi nhánh
          </Button>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Cảnh báo tồn kho thấp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">
              Có {lowStockItems.length} sản phẩm đang ở mức tồn kho thấp
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tồn kho</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
                <p className="text-gray-600">Đang tải...</p>
              </div>
            </div>
          ) : filteredInventory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead>Đã đặt</TableHead>
                  <TableHead>Có sẵn</TableHead>
                  <TableHead>Ngưỡng cảnh báo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const isLowStock = item.availableQuantity <= item.lowStockThreshold;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.productName}</TableCell>
                      <TableCell>
                        {item.locationType === 'CENTRAL_WAREHOUSE'
                          ? 'Kho trung tâm'
                          : item.branchName || 'Chi nhánh'}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.reservedQuantity}</TableCell>
                      <TableCell className="font-medium">{item.availableQuantity}</TableCell>
                      <TableCell>{item.lowStockThreshold}</TableCell>
                      <TableCell>
                        {isLowStock ? (
                          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                            Tồn kho thấp
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                            Bình thường
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có dữ liệu tồn kho</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

