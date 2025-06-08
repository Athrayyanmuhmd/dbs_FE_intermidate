# TuriturianSude

TuriturianSude adalah aplikasi web Progressive Web App (PWA) untuk berbagi cerita visual dan lokasi yang didedikasikan untuk komunitas pembelajar teknologi. Platform ini memungkinkan pengguna untuk membagikan momen pembelajaran mereka melalui foto berkualitas tinggi dengan fitur geo-lokasi.

## ✨ Fitur Utama

### 📱 Aplikasi Modern
- **Progressive Web App (PWA)** dengan dukungan offline
- **Service Worker** untuk caching dan sinkronisasi data
- **Push Notifications** untuk notifikasi story baru
- **Responsive Design** yang mobile-friendly

### 📸 Berbagi Cerita
- Upload foto dari galeri atau ambil langsung dengan kamera
- Deskripsi cerita yang rich dan interaktif
- Sistem tag untuk kategorisasi konten
- Preview real-time sebelum posting

### 🗺️ Fitur Lokasi
- Integrasi peta interaktif menggunakan Leaflet.js
- Geo-tagging dengan koordinat lokasi
- Visualisasi story berdasarkan peta
- Dukungan multiple tile layers (OpenStreetMap & Satellite)

### 🔐 Sistem Autentikasi
- Registrasi dan login pengguna yang aman
- Session management dengan token-based authentication
- Protected routes untuk fitur premium

### 💾 Penyimpanan
- Save story ke local storage untuk akses offline
- IndexedDB untuk penyimpanan data terstruktur
- Background sync untuk sinkronisasi otomatis

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Vanilla JavaScript** (ES6+) dengan modular architecture
- **CSS3** dengan custom properties dan flexbox/grid
- **HTML5** semantic markup
- **Font Awesome** untuk icons
- **Inter Font** dari Google Fonts

### Libraries & Tools
- **Leaflet.js** - Interactive maps
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts
- **Workbox** - Service worker management
- **IDB** - IndexedDB wrapper

### Build Tools
- **Vite** - Modern build tool dan dev server
- **Vite-PWA** - PWA plugin untuk Vite

### Backend Integration
- **Dicoding Story API** - REST API untuk data management
- **Web Push API** - Push notifications

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn package manager
- Browser modern dengan dukungan ES6+

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/turituriansude.git
   cd turituriansude
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp STUDENT.txt .env
   ```
   
   Update file `.env` dengan konfigurasi yang diperlukan:
   ```env
   APP_URL=https://story-api.dicoding.dev/v1
   MAP_SERVICE_API_KEY=https://www.openstreetmap.org/copyright
   DEPLOY=
   ```

4. **Jalankan development server**
   ```bash
   npm run dev
   ```
   
   Aplikasi akan berjalan di `http://localhost:3000`

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build hasil
npm run preview
```

## 📁 Struktur Proyek

```
turituriansude/
├── src/
│   ├── scripts/
│   │   ├── config/           # Konfigurasi aplikasi
│   │   ├── presenters/       # MVP pattern - Presenters
│   │   ├── routes/           # URL routing
│   │   ├── services/         # API dan database services
│   │   ├── utils/            # Utility functions
│   │   └── views/            # UI components dan pages
│   ├── styles/
│   │   ├── base/             # Base styles (reset, variables)
│   │   ├── components/       # Component styles
│   │   └── pages/            # Page-specific styles
│   └── main.js               # Entry point
├── public/
│   ├── icons/                # PWA icons
│   ├── leaflet/              # Map assets
│   └── manifest.json         # PWA manifest
├── vite.config.js            # Vite configuration
└── sw.js                     # Service Worker
```

## 🏗️ Arsitektur Aplikasi

### Design Pattern
Aplikasi menggunakan **Model-View-Presenter (MVP)** pattern untuk separation of concerns:

- **Model**: Services untuk data management (`services/`)
- **View**: UI components dan templates (`views/`)
- **Presenter**: Business logic dan state management (`presenters/`)

### Routing System
Custom router dengan support untuk:
- Dynamic routes dengan parameters (`/detail/:id`)
- Protected routes untuk authenticated users
- Hash-based navigation untuk SPA

### State Management
- **Local Storage** untuk user session
- **IndexedDB** untuk offline data storage
- **In-memory state** untuk UI components

## 🎯 Fitur Unggulan

### Progressive Web App
- **Installable** - Dapat diinstall seperti native app
- **Offline Support** - Berfungsi tanpa koneksi internet
- **Background Sync** - Sinkronisasi data otomatis
- **App Shell** - Loading cepat dengan caching strategy

### User Experience
- **Smooth Animations** - View transitions dan micro-interactions
- **Loading States** - Skeleton loading dan progress indicators
- **Error Handling** - Graceful error handling dengan retry options
- **Accessibility** - ARIA labels dan keyboard navigation

### Performance
- **Code Splitting** - Lazy loading untuk optimal performance
- **Image Optimization** - Responsive images dengan lazy loading
- **Cache Strategy** - Intelligent caching untuk assets dan API calls

## 🔧 Konfigurasi

### Environment Variables
```env
# API Configuration
APP_URL=https://story-api.dicoding.dev/v1

# Map Configuration  
MAP_SERVICE_API_KEY=https://www.openstreetmap.org/copyright

# Deployment
DEPLOY=production
```

### PWA Configuration
PWA dikonfigurasi melalui `vite.config.js` dengan:
- Custom service worker
- Caching strategies
- Background sync
- Push notifications

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy otomatis dari main branch

### Manual Deployment
```bash
# Build untuk production
npm run build

# Upload folder dist/ ke hosting provider
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---
