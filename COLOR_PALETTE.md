# EcoShield Color Palette

## Overview
EcoShield now uses a comprehensive eco-friendly color palette that maintains green as the dominant brand color while incorporating complementary earthy tones, neutral grays, and refreshing accents for better visual appeal and accessibility.

## Color Palette

### Primary Colors (Dominant Brand)
**Green** - Main brand color representing nature and environmental consciousness
- `green-50`: #f0fdf4 (Lightest)
- `green-100`: #dcfce7
- `green-200`: #bbf7d0
- `green-300`: #86efac
- `green-400`: #4ade80
- `green-500`: #22c55e (Primary)
- `green-600`: #16a34a (Primary Dark)
- `green-700`: #15803d (Brand Primary)
- `green-800`: #166534
- `green-900`: #14532d (Darkest)

### Secondary Colors (Earthy Tones)
**Earth** - Warm, natural tones representing soil and organic materials
- `earth-50`: #faf9f7
- `earth-100`: #f5f2ed
- `earth-200`: #e8e1d4
- `earth-300`: #d9ccb8
- `earth-400`: #c7b299
- `earth-500`: #b5967d
- `earth-600`: #a17c63
- `earth-700`: #8b6b52
- `earth-800`: #735746
- `earth-900`: #5d473a

### Neutral Colors (Warm Grays)
**Sage** - Sophisticated neutral tones with warm undertones
- `sage-50`: #f8f9f8
- `sage-100`: #f1f3f1
- `sage-200`: #e3e7e3
- `sage-300`: #d1d8d1
- `sage-400`: #b8c4b8
- `sage-500`: #9bab9b
- `sage-600`: #7d8f7d
- `sage-700`: #677567
- `sage-800`: #556155
- `sage-900`: #475047

### Accent Colors

**Sky Blue** - Fresh, clean accent representing air and water
- `sky-50`: #f0f9ff
- `sky-100`: #e0f2fe
- `sky-200`: #bae6fd
- `sky-300`: #7dd3fc
- `sky-400`: #38bdf8
- `sky-500`: #0ea5e9
- `sky-600`: #0284c7
- `sky-700`: #0369a1
- `sky-800`: #075985
- `sky-900`: #0c4a6e

**Sun Yellow** - Warm, energetic accent representing solar energy and optimism
- `sun-50`: #fffbeb
- `sun-100`: #fef3c7
- `sun-200`: #fde68a
- `sun-300`: #fcd34d
- `sun-400`: #fbbf24
- `sun-500`: #f59e0b
- `sun-600`: #d97706
- `sun-700`: #b45309
- `sun-800`: #92400e
- `sun-900`: #78350f

## Usage Guidelines

### Primary Usage
- **Headers & Navigation**: Green gradients (green-700 to green-600)
- **Primary Buttons**: Green gradients with hover effects
- **Brand Elements**: Green-700 as main brand color

### Secondary Usage
- **Farming/Agriculture Features**: Earth tones (earth-500 to earth-700)
- **Background Elements**: Sage tones for subtle backgrounds
- **Cards & Containers**: White with sage borders

### Accent Usage
- **Map/Location Features**: Sky blue accents
- **Alerts & Highlights**: Sun yellow for attention
- **Interactive Elements**: Sky blue for links and secondary actions

### Accessibility
- All color combinations maintain WCAG AA contrast ratios
- Focus states use green-500 with proper ring offsets
- Text colors ensure readability across all backgrounds

## Implementation

### Tailwind Configuration
The color palette is implemented in `tailwind.config.js` with custom color definitions.

### CSS Classes
Enhanced utility classes are available in `index.css`:
- `.btn-primary`, `.btn-secondary`, `.btn-accent` for buttons
- `.card`, `.card-header` for containers
- `.badge-success`, `.badge-warning`, `.badge-info` for status indicators
- Custom gradient backgrounds and text effects

### Component Updates
All major components have been updated to use the new palette:
- Header: Green gradient with accent hover states
- Footer: Sage and earth gradient background
- Home page: Comprehensive color scheme throughout
- Chat components: Sage and green color scheme
- Forms: Enhanced input styling with proper focus states

## Benefits
1. **Visual Hierarchy**: Clear distinction between primary, secondary, and accent elements
2. **Accessibility**: Improved contrast ratios and focus indicators
3. **Brand Consistency**: Green remains dominant while adding visual interest
4. **Eco-Friendly Aesthetic**: Natural color palette reinforces environmental theme
5. **Modern Design**: Contemporary gradients and rounded corners
6. **User Experience**: Better visual feedback and interaction states
