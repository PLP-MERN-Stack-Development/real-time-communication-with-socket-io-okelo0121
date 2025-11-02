# Real-Time Communication with Socket.io

## 🚀 Project Overview

This is a real-time chat application built using Socket.io for bidirectional communication between clients and server. The application demonstrates live messaging, notifications, and online status updates, providing a seamless chat experience.

## 📋 Features Implemented

### Core Chat Functionality
- ✅ User authentication (username-based)
- ✅ Global chat room for all users
- ✅ Real-time message display with sender's name and timestamp
- ✅ Typing indicators
- ✅ Online/offline status for users

### Advanced Chat Features
- ✅ Private messaging between users
- ✅ Multiple chat rooms/channels
- ✅ "User is typing" indicator
- ✅ Message reactions (like, love, etc.)
- ✅ Read receipts for messages

### Real-Time Notifications
- ✅ Notifications for new messages
- ✅ Join/leave notifications for chat rooms
- ✅ Unread message count
- ✅ Browser notifications (Web Notifications API)

### Performance & UX
- ✅ Message pagination for loading older messages
- ✅ Reconnection logic for handling disconnections
- ✅ Socket.io optimization using namespaces and rooms
- ✅ Message delivery acknowledgment
- ✅ Responsive design for desktop and mobile

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Socket.io
- **Database**: Supabase (for user management and message persistence)
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd real-time-communication-with-socket-io
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Return to root directory**
   ```bash
   cd ..
   ```

### Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure Supabase**
   - Set up your Supabase project
   - Add your Supabase URL and anon key to `.env`

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser**
   - Client will be running on `http://localhost:5173`
   - Server will be running on `http://localhost:3000`

## 🚀 Available Scripts

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── socket/        # Socket.io client setup
├── server/                 # Node.js backend
│   └── server.js          # Main server file
├── public/                 # Static assets
└── src/                   # Shared utilities (if any)
```

## 🔧 Configuration

### Socket.io Configuration
- Server: Configured with CORS for cross-origin requests
- Client: Auto-reconnection enabled with exponential backoff

### Supabase Integration
- User authentication and session management
- Message persistence and real-time subscriptions

## 🌐 Deployment

### Client Deployment
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag & drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Server Deployment
- **Render**: Free tier available for Node.js apps
- **Railway**: Modern deployment platform with built-in databases
- **Heroku**: Traditional PaaS with easy scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Note**: This project was built as part of Week 5 assignment for the PLP MERN stack course, demonstrating real-time communication concepts using Socket.io.
