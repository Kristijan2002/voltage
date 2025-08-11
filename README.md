# Voltage Elektroinštalacije

A professional website for Voltage Elektroinštalacije s.p., a Slovenian electrical installation company. Built with React, Next.js, TypeScript, and Tailwind CSS.

## Features

- **Professional Design**: Modern, responsive design optimized for all devices
- **Service Showcase**: Detailed presentation of electrical services
- **Portfolio Gallery**: Showcase of completed projects with detailed information
- **Admin Panel**: Content management system for services, projects, and FAQ
- **Contact Forms**: Easy communication with potential clients
- **Multilingual Support**: Slovenian language interface
- **SEO Optimized**: Built with Next.js for optimal performance

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence
- **Build Tool**: Next.js with optimized bundling

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voltage-elektroinstalacije
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
volt/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── figma/          # Figma-specific components
│   └── LanguageProvider.tsx
├── styles/              # Global styles and CSS
├── guidelines/          # Design and development guidelines
├── App.tsx             # Main application component
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
```

## Admin Access

The application includes an admin panel for content management:

- **URL**: `/voltageAdminSecretRouteDoNotShare` (or click Admin button in header)
- **Username**: `admin`
- **Password**: `voltage2024`

### Admin Features

- **Services Management**: Add, edit, and delete services
- **Portfolio Management**: Manage project showcase
- **FAQ Management**: Update frequently asked questions
- **Content Editing**: Real-time content updates

## Customization

### Colors and Theme

The design system uses CSS custom properties defined in `styles/globals.css`. Main colors include:

- Primary: Dark blue (#030213)
- Secondary: Light gray (#ececf0)
- Accent: Yellow (#fbbf24)
- Background: White (#ffffff)

### Adding New Services

1. Access the admin panel
2. Navigate to the Services tab
3. Fill in the service form with:
   - Title and description
   - Pricing information
   - Process steps
   - Included materials
   - Brand partnerships

### Adding New Projects

1. Access the admin panel
2. Navigate to the Projects tab
3. Fill in the project form with:
   - Project details and images
   - Client information
   - Technologies used
   - Results and testimonials

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Traditional VPS with Node.js

## Performance

- **Lighthouse Score**: Optimized for 90+ performance score
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **SEO**: Server-side rendering for better search engine visibility

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software for Voltage Elektroinštalacije s.p.

## Support

For technical support or questions about the application, please contact the development team.

---

**Built with ❤️ for Voltage Elektroinštalacije s.p.**
