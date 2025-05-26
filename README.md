Terms & Products Mini App
This is a React + Node.js + PostgreSQL application containing two fully responsive pages:


Terms Page: Displays Terms and Conditions in English and Swedish. Includes a responsive layout and working hamburger menu.

Products Page: Editable table with product data, fully responsive for desktop, tablet, and mobile devices.



📦 Tech Stack



Layer
Stack




Frontend
React + Vite


Styling
Plain CSS


Routing
React Router DOM v6


Backend
Node.js + Express


Database
PostgreSQL


ORM
Sequelize





🔧 Setup Instructions

1. Clone the repository

git clone https://gitlab.com/YOUR_USERNAME/terms-products-app.git
cd terms-products-app



2. Install dependencies

npm install
cd client
npm install



3. Create .env file
Create a .env file in the root directory based on the provided .env.example:

PORT=5000
DB_NAME=sowdb
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_DIALECT=postgres



4. Start the app

Start Backend:

npm start



Start Frontend:

cd client
npm run dev




🌐 Routes


/ – Terms and Conditions (responsive with language switch and hamburger menu)

/products – Editable Product List (mobile/tablet/desktop friendly)
