# IITD Nexus
**"MERN Stack Marketplace & Community Exchange Platform"**
_(Combines marketplace + carpooling through "nexus" concept)_

---

## 🌟 Features
- Second-hand marketplace for students
- Free item donations system
- Campus carpool coordination
- User authentication & profiles
- Product/Ride listings management
- Real-time notifications

---

## 🛠️ Installation

1. **Clone repository**  
git clone https://github.com/yourusername/IITD-Nexus.git
cd IITD-Nexus


2. **Install dependencies**  
Backend dependencies
cd backend
npm install
Frontend dependencies
cd ../frontend
npm install


---

## 📁 Project Structure
.
├── backend/
│ ├── config/ # Database configuration
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Authentication
│ └── server.js # Server entry point
│
├── frontend/
│ ├── public/ # Static assets
│ └── src/
│ ├── components/ # Reusable UI elements
│ ├── pages/ # Route components
│ ├── utils/ # API helpers
│ └── App.js # Root component
│
├── package-lock.json # Dependency tree

---

## ⚙️ Environment Setup

**backend/.env**  
MONGO_URI=mongodb://localhost:27017/iitd_nexus
JWT_SECRET=your_jwt_secret_here
PORT=5000

**frontend/.env**  
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAP_KEY=your_mapbox_key_here

---

## 🚀 Running the Project

**Start Backend Server**  
cd backend
npm run dev

**Start Frontend Development Server**  
cd frontend
npm start

---

## 🛠️ Tech Stack

| Component       | Technologies                         |
|-----------------|--------------------------------------|
| Frontend        | React, Redux, Material-UI, Axios     |
| Backend         | Node.js, Express, MongoDB, Mongoose |
| Authentication  | JWT, bcryptjs                        |
| Maps            | Mapbox GL JS                         |
| Testing         | Jest, React Testing Library          |

---

## 🤝 Contributing

1. Create an issue describing your proposed changes
2. Fork the repository
3. Create your feature branch:
git checkout -b feat/your-feature
4. Commit changes following existing code style
5. Push to the branch:
git push origin feat/your-feature
6. Open a pull request with detailed description

---

## 📄 License  
Distributed under the MIT License.

---

> **Note:** Replace all placeholder values (yourusername, your_jwt_secret_here, etc.) with actual credentials before use.  
> *Last Updated: February 2025*
