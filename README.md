# TravelTrucks – Camper Rental

A React app for renting campers. Includes a catalog with filters, favorites, a details page with reviews, and a booking form.

## Live Demo

https://traveltrucks-camper-rental.vercel.app

## Repository

https://github.com/Suianina/traveltrucks-camper-rental

## Features

- Get campers from API
- Back-end filtering by location, vehicle type, and equipment
- Add campers to favorites (saved in localStorage)
- Load more campers with pagination
- View camper details with photos and specs
- Read reviews with star ratings
- Book camper with form validation
- Price is displayed with two decimals (e.g., €8000.00)
- "Show more" opens the camper details in a new browser tab
- Loader is shown during async requests (data fetching)
- Responsive design
- Meta tags, favicon, OG image for social media

## Tech Stack

- React with Vite
- Redux Toolkit + redux-persist (state + favorites persistence)
- React Router (navigation)
- Axios (API calls)
- CSS Modules (styling)
- React Helmet Async (meta/SEO)
- React Hot Toast (notifications)

## API

Uses mock API: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io

Example request:
GET /campers?page=1&limit=4&location=Kyiv&form=van&AC=true&kitchen=true

text

When filters change, previous results are reset (resetCampers()) and fetching restarts from page=1.

## Routes

- `/` — Home
- `/catalog` — Catalog
- `/catalog/:id` — Camper Details

## Pages

- Home page with hero banner and "View Now" button
- Catalog page with filters and camper cards
- Details page with gallery, features, reviews, and booking form

## Installation & Setup

Requires Node.js 16+ and npm.

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   Create a .env file:
   ```

text
VITE_API_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
Start the development server:

bash
npm run dev
Build & Preview
bash
npm run build
npm run preview
Deploy
Deployed on Vercel. Connect GitHub repo and set env variable VITE_API_URL.

Build Command: npm run build

Output Directory: dist

Project Structure
text
TravelTrucks – Camper Rental/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page components
│ ├── redux/ # State management
│ ├── services/ # API services
│ ├── styles/ # Global styles
│ ├── App.jsx # Main app component
│ └── main.jsx # App entry point
├── .env # Environment variables
└── README.md # Project documentation
Author
Suianina
