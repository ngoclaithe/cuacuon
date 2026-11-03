import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Seed ---');

  // 1. Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cuacuonthudo.com' },
    update: {},
    create: {
      email: 'admin@cuacuonthudo.com',
      passwordHash,
      name: 'Quản Trị Viên Thủ Đô',
      role: 'ADMIN',
    },
  });
  console.log('Admin user initialized:', admin.email);

  // 2. Settings (Flexible CMS configs)
  await prisma.setting.upsert({
    where: { key: 'general_config' },
    update: {},
    create: {
      key: 'general_config',
      description: 'Thông tin chung của website',
      value: {
        siteName: 'Cửa Cuốn Thủ Đô - Cứu Hộ & Lắp Đặt 24/7',
        shortName: 'Cửa Cuốn Thủ Đô',
        slogan: 'Cứu Hộ Khẩn Cấp 24/24 - Có Mặt Sau 15 Phút - Cam Kết Giá Chuẩn Niêm Yết',
        hotline: '0986 888 121',
        hotline2: '0968 928 563',
        zalo: '0986888121',
        email: 'cuacuonthudo.official@gmail.com',
        address: 'Số 36 Ngõ 6 Mạc Thái Tổ, Yên Hòa, Cầu Giấy, Hà Nội',
        workingHours: 'Phục vụ 24/7 (kể cả ban đêm, thứ 7, Chủ Nhật và ngày Lễ Tết)',
        emergencyBadge: 'Cứu Hộ Nhanh 15 Phút Có Mặt',
        announcement: 'KHUYẾN MÃI THÁNG NÀY: Tặng bộ tự dừng chống xô nan + Giảm 10% khi lắp đặt trọn bộ cửa cuốn Austdoor!',
        logo: '/assets/Slide2-1894x708-1.jpg',
        stats: [
          { label: 'Năm kinh nghiệm', value: '12+' },
          { label: 'Khách hàng tin chọn', value: '25,000+' },
          { label: 'Chi nhánh Hà Nội', value: '12 Cơ sở' },
          { label: 'Thời gian có mặt', value: '15 Phút' },
        ]
      },
    },
  });

  await prisma.setting.upsert({
    where: { key: 'seo_config' },
    update: {},
    create: {
      key: 'seo_config',
      description: 'Cấu hình SEO toàn trang',
      value: {
        metaTitle: 'Cửa Cuốn Thủ Đô | Cứu Hộ Cửa Cuốn Hà Nội 24/7 - Có Mặt Sau 15 Phút',
        metaDescription: 'Cửa cuốn Thủ Đô chuyên cứu hộ sửa chữa cửa cuốn khẩn cấp 24/24 tại Hà Nội. Đội thợ có mặt sau 15 phút. Đại lý ủy quyền Austdoor, Doortech phân phối cửa cuốn khe thoáng, tấm liền, motor, lưu điện giá gốc.',
        metaKeywords: 'cứu hộ cửa cuốn, sửa cửa cuốn hà nội, cửa cuốn thủ đô, cửa cuốn austdoor, cửa cuốn khe thoáng, motor cửa cuốn, bình lưu điện cửa cuốn',
        canonicalUrl: 'https://cuacuonthudo.com',
        ogImage: '/assets/Slide2-1894x708-1.jpg',
        siteSchemaType: 'HomeAndConstructionBusiness',
        geo: {
          latitude: '21.0185',
          longitude: '105.7912',
          region: 'VN-HN',
          placename: 'Cầu Giấy, Hà Nội',
        }
      },
    },
  });

  await prisma.setting.upsert({
    where: { key: 'hero_banners' },
    update: {},
    create: {
      key: 'hero_banners',
      description: 'Danh sách banner slider trang chủ',
      value: [
        {
          id: 1,
          tag: 'CỨU HỘ KHẨN CẤP 24/24',
          title: 'Cứu Hộ Cửa Cuốn Hà Nội Có Mặt Sau 15 Phút',
          subtitle: 'Kẹt nan, đứt cót, chập hộp tín hiệu, hỏng mô tơ, mất chìa khóa... Đội ngũ kỹ thuật túc trực tại 12 quận nội thành giải quyết triệt để sự cố.',
          image: '/assets/Slide2-1894x708-1.jpg',
          ctaText: 'Gọi Cứu Hộ: 0986 888 121',
          ctaLink: 'tel:0986888121',
          secondaryText: 'Xem Báo Giá Nhanh',
          secondaryLink: '/bang-gia',
        },
        {
          id: 2,
          tag: 'CHÍNH HÃNG AUSTDOOR',
          title: 'Lắp Đặt Cửa Cuốn Khe Thoáng Hiện Đại Chuẩn Công Nghệ Đức',
          subtitle: 'Nan nhôm hợp kim AL6063 T5 độ bền trên 25 năm, tích hợp cảm biến chống xô tự đảo chiều và công nghệ chống dò mã ARC.',
          image: '/assets/c2.jpg',
          ctaText: 'Xem Mẫu Cửa Cuốn',
          ctaLink: '/san-pham',
          secondaryText: 'Nhận Tư Vấn Miễn Phí',
          secondaryLink: '#calculator',
        },
        {
          id: 3,
          tag: 'LINH KIỆN & PHỤ KIỆN',
          title: 'Motor Cửa Cuốn & Bình Lưu Điện UPS Bảo Hành 3 Năm',
          subtitle: 'Phân phối chính hãng YH Đài Loan, Austdoor AK/AH, bình tích điện Titadoor tự động xả sạc, cứu hộ khi mất điện.',
          image: '/assets/dv5.jpg',
          ctaText: 'Khám Phá Phụ Kiện',
          ctaLink: '/san-pham?category=motor-phu-kien-cua-cuon',
          secondaryText: 'Liên Hệ Đặt Lịch',
          secondaryLink: '/lien-he',
        }
      ],
    },
  });

  // 3. Categories
  const catKheThoang = await prisma.category.upsert({
    where: { slug: 'cua-cuon-khe-thoang' },
    update: {},
    create: {
      name: 'Cửa Cuốn Khe Thoáng',
      slug: 'cua-cuon-khe-thoang',
      description: 'Dòng cửa cuốn nan nhôm cao cấp hiện đại, thoáng khí, sang trọng, vận hành siêu êm.',
      icon: 'Layers',
      sortOrder: 1,
    },
  });

  const catTamLien = await prisma.category.upsert({
    where: { slug: 'cua-cuon-tam-lien' },
    update: {},
    create: {
      name: 'Cửa Cuốn Tấm Liền Úc',
      slug: 'cua-cuon-tam-lien',
      description: 'Thép hợp kim Colorbond công nghệ Úc tốc độ đóng mở nhanh gấp 3 lần, vận hành êm ái.',
      icon: 'ShieldCheck',
      sortOrder: 2,
    },
  });

  const catKhopInox = await prisma.category.upsert({
    where: { slug: 'cua-cuon-khop-inox-sieu-thoang' },
    update: {},
    create: {
      name: 'Cửa Cuốn Khớp Inox & Siêu Thoáng',
      slug: 'cua-cuon-khop-inox-sieu-thoang',
      description: 'Thiết kế mắt lưới khớp Inox 304 không gỉ, lấy sáng và quan sát tối đa cho showroom, trung tâm thương mại.',
      icon: 'Eye',
      sortOrder: 3,
    },
  });

  const catChongChay = await prisma.category.upsert({
    where: { slug: 'cua-cuon-chong-chay-nha-xuong' },
    update: {},
    create: {
      name: 'Cửa Cuốn Chống Cháy & Nhà Xưởng',
      slug: 'cua-cuon-chong-chay-nha-xuong',
      description: 'Đạt chuẩn kiểm định PCCC EI60, EI90, nan thép chịu nhiệt cao tự động đóng khi có báo cháy.',
      icon: 'Flame',
      sortOrder: 4,
    },
  });

  const catPhuKien = await prisma.category.upsert({
    where: { slug: 'motor-phu-kien-cua-cuon' },
    update: {},
    create: {
      name: 'Motor & Phụ Kiện Cửa Cuốn',
      slug: 'motor-phu-kien-cua-cuon',
      description: 'Động cơ motor tời, bình tích điện UPS, hộp nhận điều khiển từ xa, khóa remote chống trộm.',
      icon: 'Cpu',
      sortOrder: 5,
    },
  });

  console.log('Categories initialized.');

  // 4. Products
  const sampleProducts = [
    {
      name: 'Cửa Cuốn Austdoor Khe Thoáng A50',
      slug: 'cua-cuon-austdoor-khe-thoang-a50',
      code: 'AD-A50',
      categoryId: catKheThoang.id,
      price: 1950000,
      salePrice: 1750000,
      thickness: '1.2mm - 1.3mm',
      material: 'Nhôm hợp kim AL6063 T5 cao cấp',
      origin: 'Chính Hãng Austdoor Tập Đoàn Austdoor',
      warrantyMonths: 24,
      description: 'Nan nhôm kép có gioăng giảm chấn 2 chiều siêu êm, bề mặt sơn tĩnh điện ngoài trời cao cấp AkzoNobel chống bay màu.',
      content: `<h3>Đặc điểm nổi bật của cửa cuốn Austdoor A50</h3>
<p>Cửa cuốn nan nhôm khe thoáng A50 là một trong những sản phẩm bán chạy nhất thị trường của thương hiệu Austdoor nhờ kết cấu thân cửa chắc chắn, khe thoáng hình kim tiền đón sáng tự nhiên, mang lại phong thủy thịnh vượng và an tâm tuyệt đối cho gia chủ.</p>
<h4>Thông số kỹ thuật chi tiết:</h4>
<ul>
  <li>Thân cửa: Nhôm hợp kim 6063 T5 độ cứng tiêu chuẩn</li>
  <li>Độ dày nan: 1.2 - 1.3 mm (dung sai +-5%)</li>
  <li>Sơn phủ: Hãng sơn cao cấp AkzoNobel Hà Lan, bảo hành màu 5 năm</li>
  <li>Màu sắc: Màu ghi sáng (#5) hoặc vàng kem (#2)</li>
  <li>Công nghệ an toàn: Tự dừng khi gặp chướng ngại vật, ARC chống dò mã, còi báo động chống cạy</li>
</ul>`,
      specs: {
        'Độ dày nan': '1.2 - 1.3 mm',
        'Vật liệu': 'Hợp kim nhôm 6063-T5',
        'Bề mặt sơn': 'AkzoNobel cao cấp tĩnh điện',
        'Kích thước tối đa': 'Rộng 6.5m x Cao 6.0m',
        'Giảm chấn': 'Hệ gioăng lông kép triệt tiêu 90% tiếng ồn',
        'Bảo hành': '24 tháng đổi mới lỗi nhà sản xuất'
      },
      features: [
        'Vận hành êm ái triệt tiêu đến 90% tiếng ồn với gioăng cao su kép',
        'Khe thoáng đối lưu không khí và đón ánh sáng tự nhiên',
        'Công nghệ ARC chống sao chép và dò quét mã số khóa',
        'Hệ thống tự động đảo chiều khi gặp vật cản an toàn tuyệt đối cho trẻ nhỏ'
      ],
      images: ['/assets/cua-cuon-khe-thoang-AD-E51i.webp', '/assets/sp5.jpg', '/assets/c3.jpg'],
      isFeatured: true,
      isHot: true,
      seoTitle: 'Cửa Cuốn Austdoor Khe Thoáng A50 Chính Hãng | Giá Tốt Nhất Hà Nội',
      seoDescription: 'Cửa cuốn Austdoor A50 nan nhôm khe thoáng dày 1.3mm siêu êm, tích hợp công nghệ chống sao chép ARC, tự dừng khi gặp vật cản. Báo giá lắp đặt trọn gói ưu đãi.',
    },
    {
      name: 'Cửa Cuốn Austdoor Siêu Thoáng C70',
      slug: 'cua-cuon-austdoor-sieu-thoang-c70',
      code: 'AD-C70',
      categoryId: catKheThoang.id,
      price: 2650000,
      salePrice: 2450000,
      thickness: '1.2mm - 2.3mm gân gia cường',
      material: 'Nhôm hợp kim 6063 T5 kết cấu kép siêu cứng',
      origin: 'Chính Hãng Austdoor',
      warrantyMonths: 36,
      description: 'Lỗ thoáng gấp 4 lần cửa cuốn thông thường, nan phối 2 màu hiện đại, đẳng cấp kiến trúc biệt thự và nhà phố.',
      content: `<h3>Cửa cuốn Siêu thoáng Austdoor C70 - Đỉnh cao công nghệ cửa cuốn</h3>
<p>Dòng C70 sở hữu lỗ thoáng kích thước lớn gấp 4 lần thông thường, vừa đảm bảo thông thoáng lưu thông gió vừa đảm bảo an ninh tuyệt đối cho ngôi nhà. Hai tông màu đan xen độc đáo tạo điểm nhấn mặt tiền kiến trúc hiện đại.</p>`,
      specs: {
        'Độ dày': '1.2 - 2.3 mm siêu cứng',
        'Lỗ thoáng': 'Lớn gấp 4 lần, hình thoi bo góc',
        'Màu sắc': 'Phối 2 màu Cafe (#3) và Vàng kem (#2)',
        'Khung kỹ thuật': 'Đồng bộ từ nhà máy bằng thép mạ kẽm',
        'Bảo hành': '36 tháng toàn bộ hệ thống'
      },
      features: [
        'Lỗ thoáng lớn tối đa hóa ánh sáng và đối lưu không khí tươi',
        'Phối 2 tông màu thời thượng sang trọng',
        'Độ cứng vượt trội chịu được sức gió cấp 12',
        'Tích hợp đầy đủ cảm biến đảo chiều và báo động chống trộm'
      ],
      images: ['/assets/sp8.jpg', '/assets/c2.jpg', '/assets/h1.jpg'],
      isFeatured: true,
      isHot: true,
      seoTitle: 'Cửa Cuốn Austdoor Siêu Thoáng C70 | Đẳng Cấp Biệt Thự & Nhà Phố',
      seoDescription: 'Cửa cuốn siêu thoáng Austdoor C70 nan kép phối 2 màu, lỗ thoáng lớn gấp 4 lần, vận hành siêu êm, khung kỹ thuật đồng bộ, an toàn tuyệt đối.',
    },
    {
      name: 'Cửa Cuốn Siêu Êm S52i Austdoor',
      slug: 'cua-cuon-sieu-em-s52i',
      code: 'AD-S52i',
      categoryId: catKheThoang.id,
      price: 1850000,
      salePrice: 1680000,
      thickness: '1.0mm - 1.2mm',
      material: 'Nhôm AL6063 T5 phủ sơn bột tĩnh điện',
      origin: 'Chính Hãng Austdoor',
      warrantyMonths: 24,
      description: 'Dòng sản phẩm kinh tế được trang bị hệ kẹp nhựa giảm chấn thế hệ mới, vận hành êm ru không rung lắc.',
      content: `<h3>Cửa cuốn siêu êm S52i chính hãng</h3><p>Giải pháp thông minh cho nhà phố đông đúc cần sự yên tĩnh khi đóng mở cửa vào sáng sớm hoặc đêm muộn.</p>`,
      specs: {
        'Độ dày': '1.0 - 1.2 mm',
        'Trọng lượng': 'Khoảng 9.5 kg/m²',
        'Sơn phủ': 'Bột sơn tĩnh điện AkzoNobel',
        'Bảo hành': '2 năm'
      },
      features: [
        'Kẹp đệm nhựa PA giảm chấn hai bên đầu nan',
        'Giá thành hợp lý phù hợp ngân sách hộ gia đình',
        'Đầy đủ tính năng an toàn tự dừng khi gặp vật cản'
      ],
      images: ['/assets/sp9.jpg', '/assets/c5.jpg'],
      isFeatured: true,
      isHot: false,
      seoTitle: 'Cửa Cuốn Siêu Êm Austdoor S52i Giá Tốt Tại Hà Nội',
      seoDescription: 'Cửa cuốn siêu êm S52i Austdoor nan nhôm kẹp giảm chấn, giá rẻ, bền bỉ, an toàn, bảo hành chính hãng 24 tháng tại Cửa Cuốn Thủ Đô.',
    },
    {
      name: 'Cửa Cuốn Khớp Inox Vuông Siêu Thoáng',
      slug: 'cua-cuon-khop-inox-vuong',
      code: 'INOX-SQ01',
      categoryId: catKhopInox.id,
      price: 3200000,
      salePrice: 2950000,
      thickness: 'Ống inox phi tròn & khớp vuông dày 1.2mm',
      material: 'Inox 304 không gỉ sáng bóng',
      origin: 'Austdoor Việt Nam',
      warrantyMonths: 36,
      description: 'Mắt lưới inox 304 thanh lịch, chịu lực cao, tối ưu trưng bày hàng hóa ban đêm cho trung tâm thương mại và cửa hàng tiện lợi.',
      content: `<h3>Cửa cuốn Khớp Inox Vuông 304 cao cấp</h3><p>Được thiết kế chuyên biệt cho các trung tâm thương mại, showroom ô tô, cửa hàng trang sức thời trang. Giữ trọn tầm nhìn trưng bày cả khi đóng cửa mà vẫn bảo vệ tuyệt đối.</p>`,
      specs: {
        'Vật liệu': 'Inox 304 cao cấp chống gỉ sét 100%',
        'Quy cách nan': 'Hộp vuông 20x20mm đan khớp nối liên hoàn',
        'Độ mở thông thoáng': 'Lên tới 85% diện tích mặt tiền',
        'Bảo hành': '36 tháng không gỉ'
      },
      features: [
        'Khả năng quan sát 85% diện tích bên trong',
        'Chất liệu Inox 304 không rỉ sét dưới mọi điều kiện thời tiết',
        'Khung khớp chắc chắn chống cắt phá đột nhập'
      ],
      images: ['/assets/cua-cuon-khop-inox-vuong-300x300-1.png', '/assets/m6.jpg'],
      isFeatured: true,
      isHot: false,
      seoTitle: 'Cửa Cuốn Khớp Inox Vuông 304 Cho Showroom & TTTM',
      seoDescription: 'Cửa cuốn lưới khớp inox vuông 304 siêu thoáng, bền bỉ sang trọng, đón sáng và quan sát tối đa, giá cạnh tranh tại Hà Nội.',
    },
    {
      name: 'Cửa Cuốn Tấm Liền Thép Úc Series 1 (Austroll)',
      slug: 'cua-cuon-tam-lien-austroll-series-1',
      code: 'CB-S1',
      categoryId: catTamLien.id,
      price: 1050000,
      salePrice: 920000,
      thickness: '0.53mm',
      material: 'Thép mạ màu Colorbond BlueScope Steel Úc',
      origin: 'Chính Hãng Austdoor',
      warrantyMonths: 24,
      description: 'Tốc độ mở nhanh gấp 3 lần cửa truyền thống, tích hợp hệ thống lò xo trợ lực cót đóng mở bằng tay cực nhẹ khi mất điện.',
      content: `<h3>Cửa cuốn tấm liền Austdoor Austroll Series 1</h3><p>Dòng cửa cuốn số 1 cho gara ô tô, kiot chợ, nhà xưởng và nhà ở mặt phố. Thân cửa dập sóng liền mạch gia tăng độ cứng và ngăn bụi bẩn hiệu quả.</p>`,
      specs: {
        'Độ dày thép': '0.53 mm Colorbond',
        'Hệ lò xo': 'Lò xo trợ lực C80 tôi dầu độ bền 25.000 lần đóng mở',
        'Tốc độ mở': '15 - 20 cm/giây (gấp 3 lần cửa khe thoáng)',
        'Dây polyguide': 'Chạy dọc 2 bên mép cửa giảm ma sát'
      },
      features: [
        'Đóng mở nhẹ nhàng bằng tay nhờ bộ trợ lực lò xo trợ lực',
        'Mở nhanh thoát hiểm khẩn cấp chỉ bằng một thao tác giật chốt ly hợp',
        'Chống bám bụi, lau chùi dễ dàng, không han gỉ'
      ],
      images: ['/assets/sp10.jpg', '/assets/c3.jpg'],
      isFeatured: true,
      isHot: true,
      seoTitle: 'Cửa Cuốn Tấm Liền Austroll Austdoor Giá Rẻ Tại Hà Nội',
      seoDescription: 'Cửa cuốn tấm liền thép công nghệ Úc Austdoor đóng mở siêu nhanh, nhẹ nhàng, thoát hiểm khẩn cấp khi mất điện, giá chỉ từ 920k/m2.',
    },
    {
      name: 'Motor Cửa Cuốn Austdoor Đồng Bộ AK500 / AH500',
      slug: 'motor-cua-cuon-austdoor-ak500',
      code: 'MOTOR-AK500',
      categoryId: catPhuKien.id,
      price: 5800000,
      salePrice: 5200000,
      unit: 'Bộ',
      thickness: 'Tải trọng 500kg',
      material: 'Lõi đồng 100% tản nhiệt nhôm đúc',
      origin: 'Austdoor nhập khẩu linh kiện Đài Loan',
      warrantyMonths: 36,
      description: 'Động cơ motor tời cửa cuốn tải trọng 500kg, cuộn dây đồng 100%, tích hợp phanh má kép an toàn và rơ le nhiệt tự ngắt khi quá tải.',
      content: `<h3>Bộ tời mô tơ cửa cuốn đồng bộ Austdoor AK500/AH500</h3><p>Trọn bộ sản phẩm bao gồm: 01 thân mô tơ, 01 mặt bích, 01 hộp nhận tín hiệu bảo mật ARC, 02 tay điều khiển từ xa và 01 nút bấm âm tường có dây.</p>`,
      specs: {
        'Sức nâng': '500 kg',
        'Điện áp': '220V / 50Hz',
        'Công suất': '250W',
        'Tần số sóng': '315MHz / 433MHz mã nhảy Rolling Code',
        'Bảo hành': '36 tháng chính hãng'
      },
      features: [
        '100% dây đồng nguyên chất chịu nhiệt cao',
        'Công nghệ chống sao chép mã số điều khiển ARC',
        'Tự động ngắt điện khi motor bị kẹt hoặc quá nhiệt'
      ],
      images: ['/assets/l1.jpg', '/assets/l2.jpg', '/assets/l3.jpg'],
      isFeatured: false,
      isHot: true,
      seoTitle: 'Motor Cửa Cuốn Austdoor AK500 Chính Hãng | Bảo Hành 3 Năm',
      seoDescription: 'Motor cửa cuốn Austdoor AK500/AH500 tải trọng 500kg dây đồng 100%, bảo mật mã nhảy ARC, bảo hành 36 tháng đổi mới tại Cửa Cuốn Thủ Đô.',
    },
    {
      name: 'Bình Lưu Điện Cửa Cuốn UPS Thông Minh E2000',
      slug: 'binh-luu-dien-cua-cuon-ups-e2000',
      code: 'UPS-E2000',
      categoryId: catPhuKien.id,
      price: 3600000,
      salePrice: 3100000,
      unit: 'Bộ',
      thickness: 'Thời gian chờ 48 - 72 giờ',
      material: 'Vỏ thép sơn tĩnh điện chống cháy',
      origin: 'Chính hãng bảo hành 12 tháng ắc quy',
      warrantyMonths: 24,
      description: 'Tự động kích hoạt cấp nguồn điện cho cửa cuốn hoạt động bình thường khi mất điện lưới. Chế độ sạc xả tự động kéo dài tuổi thọ bình ắc quy.',
      content: `<h3>Bình tích điện UPS cửa cuốn E2000</h3><p>Không lo mất điện, an toàn tuyệt đối khi xảy ra hỏa hoạn sự cố lưới điện. Cung cấp năng lượng đóng mở cửa từ 20 đến 35 lần sau khi ngắt điện.</p>`,
      specs: {
        'Dung lượng ắc quy': '2 x 12V / 12Ah',
        'Thời gian lưu': '48 đến 72 giờ',
        'Công suất danh định': '800W - 1200W',
        'Bảo hành': '24 tháng bo mạch, 12 tháng ắc quy'
      },
      features: [
        'Chuyển mạch tự động thông minh dưới 0.01 giây',
        'Bảo vệ chống xả cạn kiệt và quá nạp ắc quy',
        'Đèn LED hiển thị dung lượng pin trực quan'
      ],
      images: ['/assets/l4.jpg', '/assets/l6.jpg'],
      isFeatured: false,
      isHot: false,
      seoTitle: 'Bình Lưu Điện Cửa Cuốn UPS E2000 Lưu 72 Giờ Giá Tốt',
      seoDescription: 'Bình lưu điện cửa cuốn UPS E2000 chính hãng lưu điện 72h, sạc xả tự động chống chai ắc quy, bảo hành chính hãng tại Hà Nội.',
    }
  ];

  for (const prod of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }
  console.log('Products initialized.');

  // 5. Articles / Blog
  const sampleArticles = [
    {
      title: 'Quy trình cứu hộ cửa cuốn 24/24 tại Hà Nội - Có mặt sau 15 phút',
      slug: 'quy-trinh-cuu-ho-cua-cuon-24h-ha-noi',
      category: 'CUUHO',
      excerpt: 'Khi cửa cuốn bị kẹt nan, đứt cót hoặc không đóng mở được, bạn cần xử lý thế nào? Khám phá quy trình cứu hộ chuyên nghiệp 4 bước của Cửa Cuốn Thủ Đô.',
      content: `<p>Sự cố cửa cuốn xảy ra bất ngờ vào sáng sớm khi cần lấy xe đi làm, hoặc lúc nửa đêm về nhà không mở được cửa luôn khiến gia chủ lo lắng. Cửa Cuốn Thủ Đô triển khai đội cứu hộ túc trực tại tất cả các quận nội thành Hà Nội.</p>
<h3>4 Bước cứu hộ cửa cuốn khẩn cấp:</h3>
<ol>
  <li><strong>Bước 1 - Tiếp nhận thông tin (1 phút):</strong> Khách hàng gọi hotline 0986 888 121, tổng đài định vị vị trí và điều động thợ gần nhất.</li>
  <li><strong>Bước 2 - Có mặt tận nơi sau 15 phút:</strong> Kỹ thuật viên di chuyển cơ động bằng xe máy chuyên dụng đầy đủ đồ nghề.</li>
  <li><strong>Bước 3 - Kiểm tra và báo giá minh bạch:</strong> Thợ kiểm tra nguyên nhân sự cố, tư vấn phương án khắc phục nhanh nhất và báo giá chuẩn trước khi làm.</li>
  <li><strong>Bước 4 - Bàn giao và viết phiếu bảo hành:</strong> Vận hành thử nghiệm trơn tru, dán tem bảo hành và bàn giao cho khách hàng.</li>
</ol>`,
      coverImage: '/assets/dv2.jpg',
      tags: ['Cứu hộ cửa cuốn', 'Sửa cửa cuốn 24h', 'Hà Nội'],
      isPublished: true,
      seoTitle: 'Quy Trình Cứu Hộ Cửa Cuốn 24/24 Hà Nội Có Mặt Sau 15 Phút',
      seoDescription: 'Cứu hộ cửa cuốn khẩn cấp 24/24h tại Hà Nội có mặt sau 15 phút. Sửa kẹt nan, đứt cót, chập mô tơ triệt để, cam kết giá niêm yết không phát sinh.',
    },
    {
      title: 'Hướng dẫn cách kiểm tra và phòng chống xô lô nan cửa cuốn',
      slug: 'huong-dan-cach-kiem-tra-va-phong-chong-xo-lo-cua-cuon',
      category: 'KIENTHUC',
      excerpt: 'Xô lô cửa cuốn là một trong những tai nạn phổ biến và tốn kém nhất. Xem ngay nguyên nhân và cách lắp rơ le chống xô bảo vệ cửa an toàn 100%.',
      content: `<p>Hiện tượng xô lô thường xảy ra khi cửa đang hạ xuống mà gặp phải vật cản (xe máy, đồ đạc, đồ chơi trẻ em) nhưng motor vẫn tiếp tục quay đẩy nan phình to ra xung quanh trục lô cuốn.</p>
<h3>Biện pháp phòng ngừa:</h3>
<ul>
  <li>Lắp đặt hệ thống rơ le chống xô tự ngắt hoặc thanh cảm ứng đảo chiều Austdoor.</li>
  <li>Cài đặt mắt thần hồng ngoại bảo vệ chùm tia ngang cửa.</li>
  <li>Bảo dưỡng tra mỡ định kỳ trục quay và vòng bi mỗi năm một lần.</li>
</ul>`,
      coverImage: '/assets/huong-dan-cach-lap-dat-cua-cuon-khe-thoang-2.jpg',
      tags: ['Xô lô cửa cuốn', 'Bảo dưỡng cửa cuốn', 'An toàn'],
      isPublished: true,
      seoTitle: 'Cách Phòng Chống Xô Lô Cửa Cuốn Hiệu Quả 100%',
      seoDescription: 'Hướng dẫn chi tiết nguyên nhân gây xô lô kẹt nan cửa cuốn và giải pháp lắp cảm biến tự dừng chống xô nan triệt để.',
    },
    {
      title: 'Lô cuốn là gì? Nên lắp lô cửa cuốn ở trong nhà hay ngoài nhà?',
      slug: 'lo-cuon-la-gi-nen-lap-lo-cua-cuon-o-trong-nha-hay-ngoai-nha',
      category: 'KIENTHUC',
      excerpt: 'Phân tích ưu nhược điểm của phương án lắp lô cuốn trong nhà và lắp lô cuốn ngoài nhà để gia chủ chọn giải pháp an toàn và thẩm mỹ nhất.',
      content: `<p>Lô cuốn là hộp trục chứa toàn bộ nan cửa cuốn cuộn tròn lại khi cửa mở hết lên trên. Kích thước hộp lô cuốn thường chiếm khoảng 45cm đến 50cm chiều cao trần.</p>
<h3>1. Lắp lô cuốn ở trong nhà:</h3>
<p>Ưu điểm: Đảm bảo an ninh tối đa, mô tơ và hộp điều khiển không bị kẻ gian tiếp cận, bảo vệ khỏi mưa nắng trực tiếp.</p>
<h3>2. Lắp lô cuốn ở ngoài nhà:</h3>
<p>Phương án này dùng khi trần trong nhà vướng đà dầm bê tông hoặc không gian hẹp. Khi lắp ngoài, bắt buộc phải ốp alu chống trộm và khóa xích che chắn hộp kỹ thuật cẩn thận.</p>`,
      coverImage: '/assets/lo-cuon-la-gi-nen-lap-lo-cua-cuon-o-trong-nha-hay-ngoai-nha-2.jpg',
      tags: ['Hộp lô cuốn', 'Kỹ thuật lắp đặt', 'Kiến trúc'],
      isPublished: true,
      seoTitle: 'Nên Lắp Lô Cửa Cuốn Trong Nhà Hay Ngoài Nhà? Phân Tích Chi Tiết',
      seoDescription: 'So sánh chi tiết ưu nhược điểm lắp đặt lô cửa cuốn bên trong và bên ngoài nhà giúp gia chủ tối ưu thẩm mỹ và an ninh.',
    },
    {
      title: 'Bảng giá lắp đặt cửa cuốn và phụ kiện chính hãng mới nhất 2026',
      slug: 'bang-gia-lap-dat-cua-cuon-chinh-hang-2026',
      category: 'BAOGIA',
      excerpt: 'Cập nhật bảng giá trọn gói cửa cuốn khe thoáng, cửa cuốn tấm liền, mô tơ và bình lưu điện chính hãng Austdoor tại Hà Nội.',
      content: `<p>Cửa Cuốn Thủ Đô xin gửi tới quý khách hàng bảng giá tham khảo các dòng cửa cuốn chính hãng chất lượng cao tại khu vực Hà Nội và các tỉnh lân cận năm 2026.</p>
<p>Giá đã bao gồm chi phí đo đạc khảo sát thực tế tại công trình và bảo hành tận nơi chu đáo.</p>`,
      coverImage: '/assets/dv4.jpg',
      tags: ['Báo giá cửa cuốn', 'Giá cửa cuốn 2026', 'Austdoor'],
      isPublished: true,
      seoTitle: 'Bảng Giá Cửa Cuốn Hà Nội 2026 Mới Nhất | Đại Lý Thủ Đô',
      seoDescription: 'Bảng báo giá cửa cuốn khe thoáng Austdoor, cửa cuốn tấm liền, motor và bình lưu điện 2026 tại Hà Nội, cam kết giá gốc cạnh tranh nhất.',
    }
  ];

  for (const art of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {},
      create: art,
    });
  }
  console.log('Articles initialized.');

  // 6. Branches (12 Branches across Hanoi)
  const branches = [
    {
      name: 'Trụ Sở Chính Cầu Giấy',
      address: 'Số 36 Ngõ 6 Mạc Thái Tổ, P. Yên Hòa, Q. Cầu Giấy, Hà Nội',
      district: 'Cầu Giấy',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: true,
      sortOrder: 1,
    },
    {
      name: 'Chi Nhánh 1 - Xuân Thủy',
      address: 'Số 12 Ngõ 132 Xuân Thủy, Q. Cầu Giấy, Hà Nội',
      district: 'Cầu Giấy',
      phone: '0968 928 563',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 2,
    },
    {
      name: 'Chi Nhánh 2 - Hà Đông',
      address: 'Số 17 Ngõ 472 Quang Trung, Q. Hà Đông, Hà Nội',
      district: 'Hà Đông',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 3,
    },
    {
      name: 'Chi Nhánh 3 - Bắc Từ Liêm',
      address: 'Số 66 Ngõ 180 Cổ Nhuế, Q. Bắc Từ Liêm, Hà Nội',
      district: 'Bắc Từ Liêm',
      phone: '0968 928 563',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 4,
    },
    {
      name: 'Chi Nhánh 4 - Hai Bà Trưng',
      address: 'Số 51 Đại Cồ Việt, Q. Hai Bà Trưng, Hà Nội',
      district: 'Hai Bà Trưng',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 5,
    },
    {
      name: 'Chi Nhánh 5 - Long Biên',
      address: 'Số 88 Nguyễn Văn Cừ, Q. Long Biên, Hà Nội',
      district: 'Long Biên',
      phone: '0968 928 563',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 6,
    },
    {
      name: 'Chi Nhánh 6 - Đống Đa',
      address: 'Số 125 Giảng Võ, Q. Đống Đa, Hà Nội',
      district: 'Đống Đa',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 7,
    },
    {
      name: 'Chi Nhánh 7 - Ba Đình',
      address: 'Số 350 Hoàng Hoa Thám, Q. Ba Đình, Hà Nội',
      district: 'Ba Đình',
      phone: '0968 928 563',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 8,
    },
    {
      name: 'Chi Nhánh 8 - Tây Hồ',
      address: 'Số 240 Lạc Long Quân, Q. Tây Hồ, Hà Nội',
      district: 'Tây Hồ',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 9,
    },
    {
      name: 'Chi Nhánh 9 - Hoàng Mai',
      address: 'Số 198 Trương Định, Q. Hoàng Mai, Hà Nội',
      district: 'Hoàng Mai',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 10,
    },
    {
      name: 'Chi Nhánh 10 - Thanh Xuân',
      address: 'Số 45 Lê Văn Lương, Q. Thanh Xuân, Hà Nội',
      district: 'Thanh Xuân',
      phone: '0968 928 563',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 11,
    },
    {
      name: 'Chi Nhánh 11 - Nam Từ Liêm',
      address: 'Số 82 Lê Quang Đạo, P. Mễ Trì, Q. Nam Từ Liêm, Hà Nội',
      district: 'Nam Từ Liêm',
      phone: '0986 888 121',
      hotline: '0986 888 121',
      isMain: false,
      sortOrder: 12,
    }
  ];

  await prisma.branch.deleteMany({});
  for (const b of branches) {
    await prisma.branch.create({ data: b });
  }
  console.log('Branches initialized.');

  // 7. Seed sample Quotes / Inquiries
  await prisma.quoteRequest.createMany({
    data: [
      {
        customerName: 'Anh Tuấn',
        phone: '0912345678',
        address: 'Số 15 phố Trung Kính, Cầu Giấy',
        serviceType: 'CUU_HO_247',
        doorType: 'Cửa cuốn khe thoáng Austdoor',
        notes: 'Cửa bị kẹt xô nan không xuống hết, cần thợ gấp',
        status: 'COMPLETED',
        adminNote: 'Đã xử lý xong sau 15p, thay 2 nan hỏng',
      },
      {
        customerName: 'Chị Mai Lan',
        phone: '0988776655',
        address: 'Biệt thự Vinhomes Riverside, Long Biên',
        serviceType: 'BAO_GIA_LAP_MOI',
        doorType: 'Cửa cuốn khe thoáng C70',
        width: 4.5,
        height: 3.2,
        estimatedPrice: 38500000,
        notes: 'Cần khảo sát mặt bằng lắp mới',
        status: 'PENDING',
        adminNote: 'Chờ điều kỹ thuật qua đo đạc chiều nay',
      }
    ]
  });
  console.log('Sample quote requests created.');

  console.log('--- SEED COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

