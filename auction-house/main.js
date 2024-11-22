// src/
// │
// ├── assets/            # Static assets (images, icons, fonts, etc.)
// │   ├── images/
// │   ├── icons/
// │   └── fonts/
// │
// ├── styles/            # Tailwind styles and global CSS
// │   ├── main.css       # Main Tailwind entry point
// │   └── components/    # Optional component-specific styles
// │       └── button.css
// │
// ├── api/               # API configurations and functions
// │   ├── constants.js   # API URLs, keys, etc.
// │   ├── auth.js        # Authentication API calls
// │   ├── auctions.js    # Auction-related API calls
// │   └── profiles.js    # Profile-related API calls
// │
// ├── modules/           # JavaScript modules for functionality
// │   ├── auth.js        # Login, register, logout functions
// │   ├── auction.js     # Functions for creating/viewing auctions
// │   ├── profile.js     # Profile-related logic
// │   └── utils.js       # Utility functions (e.g., formatDate, handleErrors)
// │
// ├── components/        # Reusable UI components in vanilla JS
// │   ├── Header.js      # Dynamic header logic
// │   ├── Footer.js      # Footer logic
// │   ├── AuctionCard.js # Logic for auction cards
// │   ├── ProfileCard.js # Profile card logic
// │   └── Modal.js       # Modal popup logic
// │
// ├── pages/             # HTML pages
// │   ├── index.html     # Homepage
// │   ├── login.html     # Login page
// │   ├── register.html  # Register page
// │   ├── profile.html   # Profile page
// │   └── auction.html   # Auction detail page
// │
// ├── scripts/           # Scripts for each page
// │   ├── main.js        # Entry point (initializes everything)
// │   ├── login.js       # Login page logic
// │   ├── register.js    # Registration page logic
// │   ├── profile.js     # Profile page logic
// │   └── auction.js     # Auction detail page logic
// │
// ├── index.html         # Main HTML entry point (Vite uses this)
// └── package.json       # Dependencies and scripts