# ECommerce Frontend Application

A modern, full-featured ecommerce frontend built with React, Redux, and React Router. This application connects to your backend at search-optimizer.onrender.com and Python search service to provide a complete shopping experience.

## Features

### 🔐 Authentication & Authorization
- User registration and login with username-based authentication
- Customer and Admin roles
- Protected routes based on user roles
- **Persistent authentication state** - login persists across browser refreshes
- JWT token validation and automatic logout on token expiry
- Server-side logout functionality

### 🛍️ Shopping Experience
- Browse products from your backend's `get-products` route
- Product detail pages with full information
- Shopping cart with quantity management
- Add to cart functionality for authenticated users

### 👨‍💼 Admin Features
- Admin-only product addition page
- Add new products via your backend's `add-product` route
- Admin badge in navigation
- Role-based UI elements

### 🔍 Search Integration
- Search functionality connected to your Python backend
- Real-time search results display
- Integration with your existing Python search API

### 📱 Modern UI/UX
- Responsive design for all devices
- Modern card-based product layout
- Intuitive navigation and user feedback
- Professional styling with smooth animations

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher)
2. **npm** or **yarn** package manager
3. **Your backend** running at `https://search-optimizer.onrender.com/api/v1`
4. **Your Python search backend** running (for search functionality)

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure backend connections:**
   
   The application is configured to connect to:
   - Your main backend at `https://search-optimizer.onrender.com/api/v1`
   - Your Python search backend at `http://localhost:8000`
   
   If your Python backend runs on a different port, update:
   - `src/store/slices/searchSlice.js` - update the Python backend URL

3. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## Backend Integration

### Required Backend Routes

Your backend should have these routes available:

#### Authentication Routes
- `POST /users/login` - User login (expects `username` and `password`)
- `POST /users/register` - User registration (expects `fullName`, `username`, `email`, `password`, optional `role`)
- `POST /users/logout` - User logout (requires Authorization header)
- `GET /users/me` - Get current user info (optional - app can work without this)

#### Product Routes
- `GET /get-products` - Fetch all products
- `POST /add-product` - Add new product (admin only, requires Authorization header)
- `GET /products/:id` - Get single product details

### Python Search Backend

The search functionality expects your Python backend to have:
- `GET /search?q={query}` - Search endpoint that returns JSON results

Update the URL in `src/store/slices/searchSlice.js` if your Python backend runs on a different port.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx       # Navigation with search
│   ├── ProductCard.jsx  # Product display component
│   ├── ProtectedRoute.jsx # Route protection
│   └── AdminRoute.jsx   # Admin-only route protection
├── pages/               # Page components
│   ├── Home.jsx         # Product listing page
│   ├── Login.jsx        # Login form (username-based)
│   ├── Register.jsx     # Registration form (with username)
│   ├── AddProduct.jsx   # Admin product addition
│   ├── ProductDetails.jsx # Single product view
│   ├── Cart.jsx         # Shopping cart
│   └── SearchResults.jsx # Search results display
├── store/               # Redux store configuration
│   ├── store.js         # Store setup
│   └── slices/          # Redux slices
│       ├── authSlice.js    # Authentication state
│       ├── productSlice.js # Product management
│       ├── cartSlice.js    # Shopping cart
│       └── searchSlice.js  # Search functionality
├── App.js              # Main app component
├── App.css             # Application styles
└── index.js            # App entry point
```

## Key Features Usage

### User Registration
- Users provide full name, username, email, and password
- Users can register as either "Customer" or "Admin"
- Username is used for login instead of email
- Admin users get access to product management features

### User Login & Persistence
- Login requires username and password
- JWT tokens (access & refresh) stored in localStorage for session persistence
- **Authentication state persists across browser refreshes**
- Automatic token validation on app startup
- Automatic logout on token expiry

### User Logout
- Server-side logout via POST request to `/users/logout`
- Clears local storage and redirects to home page
- Handles server errors gracefully

### Product Management
- Admins see an "Add Product" link in the navigation
- Product addition form connects to your `add-product` backend route
- Products display on the home page from your `get-products` route

### Shopping Cart
- Cart persists in localStorage
- Quantity management with + / - controls
- Cart count displayed in navigation
- Only authenticated users can add items

### Search
- Search bar in navigation
- Connects to your Python backend search API
- Results displayed in a dedicated search results page
- Debug mode shows raw JSON in development

## Authentication Persistence

The application now properly handles authentication persistence:

### Token Management
- **Access Token**: Stored in localStorage as `accessToken`
- **Refresh Token**: Stored in localStorage as `refreshToken`
- **Automatic Validation**: Tokens are validated on app startup
- **Expiry Handling**: Expired tokens are automatically cleared

### How It Works
1. User logs in → Tokens stored in localStorage
2. Page refresh → App checks for valid tokens
3. Valid token found → User state restored automatically
4. Invalid/expired token → User logged out automatically

## API Configuration

### Backend API Base URL
The application is configured to use: `https://search-optimizer.onrender.com/api/v1`

To change this, update the `API_BASE_URL` constant in:
- `src/store/slices/authSlice.js`
- `src/store/slices/productSlice.js`

### Authentication
All authenticated requests include the JWT token in the Authorization header:
```
Authorization: Bearer <accessToken>
```

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your web server

3. Ensure your backend at search-optimizer.onrender.com is accessible from your production domain

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend allows requests from the frontend domain

2. **Authentication Not Persisting**: 
   - ✅ **FIXED**: Authentication now persists across refreshes
   - Check browser console for token validation errors

3. **Login Fails**: Verify you're using username (not email) for login

4. **Search Not Working**: Verify your Python backend is running and accessible

5. **Products Not Loading**: Confirm your backend's `get-products` route is working

### Backend Response Formats

The application expects these response formats:

**Login Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "username": "username",
      "email": "user@example.com",
      "fullName": "User Full Name",
      "avatar": "avatar_url",
      "role": "customer", // or "admin"
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "User logged in successfully",
  "success": true
}
```

**Register Response:**
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "user_id",
      "username": "username",
      "email": "user@example.com",
      "fullName": "User Full Name",
      "role": "customer"
    },
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "User registered successfully",
  "success": true
}
```

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your backend routes are working
3. Ensure proper CORS configuration
4. Check network requests in browser dev tools
5. Verify JWT tokens are being sent correctly
6. **Check localStorage** for `accessToken` and `refreshToken`

## License

This project is created for your ecommerce application. Modify and use as needed for your business requirements. 