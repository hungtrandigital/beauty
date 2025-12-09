'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { authService } from '@/lib/auth';

const staffNavItems = [
  { name: 'Tổng quan', href: '/dashboard' },
  { name: 'Tạo hóa đơn', href: '/dashboard/bills/new' },
  { name: 'Hóa đơn', href: '/dashboard/bills' },
  { name: 'Khách hàng', href: '/dashboard/customers' },
  { name: 'Kho hàng', href: '/dashboard/inventory' },
];

const branchHeadNavItems = [
  { name: 'Tổng quan', href: '/dashboard' },
  { name: 'Báo cáo', href: '/dashboard/reports' },
  { name: 'Hiệu suất nhân viên', href: '/dashboard/staff-performance' },
  { name: 'Kho hàng', href: '/dashboard/inventory' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-brand-teal border-t-transparent mx-auto" />
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const navItems =
    user?.role === 'ADMIN' || user?.role === 'WAREHOUSE_MANAGER'
      ? branchHeadNavItems
      : staffNavItems;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navItems={navItems} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

