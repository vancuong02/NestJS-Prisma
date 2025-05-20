# NestJS E-commerce Project với Prisma

## Mô tả

Dự án E-commerce được xây dựng bằng NestJS framework và Prisma ORM, hỗ trợ thanh toán online.

## Cài đặt project

```
npm install
```

## Cấu hình Database

1. Cấu trúc Schema

- User & Auth
- Profile Management
- Media Management
- Product Management
- Cart & Order Management
- Online Payment

2. Khởi tạo Database

```
npx prisma migrate dev --name init
```

## Các lệnh Prisma CLI quan trọng

1. Khởi tạo Prisma

```
npx prisma init
```

2. Tạo và áp dụng migration

```
npx prisma migrate dev --name ten_migration
```

3. Reset database

```
npx prisma migrate reset
```

4. Xem database qua GUI

```
npx prisma studio
```

5. Push schema lên DB

```
npx prisma db push
```

6. Pull schema từ DB

```
npx prisma db pull
```

7. Generate Prisma Client

```
npx prisma generate
```

## Cấu trúc Database

### 1. User & Auth

```
model User {
  id            String    @id @default(uuid())
  name          String    
  email         String    @unique
  password      String
  role          Role      @default(USER)
  profile       Profile?
  orders        Order[]
  cart          Cart?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

### 2. Profile

```
model Profile {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: 
  [userId], references: [id])
  firstName     String
  lastName      String
  phoneNumber   String?
  address       String?
  avatar        Media?    
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 3. Media

```
model Media {
  id            String    @id @default(uuid())
  url           String
  type          String
  profile       Profile[]
  products      Product[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 4. Product

```
model Product {
  id            String    @id @default(uuid())
  name          String
  description   String
  price         Float
  stock         Int
  images        Media[]
  cartItems     CartItem[]
  orderItems    OrderItem[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 5. Cart & Order

```
model Cart {
  id            String    @id @default(uuid())
  userId        String    @unique
  user          User      @relation(fields: 
  [userId], references: [id])
  items         CartItem[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Order {
  id            String    @id @default(uuid())
  userId        String
  user          User      @relation(fields: 
  [userId], references: [id])
  items         OrderItem[]
  status        OrderStatus @default(PENDING)
  totalAmount   Float
  payment       Payment?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 6. Payment

```
model Payment {
  id            String    @id @default(uuid())
  orderId       String    @unique
  order         Order     @relation(fields: 
  [orderId], references: [id])
  amount        Float
  provider      String
  status        PaymentStatus @default(PENDING)
  transactionId String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum PaymentStatus {
  PENDING
  COMPLETED  
  FAILED
  REFUNDED
}
```
