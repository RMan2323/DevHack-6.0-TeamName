# IITD Nexus
**"MERN Stack Marketplace & Community Exchange Platform"**
_(Combines marketplace + carpooling through "nexus" concept)_

--------------------------------------------------

🌟 Features  
- 🛍️ Second-hand marketplace  
- ♻️ Item donations system  
- 🚗 Campus carpooling  
- 🔐 User authentication  
- 📋 Listings management  
- 🔔 Real-time notifications  

--------------------------------------------------

🛠️ Installation  

1. Clone repository:  
git clone https://github.com/yourusername/IITD-Nexus.git  
cd IITD-Nexus  

2. Install backend dependencies:  
cd backend  
npm install  

3. Install frontend dependencies:  
cd ../frontend  
npm install  

--------------------------------------------------

📁 Project Structure  

backend/  
├─ config/  # Database configuration
├─ controllers/  # Business logic
├─ models/  # MongoDB schemas
├─ routes/  # API endpoints
├─ middleware/   # Authentication
└─ server.js  # Server entry point

frontend/  
├─ public/  
└─ src/  
   ├─ components/  
   ├─ pages/  
   ├─ utils/  
   └─ App.js  

package-lock.json  # Dependency tree

--------------------------------------------------

⚙️ Environment Setup  

Create these files:  

backend/.env  
MONGO_URI=mongodb://localhost:27017/iitd_nexus  
JWT_SECRET=your_jwt_secret_here  
PORT=5000  

frontend/.env  
REACT_APP_API_URL=http://localhost:5000/api  
REACT_APP_MAP_KEY=your_mapbox_key_here  

--------------------------------------------------

🚀 Running  

Start backend:  
cd backend  
npm run dev  

Start frontend:  
cd ../frontend  
npm start  

--------------------------------------------------

🛠️ Technologies  
Frontend: React, Redux, Material-UI  
Backend: Node.js, Express, MongoDB  
Auth: JWT, bcryptjs  
Maps: Mapbox  

--------------------------------------------------

🤝 Contributing  
1. Create issue  
2. Fork repo  
3. Create branch: git checkout -b feat/your-feature  
4. Commit changes  
5. Open PR  

--------------------------------------------------

📄 License  
MIT License - See LICENSE file  

--------------------------------------------------

⚠️ IMPORTANT:  
1. Replace "yourusername" in GitHub URL  
2. Generate REAL JWT_SECRET (never use placeholder)  
3. Get actual Mapbox API key  
