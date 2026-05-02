# Expense Dashboard

ระบบ Dashboard สำหรับติดตามรายรับรายจ่ายแบบ POC พร้อมใช้งานจริง สร้างด้วย NextJS (Frontend) และ NestJS (Backend) ด้วยสถาปัตยกรรม OOP เต็มรูปแบบ

## 🏗️ สถาปัตยกรรม

- **Frontend**: NextJS 14 พร้อม Modern UI (White/Blue theme)
- **Backend**: NestJS แบบ OOP พร้อม In-memory Storage
- **Database**: In-memory Map สำหรับ POC
- **API**: RESTful API พร้อม Validation
- **UI**: TailwindCSS พร้อม Responsive Design

## 🚀 การติดตั้งและรัน

### 1. ติดตั้ง Dependencies
```bash
npm run install:all
```

### 2. รัน Backend (NestJS)
```bash
cd server
npm run start:dev
```
Backend จะรันที่ `http://localhost:3001`

### 3. รัน Frontend (NextJS)
```bash
cd web
npm run dev
```
Frontend จะรันที่ `http://localhost:3000`

### 4. รันทั้งสองอย่างพร้อมกัน
```bash
npm run dev
```

## 📊 Features

### ✅ ฟีเจอร์หลัก
- 💰 เพิ่ม/ลบ/แก้ไข รายรับและรายจ่าย
- 📈 Dashboard พร้อมสถิติแบบ Real-time
- 📋 รายการธุรกรรมล่าสุด
- 🏷️ หมวดหมู่พร้อมเปอร์เซ็นต์การใช้จ่าย
- 🔍 กรองข้อมูลตามวันที่/หมวดหมู่/ประเภท
- 📱 Responsive Design สำหรับทุกขนาดหน้าจอ

### 🎨 UI/UX
- Modern Minimal Design
- White/Blue Theme
- TailwindCSS Styling
- Smooth Animations
- Error Handling และ Loading States

## 🛠️ OOP Architecture

### Backend Structure
```
server/src/
├── transactions/
│   ├── entities/          # Transaction Entity
│   ├── dto/              # Data Transfer Objects
│   ├── interfaces/       # Repository Interfaces
│   ├── repositories/     # Repository Implementation
│   ├── services/         # Business Logic
│   └── controllers/      # API Controllers
├── common/
│   └── storage/          # In-memory Storage
└── app.module.ts         # Root Module
```

### Design Patterns
- **Entity Pattern**: Transaction Entity พร้อม methods
- **Repository Pattern**: แยก data access logic
- **Service Layer**: Business logic และ validation
- **DTO Pattern**: Input validation และ transformation
- **Dependency Injection**: NestJS DI Container

## 📡 API Endpoints

### Transactions
- `GET /api/transactions` - ดึงรายการทั้งหมด
- `POST /api/transactions` - เพิ่มรายการใหม่
- `GET /api/transactions/:id` - ดึงรายการตาม ID
- `PATCH /api/transactions/:id` - แก้ไขรายการ
- `DELETE /api/transactions/:id` - ลบรายการ

### Statistics
- `GET /api/transactions/statistics` - ดึงสถิติ Dashboard
- `GET /api/transactions/categories` - ดึงหมวดหมู่ที่กำหนดไว้

### Filters
- `GET /api/transactions/filter/date-range` - กรองตามช่วงวันที่
- `GET /api/transactions/filter/type/:type` - กรองตามประเภท
- `GET /api/transactions/filter/category/:category` - กรองตามหมวดหมู่

## 🏷️ หมวดหมู่ที่กำหนดไว้

### รายรับ
- เงินเดือน
- โบนัส
- รายได้เสริม
- ลงทุน
- อื่นๆ

### รายจ่าย
- อาหาร
- การเดินทาง
- ช้อปปิ้ง
- บิลค่าใช้จ่าย
- บันเทิง
- สุขภาพ
- อื่นๆ

## 📈 Statistics ที่แสดง

- **Total Income**: รวมรายรับทั้งหมด
- **Total Expense**: รวมรายจ่ายทั้งหมด
- **Balance**: คงเหลือสุทธิ
- **Monthly Stats**: สถิติรายเดือน (6 เดือนล่าสุด)
- **Category Breakdown**: การแบ่งตามหมวดหมู่
- **Trend Data**: แนวโน้มรายรับ-รายจ่าย

## 🔧 Development

### Scripts
```bash
npm run dev              # รันทั้ง frontend และ backend
npm run dev:web          # รันเฉพาะ NextJS
npm run dev:server       # รันเฉพาะ NestJS
npm run build            # Build ทั้งหมด
npm run build:web        # Build NextJS
npm run build:server     # Build NestJS
npm run install:all      # ติดตั้ง dependencies ทั้งหมด
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (ไม่ต้องการสำหรับ POC)
```

## 🎯 การใช้งาน

1. เข้า `http://localhost:3000`
2. กด "Add Transaction" เพื่อเพิ่มรายการ
3. เลือกประเภท (รายรับ/รายจ่าย)
4. กรอกข้อมูลและบันทึก
5. ดูสถิติใน Dashboard แบบ Real-time

## 📝 หมายเหตุ

- ใช้ In-memory Storage สำหรับ POC ข้อมูลจะหายไปเมื่อ restart server
- สามารถพัฒนาต่อเป็น production โดยเปลี่ยนเป็น database จริง
- รองรับภาษาไทยเต็มรูปแบบ
- UI ออกแบบตามหลัก Modern Minimal Design

## 🤝 Contributing

1. Fork โปรเจค
2. สร้าง feature branch
3. Commit และ Push
4. สร้าง Pull Request

## 📄 License

MIT License
