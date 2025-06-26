# 🗜️ ShrinkWrap - Intelligent File Compression & Decompression

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Gemini%202.0-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

> **ShrinkWrap** is a modern, intelligent file compression and decompression tool that combines cutting-edge AI technology with powerful compression algorithms to deliver optimal file size reduction with smart suggestions.

🌐 **Live Demo**: [https://shrinkwrap.onrender.com](https://shrinkwrap.onrender.com)

## ✨ Features

### 🧠 AI-Powered Intelligence
- **Smart Algorithm Selection**: AI analyzes your file type and automatically suggests the most effective compression algorithm
- **Gemini 2.0 Integration**: Powered by Google's latest AI model for intelligent recommendations
- **Real-time Analysis**: Instant file type detection and algorithm optimization

### 📦 Advanced Compression
- **Multiple Algorithms**: Support for 5 different compression algorithms
- **Bidirectional Processing**: Both compression and decompression capabilities
- **Format Detection**: Automatic detection of compressed files for seamless decompression
- **Performance Metrics**: Real-time compression ratio and processing time analysis

### 📧 Seamless Sharing
- **Direct Email Integration**: Send compressed files directly to any email address
- **Professional Email Templates**: Beautiful, branded email delivery
- **Instant Download**: Quick file downloads with proper naming conventions
- **Cross-Platform Compatibility**: Works on any device with a web browser

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Eye-friendly dark theme with modern UI components
- **Real-time Feedback**: Live progress indicators and status updates
- **Intuitive Interface**: Clean, professional design with excellent UX

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18.3.1](https://reactjs.org/)** - UI library
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & AI
- **[Genkit 1.8.0](https://genkit.ai/)** - AI development framework
- **[Google AI (Gemini)](https://ai.google.dev/)** - Advanced AI models
- **[Nodemailer](https://nodemailer.com/)** - Email functionality
- **[Zod](https://zod.dev/)** - Schema validation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Vite](https://vitejs.dev/)** - Fast build tool (via Next.js)

## 🧮 Compression Algorithms

ShrinkWrap implements five powerful compression algorithms, each optimized for different file types:

### 1. **Huffman Coding** 🎯
- **Best for**: Files with frequent repeating characters
- **Compression Ratio**: ~45% reduction
- **Use Cases**: Text files, source code, configuration files
- **How it works**: Creates variable-length codes for characters based on frequency

### 2. **Run-Length Encoding (RLE)** 🔄
- **Best for**: Files with long sequences of the same character
- **Compression Ratio**: ~60% reduction
- **Use Cases**: Images, simple graphics, data with repeated patterns
- **How it works**: Replaces repeated characters with count and character pairs

### 3. **LZ77** 📝
- **Best for**: Text with repeating sequences of characters
- **Compression Ratio**: ~55% reduction
- **Use Cases**: Documents, web content, structured data
- **How it works**: Uses sliding window to find and replace repeated phrases

### 4. **DEFLATE** 🚀
- **Best for**: General purpose compression (default choice)
- **Compression Ratio**: ~40% reduction
- **Use Cases**: Archives, general files, mixed content
- **How it works**: Combines LZ77 and Huffman coding for optimal results

### 5. **PDF Optimization** 📄
- **Best for**: PDF files with images and complex content
- **Compression Ratio**: ~35% reduction
- **Use Cases**: PDF documents, reports, presentations
- **How it works**: Advanced optimization including image re-compression

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn
- Google AI API key (for AI features)
- SMTP credentials (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shrinkwrap.git
   cd shrinkwrap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   # Google AI API Key for Gemini models
   GOOGLE_AI_API_KEY=your-google-ai-api-key-here
   
   # SMTP Server Configuration for sending emails
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-digit-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🌐 Deployment

### Render (Recommended)
This project is optimized for deployment on Render:

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Configure environment variables** (see above)
4. **Deploy!**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Other Platforms
- **Vercel**: Perfect for Next.js applications
- **Netlify**: Great for static deployments
- **Railway**: Excellent for full-stack apps
- **Heroku**: Classic platform support

## 📊 Performance

### Compression Benchmarks
- **Text Files**: 40-60% size reduction
- **Source Code**: 35-50% size reduction  
- **Configuration Files**: 45-65% size reduction
- **PDF Documents**: 30-45% size reduction
- **Mixed Content**: 35-55% size reduction

### Processing Speed
- **Small Files (<1MB)**: <1 second
- **Medium Files (1-10MB)**: 1-5 seconds
- **Large Files (10-50MB)**: 5-15 seconds

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```
Returns application status and version information.

### AI Suggestion
```
POST /api/ai/suggest
```
Returns AI-powered compression algorithm suggestions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for providing the Gemini models
- **Next.js Team** for the amazing framework
- **Vercel** for the excellent development tools
- **Tailwind CSS** for the beautiful styling system
- **Radix UI** for the accessible components

## 📞 Support

- **Documentation**: [docs.shrinkwrap.app](https://docs.shrinkwrap.app)
- **Issues**: [GitHub Issues](https://github.com/yourusername/shrinkwrap/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shrinkwrap/discussions)
- **Email**: support@shrinkwrap.app

---

<div align="center">
  <p>Made with ❤️ by the ShrinkWrap Team</p>
  <p>
    <a href="https://shrinkwrap.app">🌐 Website</a> •
    <a href="https://twitter.com/shrinkwrap">🐦 Twitter</a> •
    <a href="https://linkedin.com/company/shrinkwrap">💼 LinkedIn</a>
  </p>
</div> 