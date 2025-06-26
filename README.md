#  ShrinkWrap - Intelligent File Compression & Decompression

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Gemini%202.0-orange?style=for-the-badge&logo=google)](https://ai.google.dev/)

> **ShrinkWrap** is a modern, intelligent file compression and decompression tool that combines cutting-edge AI technology with powerful compression algorithms to deliver optimal file size reduction with smart suggestions.

🌐 **Live Demo**: [https://shrinkwrap.onrender.com](https://shrinkwrap.onrender.com)

## Features

### AI-Powered Intelligence
- **Smart Algorithm Selection**: AI analyzes your file type and automatically suggests the most effective compression algorithm
- **Gemini 2.0 Integration**: Powered by Google's latest AI model for intelligent recommendations(optional)
- **Real-time Analysis**: Instant file type detection and algorithm optimization

### Advanced Compression
- **Multiple Algorithms**: Support for 5 different compression algorithms
- **Bidirectional Processing**: Both compression and decompression capabilities
- **Format Detection**: Automatic detection of compressed files for seamless decompression
- **Performance Metrics**: Real-time compression ratio and processing time analysis

###  Seamless Sharing
- **Direct Email Integration**: Send compressed files directly to any email address, size limits apply.
- **Cross-Platform Compatibility**: Works on any device with a web browser

###  Modern User Experience
- **Real-time Feedback**: Live progress indicators and status updates
- **Intuitive Interface**: Clean, professional design with excellent UX

## 🛠 Tech Stack

### Frontend
- **[Next.js 15.3.3](https://nextjs.org/)** - React framework with App Router
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18.3.1](https://reactjs.org/)** - UI library
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - icon library

### Backend & AI
- **[Genkit 1.8.0](https://genkit.ai/)** - AI development framework(optional, for Gemini)
- **[Google AI (Gemini)](https://ai.google.dev/)** - Advanced AI models (optional, for advanced recommendation))
- **[Nodemailer](https://nodemailer.com/)** - Email functionality(optional, for email service)



##  Compression Algorithms

ShrinkWrap implements five powerful compression algorithms, each optimized for different file types:

### 1. **Huffman Coding** 
- **Best for**: Files with frequent repeating characters
- **Compression Ratio**: uptoo ~45% reduction
- **Use Cases**: Text files, source code, configuration files
- **How it works**: Creates variable-length codes for characters based on frequency

### 2. **Run-Length Encoding (RLE)** 
- **Best for**: Files with long sequences of the same character
- **Compression Ratio**: upto ~60% reduction
- **Use Cases**: Images, simple graphics, data with repeated patterns
- **How it works**: Replaces repeated characters with count and character pairs

### 3. **LZ77** 
- **Best for**: Text with repeating sequences of characters
- **Compression Ratio**: upto ~55% reduction
- **Use Cases**: Documents, web content, structured data
- **How it works**: Uses sliding window to find and replace repeated phrases

### 4. **DEFLATE** 
- **Best for**: General purpose compression (default choice)
- **Compression Ratio**: upto ~40% reduction
- **Use Cases**: Archives, general files, mixed content
- **How it works**: Combines LZ77 and Huffman coding for optimal results

### 5. **PDF Optimization** 
- **Best for**: PDF files with images and complex content
- **Compression Ratio**: upto ~35% reduction
- **Use Cases**: PDF documents, reports, presentations
- **How it works**: Advanced optimization including image re-compression


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chetan-psl/webcompdecomp.git
   cd webcompdecomp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   
   Configure your `.env` file:(optional for advanced features to work)
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


<div align="center">
  
  <p>
    <a href="https://shrinkwrap.onrender.com"> Website</a> 
    
  </p>
</div> 
