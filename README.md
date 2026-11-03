# Cửa Cuốn Thủ Đô - Modern Next.js + NestJS + PostgreSQL Revamp

Dự án tái xây dựng toàn diện website **Cửa Cuốn Thủ Đô** (nguyên bản: [cuacuonthudo.com](https://cuacuonthudo.com/)) từ nền tảng công nghệ cũ sang kiến trúc hiện đại, sang trọng, chuẩn SEO 100%, tích hợp hệ thống CMS linh động.

---

## 🏗 Kiến Trúc Hệ Thống

```
cuacuon/
├── backend/                      # NestJS API + Prisma ORM + PostgreSQL
│   ├── src/
│   │   ├── auth/                 # JWT Auth, bảo mật đăng nhập CMS
│   │   ├── settings/             # CMS Linh động (General, SEO, Banners)
│   │   ├── products/             # CRUD Sản phẩm cửa cuốn & phụ kiện
│   │   ├── categories/           # Quản lý danh mục
│   │   ├── articles/             # Tin tức & cẩm nang kỹ thuật
│   │   ├── quotes/               # Tiếp nhận yêu cầu cứu hộ & báo giá (Leads)
│   │   ├── branches/             # 12 chi nhánh sửa chữa tại Hà Nội
│   │   └── upload/               # Upload hình ảnh
│   ├── prisma/
│   │   ├── schema.prisma         # PostgreSQL Schema
│   │   └── seed.ts               # Dữ liệu khởi tạo & cào từ web cũ
│   └── uploads/                  # Thư mục lưu ảnh tĩnh
│
├── frontend/                     # Next.js 15 (App Router) + Tailwind CSS + TypeScript
│   ├── public/assets/            # Hình ảnh thực tế (Logo, sản phẩm, banner)
│   └── src/
│       ├── app/
│       │   ├── page.tsx          # Trang chủ hiện đại (Hero, Cứu hộ 15p, Dự toán giá)
│       │   ├── san-pham/         # Danh mục sản phẩm & Lọc
│       │   ├── san-pham/[slug]/  # Chi tiết sản phẩm chuẩn SEO (Schema Product)
│       │   ├── bang-gia/         # Bảng báo giá chi tiết 2026 & Tính giá nhanh
│       │   ├── dich-vu/          # Cứu hộ khẩn cấp 24/24, sửa chữa kẹt nan
│       │   ├── tin-tuc/          # Cẩm nang & cẩm nang kỹ thuật
│       │   ├── lien-he/          # Mạng lưới 12 chi nhánh & Google Map
│       │   ├── sitemap.ts        # Sitemap XML động
│       │   ├── robots.ts         # Robots.txt
│       │   └── admin/            # CMS Dashboard Quản Trị Website Linh Động
│       ├── components/           # Header, Footer, Calculator, Slider, Schema
│       └── lib/api.ts            # Client & Server API Client
```

---

## 🌟 Tính Năng Nổi Bật

### 1. Giao Diện Hiện Đại & Trải Nghiệm Khách Hàng (UX/UI)
- **Cứu Hộ 24/24 Nổi Bật**: Điểm chốt cứu hộ cơ động có mặt sau 15 phút tại 12 quận Hà Nội.
- **Thanh Liên Hệ Nổi (Floating Contact)**: Nút gọi cứu hộ nhấp nháy, chat Zalo, báo giá nhanh, cuộn lên đầu trang.
- **Công Cụ Dự Toán Trực Tuyến (Smart Price Calculator)**: Nhập chiều rộng, chiều cao, chọn loại nan và mô tơ -> Tự động tính toán tổng chi phí và gửi số điện thoại nhận thợ khảo sát tận nơi.
- **Responsive 100%**: Hoàn hảo trên cả Mobile, Tablet và Desktop.

### 2. Chuẩn SEO 100%
- **Schema.org JSON-LD**: Tích hợp cấu trúc dữ liệu `HomeAndConstructionBusiness`, `LocalBusiness` (tọa độ GPS, giờ phục vụ 24/7, hotline, địa chỉ), `Product`, `Article`, `BreadcrumbList`.
- **Dynamic Metadata**: Thẻ meta title, description, keywords, OpenGraph, Twitter Card tự sinh động.
- **Sitemap XML & Robots.txt**: Tự động sinh dựa trên sản phẩm, danh mục và bài viết.

### 3. Hệ Thống CMS Linh Động (Dynamic Settings)
- **Quản lý cài đặt website**: Thay đổi tên web, hotline, zalo, địa chỉ, thông báo chạy đầu trang, banner trang chủ mà không cần đụng vào code.
- **Quản lý sản phẩm**: Thêm, sửa, xóa, phân loại danh mục, cập nhật thông số kỹ thuật và giá bán.
- **Quản lý Leads Cứu Hộ & Báo Giá**: Nhận thông tin khách hàng, số điện thoại, địa chỉ, cập nhật trạng thái "Chờ xử lý / Đang liên hệ / Hoàn thành" kèm ghi chú thợ điều động.

---

## 🔑 Thông Tin Đăng Nhập CMS Admin

- **Đường dẫn**: `http://localhost:3000/admin/login`
- **Email**: `admin@cuacuonthudo.com`
- **Mật khẩu**: `admin123`

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Backend (NestJS + PostgreSQL)
```bash
cd backend
pnpm install
pnpm exec prisma db push
pnpm exec ts-node prisma/seed.ts  # Khởi tạo dữ liệu mẫu từ web cũ
pnpm run start:dev                # Chạy backend tại http://localhost:4000
```
- Swagger API Docs: `http://localhost:4000/api/docs`

### 2. Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm run dev                      # Chạy Next.js tại http://localhost:3000
```

