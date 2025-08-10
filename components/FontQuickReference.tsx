import React from "react";

const FontQuickReference = () => {
  return (
    <div className="bg-card rounded-lg border p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold mb-2">Quick Font Reference</h2>
        <p className="text-sm font-normal text-muted-foreground">
          Copy these classes to use Switzer fonts effectively
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">
            Headings
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-5xl font-black
              </p>
              <h1 className="text-5xl font-black">Hero Title</h1>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-4xl font-bold
              </p>
              <h2 className="text-4xl font-bold">Page Title</h2>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-3xl font-semibold
              </p>
              <h3 className="text-3xl font-semibold">Section Heading</h3>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-2xl font-medium
              </p>
              <h4 className="text-2xl font-medium">Subsection</h4>
            </div>
          </div>
        </div>

        {/* Body Text */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">
            Body Text
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-lg font-normal
              </p>
              <p className="text-lg font-normal">
                Large body text for emphasis
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-base font-normal
              </p>
              <p className="text-base font-normal">Regular paragraph text</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-sm font-medium
              </p>
              <p className="text-sm font-medium">Secondary information</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                text-xs font-light
              </p>
              <p className="text-xs font-light">Caption and metadata</p>
            </div>
          </div>
        </div>

        {/* Special Cases */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">
            Special Cases
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                font-bold italic
              </p>
              <p className="font-bold italic">Bold italic text</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                font-light tracking-wide
              </p>
              <p className="font-light tracking-wide">Light with tracking</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                font-mono text-sm
              </p>
              <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                Code snippet
              </code>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">
            Interactive Elements
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Button: font-semibold
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded font-semibold">
                Primary Button
              </button>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Link: font-medium hover:font-semibold
              </p>
              <a
                href="#"
                className="text-primary font-medium hover:font-semibold transition-all"
              >
                Navigation Link
              </a>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Badge: text-xs font-bold
              </p>
              <span className="inline-block bg-muted text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Custom Properties */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-lg font-semibold">CSS Custom Properties</h3>
        <div className="bg-muted rounded-lg p-4">
          <code className="font-mono text-sm">
            <pre className="text-xs leading-relaxed">{`/* Available CSS variables */
--font-switzer: 'Switzer Variable'
--font-switzer-fallback: 'Switzer Static'
--font-mono: 'Geist Mono'

/* Usage in custom CSS */
.custom-heading {
  font-family: var(--font-switzer), sans-serif;
  font-weight: 700;
}`}</pre>
          </code>
        </div>
      </div>
    </div>
  );
};

export default FontQuickReference;
