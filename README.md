# Saha Satış ve Stok Yönetim Sistemi

Bu proje, saha satış süreçlerini dijital ortamda yönetmek amacıyla geliştirilmiş modern bir satış, stok ve cari takip otomasyonudur. Sistem içerisinde kullanıcı yönetimi, ürün yönetimi, müşteri yönetimi, stok takibi, satış işlemleri, bakiye kontrolü ve satış geçmişi gibi temel ticari otomasyon özellikleri bulunmaktadır. Proje frontend tarafında Next.js ve Tailwind CSS, backend tarafında Node.js, Express.js, Prisma ORM ve PostgreSQL kullanılarak geliştirilmiştir.

---

# Kurulum Adımları

## 1. Projeyi Klonlayın

```bash
git clone (https://github.com/mermean/saha-satis-sistemi)
```

---

## 2. Backend Kurulumu

Backend klasörüne girin:

```bash
cd backend
```

Gerekli paketleri yükleyin:

```bash
npm install
```

`.env` dosyası oluşturun:

```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/saha_satis_db"

JWT_SECRET=sahasatissecret
```

Prisma veritabanını oluşturun:

```bash
npx prisma generate
npx prisma db push
```

Backend sunucusunu başlatın:

```bash
npm run dev
```

Backend varsayılan olarak aşağıdaki adreste çalışacaktır:

```txt
http://localhost:5000
```

---

## 3. Frontend Kurulumu

Yeni terminal açın ve frontend klasörüne girin:

```bash
cd web-panel
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Frontend uygulamasını başlatın:

```bash
npm run dev
```

Frontend varsayılan olarak aşağıdaki adreste çalışacaktır:

```txt
http://localhost:3000
```

---

# Kullanılan Teknolojiler

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* JWT Authentication
