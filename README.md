# 💊 Medicine Dose Tracker Web App

## 📝 Giới thiệu

**Medicine Dose Tracker** là một ứng dụng web giúp người dùng theo dõi việc uống thuốc một cách tiện lợi và chính xác. Người dùng có thể đăng ký, đăng nhập, và quản lý danh sách thuốc của mình bao gồm: tên thuốc, liều lượng, tần suất sử dụng. Ngoài ra, ứng dụng hỗ trợ chức năng nhắc nhở đúng giờ qua email hoặc tin nhắn (sử dụng cron job hoặc dịch vụ ngoài).

⏱️ **Thời gian phát triển dự kiến:** ~20 giờ.

---

## 🛠️ Công nghệ sử dụng

### 💻 Frontend (React + Vite)
- ReactJS
- Vite
- TypeScript
- CSS/Bootstrap hoặc Tailwind (tuỳ chỉnh)
- Axios để gọi API

### 🌐 Backend (ASP.NET Core Web API)
- C# với .NET 6 trở lên
- Entity Framework Core (Code First)
- SQL Server
- Authentication: JWT
- Gửi email nhắc thuốc: có thể tích hợp SendGrid / SMTP

---

## ⚙️ Tính năng chính

- ✅ Đăng ký và đăng nhập người dùng
- ✅ Thêm thuốc với các trường:
  - Tên thuốc (string)
  - Liều lượng (int + đơn vị)
  - Tần suất sử dụng (int + đơn vị)
- ✅ Danh sách thuốc đã lưu
- ✅ Cập nhật và xoá thuốc
- 🔔 Tính năng nhắc nhở uống thuốc qua email/tin nhắn (cron job)
- 📱 Giao diện đơn giản, dễ dùng

---

## 📂 Cấu trúc thư mục

```bash
medicine-dose-tracker/
├── FE/         # React + Vite project
├── BE/          # ASP.NET Core Web API project
```

## ⚙️ Hướng dẫn cài đặt và chạy dự án

### ⚠️ Yêu cầu môi trường

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js v16+](https://nodejs.org/)
- SQL Server
- Git

---

### 1️⃣ Clone dự án

```bash
git clone https://github.com/your-username/medicine-dose-tracker.git
cd medicine-dose-tracker
```

### 🧩 Thiết lập Beackend bằng Visual Studio

1. **Mở Visual Studio**
2. **Chọn:** `File > Open > Project/Solution` → chọn file `MedicineDoseTracker.sln`
3. **Cập nhật chuỗi kết nối** trong `appsettings.json`:

   ```json
   "ConnectionStrings": {
      "MedicineConnect": "Server=YOUR_SERVER;Database=MedicineDose;User Id=sa;Password=123456;TrustServerCertificate=True"
    }
   ```

4. **Mở** `Tools > NuGet Package Manager > Package Manager Console `
5. **Chạy lệnh**
```bash
Add-migration init
Update-database
```
6.  `Run`

### 💻 Thiết lập Frontend (React + Vite)

#### 📦 Yêu cầu

- Node.js >= 16
- npm hoặc yarn

---

#### ⚙️ Các bước cài đặt

1. **Mở terminal** và điều hướng vào thư mục `FE`:

   ```bash
   cd FE
   ```
2. **Chạy lệnh**
    ```bash
   npm i
    npm run dev
   ```
   
