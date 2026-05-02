# Expense Dashboard

A POC expense tracking dashboard ready for production use, built with NextJS (Frontend) and NestJS (Backend) using full OOP architecture.

## 🏗️ Architecture

- **Frontend**: NextJS 14 with Modern UI (White/Blue theme)
- **Backend**: NestJS with OOP architecture and In-memory Storage
- **Database**: In-memory Map for POC
- **API**: RESTful API with Validation
- **UI**: TailwindCSS with Responsive Design

## 🚀 Installation and Running

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Backend (NestJS)
```bash
cd server
npm run start:dev
```
Backend will run at `http://localhost:3001`

### 3. Run Frontend (NextJS)
```bash
cd web
npm run dev
```
Frontend will run at `http://localhost:3000`

### 4. Run Both Together
```bash
npm run dev
```

## 📊 Features

### ✅ Main Features
- 💰 Add/Delete/Edit income and expenses
- 📈 Dashboard with real-time statistics
- 📋 Recent transactions list
- 🏷️ Categories with spending percentages
- 🔍 Filter by date/category/type
- 📱 Responsive Design for all screen sizes

### 🎨 UI/UX
- Modern Minimal Design
- White/Blue Theme
- TailwindCSS Styling
- Smooth Animations
- Error Handling and Loading States

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
- **Entity Pattern**: Transaction Entity with methods
- **Repository Pattern**: Separated data access logic
- **Service Layer**: Business logic and validation
- **DTO Pattern**: Input validation and transformation
- **Dependency Injection**: NestJS DI Container

## 📡 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get transaction by ID
- `PATCH /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Statistics
- `GET /api/transactions/statistics` - Get dashboard statistics
- `GET /api/transactions/categories` - Get predefined categories

### Filters
- `GET /api/transactions/filter/date-range` - Filter by date range
- `GET /api/transactions/filter/type/:type` - Filter by type
- `GET /api/transactions/filter/category/:category` - Filter by category

## 🏷️ Predefined Categories

### Income
- Salary
- Bonus
- Side Income
- Investment
- Other

### Expense
- Food
- Transportation
- Shopping
- Bills
- Entertainment
- Health
- Other

## 📈 Statistics Displayed

- **Total Income**: Total income amount
- **Total Expense**: Total expense amount
- **Balance**: Net balance
- **Monthly Stats**: Monthly statistics (last 6 months)
- **Category Breakdown**: Breakdown by category
- **Trend Data**: Income-expense trends

## 🔧 Development

### Scripts
```bash
npm run dev              # Run both frontend and backend
npm run dev:web          # Run NextJS only
npm run dev:server       # Run NestJS only
npm run build            # Build all
npm run build:web        # Build NextJS
npm run build:server     # Build NestJS
npm run install:all      # Install all dependencies
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Backend (Not required for POC)
```

## 🎯 Usage

1. Go to `http://localhost:3000`
2. Click "Add Transaction" to add a transaction
3. Select type (income/expense)
4. Fill in details and save
5. View real-time statistics in Dashboard

## 📝 Notes

- Uses In-memory Storage for POC - data will be lost on server restart
- Can be upgraded to production by replacing with real database
- Full Thai language support
- UI designed following Modern Minimal Design principles

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit and Push
4. Create a Pull Request

## 📄 License

MIT License
