# Portfolio Website

## Project Overview

A modern, responsive portfolio website built with cutting-edge web technologies, designed for developers to showcase their skills, projects, and professional journey.

## Tech Stack

### Core Technologies
- **Frontend Library**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Component Library**: Shadcn UI
- **Routing**: React Router DOM

### Key Libraries
- **Data Fetching**: @tanstack/react-query
- **Theme Management**: next-themes
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Validation**: Zod

## Project Structure

```
src/
├── components/
│   ├── ui/          # Shadcn UI components
│   └── ...          # Custom components
├── pages/           # Page components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── data/            # Configuration and translation files
```

## Multi-Language Support

The website supports multiple languages through a robust translation system:
- Language files: `en.json`, `es.json`, `fr.json`
- Translation keys in `portfolio.json`
- Dynamic language switching via LanguageContext

## Content Management

All website content is managed through `portfolio.json`, which includes sections:
- Hero
- About
- Skills
- Projects
- Experience
- Education
- Testimonials
- Contact
- Navigation

### Content Update Process
1. Modify `portfolio.json`
2. Add/update translation keys in language files
3. Test across all supported languages

## Configuration Files

- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Build and development settings
- `tailwind.config.ts`: Styling and theme configuration

## Features

- Responsive, mobile-first design
- Light/dark mode support
- Smooth animations
- Multi-language support
- Performance optimized
- Fully customizable content

## Development Commands

- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Customization

1. Update `portfolio.json` with your personal information
2. Replace translation keys in language files
3. Customize Tailwind theme in `tailwind.config.ts`
4. Modify components as needed

## Performance Optimization

- Code splitting
- Lazy loading
- Optimized images
- Minimal external dependencies

## Deployment

The project is designed to be easily deployed on platforms like:
- Vercel
- Netlify
- GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Add your license information]

## Contact

[Add your contact information]