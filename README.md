# SportsPro - Full Stack Fitness Application

A comprehensive sports and fitness platform built with Next.js, React, Node.js, Express, and MongoDB Atlas.

## 🚀 Features

### Frontend (Next.js + React)
- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Socket.IO integration for live notifications
- **Authentication**: JWT-based authentication with email verification
- **Dark/Light Mode**: Theme switching with next-themes
- **Progressive Web App**: PWA capabilities for mobile experience

### Backend (Node.js + Express)
- **RESTful API**: Complete REST API with proper error handling
- **MongoDB Integration**: MongoDB Atlas for data persistence
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email Service**: Nodemailer integration for verification and notifications
- **Real-time Communication**: Socket.IO for live updates
- **Security**: Helmet, CORS, rate limiting, and input validation
- **File Upload**: Multer for handling file uploads

### Core Features
- **User Management**: Registration, login, profile management
- **Health Tracking**: Vital signs, sleep monitoring, weight tracking
- **Workout Management**: Exercise logging, progress tracking
- **Nutrition Tracking**: Food logging, meal planning, water intake
- **Progress Analytics**: Charts and statistics for fitness goals
- **Community Features**: Social feed, groups, achievements
- **Equipment Guide**: Gear recommendations and reviews
- **Events & Opportunities**: Local sports events and competitions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Authentication**: JWT + bcryptjs
- **Email**: Nodemailer
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS, rate limiting
- **File Upload**: Multer

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- MongoDB Atlas account
- Gmail account (for email service)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hackathon1
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example environment file
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/sportspro?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and update `MONGODB_URI` in `.env`
5. Add your IP address to the IP whitelist

### 5. Gmail Setup (for Email Service)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### 6. Start the Application

#### Development Mode (Frontend + Backend)
```bash
# Start both frontend and backend concurrently
npm run dev:full
```

#### Separate Development Servers
```bash
# Terminal 1: Start backend server
npm run server:dev

# Terminal 2: Start frontend development server
npm run dev
```

#### Production Build
```bash
# Build the frontend
npm run build

# Start production server
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password

### Health & Fitness
- `GET /api/health/vitals/:userId` - Get vital signs
- `POST /api/health/vitals` - Log vital signs
- `GET /api/health/sleep/:userId` - Get sleep logs
- `POST /api/health/sleep` - Log sleep data
- `GET /api/health/dashboard/:userId` - Get health dashboard

### Workouts
- `GET /api/workouts/:userId` - Get user workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `POST /api/workouts/:id/start` - Start workout
- `POST /api/workouts/:id/complete` - Complete workout

### Nutrition
- `GET /api/nutrition/logs/:userId` - Get nutrition logs
- `POST /api/nutrition/logs` - Log food intake
- `GET /api/nutrition/goals/:userId` - Get nutrition goals
- `PUT /api/nutrition/goals/:userId` - Update nutrition goals
- `GET /api/nutrition/daily/:userId` - Get daily summary
- `POST /api/nutrition/water` - Log water intake

### Community & Events
- `GET /api/community/groups` - Get community groups
- `GET /api/community/feed` - Get community feed
- `GET /api/events` - Get events
- `POST /api/events/:id/join` - Join event

### Equipment & Search
- `GET /api/equipment` - Get equipment list
- `GET /api/equipment/recommendations/:userId` - Get recommendations
- `GET /api/search` - Global search

## 📱 Frontend Pages

- `/` - Home/Landing page
- `/login` - User login
- `/signup` - User registration
- `/onboarding` - New user setup
- `/dashboard` - Main dashboard
- `/health` - Health monitoring
- `/nutrition` - Nutrition tracking
- `/workout` - Workout management
- `/progress` - Progress tracking
- `/equipment` - Equipment guide
- `/events` - Events & competitions
- `/community` - Community features
- `/profile` - User profile
- `/search` - Global search

## 🔧 Development

### Project Structure
```
hackathon1/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── health/           # Health-related components
│   ├── nutrition/        # Nutrition components
│   └── ...
├── contexts/             # React contexts
├── lib/                  # Utility functions
├── server/               # Backend server
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── utils/            # Server utilities
├── public/               # Static assets
└── ...
```

### Adding New Features

1. **Backend API**:
   - Create model in `server/models/`
   - Create routes in `server/routes/`
   - Add route to `server/index.js`

2. **Frontend**:
   - Create page in `app/`
   - Create components in `components/`
   - Add API calls in `lib/api.ts`

### Database Models

The application includes comprehensive MongoDB models:
- **User**: User profiles and authentication
- **Workout**: Exercise and workout tracking
- **Nutrition**: Food logging and nutrition data
- **Health**: Vital signs and health monitoring
- **Progress**: Achievement and progress tracking

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Heroku)
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics and AI insights
- [ ] Integration with fitness devices
- [ ] Social features and challenges
- [ ] Premium subscription features
- [ ] Multi-language support
- [ ] Advanced workout planning
- [ ] Nutrition AI recommendations

---

**SportsPro** - Your ultimate sports and fitness companion! 🏃‍♂️💪 