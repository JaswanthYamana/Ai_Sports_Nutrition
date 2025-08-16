# 🚀 SportsPro Setup Guide

This guide will walk you through setting up the complete SportsPro full-stack application.

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager (recommended) or npm
- MongoDB Atlas account
- Gmail account (for email service)
- Git (for version control)

## 🔧 Step-by-Step Setup

### 1. Environment Configuration

First, create your environment file:

```bash
# Copy the example environment file
cp env.example .env
```

Edit the `.env` file with your actual credentials:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/sportspro?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 2. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com](https://mongodb.com)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose "Free" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Update `MONGODB_URI` in your `.env` file

### 3. Gmail Setup (for Email Service)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Security → 2-Step Verification → Turn it on

2. **Generate App Password**
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "SportsPro"
   - Copy the generated 16-character password
   - Use this password in `EMAIL_PASS` in your `.env` file

### 4. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
pnpm install
```

### 5. Start the Application

#### Option A: Start Both Frontend and Backend Together
```bash
# This will start both servers concurrently
pnpm run dev:full
```

#### Option B: Start Servers Separately
```bash
# Terminal 1: Start backend server
pnpm run server:dev

# Terminal 2: Start frontend development server
pnpm run dev
```

#### Option C: Use the Start Script
```bash
# Make the script executable (first time only)
chmod +x start-server.sh

# Start the backend server
./start-server.sh
```

### 6. Test the Backend

```bash
# Test the backend API endpoints
node test-backend.js
```

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health-check

## 📱 Test the Application

1. **Open your browser** and go to http://localhost:3000
2. **Click "Sign Up"** to create a new account
3. **Verify your email** (check your Gmail)
4. **Log in** and explore the features

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution**: 
- Check your `MONGODB_URI` in `.env`
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure your cluster is running

#### 2. Email Service Not Working
```
❌ Error sending verification email: Invalid login
```
**Solution**:
- Verify your Gmail credentials in `.env`
- Ensure 2FA is enabled and app password is correct
- Check that `EMAIL_USER` is your full Gmail address

#### 3. Port Already in Use
```
❌ Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Find and kill the process using port 5001
lsof -ti:5000 | xargs kill -9

# Or change the port in .env
PORT=5001
```

#### 4. Frontend Can't Connect to Backend
```
❌ AxiosError: Network Error
```
**Solution**:
- Ensure backend server is running on port 5001
- Check CORS configuration in `server/index.js`
- Verify `FRONTEND_URL` in `.env` matches your frontend URL

### Database Issues

#### Reset Database
If you need to start fresh:

1. **Drop the database in MongoDB Atlas**:
   - Go to your cluster
   - Click "Browse Collections"
   - Click the trash icon next to your database

2. **Or clear specific collections**:
   ```javascript
   // In MongoDB Atlas shell
   use sportspro
   db.users.drop()
   db.workouts.drop()
   db.nutritionlogs.drop()
   ```

## 🚀 Production Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend (Railway/Heroku)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy the `server/` directory

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
FRONTEND_URL=https://your-frontend-domain.com
```

## 📊 Monitoring & Logs

### Backend Logs
The server provides detailed logging:
- ✅ Connection status
- 🔌 Socket.IO connections
- 📧 Email service status
- 🚨 Error logs

### Health Check
Monitor your backend health:
```bash
curl http://localhost:5000/api/health-check
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents abuse
- **CORS Protection**: Controlled cross-origin requests
- **Input Validation**: Mongoose schema validation
- **Helmet**: Security headers

## 📈 Performance Features

- **MongoDB Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections
- **Real-time Updates**: Socket.IO for live data
- **Caching Ready**: Redis integration ready

## 🎯 Next Steps

After successful setup:

1. **Explore the API**: Test all endpoints
2. **Customize the UI**: Modify components in `components/`
3. **Add Features**: Extend models and routes
4. **Deploy**: Move to production
5. **Monitor**: Set up logging and monitoring

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** in your terminal
2. **Verify environment variables** in `.env`
3. **Test individual components** using the test script
4. **Check MongoDB Atlas** connection status
5. **Review the README.md** for additional information

---

**🎉 Congratulations!** You now have a fully functional full-stack fitness application running locally.

**🏃‍♂️ Ready to start your fitness journey with SportsPro!** 