# Auction House 🏠
Welcome to Auction House, a fully responsive auction platform that allows users to create, browse, and bid on auction listings. This project was developed using modern tools and practices to ensure performance, usability, and clean code.
# 🔗 Live Demo
Explore the live project here:
👉 https://auctionhousing.netlify.app/
# 📂 Project Structure
Here's an overview of the folder and file organization:
```
 Auction-House/
│
├── public/                     # Public assets
│   └── assets/                 # Images, icons, and other static assets
├── src/
│   ├── api/                    # API calls and endpoints
│   │   ├── auctions.js         # Auction API logic
│   │   ├── auth.js             # Authentication logic
│   │   ├── constants.js        # API base and endpoints
│   │   ├── headers.js          # Headers configuration
│   │   └── profiles.js         # User profile-related API logic
│   │
│   ├── assets/                 # Additional assets
│   │
│   ├── components/             # Reusable UI components
│   │   ├── auctionCard.js      # Auction card generator
│   │   ├── footer.js           # Footer component
│   │   ├── header.js           # Navigation bar
│   │   └── modal.js            # Reusable modal component
│   │
│   ├── modules/                # Core modules
│   │   ├── auction.js          # Auction functionalities
│   │   ├── auth.js             # User authentication handling
│   │   ├── profile.js          # Profile functionalities
│   │   └── utils.js            # Utility functions
│   │
│   ├── pages/                  # HTML pages
│   │   ├── auction.html        # Auction listings page
│   │   ├── create-listing.html # Create new auction page
│   │   ├── login.html          # Login page
│   │   ├── my-auction.html     # My auctions page
│   │   ├── profile.html        # User profile page
│   │   └── register.html       # Register page
│   │
│   ├── scripts/                # Page-specific scripts
│   │   ├── auction.js          # Auction page logic
│   │   ├── createListing.js    # Script for creating new auctions
│   │   ├── login.js            # Login script
│   │   ├── main.js             # Main entry script
│   │   ├── profile.js          # Profile management
│   │   ├── register.js         # User registration logic
│   │   └── userListings.js     # Manage user listings
│   │
│   └── styles/                 # Styling
│       ├── components/         # Component-specific CSS
│       └── main.css            # Global CSS file
│
├── .env                        # Environment variables
├── index.html                  # Main entry point
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration for bundling
├── package.json                # Project dependencies
├── README.md                   # This README file
└── LICENSE                     # License file
```
# 🛠️ Technologies Used
Frontend:

HTML5, CSS3
Tailwind CSS
JavaScript (ES6+)
Tools:

Vite
PostCSS
Netlify
API:
Noroff API (v2)

# 🚀 Features
### User Authentication:
Register and log in.

### Listings Management:
- Create new auction listings.
- Update and delete existing listings.
S- earch and Browse:

### Search for auctions by title or seller.
- Browse different sections like "New Listings," "Ending Soon," "Popular," etc.

### Bid Functionality:
- Place bids on auctions.
- View the highest bids and bidding history.
- User Profile:

Update user avatars and manage profile details.
Responsive Design:

Mobile-first design that adapts to all screen sizes.

# 📦 Setup & Installation
To run the project locally, follow these steps:
1. Clone the Repository
```bash
git clone
https://github.com/marroe01284/Auction-house.git
```
```bash
cd auction-house
```
2. Install Dependencies
Make sure you have Node.js installed. Then run:

```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add your API keys:

```bash
VITE_API_BASE=https://v2.api.noroff.dev
VITE_API_KEY=your-api-key
```
### 4. Run the Development Server
```bash
npm run dev
```
The project will start at http://localhost:5173.

### 5. Build for Production
To create an optimized production build, run:

```bash
npm run build
```
# 🌐 Deployment
The project is deployed on Netlify. Any updates pushed to the main branch are automatically deployed.

# 🧪 Testing
- WCAG Compliance
- All components follow accessibility guidelines.
- Icons and images have appropriate alt attributes.
- Responsive layouts adapt seamlessly to small and large screens.
- Lighthouse Audit
- Optimized for performance, SEO, and accessibility.

# 🧩 Key Functional Components
- Navigation Bar: Located in components/header.js, it's reusable and includes dynamic avatars.
- Auction Card: Generated dynamically in components/auctionCard.js.
- Modal: A reusable modal component for displaying details, located in components/modal.js.
- Profile Management: Handles user avatars, listings, and credits.

# 👤 User Guide
Sign Up or Log In:
Visit the login or registration page to get started.

Create Listings:
Navigate to "Create Listing" and fill out the required fields.

Bid on Items:
Browse auctions, place bids, and win listings.

Manage Auctions:
Visit "My Auctions" to update or delete your listings.

Profile Settings:
Edit your profile, upload an avatar, and view your bidding history.


# 🤝 Contributing
Feel free to fork the repository and submit a pull request. Contributions are welcome!

Fork the project.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m "Add a new feature").
- Push to the branch (git push origin feature/your-feature).
- Open a pull request.
