import React from "react";
import FontQuickReference from "@/components/FontQuickReference";

const FontShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tight">
            Switzer Font Showcase
          </h1>
          <p className="text-lg text-muted-foreground">
            Demonstrating the beautiful Switzer font family with variable and
            static weights
          </p>
        </header>

        {/* Weight Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-2">
            Font Weights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Regular Weights</h3>
              <div className="space-y-2">
                <p className="text-lg font-light">
                  Light (300) - The quick brown fox
                </p>
                <p className="text-lg font-normal">
                  Regular (400) - The quick brown fox
                </p>
                <p className="text-lg font-medium">
                  Medium (500) - The quick brown fox
                </p>
                <p className="text-lg font-semibold">
                  Semibold (600) - The quick brown fox
                </p>
                <p className="text-lg font-bold">
                  Bold (700) - The quick brown fox
                </p>
                <p className="text-lg font-extrabold">
                  Extrabold (800) - The quick brown fox
                </p>
                <p className="text-lg font-black">
                  Black (900) - The quick brown fox
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Italic Weights</h3>
              <div className="space-y-2">
                <p className="text-lg font-light italic">
                  Light Italic - The quick brown fox
                </p>
                <p className="text-lg font-normal italic">
                  Regular Italic - The quick brown fox
                </p>
                <p className="text-lg font-medium italic">
                  Medium Italic - The quick brown fox
                </p>
                <p className="text-lg font-semibold italic">
                  Semibold Italic - The quick brown fox
                </p>
                <p className="text-lg font-bold italic">
                  Bold Italic - The quick brown fox
                </p>
                <p className="text-lg font-extrabold italic">
                  Extrabold Italic - The quick brown fox
                </p>
                <p className="text-lg font-black italic">
                  Black Italic - The quick brown fox
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Size Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-2">
            Text Sizes
          </h2>
          <div className="space-y-4">
            <p className="text-xs">
              Extra Small (xs) - Perfect for captions and fine print
            </p>
            <p className="text-sm">
              Small (sm) - Great for secondary information
            </p>
            <p className="text-base">Base - The standard reading size</p>
            <p className="text-lg">Large (lg) - Excellent for emphasis</p>
            <p className="text-xl">
              Extra Large (xl) - Perfect for subheadings
            </p>
            <p className="text-2xl">2XL - Great for section titles</p>
            <p className="text-3xl font-semibold">
              3XL - Perfect for page titles
            </p>
            <p className="text-4xl font-bold">4XL - Hero headings</p>
            <p className="text-5xl font-black">5XL - Impact statements</p>
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-2">
            Real-world Examples
          </h2>

          {/* Article Example */}
          <article className="bg-card rounded-lg p-6 space-y-4">
            <h3 className="text-2xl font-bold">Article Headline Example</h3>
            <p className="text-sm text-muted-foreground">
              Published on August 10, 2025 • 5 min read
            </p>
            <p className="text-base leading-relaxed">
              This is an example of how Switzer looks in a typical article
              format. The font maintains excellent readability across different
              sizes and weights, making it perfect for both headings and body
              text. Its modern, clean aesthetic works beautifully in both light
              and dark themes.
            </p>
            <p className="text-base leading-relaxed">
              The variable font technology allows for smooth weight transitions
              and optimal loading performance, while the fallback static fonts
              ensure compatibility across all browsers.
            </p>
          </article>

          {/* Card Example */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 space-y-2">
              <h4 className="text-lg font-semibold">Card Title</h4>
              <p className="text-sm text-muted-foreground">
                Card description with secondary text
              </p>
              <p className="text-xs text-muted-foreground">
                Additional metadata
              </p>
            </div>
            <div className="bg-card rounded-lg p-4 space-y-2">
              <h4 className="text-lg font-semibold">Another Card</h4>
              <p className="text-sm text-muted-foreground">
                More example content here
              </p>
              <p className="text-xs text-muted-foreground">Timestamp info</p>
            </div>
            <div className="bg-card rounded-lg p-4 space-y-2">
              <h4 className="text-lg font-semibold">Final Card</h4>
              <p className="text-sm text-muted-foreground">
                Consistent typography throughout
              </p>
              <p className="text-xs text-muted-foreground">Perfect alignment</p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-2">
            Monospace Font
          </h2>
          <div className="bg-muted rounded-lg p-4">
            <code className="font-mono text-sm">
              <pre>{`// Example code block
const fontConfig = {
  primary: 'Switzer Variable',
  fallback: 'system-ui, sans-serif',
  weights: [300, 400, 500, 600, 700, 800, 900]
};`}</pre>
            </code>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-2">
            Quick Reference Guide
          </h2>
          <FontQuickReference />
        </section>
      </div>
    </div>
  );
};

export default FontShowcase;
