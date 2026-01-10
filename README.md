# Remi Oseni Foundation Website

A modern, responsive **Next.js** website for the **Remi Oseni Foundation for Better Life and Youth Empowerment (ROFBL)**. The platform showcases the foundation’s mission, impact, programs, and provides access to authentication and engagement pages.

---

## Overview

This project is a client-side rendered homepage built with **Next.js App Router**, **Tailwind CSS**, and **Framer Motion** for smooth animations. It highlights the foundation’s humanitarian work, food support programs, testimonials, and core values.

---

## Features

* Modern responsive UI with Tailwind CSS
* Animated sections using Framer Motion
* Optimized images with Next.js Image
* Client-side navigation with App Router
* Clear call-to-action for Login and Signup
* Structured sections: Hero, Impact, Programs, Testimonials, Core Values, Footer

---

## Tech Stack

* **Framework:** Next.js (App Router, Full Stack)
* **Language:** JavaScript / React
* **Frontend:** React Server & Client Components
* **Backend:** Next.js Route Handlers (`route.js`)
* **Authentication:** Custom API routes under `/api/auth`
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Images:** next/image

---

## Project Structure

```
project-root/
├── src/
│   └── app/
│       ├── page.js                 # Home page
│       ├── layout.js               # Root layout
│       ├── login/
│       ├── signup/
│       ├── about/
│       ├── eligibility/
│       ├── contact/
│       ├── location/
│       └── api/
│           └── auth/
│               └── xxx/
│                   └── route.js    # Auth API (full-stack)
├── public/
│   └── images & assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/remi-oseni-foundation.git
cd remi-oseni-foundation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Navigation

The homepage uses **Next.js client-side routing**:

* `/login` – Login page
* `/signup` – Signup page
* `/about` – About the foundation
* `/eligibility` – Eligibility information
* `/contact` – Contact page
* `/location` – Foundation locations

Navigation is handled with `useRouter` from `next/navigation`.

---

## Animations

Framer Motion is used for:

* Section fade-in and slide-up effects
* Smooth viewport-based animations

Animation variants are defined once and reused across sections for consistency.

---

## Images & Assets

All static images are stored in the `public/` directory and rendered using `next/image` for performance and optimization.

---

## Future Improvements

* Admin dashboard for content management
* Donation and payment integration
* Authentication and user roles
* CMS or backend integration
* Multi-language support

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Emmanuel**
Built for Remi Oseni Foundation using Next.js, Tailwind CSS, and Framer Motion.
