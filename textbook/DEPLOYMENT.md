# Textbook Deployment Guide

## Production Build

To build the textbook for production deployment:

```bash
cd textbook
npm run build
```

This creates a static build in the `build/` directory optimized for deployment.

## Deployment Process

### Local Testing
1. Build the textbook: `npm run build`
2. Serve locally: `npm run serve`
3. Test all navigation and content accessibility

### Deployment Options

#### GitHub Pages
1. Push built files to `gh-pages` branch
2. Configure GitHub Pages to serve from the branch

#### Web Server
1. Upload contents of `build/` directory to web server
2. Ensure proper MIME types for static assets
3. Configure caching headers for performance

## Quality Assurance Checklist

Before deployment, verify:

- [ ] All navigation links work correctly
- [ ] Cross-references between chapters function properly
- [ ] Code blocks display correctly with syntax highlighting
- [ ] Images and diagrams render properly
- [ ] Search functionality works across all content
- [ ] Mobile responsiveness is maintained
- [ ] Load times are acceptable (<2s on standard connections)
- [ ] All external links are valid

## Performance Optimization

The build process includes:
- Asset minification and compression
- Bundle optimization
- Image optimization
- Code splitting for faster loading

## Post-Deployment Verification

After deployment:

1. Test navigation across all chapters
2. Verify search functionality
3. Check mobile and desktop rendering
4. Validate load times
5. Test all interactive elements
6. Confirm all content displays correctly

## Rollback Procedure

To rollback to a previous version:
1. Keep backup of previous build
2. Replace current deployment with previous version
3. Clear any CDN caches if applicable