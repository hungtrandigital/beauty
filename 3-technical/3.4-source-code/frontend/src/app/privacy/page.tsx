'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Chính sách bảo mật</CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Cập nhật lần cuối: 09/12/2025
            </p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">1. Giới thiệu</h2>
                <p>
                  Chính sách Bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn 
                  khi bạn sử dụng Hệ thống Quản lý Chuỗi Salon/Barbershop ("Dịch vụ").
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">2. Thông tin chúng tôi thu thập</h2>
                <h3 className="text-xl font-medium mb-2">2.1 Thông tin bạn cung cấp</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Thông tin tài khoản:</strong> Tên, địa chỉ email, số điện thoại</li>
                  <li><strong>Thông tin doanh nghiệp:</strong> Tên công ty, địa chỉ, thông tin đăng ký kinh doanh</li>
                  <li><strong>Thông tin thanh toán:</strong> Địa chỉ thanh toán, phương thức thanh toán</li>
                  <li><strong>Nội dung:</strong> Dữ liệu bạn nhập vào Dịch vụ (kho hàng, khách hàng, hóa đơn, v.v.)</li>
                </ul>

                <h3 className="text-xl font-medium mb-2 mt-4">2.2 Thông tin tự động thu thập</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dữ liệu sử dụng:</strong> Cách bạn tương tác với Dịch vụ</li>
                  <li><strong>Thông tin thiết bị:</strong> Địa chỉ IP, loại trình duyệt, loại thiết bị</li>
                  <li><strong>Dữ liệu nhật ký:</strong> Nhật ký truy cập, nhật ký lỗi, dữ liệu hiệu suất</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">3. Cách chúng tôi sử dụng thông tin</h2>
                <h3 className="text-xl font-medium mb-2">3.1 Cung cấp dịch vụ</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Để cung cấp và duy trì Dịch vụ</li>
                  <li>Để xử lý giao dịch và quản lý đăng ký</li>
                  <li>Để gửi thông tin liên quan đến dịch vụ</li>
                </ul>

                <h3 className="text-xl font-medium mb-2 mt-4">3.2 Cải thiện dịch vụ</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Để phân tích mẫu sử dụng và cải thiện Dịch vụ</li>
                  <li>Để phát triển tính năng và chức năng mới</li>
                  <li>Để đảm bảo bảo mật Dịch vụ và ngăn chặn gian lận</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">4. Lưu trữ và bảo mật dữ liệu</h2>
                <h3 className="text-xl font-medium mb-2">4.1 Lưu trữ dữ liệu</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Dữ liệu được lưu trữ trên các máy chủ an toàn</li>
                  <li>Chúng tôi sử dụng mã hóa tiêu chuẩn ngành cho dữ liệu đang truyền và đang lưu trữ</li>
                  <li>Dữ liệu được lưu trữ phù hợp với các luật bảo vệ dữ liệu hiện hành</li>
                </ul>

                <h3 className="text-xl font-medium mb-2 mt-4">4.2 Biện pháp bảo mật</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kiểm soát truy cập và xác thực</li>
                  <li>Kiểm tra bảo mật và cập nhật thường xuyên</li>
                  <li>Đào tạo nhân viên về bảo vệ dữ liệu</li>
                  <li>Quy trình ứng phó sự cố</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">5. Chia sẻ và tiết lộ dữ liệu</h2>
                <h3 className="text-xl font-medium mb-2">5.1 Nhà cung cấp dịch vụ</h3>
                <p>
                  Chúng tôi có thể chia sẻ dữ liệu với các nhà cung cấp dịch vụ đáng tin cậy 
                  hỗ trợ vận hành Dịch vụ (nhà cung cấp hosting, xử lý thanh toán, phân tích, v.v.).
                </p>

                <h3 className="text-xl font-medium mb-2 mt-4">5.2 Yêu cầu pháp lý</h3>
                <p>
                  Chúng tôi có thể tiết lộ dữ liệu khi được yêu cầu bởi pháp luật hoặc để tuân thủ nghĩa vụ pháp lý, 
                  bảo vệ quyền và tài sản của chúng tôi, hoặc ngăn chặn gian lận hoặc mối đe dọa bảo mật.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">6. Quyền của bạn</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Truy cập và sửa đổi:</strong> Bạn có quyền truy cập và cập nhật thông tin cá nhân của mình</li>
                  <li><strong>Tính di động dữ liệu:</strong> Bạn có thể xuất dữ liệu của mình bất cứ lúc nào</li>
                  <li><strong>Xóa:</strong> Bạn có thể yêu cầu xóa tài khoản và dữ liệu của mình</li>
                  <li><strong>Từ chối:</strong> Bạn có thể từ chối nhận thông tin tiếp thị</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">7. Lưu trữ dữ liệu</h2>
                <p>
                  Dữ liệu được giữ lại trong khi tài khoản của bạn đang hoạt động. 
                  Sau khi xóa tài khoản, dữ liệu có thể được giữ lại tối đa 30 ngày. 
                  Một số dữ liệu có thể được giữ lại lâu hơn cho mục đích pháp lý hoặc kinh doanh hợp pháp.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">8. Tuân thủ GDPR (Cho người dùng EU)</h2>
                <p>
                  Nếu bạn ở Liên minh Châu Âu, bạn có các quyền bổ sung theo GDPR, bao gồm quyền yêu cầu tính di động dữ liệu, 
                  phản đối việc xử lý dữ liệu của bạn, và khiếu nại với cơ quan bảo vệ dữ liệu địa phương.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">9. Thay đổi chính sách bảo mật</h2>
                <p>
                  Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. 
                  Các thay đổi quan trọng sẽ được thông báo qua email hoặc qua Dịch vụ.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-brand-navy mb-4">10. Thông tin liên hệ</h2>
                <p>
                  Đối với các câu hỏi hoặc yêu cầu liên quan đến quyền riêng tư, vui lòng liên hệ với chúng tôi tại:
                </p>
                <ul className="list-none space-y-1">
                  <li>Email: privacy@barbershop-management.com</li>
                  <li>Địa chỉ: [Địa chỉ công ty]</li>
                  <li>Người bảo vệ dữ liệu: dpo@barbershop-management.com</li>
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    );
}

