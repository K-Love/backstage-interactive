# Additional CSS Styles for About Page

## New CSS Classes to Add

### Timeline Styles
```css
.timeline {
  position: relative;
  padding: var(--spacing-xl) 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent-teal);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  padding: var(--spacing-lg) 0;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
  text-align: right;
  padding-right: var(--spacing-xl);
}

.timeline-item:nth-child(even) {
  left: 50%;
  padding-left: var(--spacing-xl);
}

.timeline-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--accent-teal);
  border: 4px solid var(--white);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -10px;
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -10px;
}
```

### Value Cards
```css
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.value-card {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.value-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-md);
  color: var(--accent-teal);
}
```

### Founder Profile
```css
.founder-section {
  background: var(--neutral-gray);
  padding: var(--spacing-xxl) 0;
}

.founder-profile {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.founder-image {
  width: 100%;
  height: 300px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
}

.founder-content h3 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.founder-content .title {
  color: var(--accent-teal);
  font-size: 1.8rem;
  margin-bottom: var(--spacing-md);
}
```

### Tech Stack Visualization
```css
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.tech-item {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.tech-item:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-md);
}

.tech-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto var(--spacing-sm);
}
```

### About Hero Section
```css
.about-hero {
  background: var(--gradient-hero);
  color: var(--white);
  padding: var(--spacing-xl) 0;
  text-align: center;
}

.about-hero h1 {
  color: var(--white);
  font-size: 4.2rem;
  margin-bottom: var(--spacing-md);
}

.about-hero .lead {
  font-size: 2.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}
```

### Responsive Adjustments
```css
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 60px !important;
    padding-right: var(--spacing-md) !important;
    text-align: left !important;
  }
  
  .timeline-dot {
    left: 20px !important;
    right: auto !important;
  }
  
  .founder-profile {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .founder-image {
    max-width: 300px;
    margin: 0 auto;
  }
}
```

## Animation Enhancements
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}

.stagger-animation > * {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.stagger-animation.animated > * {
  opacity: 1;
  transform: translateY(0);
}

.stagger-animation.animated > *:nth-child(1) { transition-delay: 0.1s; }
.stagger-animation.animated > *:nth-child(2) { transition-delay: 0.2s; }
.stagger-animation.animated > *:nth-child(3) { transition-delay: 0.3s; }
.stagger-animation.animated > *:nth-child(4) { transition-delay: 0.4s; }