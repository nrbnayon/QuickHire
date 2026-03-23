# FitMate AI - Web

A modern, full-featured fleet and parcel tracking management system built with Next.js 16, React 19, and TypeScript. Designed for logistics companies to manage drivers, track parcels in real-time, and handle seller operations with an intuitive dashboard interface.

## 🚀 Features

### Core Features

- **Real-Time Parcel Tracking**: Live GPS tracking for parcels with interactive maps (Leaflet)
- **Multi-Role Dashboard**: Dedicated dashboards for Super Admins and Seller Admins
- **Driver Management**: Comprehensive driver profile management and assignment
- **Parcel Management**: Create, manage, and track parcel shipments
- **Seller Management**: Manage seller accounts and operations (Super Admin only)
- **Analytics & Reporting**: Detailed analytics with charts and export functionality (PDF/Excel)
- **User Authentication**: Secure signin, registration, and OTP verification
- **Multi-Language Support**: Full internationalization (i18n) support
- **Progressive Web App (PWA)**: Offline capability with service worker support

### Advanced Features

- **Role-Based Access Control (RBAC)**: Granular permission management
- **Real-Time Notifications**: WebSocket-based notifications system
- **Export Capabilities**: Export data to PDF and Excel formats
- **Google Maps Integration**: Enhanced mapping and location features
- **Responsive Design**: Fully responsive UI with mobile-first approach
- **Dark/Light Theme Support**: Theme switching with persistence

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.0.10
- **UI Library**: React 19.2.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Icons**: Hugeicons, Tabler Icons, Lucide React
- **Forms**: React Hook Form with Zod validation

### State Management & Data

- **State Management**: Redux Toolkit with Redux hooks
- **Maps**: Leaflet & React Leaflet with Google Maps API integration
- **Charts**: Recharts

### Utilities & Libraries

- **Authentication**: jose (JWT handling)
- **Export**: ExcelJS, jsPDF with AutoTable
- **Notifications**: Sonner (Toast notifications)
- **Motion**: Framer Motion animations
- **Form Validation**: Zod with React Hook Form resolvers

### Development Tools

- **Linting**: ESLint
- **PWA Support**: next-pwa with Workbox
- **Node Version**: Requires Node.js with npm

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Modern web browser with JavaScript enabled
- Google Maps API key (for mapping features)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd track-fleet-pro-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory with required variables:

   ```env
   NEXT_PUBLIC_API_URL=<your-api-url>
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   NEXT_PUBLIC_APP_URL=<your-app-url>
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Available Scripts

- **`npm run dev`** - Start development server with Webpack
- **`npm run build`** - Build for production with optimization
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint for code quality checks

## 📁 Project Structure

```
track-fleet-pro-web/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── verify-otp/
│   │   └── reset-success/
│   ├── (landing)/                # Landing pages
│   │   ├── track-parcel/
│   │   ├── about-us/
│   │   └── coverage/
│   ├── (roles)/                  # Role-based layouts
│   │   ├── seller-admin/         # Seller Admin dashboard
│   │   ├── super-admin/          # Super Admin dashboard
│   │   └── (shared)/             # Shared role components
│   ├── api/                      # API routes
│   │   └── translate/            # Translation API
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── Auth/                     # Authentication components
│   ├── Common/                   # Common components
│   ├── Landing/                  # Landing page components
│   ├── Notifications/            # Notification components
│   ├── SellerAdmin/              # Seller Admin specific components
│   ├── SupperAdmin/              # Super Admin components
│   ├── Sidebar/                  # Navigation sidebar
│   ├── Shared/                   # Shared UI components
│   └── ui/                       # Base UI components (Radix UI wrapped)
├── context/                      # React Context providers
│   └── LanguageContext.tsx       # Language/i18n context
├── hooks/                        # Custom React hooks
│   ├── usePermission.ts          # Role-based permission checks
│   ├── useTranslate.ts           # Translation hook
│   ├── useUser.ts                # User data hook
│   ├── useLogout.ts              # Logout functionality
│   └── use-mobile.ts             # Mobile detection
├── lib/                          # Utility functions & helpers
│   ├── utils.ts                  # Common utilities
│   ├── formDataValidation.ts     # Form validation logic
│   ├── exportUtils.ts            # Export to PDF/Excel utilities
│   └── redux/                    # Redux store configuration
├── public/                       # Static assets
│   ├── icons/
│   ├── images/
│   ├── drivers/
│   └── sw.js                     # Service worker
├── types/                        # TypeScript type definitions
│   ├── driver.ts
│   ├── parcel.ts
│   ├── seller.ts
│   ├── notification.ts
│   └── users.ts
├── data/                         # Mock/sample data
│   ├── allParcelsData.ts
│   ├── allDriversData.ts
│   ├── allSellersData.ts
│   └── statsData.ts
├── HowToLiveMapTrack/            # Live tracking implementation
│   ├── _ParcelMapLiveTracking.tsx
│   ├── _TrackParcelModal.tsx
│   └── _serverwebsocket.js
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── package.json                 # Dependencies & scripts
```

## 🔐 Authentication & Authorization

The application supports:

- **Authentication Methods**: Email/Password with OTP verification
- **Authorization**: Role-based access control (RBAC) with routes
  - **Super Admin**: Full system access, manage all entities
  - **Seller Admin**: Manage own seller operations, drivers, and parcels
  - **Customer**: Track parcels and view coverage

## 🗺️ Real-Time Features

### Live Parcel Tracking

- WebSocket connection for real-time parcel position updates
- Interactive maps using Leaflet/Google Maps
- Route visualization and ETA calculations

### WebSocket Server

- Located in `HowToLiveMapTrack/_serverwebsocket.js`
- Handles live location streaming for tracked parcels

## 🌐 Internationalization (i18n)

Multi-language support with:

- Language context management (`LanguageContext.tsx`)
- `useTranslate` hook for easy text translation
- API endpoint for dynamic translations (`/api/translate`)
- Persistent language preference

## 📊 Dashboard Features

### Super Admin Dashboard

- System-wide analytics and statistics
- Seller management and performance metrics
- Driver management and assignment
- Parcel tracking and statistics
- Revenue and operational insights

### Seller Admin Dashboard

- Company-specific analytics
- Driver management
- Parcel management and tracking
- Performance metrics
- Customer communications

## 📁 Data Export

Export capabilities for:

- **PDF Reports**: Using jsPDF with formatted tables
- **Excel Files**: Using ExcelJS for complex spreadsheets
- Includes drivers, parcels, sellers, and custom analytics

## 🎨 UI/UX

- **Component Library**: Custom Radix UI wrapper components
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Multiple icon libraries (Hugeicons, Tabler, Lucide)
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Full dark/light theme support with next-themes

## 📱 PWA Support

The application includes Progressive Web App features:

- Service Worker for offline functionality
- App manifest for installability
- Next PWA configuration for caching strategies
- Workbox for advanced cache management

## 🔍 Code Quality

- **Linting**: ESLint configuration for code standards
- **TypeScript**: Full type safety throughout the application
- **Validation**: Zod schema validation for forms and API responses

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Configuration

Ensure all required environment variables are set in production:

```env
NEXT_PUBLIC_API_URL=<production-api-url>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<production-api-key>
NEXT_PUBLIC_APP_URL=<production-app-url>
```

### Supported Platforms

- Vercel (recommended for Next.js)
- Docker containers
- Traditional Node.js hosting
- Static hosting with API proxy

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## 📞 Support

For issues, questions, or support:

- Create an issue in the repository
- Contact the development team
- Check documentation in project files

## 🔗 Related Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Redux Toolkit](https://redux-toolkit.js.org)

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Maintained By**: Track Fleet Pro Team
