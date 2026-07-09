# Testimonials Block

Featured projects portfolio section with alternating image and content layout.

## Features

- **Responsive Layout**: 
  - Mobile: Stacked vertical layout
  - Tablet (600px+): Side-by-side cards with alternating image/content positions
  - Desktop (900px+): Optimized spacing and typography
  
- **Alternating Card Design**: Images and content alternate positions for visual interest
- **Clean Typography**: Hierarchical heading, description, and category tags
- **Call-to-Action Links**: "View Case Study" links for each project
- **Customizable Colors**: Uses CSS custom properties for easy theming

## Usage

Add a "Testimonials" block to your document with the following structure:

```
| Testimonials |
| --- |
| **Our featured projects** (or custom title) |
| Description text here. You can add links like [View All Portfolio →](#) |
| Image (left side) | **Project Title** Category tags here. Project description text explaining the project, its scope, and key features. [View Case Study →](#) |
| Image (left side) | **Next Project Title** Category tags. Project description. [View Case Study →](#) |
```

## Component Structure

### Introduction Section (First Row)
- Left column: Title and description text
- Right column: Additional context or CTAs

### Project Cards (Subsequent Rows)
Each row represents one project card with two columns:
- **Column 1**: Project image
- **Column 2**: Project metadata
  - Category tags (shown in italic/em)
  - Project title (h3/h4)
  - Project description (paragraph)
  - "View Case Study" link

## Styling

The block uses CSS custom properties for theming:
- `--heading-color`: Color for headings (default: #000)
- `--text-color`: Primary text color (default: #333)
- `--text-color-secondary`: Secondary text color (default: #666)
- `--link-color`: Link color (default: #0078d4)
- `--link-hover-color`: Hover state link color (default: #005a9e)
- `--spacing-*`: Various spacing values

## Responsive Breakpoints

- **Mobile**: < 600px - Vertical stack
- **Tablet**: 600px - 899px - Side-by-side with alternating layout
- **Desktop**: 900px+ - Enhanced spacing and typography
- **Large Desktop**: 1200px+ - Maximum content width

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Link text includes visual indicators (→)
- Alt text for images (managed through standard image authoring)
- Sufficient color contrast for links and text

## Example

```html
<div class="testimonials">
  <div class="testimonials-intro-section">
    <div class="testimonials-intro-left">
      <h2>Our featured projects</h2>
      <p>Description text here</p>
      <a href="#" class="button">View All Portfolio</a>
    </div>
    <div class="testimonials-intro-right">
      <p>Additional context or description</p>
    </div>
  </div>
  
  <div class="testimonials-card card-position-even">
    <div class="card-image-cell">
      <picture><!-- Image --></picture>
    </div>
    <div class="card-content-cell">
      <em>Creative Direction / UI/UE / Website Design</em>
      <h3>PMR — online platform & responsive website design</h3>
      <p>Project description text</p>
      <a href="#">View Case Study →</a>
    </div>
  </div>
</div>
```
