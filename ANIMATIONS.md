# Animation System Documentation

This project includes a comprehensive animation system built with Framer Motion that provides smooth, scroll-triggered animations throughout the website.

## Features

- **Scroll-triggered animations**: Elements animate when they come into view
- **Multiple animation variants**: Fade, slide, bounce, scale, and rotate effects
- **Staggered animations**: Sequential animations for grid layouts
- **Hover effects**: Interactive hover animations on cards and buttons
- **Performance optimized**: Uses `once: true` to prevent re-animations
- **TypeScript support**: Fully typed components and variants

## Components

### AnimatedSection
Wraps content with scroll-triggered animations.

```tsx
<AnimatedSection className="py-20" delay={0.2}>
  <h2>Your content here</h2>
</AnimatedSection>
```

### AnimatedCard
Animated card component with hover effects.

```tsx
<AnimatedCard 
  variant="fadeInScale" 
  delay={0.3}
  hover={true}
  onClick={() => console.log('clicked')}
>
  <Card>Your card content</Card>
</AnimatedCard>
```

### AnimatedText
Animated text elements with different variants.

```tsx
<AnimatedText 
  as="h1" 
  variant="fadeInUp" 
  delay={0.2}
  className="text-4xl"
>
  Your heading
</AnimatedText>
```

### AnimatedGrid
Staggered grid animations for multiple items.

```tsx
<AnimatedGrid 
  className="grid md:grid-cols-3 gap-6" 
  staggerDelay={0.1}
>
  {items.map(item => <Item key={item.id} />)}
</AnimatedGrid>
```

### AnimatedIcon
Animated icons with various effects.

```tsx
<AnimatedIcon 
  variant="bounceIn" 
  delay={0.4}
  size="lg"
  className="bg-blue-500 rounded-full"
>
  <CheckCircle className="h-8 w-8 text-white" />
</AnimatedIcon>
```

## Animation Variants

### Basic Animations
- `fadeInUp`: Fades in from below
- `fadeInLeft`: Slides in from the left
- `fadeInRight`: Slides in from the right
- `fadeInScale`: Scales in from smaller size
- `bounceIn`: Bounces in with spring effect
- `scaleIn`: Simple scale animation
- `rotateIn`: Rotates in with scale

### Advanced Animations
- `staggerContainer`: Container for staggered animations
- `staggerItem`: Individual item in staggered animation
- `slideInFromBottom`: Slides in from bottom
- `heightExpand`: Expands height from 0

## Usage Examples

### Hero Section
```tsx
<AnimatedText 
  as="h1" 
  className="mb-6 text-4xl md:text-6xl"
  variant="fadeInUp"
  delay={0.2}
>
  Welcome to Our Site
</AnimatedText>
```

### Services Grid
```tsx
<AnimatedGrid className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
  {services.map((service, index) => (
    <AnimatedCard 
      key={service.id} 
      variant="fadeInScale"
      delay={index * 0.1}
      hover={true}
    >
      <ServiceCard service={service} />
    </AnimatedCard>
  ))}
</AnimatedGrid>
```

### Contact Form
```tsx
<AnimatedCard variant="fadeInRight" delay={0.6}>
  <ContactForm />
</AnimatedCard>
```

## Customization

### Adding New Variants
1. Add new variant to `AnimationVariants.ts`:
```tsx
export const customVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotate: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};
```

2. Update component interfaces to include the new variant.

### Custom Delays
```tsx
<AnimatedCard delay={0.5}>Content</AnimatedCard>
<AnimatedGrid staggerDelay={0.2}>Items</AnimatedGrid>
```

### Disabling Hover Effects
```tsx
<AnimatedCard hover={false}>Content</AnimatedCard>
```

## Performance Tips

1. **Use `once: true`**: Prevents re-animations on scroll
2. **Optimize delays**: Don't use excessive delays that slow down the experience
3. **Limit simultaneous animations**: Too many animations at once can impact performance
4. **Use appropriate variants**: Choose simple variants for better performance

## Browser Support

- Modern browsers with CSS3 support
- Framer Motion requires ES6+ support
- Graceful degradation for older browsers

## Troubleshooting

### Animations not triggering
- Check if elements are in viewport
- Verify `useInView` hook is working
- Ensure proper ref assignment

### Performance issues
- Reduce number of simultaneous animations
- Use simpler variants
- Check for memory leaks in components

### TypeScript errors
- Ensure all variants are properly typed
- Check component prop interfaces
- Verify import statements

## Examples in the Codebase

- **Hero Section**: `pages/index.tsx` lines 358-388
- **Services Grid**: `pages/index.tsx` lines 407-463
- **Portfolio Section**: `pages/index.tsx` lines 512-578
- **Contact Form**: `pages/index.tsx` lines 721-864

The animation system is designed to be flexible, performant, and easy to use. All animations are scroll-triggered and provide a smooth, professional user experience.
