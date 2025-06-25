# ShrinkWrap - Intelligent File Compression

ShrinkWrap is a modern, intelligent file compression and decompression tool built with Next.js and Genkit. It provides AI-powered suggestions for the best compression algorithm and allows users to easily share their processed files via email.

## Key Features

- **Efficient Compression & Decompression:** Choose from multiple algorithms to compress your files, or decompress files created with ShrinkWrap.
- **AI-Powered Suggestions:** The app analyzes your file type to recommend the most effective compression algorithm.
- **Easy Sharing:** Download your processed files or email them directly to any recipient.
- **Educational:** Learn about different compression algorithms with explanations and links to further reading.

## Quick Start

### 🌐 Live Demo
Visit the live application: [https://shrinkwrap.onrender.com](https://shrinkwrap.onrender.com)

### 🚀 Local Development
Want to run it locally? Check out our [Local Development Guide](./LOCAL_DEVELOPMENT.md) for detailed setup instructions.

**Quick local setup:**
```bash
git clone https://github.com/dreamflowyt/webcomdecomp.git
cd webcomdecomp
npm install
cp env.example .env.local
# Edit .env.local with your API keys
npm run dev
```

## Getting Started: Running Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Installation

First, clone the repository (or if you are in Firebase Studio, the files are already here) and install the necessary dependencies.

```bash
npm install
```

### 2. Environment Variables

The application uses environment variables to configure the email sending functionality.

1.  Create a `.env.local` file in the root of the project by copying the example file:
    ```bash
    cp env.example .env.local
    ```
2.  Open the `.env.local` file and fill in the required values for your SMTP server. For using Gmail, you will need to generate an [App Password](https://myaccount.google.com/apppasswords).

    ```dotenv
    # Google AI API Key for Gemini models
    GOOGLE_AI_API_KEY=your-google-ai-api-key-here
    
    # SMTP Server Configuration for sending emails
    EMAIL_SERVER_HOST="smtp.gmail.com"
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER="your-email@gmail.com"
    EMAIL_SERVER_PASSWORD="your-16-digit-app-password"
    EMAIL_FROM="your-email@gmail.com"
    ```

### 3. Running the Application

This project consists of two main parts that need to run concurrently in separate terminals: the Next.js frontend and the Genkit AI backend.

**Terminal 1: Start the Next.js Frontend**

This command starts the main web application.

```bash
npm run dev
```

The app will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Start the Genkit AI Service**

This command starts the Genkit development server, which handles the AI-powered suggestions.

```bash
npm run genkit:dev
```

This service runs in the background and is called by the Next.js application. You can view the Genkit developer UI at [http://localhost:4000](http://localhost:4000) to inspect flows and traces.

---

That's it! You should now have the full ShrinkWrap application running on your local machine.

## Deployment

### Deploying to Render

This project is configured for easy deployment on Render. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Quick Setup:**
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the environment variables (see DEPLOYMENT.md)
4. Deploy!

The application will automatically handle production configuration and AI flow initialization.
