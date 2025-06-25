# Local Development Guide for ShrinkWrap

This guide will help you set up and run ShrinkWrap locally on your machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/) (for cloning the repository)

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/dreamflowyt/webcomdecomp.git
cd webcomdecomp

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Copy the example environment file
cp env.example .env.local
```

Edit `.env.local` with your configuration:

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

### 3. Running the Application

#### Option A: Development Mode (Recommended for development)

This runs the Next.js development server with hot reloading:

```bash
npm run dev
```

The app will be available at [http://localhost:9002](http://localhost:9002)

#### Option B: Production Mode (For testing production build)

First build the application, then start it:

```bash
# Build the application
npm run build

# Start the production server
npm run start:local
```

The app will be available at [http://localhost:9002](http://localhost:9002)

### 4. AI Development Server (Optional)

For advanced AI development and debugging, you can also run the Genkit development server:

```bash
# In a separate terminal
npm run genkit:dev
```

This will start the Genkit developer UI at [http://localhost:4000](http://localhost:4000)

## Environment Variables Explained

### Required Variables

- **`GOOGLE_AI_API_KEY`**: Your Google AI API key for Gemini models
  - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Email Configuration (Optional for local testing)

- **`EMAIL_SERVER_HOST`**: SMTP server host (e.g., `smtp.gmail.com`)
- **`EMAIL_SERVER_PORT`**: SMTP server port (e.g., `587`)
- **`EMAIL_SERVER_USER`**: Your email address
- **`EMAIL_SERVER_PASSWORD`**: Your email app password (16-digit for Gmail)
- **`EMAIL_FROM`**: The email address to send from

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build the application for production
- `npm run start:local` - Start production server locally
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Troubleshooting

### Common Issues

1. **Port 9002 already in use**
   ```bash
   # Kill the process using port 9002
   npx kill-port 9002
   ```

2. **Environment variables not loading**
   - Make sure your `.env.local` file is in the root directory
   - Restart the development server after adding environment variables

3. **AI features not working**
   - Verify your `GOOGLE_AI_API_KEY` is set correctly
   - Check the browser console for any errors

4. **Email functionality not working**
   - Ensure all email environment variables are set
   - For Gmail, make sure you're using an App Password, not your regular password

### Getting Help

- Check the browser console for error messages
- Look at the terminal output for build errors
- Verify all environment variables are set correctly

## Development Tips

- The app uses Next.js 15 with App Router
- AI flows are automatically loaded in both development and production
- Hot reloading is enabled in development mode
- TypeScript is configured for type checking
- Tailwind CSS is used for styling

## Next Steps

Once you have the app running locally:

1. Try uploading a small text file to test compression
2. Test the AI suggestion feature
3. Try the email functionality (if configured)
4. Explore the different compression algorithms

Happy coding! 🚀 