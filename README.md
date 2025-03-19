# Personal Portfolio

A modern, full-stack portfolio website built with Laravel and React/TypeScript and  Inertia.

## 🚀 Technologies Used

- **Backend:**
  - Laravel 12.x
  - PHP 8.x
  - MySQL

- **Frontend:**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS

## ✨ Features

- Modern VS Code clone
- Server-side rendering
- Type-safe development with TypeScript
- Modern UI components
- RESTful API architecture

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- PHP 8.x
- Composer
- Node.js (16.x or higher)
- npm or yarn
- MySQL

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd portfolio
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
# or
yarn install
```

4. Environment setup:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in the `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run database migrations:
```bash
php artisan migrate
```

## 🚀 Development

1. Start the Laravel development server:
```bash
php artisan serve
```

2. Start the Vite development server:
```bash
npm run dev
# or
yarn dev
```
3. Star both 
```bash
# or
composer run dev
```
The application will be available at `http://localhost:8000`

## 🏗️ Building for Production

1. Build the frontend assets:
```bash
npm run build
# or
yarn build
```

2. Configure your production environment variables in `.env`



## 🔒 Security

If you discover any security-related issues, please email [your-email] instead of using the issue tracker.

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT). 