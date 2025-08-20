# TravelTrucks – Camper Rental

A React app for renting campers. Includes a catalog with filters, favorites, a details page with reviews, and a booking form.

## Live Demo

https://traveltrucks-camper-rental.vercel.app

## Repository

https://github.com/Suianina/traveltrucks-camper-rental

## What I used

- React with Vite
- **Redux Toolkit + redux-persist** (state + favorites persistence)
- React Router (navigation)
- Axios (API calls)
- CSS Modules (styling)
- React Helmet Async (meta/SEO)
- React Hot Toast (notifications)

## Routes

- `/` — Home
- `/catalog` — Catalog
- `/catalog/:id` — Camper Details

## Pages

- Home page with hero banner and “View Now” button
- Catalog page with filters and camper cards
- Details page with gallery, features, reviews, and booking form

## Features

- Get campers from API
- **Back-end filtering** by location, vehicle type, and equipment
- Add campers to favorites (saved in localStorage)
- Load more campers with pagination
- View camper details with photos and specs
- Read reviews with star ratings
- Book camper with form validation
- **Price is displayed with two decimals (e.g., €8000.00)**
- **“Show more” opens the camper details in a new browser tab**
- **Loader is shown during async requests (data fetching)**
- Responsive design
- Meta tags, favicon, OG image for social media

## API

Uses mock API: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io

**Example request:**

```http
GET /campers?page=1&limit=4&location=Kyiv&form=van&AC=true&kitchen=true
When filters change, previous results are reset (resetCampers()) and fetching restarts from page=1.


Installation & Setup
Requires Node.js 16+ and npm.

npm install
npm run dev
Build & Preview

npm run build
npm run preview


Environment variables
Create a .env file:
VITE_API_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io

Project Structure:

public/
  favicon.ico, favicon.svg, apple-touch-icon.png, site.webmanifest, og-cover.jpg
  icons/sprite.svg
src/
  components/ (Header, CamperCard, RatingStars, BookForm, Icon, Loader, ...)
  pages/ (Home, Catalog, CamperDetails)
  redux/ (store, campersSlice, filtersSlice, favoritesSlice)
  services/ (campersAPI.js)
  styles/ (global.css)
  App.jsx, main.jsx


Deploy
Deployed on Vercel. Connect GitHub repo and set env variable VITE_API_URL.

Build Command: npm run build

Output Directory: dist


Author
Suianina
```
