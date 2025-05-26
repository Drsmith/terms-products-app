# Terms & Products Mini App

This is a React + Node.js + PostgreSQL application containing two fully responsive pages:

- **Terms Page**: Displays Terms and Conditions in English and Swedish. Includes a responsive layout and working hamburger menu.
- **Products Page**: Editable table with product data, fully responsive for desktop, tablet, and mobile devices.

---

## 📦 Tech Stack

| Layer      | Stack              |
|------------|--------------------|
| Frontend   | React + Vite       |
| Styling    | Plain CSS          |
| Routing    | React Router DOM v6 |
| Backend    | Node.js + Express  |
| Database   | PostgreSQL         |
| ORM        | Sequelize          |

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://gitlab.com/YOUR_USERNAME/terms-products-app.git
cd terms-products-app
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory based on the provided `.env.example`:

```env
PORT=5000
DB_NAME=sowdb
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_DIALECT=postgres
```

### 4. Start the app

#### Start Backend:

```bash
npm start
```

#### Start Frontend:

```bash
cd client
npm run dev
```

---

## 🌐 Routes

- `/` – Terms and Conditions (responsive with language switch and hamburger menu)
- `/products` – Editable Product List (mobile/tablet/desktop friendly)

---

## ✅ Features Completed

- [x] Fully responsive Terms Page
- [x] Working hamburger menu (Terms Page only)
- [x] Flag-based language switcher (English/Swedish)
- [x] Editable product fields (Name, Price, etc.)
- [x] Scrollable table on mobile
- [x] Clean UI that matches reference screenshots

---

## 📤 Hosting (Add link if deployed)

**Live Site:** [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)  
**GitLab Repo:** [https://gitlab.com/YOUR_USERNAME/terms-products-app](https://gitlab.com/YOUR_USERNAME/terms-products-app)

---



