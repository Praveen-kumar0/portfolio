# Portfolio Website

A modern, responsive portfolio website showcasing my work, skills, and experience as a Full Stack Software Engineer.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Modern UI/UX**: Dark purple/black theme with smooth animations
- **Interactive Components**: 
  - Dynamic 3D card tilt effects
  - Scroll-triggered animations
  - Modal overlays for detailed views
- **Contact Form**: Integrated with EmailJS for seamless communication
- **Performance Optimized**: Fast loading with Vite build tool

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Custom CSS with CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

## 📝 Project Structure

```
portfolio/
├── src/
│   ├── components/     # React components
│   ├── assets/         # Static assets
│   ├── index.css       # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Public assets
└── index.html          # HTML template
```

## 🎨 Customization

- Update personal information in component files
- Modify colors in `src/index.css` CSS variables
- Add/remove sections as needed
- Configure EmailJS for contact form functionality

## 📄 License

All rights reserved - Praveen Kumar
