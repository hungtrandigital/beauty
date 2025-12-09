import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Barbershop Management System',
  description: 'Hệ thống quản lý chuỗi salon/barbershop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
        <footer className="border-t bg-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
            <div className="flex justify-center space-x-6 mb-2">
              <a href="/terms" className="hover:text-brand-teal transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="/privacy" className="hover:text-brand-teal transition-colors">
                Chính sách bảo mật
              </a>
            </div>
            <p>© 2025 Barbershop Management System. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

