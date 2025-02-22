# IITDH Nexus
**"MERN Stack Marketplace & Community Exchange Platform"**<br>
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
```
git clone https://github.com/RMan2323/DevHack-6.0-TeamName.git
cd DevHack-6.0-TeamName.git  
```
2. Install backend dependencies:  
```
cd backend  
npm install  
```
3. Install frontend dependencies:  
```
cd ../frontend  
npm install  
```
--------------------------------------------------

📁 Project Structure  
```
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
```
--------------------------------------------------

⚙️ Environment Setup  

Create these files:  

backend/.env  
```
MONGO_URI=mongodb://localhost:27017/iitd_nexus  
JWT_SECRET=your_jwt_secret_here  
PORT=5000  
```
frontend/.env  
```
REACT_APP_API_URL=http://localhost:5000/api  
REACT_APP_MAP_KEY=your_mapbox_key_here  
```
--------------------------------------------------

🚀 Running  

Start backend:  
```
cd backend  
npm start 
```
Start frontend:  
```
cd ../frontend  
npm start  
```
--------------------------------------------------

🛠️ Technologies  
Frontend: React
Backend: Node.js, Express, MongoDB  
Auth: JWT,  
Maps: Gomaps  

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
2. Generate REAL_JWT_SECRET (never use placeholder)  
3. Get actual Mapbox API key  
