# 🏆 SportNest - Sports Facility Booking Platform (Client)

![SportNest Banner](public/Banner.jpeg)

**SportNest** is a modern, responsive web application designed for sports enthusiasts to discover, search, filter, and reserve sports facilities online. The platform also empowers venue owners to list, manage, and update their sports facilities seamlessly while providing a sleek, accessible user experience.

---

## ✨ Key Features

- **🔒 Secure Authentication & User Management**
  - Powered by **Better Auth** with MongoDB adapter.
  - Supports Email/Password authentication and **Google OAuth** Sign-In.
  - Protected client & API routes with persistent user sessions.

- **🏟️ Facility Discovery & Filtering**
  - Explore featured and all available sports facilities.
  - Real-time search by facility name.
  - Category filtering by sport type (Football, Basketball, Swimming, Tennis, etc.).

- **📅 Interactive Facility Booking**
  - View comprehensive facility details, amenities, pricing, and availability.
  - Book preferred time slots with instant feedback and toast notifications.

- **📊 Personal Reservations Hub (`My Bookings`)**
  - Overview of user's active and past venue reservations.
  - Interactive booking cancellation with modal verification alerts.
  - Statistical insights on booked venues.

- **🛠️ Facility Owner Management (`Manage Facilities`)**
  - Add new sports facilities with custom titles, descriptions, pricing, images, and locations.
  - Edit existing facility details via modal interface.
  - Delete facilities with confirmation dialogs.

- **🌓 Dark & Light Mode**
  - Seamless theme switching using `next-themes` with custom HSL color tokens.

- **📱 Modern & Responsive UI/UX**
  - Mobile-first, fluid layout crafted with **HeroUI**, **DaisyUI**, **Tailwind CSS v4**, and smooth animations powered by **Motion**.

---

## 🛠️ Tech Stack & Dependencies

### **Core Frameworks**
- **[Next.js 16](https://nextjs.org/)** (App Router architecture)
- **[React 19](https://react.dev/)**

### **Styling & UI Components**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[HeroUI](https://heroui.com/)** (`@heroui/react`)
- **[DaisyUI v5](https://daisyui.com/)**
- **[Motion](https://motion.dev/)** (Framer Motion for animations)
- **[React Icons](https://react-icons.github.io/react-icons/)** & **[@gravity-ui/icons](https://github.com/gravity-ui/icons)**
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**
- **[next-themes](https://github.com/pacocoursey/next-themes)**

### **Authentication & Database**
- **[Better Auth](https://www.better-auth.com/)** (`better-auth`, `@better-auth/mongo-adapter`)
- **[MongoDB Node Driver](https://www.mongodb.com/)**

---

## 📁 Project Structure

```text
sportnest-client/
├── public/                     # Static assets & images (banners, sport icons)
├── src/
│   ├── app/                    # Next.js App Router structure
│   │   ├── (auth)/             # Authentication routes (login, register)
│   │   ├── (main)/             # Application main layout & pages
│   │   │   ├── add-facility/   # Create new facility page
│   │   │   ├── all-facilities/ # Facilities catalog & detail [id]
│   │   │   ├── manage-facilities/# Facility management page
│   │   │   ├── mybookings/     # User reservations page
│   │   │   └── page.jsx        # Landing homepage
│   │   ├── api/auth/           # Better Auth API handler route
│   │   ├── globals.css         # Custom global styles & theme tokens
│   │   └── layout.js           # Root layout & providers wrapper
│   ├── components/             # Reusable UI components
│   │   ├── providers/          # Theme & Context providers
│   │   ├── shared/             # Navbar, Footer, Navlinks, ThemeToggle
│   │   ├── Banner.jsx          # Hero section
│   │   ├── BookingForm.jsx     # Reservation modal/form
│   │   ├── EditFacilityModal.jsx # Facility editing dialog
│   │   └── ...
│   ├── lib/                    # Authentication client & server setup
│   └── proxy.js                # API proxy helper
├── .env.example                # Environment variables template
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies & scripts
└── README.md                   # Documentation
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** v18.0 or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB Database** connection URI

---

### **Installation Steps**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sohagabir112/Sports-Booking-System.git
   cd Sports-Booking-System/SportNest-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root of `SportNest-Client`:

   ```env
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Better Auth Secret & Base URL
   BETTER_AUTH_SECRET=your_better_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000

   # MongoDB Connection
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/SportNest

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server with Hot Module Replacement.
- `npm run build` - Builds the application for production deployment.
- `npm run start` - Runs the compiled production build.
- `npm run lint` - Runs ESLint to check for code quality and errors.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sohagabir112/Sports-Booking-System/issues).

---

## 📄 License

This project is licensed under the MIT License.
