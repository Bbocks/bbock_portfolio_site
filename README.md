# Brett Bock - Interactive Systems Engineer Portfolio

A modern, interactive portfolio website showcasing systems engineering expertise, homelab infrastructure, and technical projects. Built with Vite, React, TypeScript, and TailwindCSS.

## 🚀 Features

### Core Sections
- **Hero Section**: Animated typing effect with network topology background
- **Projects Showcase**: Interactive cards with terminal demos and expandable details
- **Experience Timeline**: Vertical timeline with expandable role information
- **Skills Dashboard**: Dynamic charts and interactive skill bubbles
- **Homelab Status**: Live system monitoring with real-time metrics
- **Blog Section**: Technical articles with category filtering
- **Contact Form**: Clean contact form with validation

### Technical Features
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Terminal**: Simulated command execution for project demos
- **Real-time Updates**: Live homelab status with simulated metrics
- **Smooth Animations**: Framer Motion animations throughout
- **Dark Theme**: Technical aesthetic with neon accents
- **Fast Development**: Vite's lightning-fast HMR and build times
- **SEO Optimized**: Meta tags and structured data

## 🛠️ Tech Stack

- **Build Tool**: Vite 5.x
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom animations
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Fonts**: Inter + JetBrains Mono

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/bbock-portfolio.git
   cd bbock-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
Update the following files with your information:

- `src/components/HeroSection.tsx` - Update name, title, and description
- `src/components/ProjectsSection.tsx` - Add your projects
- `src/components/ExperienceSection.tsx` - Update work experience
- `src/components/SkillsSection.tsx` - Modify skills and proficiency levels
- `src/components/ContactSection.tsx` - Update contact information

### Styling
- Modify `tailwind.config.js` for color scheme changes
- Update `src/styles/globals.css` for custom animations and styles
- Adjust component-specific styles in individual component files

### Content
- Replace placeholder images in the `public/images/` directory
- Update project screenshots and diagrams
- Add your actual resume PDF to `public/resume.pdf`

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── HeroSection.tsx      # Landing page with typing animation
│   │   ├── Navigation.tsx       # Responsive navigation
│   │   ├── ProjectsSection.tsx  # Interactive project cards
│   │   ├── ExperienceSection.tsx # Timeline with expandable details
│   │   ├── SkillsSection.tsx    # Dynamic charts and skill bubbles
│   │   ├── HomelabSection.tsx   # Live system monitoring
│   │   ├── BlogSection.tsx      # Technical articles
│   │   ├── ContactSection.tsx   # Contact form and info
│   │   ├── NetworkAnimation.tsx # Background network animation
│   │   └── InteractiveTerminal.tsx # Terminal simulation
│   ├── styles/
│   │   └── globals.css          # Global styles and Tailwind imports
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # React entry point
├── public/
│   ├── images/                  # Project images and screenshots
│   └── resume.pdf               # Your resume
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy automatically

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically

### Self-hosted (Homelab)
1. Build the project: `npm run build`
2. Serve the `dist` directory with your web server
3. Configure your reverse proxy (Nginx/Traefik)
4. Set up SSL certificates

### Docker Deployment
```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for any API keys or configuration:

```env
VITE_SITE_URL=https://yourdomain.com
VITE_GA_ID=your-google-analytics-id
```

### API Integration
The portfolio is designed to be easily extended with backend APIs:

- Contact form submission
- Real homelab metrics
- Blog post management
- Analytics tracking

## 📝 Content Management

### Adding New Projects
1. Edit `src/components/ProjectsSection.tsx`
2. Add project data to the `projects` array
3. Include terminal commands for interactive demos
4. Add project images to `public/images/`

### Writing Blog Posts
1. Add post data to `src/components/BlogSection.tsx`
2. Create full article content (consider using MDX)
3. Add appropriate tags and categories
4. Update the featured post selection

### Updating Skills
1. Modify the `skills` array in `src/components/SkillsSection.tsx`
2. Adjust proficiency levels (0-100)
3. Update skill categories and colors
4. Add new skill bubbles as needed

## 🎯 Performance Optimization

- Vite's lightning-fast development server and HMR
- Optimized production builds with tree shaking
- Images are optimized and served efficiently
- Animations use `transform` and `opacity` for GPU acceleration
- Lazy loading for components and images
- Code splitting with dynamic imports

## 🔍 SEO Features

- Meta tags for social sharing
- Structured data for search engines
- Semantic HTML structure
- Fast loading times
- Mobile-friendly design

## 🚀 Migration from Next.js

This portfolio was successfully migrated from Next.js to Vite for improved performance and development experience:

### Benefits of Vite Migration
- **Faster Development**: Lightning-fast HMR and server startup
- **Simpler Configuration**: Less "magic" and more predictable behavior
- **Better TypeScript Support**: Native TypeScript integration
- **Cleaner Build Process**: More control over the build pipeline
- **Reduced Bundle Size**: Optimized production builds

### Migration Changes
- Removed Next.js specific files (`next.config.js`, `next-env.d.ts`)
- Restructured components from `components/` to `src/components/`
- Removed `'use client'` directives (not needed in Vite)
- Updated import paths and build configuration
- Maintained all functionality including interactive terminal

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [React](https://reactjs.org/) for the UI framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Recharts](https://recharts.org/) for data visualization

---

**Built with ❤️ for the systems engineering community**

For questions or support, reach out at [brett.bock@example.com](mailto:brett.bock@example.com)
