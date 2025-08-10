# Switzer Font Usage Guide

Your Next.js app is now configured with the beautiful Switzer font family! Here's how to use it effectively.

## Font Configuration Overview

You have three font configurations:

- **`switzer`** - Variable font (best performance, supports all weights 100-900)
- **`switzerFallback`** - Static fonts (fallback for older browsers)
- **`mono`** - Geist Mono for code snippets

## How to Use Switzer Fonts

### 1. **Default Usage (Automatic)**

Since Switzer is configured as your default `font-sans` in the layout, all text automatically uses Switzer:

```tsx
// This automatically uses Switzer
<p>This text uses Switzer font</p>
<h1>This heading also uses Switzer</h1>
```

### 2. **Font Weight Classes**

Use Tailwind CSS font weight utilities:

```tsx
// Light weights
<p className="font-light">Light text (300)</p>
<p className="font-normal">Normal text (400)</p>

// Medium weights
<p className="font-medium">Medium text (500)</p>
<p className="font-semibold">Semibold text (600)</p>

// Heavy weights
<p className="font-bold">Bold text (700)</p>
<p className="font-extrabold">Extrabold text (800)</p>
<p className="font-black">Black text (900)</p>
```

### 3. **Font Styles**

Add italic styling:

```tsx
<p className="italic">Italic text</p>
<p className="font-bold italic">Bold italic text</p>
```

### 4. **Text Sizes**

Combine with Tailwind text size utilities:

```tsx
<h1 className="text-4xl font-black">Hero Heading</h1>
<h2 className="text-2xl font-bold">Section Title</h2>
<h3 className="text-xl font-semibold">Subsection</h3>
<p className="text-base font-normal">Body text</p>
<small className="text-sm font-light">Caption text</small>
```

### 5. **Custom Font Variable Usage**

If you need to use the font variables directly in CSS:

```css
.custom-text {
  font-family: var(--font-switzer), var(--font-switzer-fallback), sans-serif;
}
```

### 6. **Monospace Font**

For code snippets and technical content:

```tsx
<code className="font-mono">const example = "code";</code>
<pre className="font-mono text-sm">
  // Code block
  function hello() {
    return "world";
  }
</pre>
```

## Best Practices

### Typography Hierarchy

```tsx
// Hero section
<h1 className="text-5xl font-black">Main Hero</h1>

// Page titles
<h1 className="text-4xl font-bold">Page Title</h1>

// Section headings
<h2 className="text-3xl font-semibold">Section Heading</h2>

// Subsection headings
<h3 className="text-2xl font-medium">Subsection</h3>

// Content headings
<h4 className="text-xl font-medium">Content Heading</h4>

// Body text
<p className="text-base font-normal">Regular paragraph text</p>

// Secondary text
<p className="text-sm font-light text-muted-foreground">Secondary info</p>

// Caption text
<span className="text-xs font-light text-muted-foreground">Captions</span>
```

### Component Examples

```tsx
// Button with custom font weight
<button className="px-4 py-2 font-semibold">Click me</button>

// Card with typography hierarchy
<div className="bg-card p-6">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-base font-normal mb-4">Card description</p>
  <small className="text-sm font-light text-muted-foreground">
    Additional info
  </small>
</div>

// Navigation with different weights
<nav>
  <a className="font-medium hover:font-semibold">Home</a>
  <a className="font-medium hover:font-semibold">About</a>
</nav>
```

## Performance Benefits

### Variable Font Advantages

- **Single file** loads all weights (100-900)
- **Smooth transitions** between weights
- **Smaller bundle** compared to loading multiple static fonts
- **Better performance** on modern browsers

### Fallback System

- Static fonts provide **compatibility** for older browsers
- **Graceful degradation** ensures fonts work everywhere
- **System font fallbacks** maintain performance if fonts fail to load

## Browser Support

- **Variable fonts**: Chrome 62+, Firefox 62+, Safari 11+
- **Static fonts**: Universal browser support
- **Fallback system**: Works in all browsers

Visit `/fonts-showcase` to see all weights and styles in action!
