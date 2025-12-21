# Twitter Clone - Frontend Project

A simplified Twitter/X clone built with HTML, CSS, and JavaScript to demonstrate modern frontend development practices.

## Features

### HTML Structure
- Semantic HTML5 elements (`header`, `nav`, `main`, `article`, `aside`, `footer`)
- Clean, organized structure with proper indentation
- Accessible markup

### CSS Styling
- External CSS file with organized styles
- Flexbox for component layouts
- CSS Grid for main layout structure
- CSS Variables for theming
- Smooth transitions and hover effects
- Responsive design with media queries

### JavaScript Functionality
- **Mobile Navigation Toggle** - Hamburger menu for mobile devices
- **Theme Switcher** - Light/Dark mode toggle with localStorage persistence
- **Dynamic Tweet Rendering** - Create and display tweets dynamically
- **Interactive Buttons**:
  - Like button (with counter and visual feedback)
  - Retweet button (with counter)
  - Comment button (add comments)
- **Create New Tweets** - Form with character counter (280 limit)
- **Tab Switching** - "For You" vs "Following" tabs
- **LocalStorage** - Saves tweets, likes, and theme preference across page refreshes
- **Form Validation** - Character limit validation for tweets

### Responsive Design
- **Desktop**: 3-column layout (sidebar, main content, right sidebar)
- **Tablet**: 2-column layout
- **Mobile**: Single column with collapsible navigation menu

## File Structure

```
P1/
├── index.html      # Main HTML structure
├── styles.css      # All CSS styling
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## How to Use

1. Open `index.html` in a web browser
2. Create new tweets using the textarea at the top
3. Interact with tweets by liking, retweeting, or commenting
4. Toggle between light and dark themes using the theme button
5. On mobile, use the hamburger menu (☰) to access navigation

## Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Variables, Media Queries)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

