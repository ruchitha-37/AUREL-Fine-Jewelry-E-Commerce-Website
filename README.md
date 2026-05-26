# AUREL — Fine Jewelry E-Commerce Website

> A premium, handcrafted fine jewelry e-commerce experience built with React.js and Tailwind CSS.

## ✨ Overview

AUREL is a luxury jewelry e-commerce website featuring an immersive shopping experience with 3D product views, interactive configurators, and a refined aesthetic inspired by heritage craftsmanship.

**Assignment ID:** M2M-INT-2026-07 | **Track:** Frontend | **Difficulty:** Intermediate

## 🛠️ Tech Stack

- **React.js** (v18) — Component-based UI architecture
- **Tailwind CSS** (v3) — Utility-first CSS with custom design tokens
- **Vite** (v5) — Fast build tool and development server
- **Context API** — State management for cart functionality

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aurel-jewelry

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
aurel-jewelry/
├── public/
│   └── images/              # Product, category, and hero images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed navbar with scroll effect
│   │   ├── HeroBanner.jsx   # Full-screen hero with animations
│   │   ├── MarqueeBar.jsx   # Scrolling ticker bar
│   │   ├── CategoryGrid.jsx # 4-category grid with hover effects
│   │   ├── ProductGrid.jsx  # Filterable product grid (10 products)
│   │   ├── ProductCard.jsx  # Card with badges & hover overlay
│   │   ├── ProductModal.jsx # 3D view + configuration panel
│   │   ├── CartDrawer.jsx   # Slide-out cart drawer
│   │   └── Footer.jsx       # Brand footer with newsletter
│   ├── context/
│   │   └── CartContext.jsx   # Cart state management
│   ├── data/
│   │   └── products.js      # Product & category data
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & Tailwind
├── tailwind.config.js       # Custom design tokens
├── vite.config.js           # Vite configuration
└── package.json
```

## 🎨 Features

### Homepage
- **Hero Banner** — Full-width cinematic hero with animated text reveals, sparkle effects, and gradient CTAs
- **Marquee Ticker** — Infinite scrolling text strip highlighting brand benefits
- **Category Grid** — 4 categories (Rings, Necklaces, Earrings, Bracelets) with editorial imagery
- **Product Grid** — 10 luxury products with category filtering and staggered reveal animations
- **Footer** — Newsletter subscription, navigation links, social icons, and legal links

### Product Cards
- High-quality product images
- Badge labels (New / Bestseller / Limited / Exclusive)
- Hover overlay revealing "View in 3D" and "Quick Add" buttons
- Product name, type, and price display

### 3D Product View Modal (Key Feature)
- CSS 3D Transform rotation with auto-rotate toggle
- Drag-to-rotate interaction (mouse and touch)
- "360° Interactive View" label
- Dynamic glow effect based on selected metal color
- Full product configuration panel

### Product Configuration (Modal Panel)
| Option | Values | Type |
|--------|--------|------|
| Karat | 14K / 18K / 22K | Button Toggle |
| Diamond Size | 0.25ct / 0.50ct / 0.75ct / 1.00ct | Button Toggle |
| Metal Color | Yellow Gold / Rose Gold / Silver | Color Swatch |
| Add to Cart | Saves product + all selected options | Action Button |

### Cart
- Slide-out drawer with smooth animation
- Product thumbnails with configuration details
- Quantity controls and subtotal calculation

## 🎨 Design System

- **Colors:** Cream, Champagne, Gold, Onyx, Rose Gold
- **Fonts:** Cormorant Garamond (serif) + Inter (sans)
- **Animations:** Scroll-triggered reveals, 3D transforms, shimmer/sparkle effects

## 📱 Responsive Design

Fully responsive across Desktop, Tablet, and Mobile with touch-friendly interactions.

---

*Crafted with precision and passion — AUREL Fine Jewelry*
