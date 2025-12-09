'use client';

import { readFile } from 'fs/promises';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Điều khoản sử dụng dịch vụ</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Cập nhật lần cuối: 09/12/2025
            </p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">1. Chấp nhận điều khoản</h2>
                <p>
                  Bằng cách truy cập và sử dụng Hệ thống Quản lý Chuỗi Salon/Barbershop ("Dịch vụ"), 
                  bạn chấp nhận và đồng ý bị ràng buộc bởi các điều khoản và quy định của thỏa thuận này.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">2. Mô tả dịch vụ</h2>
                <p>
                  Dịch vụ là một nền tảng Software-as-a-Service (SaaS) được thiết kế để giúp các doanh nghiệp 
                  chuỗi salon và barbershop quản lý:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Quản lý kho hàng đa địa điểm</li>
                  <li>Hoạt động bán hàng và thanh toán</li>
                  <li>Quản lý khách hàng và chương trình khách hàng thân thiết</li>
                  <li>Quản lý nhân viên và chi nhánh</li>
                  <li>Báo cáo và phân tích</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">3. Tài khoản người dùng</h2>
                <h3 className="text-xl font-medium mb-2">3.1 Tạo tài khoản</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bạn phải cung cấp thông tin chính xác và đầy đủ khi tạo tài khoản</li>
                  <li>Bạn chịu trách nhiệm duy trì tính bảo mật của thông tin đăng nhập</li>
                  <li>Bạn chịu trách nhiệm cho tất cả các hoạt động diễn ra dưới tài khoản của bạn</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">4. Sử dụng dịch vụ</h2>
                <h3 className="text-xl font-medium mb-2">4.1 Sử dụng được phép</h3>
                <p>
                  Bạn chỉ được sử dụng Dịch vụ cho các mục đích hợp pháp và phù hợp với các Điều khoản này. 
                  Bạn đồng ý không:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Vi phạm bất kỳ luật hoặc quy định nào</li>
                  <li>Xâm phạm quyền của người khác</li>
                  <li>Truyền bất kỳ mã độc hại nào</li>
                  <li>Cố gắng truy cập trái phép vào Dịch vụ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">5. Dữ liệu và quyền riêng tư</h2>
                <h3 className="text-xl font-medium mb-2">5.1 Dữ liệu của bạn</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bạn giữ quyền sở hữu tất cả dữ liệu bạn nhập vào Dịch vụ</li>
                  <li>Bạn chịu trách nhiệm sao lưu dữ liệu của mình</li>
                  <li>Chúng tôi sẽ không truy cập dữ liệu của bạn trừ khi cần thiết để cung cấp Dịch vụ</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">6. Tính khả dụng của dịch vụ</h2>
                <p>
                  Chúng tôi nỗ lực duy trì tính khả dụng cao của dịch vụ. Chúng tôi không đảm bảo 100% thời gian hoạt động. 
                  Bảo trì theo lịch trình sẽ được thông báo trước khi có thể.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">7. Phí và thanh toán</h2>
                <p>
                  Phí đăng ký được tính trước theo tháng hoặc năm. Phí không được hoàn lại trừ khi được yêu cầu bởi pháp luật. 
                  Chúng tôi có quyền thay đổi giá với thông báo trước 30 ngày.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">8. Sở hữu trí tuệ</h2>
                <p>
                  Dịch vụ và tất cả các quyền sở hữu trí tuệ liên quan thuộc sở hữu của chúng tôi. 
                  Bạn được cấp giấy phép hạn chế, không độc quyền để sử dụng Dịch vụ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">9. Giới hạn trách nhiệm</h2>
                <p>
                  DỊCH VỤ ĐƯỢC CUNG CẤP "NHƯ HIỆN TẠI" VÀ "NHƯ CÓ SẴN" KHÔNG CÓ BẤT KỲ BẢO ĐẢM NÀO, 
                  DÙ LÀ RÕ RÀNG HAY NGỤ Ý.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">10. Chấm dứt</h2>
                <p>
                  Bạn có thể hủy đăng ký bất cứ lúc nào. Hủy có hiệu lực vào cuối kỳ thanh toán hiện tại của bạn. 
                  Sau khi chấm dứt, bạn có thể xuất dữ liệu của mình trong 30 ngày.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">11. Thay đổi điều khoản</h2>
                <p>
                  Chúng tôi có quyền sửa đổi các Điều khoản này bất cứ lúc nào. 
                  Các thay đổi quan trọng sẽ được thông báo qua email hoặc qua Dịch vụ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">12. Luật áp dụng</h2>
                <p>
                  Các Điều khoản này sẽ được điều chỉnh và giải thích theo pháp luật Việt Nam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">13. Thông tin liên hệ</h2>
                <p>
                  Đối với các câu hỏi về các Điều khoản này, vui lòng liên hệ với chúng tôi tại:
                </p>
                <ul className="list-none space-y-1">
                  <li>Email: support@barbershop-management.com</li>
                  <li>Địa chỉ: [Địa chỉ công ty]</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

