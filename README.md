# 🍽️ Full Stack Food Delivery App

A complete MERN-based food ordering platform with:

- 🛍️ User frontend to explore menu, add to cart, and place orders
- 🧑‍💼 Admin panel to manage food items and view orders
- 🔧 Backend API with JWT Auth, MongoDB & Cloudinary image uploads


## 📁 Folder Structure

BACKEND/
├── src/
│   ├── controllers/
│   │   ├── cart.controller.js
│   │   ├── food.controller.js
│   │   ├── order.controller.js
│   │   ├── user.controller.js
│   │   └── healthCheck.controller.js
│   │
│   ├── db/
│   │   └── index.js                  # MongoDB connection
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js        # JWT verification
│   │   └── multer.middleware.js      # File upload
│   │
│   ├── models/
│   │   ├── food.model.js
│   │   ├── user.model.js
│   │   └── order.model.js
│   │
│   ├── routes/
│   │   ├── cart.routes.js
│   │   ├── food.routes.js
│   │   ├── order.routes.js
│   │   ├── user.routes.js
│   │   └── healthcheck.route.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   └── cloudinary.js
│   │
│   ├── constants.js
│   └── app.js                        # Express app
│
├── index.js                          # Entry point
├── .env
├── package.json

FRONTEND/
├── public/
│   └── assets/                       # Static files
│
├── src/
│   ├── assets/                       # Local images/icons
│
│   ├── components/
│   │   ├── AppDownload/
│   │   ├── ExploreMenu/
│   │   ├── FoodDisplay/
│   │   ├── FoodItem/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LoginPopUp/
│   │   └── Navbar/
│   │
│   ├── context/
│   │   └── StoreContext.jsx         # Global state
│
│   ├── pages/
│   │   ├── Cart/
│   │   ├── Home/
│   │   ├── MyOrders/
│   │   ├── PlaceOrder/
│   │   └── Verify/
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env                              # VITE_BACKEND_URL
├── vite.config.js
├── package.json
└── README.md


ADMIN/
├── public/
│   └── assets/                       # Static/logo
│
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   └── Sidebar/
│   │
│   ├── pages/
│   │   ├── Add/                     # Add food items
│   │   ├── List/                    # View all foods
│   │   └── Orders/                  # View orders
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env                              # VITE_BACKEND_URL
├── vite.config.js
├── package.json
└── README.md




## ⚙️ Tech Stack

| Layer     | Tech Used                   |
|-----------|-----------------------------|
| Frontend  | React, Vite, Context API    |
| Admin     | React, Vite                 |
| Backend   | Node.js, Express.js         |
| Database  | MongoDB (Mongoose)          |
| Uploads   | Multer + Cloudinary         |
| Auth      | JWT + bcrypt                |


## 🚀 Features

### 👨‍🍳 User
- Register/Login
- Browse menu & categories
- Add to cart, place order
- View my orders

### 🧑‍💼 Admin
- Add/Edit/Delete food items with image upload
- View all orders
- View registered users

### 🔧 Backend
- Modular route/controllers
- MongoDB + Mongoose
- Cloudinary image management
- JWT authentication


## 🧑‍💻 Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/food-delivery-app.git

###2️⃣ Backend Setup

cd BACKEND
npm install
Create a .env file in BACKEND:

# 🌐 App Settings
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:5173        # Frontend URL for CORS

# 🧾 CORS Settings
CORS_ORIGIN=*                           # Use "*" only for development

# 📦 MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/foodapp

# 🔐 JWT Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d                  # e.g., 15m, 1h, 1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# ☁️ Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 💳 Stripe (Optional / Placeholder) 
STRIPE_SECRET_KEY=sk_test_yourStripeKey


Run backend:
npm start


### 3️⃣ User Frontend

cd FRONTEND
npm install
npm run dev


###4️⃣ Admin Panel

cd ADMIN
npm install
npm run dev



---

### ✅ 6. API Documentation

```md
## 📦 API Endpoints

### 🍔 Food
| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| POST   | /api/v1/food/add        | Add food item (admin)  |
| GET    | /api/v1/food/list       | Get all food items     |
| DELETE | /api/v1/food/remove/:id | Delete food + image    |

### 👥 Users
| POST   | /api/v1/users/register  | Register new user      |
| POST   | /api/v1/users/login     | Login                  |

### 📦 Orders
| POST   | /api/v1/orders/place    | Place an order         |
| GET    | /api/v1/orders/user/:id | Get orders for user    |
| GET    | /api/v1/orders/all      | Get all orders (admin) |


✅ 7. Cloudinary Upload
md
Copy code
## 🖼️ Cloudinary Integration
- `multer.middleware.js` saves file locally
- `uploadOnCloudinary(filePath)` uploads to Cloudinary
- Returns `url` & `public_id` for DB storage
- `deleteFromCloudinary(public_id)` removes image if food is deleted

###✅ 8. Sample .env (Frontend)

## 🌐 Vite Frontend `.env`

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
Use this in your axios call:

axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/food/list`)

---

### ✅ 9. Credits & License

```md
## 🙌 Credits

Built with ❤️ by Ravi Kumar Yadav  
Inspired by Swiggy/Zomato food delivery flows.

## 📄 License

This project is licensed under the RKY License.
