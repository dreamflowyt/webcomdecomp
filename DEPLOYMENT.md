# ShrinkWrap Deployment Guide for Render

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Google AI API Key
- `GOOGLE_AI_API_KEY`: Your Google AI API key for Gemini models

### Email Configuration (SMTP)
- `EMAIL_SERVER_HOST`: SMTP server host (e.g., `smtp.gmail.com`)
- `EMAIL_SERVER_PORT`: SMTP server port (e.g., `587`)
- `EMAIL_SERVER_USER`: Your email address
- `EMAIL_SERVER_PASSWORD`: Your email app password (16-digit for Gmail)
- `EMAIL_FROM`: The email address to send from

## Deployment Steps

1. **Connect your GitHub repository** to Render
2. **Create a new Web Service**
3. **Configure the service:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. **Add the environment variables** listed above
5. **Deploy**

## Notes

- The application will automatically use the `$PORT` environment variable provided by Render
- All AI flows are automatically initialized in production
- The application is configured to work with Next.js 15 and Genkit AI 