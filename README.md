# ECommerce Frontend Application

A modern, full-featured ecommerce frontend built with React, Redux, and React Router. This application provides a complete shopping experience with user authentication, product management, and search functionality.

## Features

### 🔐 Authentication & Authorization
- User registration and login with username-based authentication
- Customer and Admin roles with role-based access control
- Protected routes based on user roles
- Persistent authentication state across browser refreshes
- JWT token validation and automatic logout on token expiry
- Server-side logout functionality

### 🛍️ Shopping Experience
- Browse products with modern card-based layout
- Product detail pages with full information
- Shopping cart with quantity management
- Add to cart functionality for authenticated users
- Responsive design for all devices

### 👨‍💼 Admin Features
- Admin-only product addition page
- Add new products through protected admin routes
- Admin badge in navigation
- Role-based UI elements and access controls

### 🔍 Search Integration
- Real-time search functionality
- Search results display with modern UI
- Integration with backend search API

### 📱 Modern UI/UX
- Responsive design optimized for all devices
- Professional styling with smooth animations
- Intuitive navigation and user feedback
- Modern card-based product layout

## Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **State Management**: Redux Toolkit for efficient state management
- **Routing**: React Router for client-side navigation
- **Styling**: CSS3 with modern responsive design
- **HTTP Client**: Axios for API communication
- **Authentication**: JWT token-based authentication

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx       # Navigation with search and user menu
│   ├── ProductCard.jsx  # Product display component
│   ├── ProtectedRoute.jsx # Route protection for authenticated users
│   └── AdminRoute.jsx   # Admin-only route protection
├── pages/               # Page components
│   ├── Home.jsx         # Product listing homepage
│   ├── Login.jsx        # User login form
│   ├── Register.jsx     # User registration form
│   ├── AddProduct.jsx   # Admin product addition page
│   ├── ProductDetails.jsx # Single product view
│   ├── Cart.jsx         # Shopping cart page
│   └── SearchResults.jsx # Search results display
├── store/               # Redux store configuration
│   ├── store.js         # Main store setup
│   └── slices/          # Redux slices
│       ├── authSlice.js    # Authentication state management
│       ├── productSlice.js # Product management
│       ├── cartSlice.js    # Shopping cart state
│       └── searchSlice.js  # Search functionality
├── utils/               # Utility functions
│   └── categoryImages.js  # Category image mappings
├── App.js              # Main app component with routing
├── App.css             # Global application styles
└── index.js            # Application entry point
```

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/axhatggg/ecom-front.git
   cd ecom-front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (use with caution)
npm run eject
```

## Key Features

### User Authentication
- Secure username/password based login system
- User registration with role selection (Customer/Admin)
- Persistent login state using localStorage
- Automatic token refresh and validation
- Secure logout with server-side token invalidation

### Product Management
- Dynamic product listing from backend API
- Detailed product pages with images and descriptions
- Admin product addition with form validation
- Category-based product organization

### Shopping Cart
- Add/remove products with quantity controls
- Cart persistence across browser sessions
- Real-time cart count in navigation
- Secure cart management for authenticated users

### Search Functionality
- Real-time product search
- Search results with highlighted matches
- Integration with backend search API
- Responsive search interface

## Environment Configuration

The application can be configured for different environments by updating the API base URLs in the Redux slices:

- **Authentication API**: Update `API_BASE_URL` in `src/store/slices/authSlice.js`
- **Product API**: Update `API_BASE_URL` in `src/store/slices/productSlice.js`
- **Search API**: Update search endpoint in `src/store/slices/searchSlice.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please open an issue in the GitHub repository.
