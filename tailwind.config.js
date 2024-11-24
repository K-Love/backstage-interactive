@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-dark;
  }
  
  input, select, textarea {
    @apply p-2 border rounded;
  }
}

@layer components {
  .container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 
    border border-transparent text-base font-medium rounded-md 
    text-white shadow-md
    bg-gradient-to-b from-primary to-secondary
    hover:from-primary hover:to-primary/80
    transition-all duration-300 hover:scale-105 transform
    hover:shadow-[0_8px_25px_-8px_rgba(46,49,146,0.6)]
    active:shadow-inner active:scale-[0.98];
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary via-accent to-accent2 bg-clip-text text-transparent;
  }

  .card {
    @apply bg-white/90 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
    hover:-translate-y-2 border border-gray-100;
  }
}

/* Texture overlay */
.texture-overlay {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Section dividers */
.section-divider {
  position: relative;
  padding: 6rem 0;
}

.section-divider::before {
  content: '';
  position: absolute;
  top: -3rem;
  left: 0;
  right: 0;
  height: 6rem;
  background: linear-gradient(to right bottom, transparent 49.5%, #2E3192 50%);
}

.section-divider.light::before {
  background: linear-gradient(to right bottom, transparent 49.5%, #F7F9FC 50%);
}

.section-divider.accent::before {
  background: linear-gradient(to right bottom, transparent 49.5%, #FF6B6B 50%);
}

.section-divider.accent2::before {
  background: linear-gradient(to right bottom, transparent 49.5%, #4ECDC4 50%);
}

/* Update existing sections */
.hero-gradient {
  position: relative;
  background: linear-gradient(135deg, rgba(46,49,146,0.95) 0%, rgba(26,27,77,0.95) 100%);
}

.hero-gradient::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6rem;
  background: linear-gradient(to left bottom, transparent 49.5%, #fff 50%);
}

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Modern transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
}

/* Text effects */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Card effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
