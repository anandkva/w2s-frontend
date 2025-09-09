
# W2S Solutions

**Supercharging growth with technology and compelling brand experiences**

W2S Solutions is a modern web application built with React and Vite, designed to provide technology consulting services with an intuitive user experience.

## Features

-   **Modern Authentication System** - Secure login/register with OTP verification
-   **Responsive Dashboard** - Clean, professional user interface
-   **Split-screen Design** - Engaging login and registration pages
-   **Profile Management** - Update user information and email
-   **Real-time Notifications** - Alert system for user feedback
-   **Mobile-first Design** - Optimized for all screen sizes

## Tech Stack

-   **Frontend**: React 18 + Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **HTTP Client**: Axios
-   **Routing**: React Router DOM
-   **State Management**: React Context API

## Prerequisites

Before running this project, make sure you have:

-   Node.js (v18 or higher)
-   npm or yarn package manager
-   Backend API server running

## Installation

1.  Clone the repository:

```bash
git clone https://github.com/anandkva/w2s-frontend
cd w2s-solutions

```

2.  Install dependencies:

```bash
npm install

```

3.  Create environment file:

```bash
cp .env.example .env

```

4.  Update environment variables in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=W2S Solutions

```

5.  Start the development server:

```bash
npm run dev

```

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client:

Variable

Description

Default

`VITE_API_BASE_URL`

Backend API base URL

`http://localhost:8080/api`

`VITE_APP_NAME`

Application name

`W2S Solutions`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # Split-screen login page
│   │   ├── Register.jsx       # Split-screen registration page
│   │   └── Dashboard.jsx      # User dashboard
│   └── ui/
│       ├── Button.jsx         # Reusable button component
│       ├── Input.jsx          # Form input component
│       └── Alert.jsx          # Notification component
├── context/
│   └── AuthContext.jsx        # Authentication state management
├── services/
│   ├── api.js                 # Axios configuration
│   ├── auth_api.js            # Authentication API calls
│   └── user_api.js            # User management API calls
└── App.jsx                    # Main application component

```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

```

## API Integration

The application connects to a REST API with the following endpoints:

### Authentication

-   `POST /auth/login` - User login
-   `POST /auth/register` - User registration
-   `POST /auth/verify-otp` - OTP verification

### User Management

-   `GET /user/profile` - Get user profile
-   `PUT /user/profile` - Update profile
-   `PUT /user/email` - Update email

## Features Overview

### Authentication Flow

1.  **Registration** - Users sign up with name and email
2.  **OTP Verification** - Email verification via OTP
3.  **Login** - Secure login with JWT tokens
4.  **Dashboard Access** - Protected routes for authenticated users

### User Interface

-   **Modern Design** - Clean, professional appearance
-   **Split-screen Layout** - Engaging login/register pages
-   **Responsive Design** - Works on desktop, tablet, and mobile
-   **Loading States** - Visual feedback during API calls
-   **Error Handling** - User-friendly error messages

## Deployment

### Build for Production

```bash
npm run build

```

### Deploy to Vercel/Netlify

1.  Connect your repository
2.  Set environment variables in deployment platform
3.  Deploy from main branch

### Environment-specific Builds

-   Development: Uses `.env.development`
-   Production: Uses `.env.production`

## Contributing

1.  Fork the repository
2.  Create a feature branch: `git checkout -b feature/new-feature`
3.  Commit changes: `git commit -m "Add new feature"`
4.  Push to branch: `git push origin feature/new-feature`
5.  Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

-   Email: support@w2ssolutions.com
-   Documentation: [API Docs](https://claude.ai/chat/your-api-docs-url)
-   Issues: [GitHub Issues](https://claude.ai/chat/your-repo-url/issues)

## Acknowledgments

-   Built with React and Vite
-   Icons by Lucide
-   Styling with Tailwind CSS
-   Authentication flow inspired by modern web standards

----------

**W2S Solutions** - Task.
