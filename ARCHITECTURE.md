# Party Games Platform - Architecture & Style Guide

A comprehensive guide for understanding, maintaining, and extending the Party Games platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Design System](#design-system)
4. [Adding New Games](#adding-new-games)
5. [Component Patterns](#component-patterns)
6. [Navigation](#navigation)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Best Practices](#best-practices)
10. [Game Template](#game-template)

---

## Overview

### Purpose
Party Games is a collection of pass-and-play party games designed to help people build relationships and have fun together in person. All games are:
- **Mobile-first**: Optimized for phone passing between players
- **Offline-capable**: No server required, runs entirely in browser
- **Self-contained**: Each game is independent

### Core Principles
1. **Simplicity** - Games should be intuitive with minimal onboarding
2. **Accessibility** - Large tap targets, readable text, good contrast
3. **Consistency** - Shared design language across all games
4. **Performance** - Fast loading, smooth animations, no dependencies

### Tech Stack
- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build tools required
- Deployed as static files on GitHub Pages

---

## Directory Structure

```
/party-games (root)
│
├── index.html                    # Home screen - game selection hub
│
├── css/
│   ├── shared.css               # Design system & common styles
│   └── home.css                 # Home screen specific styles
│
├── games/
│   ├── nono/                    # Taboo-style word game
│   │   ├── index.html
│   │   ├── css/
│   │   │   └── styles.css       # Game-specific styles
│   │   └── js/
│   │       ├── app.js           # Game logic
│   │       └── decks.js         # Game data (cards)
│   │
│   ├── [new-game]/              # Future games follow same pattern
│   │   ├── index.html
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       └── app.js
│   │
│   └── ...
│
├── ARCHITECTURE.md              # This file
└── README.md                    # Project readme (optional)
```

### Naming Conventions
- **Directories**: lowercase, hyphenated (`quick-draw`, `act-it-out`)
- **Files**: lowercase, hyphenated (`game-logic.js`, `card-data.js`)
- **CSS Classes**: lowercase, hyphenated (`.game-card`, `.btn-primary`)
- **JS Variables**: camelCase (`currentScore`, `timerInterval`)
- **JS Constants**: UPPER_SNAKE_CASE (`DECKS`, `MAX_SCORE`)

---

## Design System

### Color Palette

All colors are defined as CSS custom properties in `shared.css`:

```css
/* Primary - Used for main actions, branding */
--color-primary: #6366f1;        /* Indigo */
--color-primary-dark: #4f46e5;   /* Hover state */
--color-primary-light: #818cf8;  /* Highlights */

/* Accent - Used for secondary actions, emphasis */
--color-accent: #f59e0b;         /* Amber */
--color-accent-dark: #d97706;    /* Hover state */

/* Semantic Colors */
--color-success: #10b981;        /* Correct, positive */
--color-success-dark: #059669;
--color-danger: #ef4444;         /* Wrong, negative, taboo */
--color-danger-dark: #dc2626;
--color-warning: #f59e0b;        /* Caution, timer warning */

/* Backgrounds (Dark Theme) */
--bg-dark: #0f172a;              /* Page background */
--bg-card: #1e293b;              /* Card/surface background */
--bg-card-light: #334155;        /* Elevated surfaces */

/* Text */
--text-primary: #f8fafc;         /* Main text */
--text-secondary: #94a3b8;       /* Subdued text */
--text-muted: #64748b;           /* Disabled/hint text */
```

### Typography

```css
/* Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

/* Scale */
--text-xs: 0.75rem;    /* 12px - Labels, badges */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Emphasized body */
--text-xl: 1.25rem;    /* 20px - Section headers */
--text-2xl: 1.5rem;    /* 24px - Card titles */
--text-3xl: 2rem;      /* 32px - Page titles */
--text-4xl: 2.5rem;    /* 40px - Hero text */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Spacing Scale

```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
```

### Border Radius

```css
--radius-sm: 0.5rem;   /* 8px - Small elements */
--radius-md: 0.75rem;  /* 12px - Buttons, inputs */
--radius-lg: 1rem;     /* 16px - Cards */
--radius-xl: 1.5rem;   /* 24px - Large cards */
--radius-full: 9999px; /* Circles, pills */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.4);
```

### Transitions

```css
--transition-fast: 150ms ease;    /* Hover states */
--transition-normal: 250ms ease;  /* Screen changes */
--transition-slow: 350ms ease;    /* Complex animations */
```

---

## Adding New Games

### Step-by-Step Guide

#### 1. Create Directory Structure

```bash
mkdir -p games/[game-name]/css games/[game-name]/js
```

#### 2. Create Game Files

**games/[game-name]/index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="[Game description]">
    <meta name="theme-color" content="#6366f1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>[Game Name] - Party Games</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>[EMOJI]</text></svg>">

    <!-- REQUIRED: Link shared styles first -->
    <link rel="stylesheet" href="../../css/shared.css">
    <!-- Game-specific styles -->
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- REQUIRED: Home navigation button -->
    <a href="../../" class="home-btn" title="Back to Games">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    </a>

    <div id="app">
        <!-- Game screens go here -->
    </div>

    <script src="js/app.js"></script>
</body>
</html>
```

**games/[game-name]/css/styles.css**
```css
/*
 * [Game Name] - Styles
 * Extends shared.css - do NOT redefine CSS variables or base styles
 */

#app {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
}

/* Account for home button in padding */
.screen {
    padding-top: calc(var(--space-lg) + var(--safe-area-top) + 50px);
}

/* Game-specific styles below */
```

#### 3. Add Game Tile to Home Screen

Edit `/index.html` and add a tile in the `.games-grid`:

```html
<a href="games/[game-name]/" class="game-tile">
    <div class="game-tile-icon">[EMOJI]</div>
    <div class="game-tile-content">
        <h3 class="game-tile-title">[Game Name]</h3>
        <p class="game-tile-description">[Short description]</p>
        <div class="game-tile-meta">
            <span class="meta-item">
                <!-- Player count icon -->
                <svg>...</svg>
                [X]+ players
            </span>
            <span class="meta-item">
                <!-- Time icon -->
                <svg>...</svg>
                [X]-[X] min
            </span>
        </div>
    </div>
    <div class="game-tile-arrow">
        <svg>...</svg>
    </div>
</a>
```

#### 4. Remove "Coming Soon" Placeholder

If replacing a coming soon tile, remove the `.coming-soon` class and add the `href`.

### New Game Checklist

- [ ] Directory created: `games/[name]/`
- [ ] `index.html` includes shared.css link
- [ ] `index.html` includes home button
- [ ] CSS uses variables from shared.css (no hardcoded colors)
- [ ] Screens have padding for home button (50px top)
- [ ] Touch targets are at least 48x48px
- [ ] Game tile added to home screen
- [ ] Tested on mobile viewport
- [ ] Tested navigation: home → game → home

---

## Component Patterns

### Buttons

```html
<!-- Primary Action -->
<button class="btn btn-primary">Start Game</button>

<!-- Secondary Action -->
<button class="btn btn-secondary">Back</button>

<!-- Large Full-Width -->
<button class="btn btn-primary btn-large">Continue</button>

<!-- Icon Button -->
<button class="btn btn-icon">+</button>
```

### Cards

```html
<div class="card">
    <h3 class="card-title">Title</h3>
    <p class="card-content">Content here</p>
</div>
```

Typical card styles:
```css
.card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-md);
}
```

### Screen Pattern

Games should use a screen-based navigation pattern:

```html
<div id="app">
    <div id="screen-welcome" class="screen active">...</div>
    <div id="screen-setup" class="screen">...</div>
    <div id="screen-game" class="screen">...</div>
    <div id="screen-results" class="screen">...</div>
</div>
```

```css
.screen {
    display: none;
    flex: 1;
    padding: var(--space-lg);
    animation: fadeIn var(--transition-normal);
}

.screen.active {
    display: flex;
    flex-direction: column;
}
```

```javascript
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenId}`).classList.add('active');
}
```

### Stats Display

```html
<div class="game-stats">
    <div class="stat">
        <span class="stat-value">25</span>
        <span class="stat-label">Score</span>
    </div>
    <div class="stat">
        <span class="stat-value">5</span>
        <span class="stat-label">Round</span>
    </div>
</div>
```

### Progress Bar

```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 60%"></div>
</div>
```

---

## Navigation

### Home Button (Required)

Every game MUST include the home button for returning to the hub:

```html
<a href="../../" class="home-btn" title="Back to Games">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
</a>
```

The `.home-btn` styles are in `shared.css`:
- Fixed position, top-left corner
- Accounts for safe areas (notch)
- z-index: 100

### URL Structure

```
/                           # Home screen
/games/nono/               # Nono game
/games/quick-draw/         # Quick Draw game
/games/[game-name]/        # Pattern for all games
```

### Preventing Accidental Navigation

For games with unsaved progress:

```javascript
window.addEventListener('beforeunload', (e) => {
    if (gameInProgress) {
        e.preventDefault();
        e.returnValue = '';
    }
});
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First - Default styles are for mobile */

/* Tablet */
@media (min-width: 600px) { }

/* Desktop */
@media (min-width: 900px) { }

/* Large Desktop */
@media (min-width: 1200px) { }

/* Landscape Mobile */
@media (max-height: 500px) and (orientation: landscape) { }
```

### Safe Areas (Notch/Home Indicator)

```css
:root {
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
}

.screen {
    padding-top: calc(var(--space-lg) + var(--safe-area-top) + 50px);
    padding-bottom: calc(var(--space-lg) + var(--safe-area-bottom));
}
```

### Touch Targets

Minimum touch target size: **48x48px**

```css
.btn {
    min-height: 48px;
    min-width: 48px;
}
```

### Viewport Meta

Always include:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards against backgrounds
- Don't rely on color alone to convey information

### Focus States
```css
.btn:focus-visible {
    outline: 2px solid var(--color-primary-light);
    outline-offset: 2px;
}
```

### Screen Reader Support
```html
<!-- Hidden but accessible -->
<span class="sr-only">Score: 25 points</span>

<!-- Decorative elements -->
<span aria-hidden="true">🎉</span>
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## Best Practices

### Performance
1. **No external dependencies** - No CDN links, frameworks, or libraries
2. **Inline critical assets** - Favicon is inline SVG/data URI
3. **Minimal DOM** - Only show active screens
4. **CSS animations** - Prefer CSS over JS for animations

### State Management
```javascript
const Game = {
    state: {
        currentScreen: 'welcome',
        score: 0,
        // ...
    },

    init() { },
    showScreen(name) { },
    // ...
};

document.addEventListener('DOMContentLoaded', () => Game.init());
```

### Local Storage
Use for persisting settings, not game state:
```javascript
// Save
localStorage.setItem('game-settings', JSON.stringify(settings));

// Load
const settings = JSON.parse(localStorage.getItem('game-settings') || '{}');
```

### Error Handling
```javascript
try {
    const saved = localStorage.getItem('settings');
    if (saved) settings = JSON.parse(saved);
} catch (e) {
    console.log('Could not load settings');
}
```

---

## Game Template

Complete starter template for a new game:

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="[Description] - A party game for friends and family">
    <meta name="theme-color" content="#6366f1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <title>[Game Name] - Party Games</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>[EMOJI]</text></svg>">
    <link rel="stylesheet" href="../../css/shared.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <a href="../../" class="home-btn" title="Back to Games">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    </a>

    <div id="app">
        <!-- Welcome Screen -->
        <div id="screen-welcome" class="screen active">
            <div class="screen-content">
                <div class="logo">
                    <span class="logo-icon">[EMOJI]</span>
                    <h1 class="logo-text">[Game Name]</h1>
                </div>
                <p class="tagline">[Tagline]</p>

                <div class="rules-card">
                    <h2>How to Play</h2>
                    <ul class="rules-list">
                        <li><span class="rule-icon">1️⃣</span> Rule one</li>
                        <li><span class="rule-icon">2️⃣</span> Rule two</li>
                        <li><span class="rule-icon">3️⃣</span> Rule three</li>
                    </ul>
                </div>

                <button class="btn btn-primary btn-large" onclick="Game.showSetup()">
                    Start Game
                </button>
            </div>
        </div>

        <!-- Setup Screen -->
        <div id="screen-setup" class="screen">
            <div class="screen-content">
                <h2 class="screen-title">Game Setup</h2>
                <!-- Setup options here -->
                <div class="button-group">
                    <button class="btn btn-secondary" onclick="Game.showWelcome()">Back</button>
                    <button class="btn btn-primary" onclick="Game.startGame()">Begin</button>
                </div>
            </div>
        </div>

        <!-- Game Screen -->
        <div id="screen-game" class="screen">
            <div class="screen-content center-content">
                <!-- Game UI here -->
            </div>
        </div>

        <!-- Results Screen -->
        <div id="screen-results" class="screen">
            <div class="screen-content center-content">
                <h1>Game Over!</h1>
                <div class="button-group vertical">
                    <button class="btn btn-primary btn-large" onclick="Game.playAgain()">
                        Play Again
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='../../'">
                        All Games
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
```

### css/styles.css

```css
/* [Game Name] - Game-specific styles */

#app {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
}

.screen {
    display: none;
    flex: 1;
    padding: var(--space-lg);
    padding-top: calc(var(--space-lg) + var(--safe-area-top) + 50px);
    padding-bottom: calc(var(--space-lg) + var(--safe-area-bottom));
    animation: fadeIn var(--transition-normal);
}

.screen.active {
    display: flex;
    flex-direction: column;
}

.screen-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
}

.screen-content.center-content {
    justify-content: center;
    align-items: center;
    text-align: center;
}

.screen-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: var(--space-xl);
    text-align: center;
}

/* Logo */
.logo {
    text-align: center;
    margin-bottom: var(--space-md);
}

.logo-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: var(--space-sm);
    animation: bounce 2s ease-in-out infinite;
}

.logo-text {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--color-primary-light), var(--color-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.tagline {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.125rem;
    margin-bottom: var(--space-xl);
}

/* Rules */
.rules-card {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
}

.rules-card h2 {
    font-size: 1.25rem;
    margin-bottom: var(--space-md);
}

.rules-list {
    list-style: none;
}

.rules-list li {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-sm) 0;
    color: var(--text-secondary);
}

.rule-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
}

/* Button Group */
.button-group {
    display: flex;
    gap: var(--space-md);
    margin-top: auto;
}

.button-group.vertical {
    flex-direction: column;
}

/* Add game-specific styles below */
```

### js/app.js

```javascript
/**
 * [Game Name] - Game Logic
 */

const Game = {
    // State
    state: {
        currentScreen: 'welcome',
        score: 0,
        round: 0,
        // Add game-specific state
    },

    // DOM Elements
    elements: {},

    /**
     * Initialize the game
     */
    init() {
        this.cacheElements();
        this.loadSettings();
        this.showScreen('welcome');
    },

    /**
     * Cache DOM elements
     */
    cacheElements() {
        this.elements = {
            screens: {
                welcome: document.getElementById('screen-welcome'),
                setup: document.getElementById('screen-setup'),
                game: document.getElementById('screen-game'),
                results: document.getElementById('screen-results'),
            },
            // Add game-specific elements
        };
    },

    /**
     * Load saved settings
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('[game-name]-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                // Apply settings
            }
        } catch (e) {
            console.log('Could not load settings');
        }
    },

    /**
     * Save settings
     */
    saveSettings() {
        try {
            localStorage.setItem('[game-name]-settings', JSON.stringify({
                // Settings to persist
            }));
        } catch (e) {
            console.log('Could not save settings');
        }
    },

    /**
     * Show a screen
     */
    showScreen(name) {
        Object.values(this.elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        const screen = this.elements.screens[name];
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = name;
        }
    },

    /**
     * Navigation methods
     */
    showWelcome() {
        this.showScreen('welcome');
    },

    showSetup() {
        this.showScreen('setup');
    },

    /**
     * Start the game
     */
    startGame() {
        this.state.score = 0;
        this.state.round = 1;
        this.saveSettings();
        this.showScreen('game');
        // Initialize game logic
    },

    /**
     * End the game
     */
    endGame() {
        this.showScreen('results');
    },

    /**
     * Play again
     */
    playAgain() {
        this.startGame();
    },

    /**
     * Reset game
     */
    reset() {
        this.state.score = 0;
        this.state.round = 0;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => Game.init());

// Warn before leaving during active game
window.addEventListener('beforeunload', (e) => {
    if (Game.state.currentScreen === 'game') {
        e.preventDefault();
        e.returnValue = '';
    }
});
```

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2024-XX-XX | 1.0.0 | Initial architecture with Nono game |

---

## Questions?

This document should be updated as the platform evolves. When adding significant new patterns or making architectural changes, please update this guide.
