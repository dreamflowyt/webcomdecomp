'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const sendEmailSchema = z.object({
  to: z.string().email(),
  fileName: z.string(),
  fileContent: z.string(),
});

export async function sendEmail(formData: FormData) {
  const validatedFields = sendEmailSchema.safeParse({
    to: formData.get('to'),
    fileName: formData.get('fileName'),
    fileContent: formData.get('fileContent'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
    };
  }

  const { to, fileName, fileContent } = validatedFields.data;

  const {
    EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_FROM,
  } = process.env;
    
  if (
    !EMAIL_SERVER_HOST ||
    !EMAIL_SERVER_PORT ||
    !EMAIL_SERVER_USER ||
    !EMAIL_SERVER_PASSWORD ||
    !EMAIL_FROM
  ) {
    console.error('Missing SMTP environment variables');
    return {
      error: 'Server is not configured for sending emails. Please contact support.',
    };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: parseInt(EMAIL_SERVER_PORT, 10),
    secure: parseInt(EMAIL_SERVER_PORT, 10) === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    await transporter.verify();
  } catch (error) {
    console.error('SMTP connection error:', error);
    return {
      error: 'Could not connect to the email server. Please check configuration or try again later.',
    };
  }
  
  try {
    await transporter.sendMail({
      from: `ShrinkWrap <${EMAIL_FROM}>`,
      to,
      subject: `Your processed file: ${fileName}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Processed File from ShrinkWrap</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #181a1b; font-family: 'IBM Plex Mono', 'Courier New', Courier, monospace; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 40px 20px;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="#1e1f21" style="padding: 40px 0 30px 0; border: 1px solid #252629; border-bottom: none; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                                     <h1 style="color: #f92a82; font-family: 'Poppins', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 28px; margin: 0; font-weight: 700;">ShrinkWrap</h1>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#1e1f21" style="padding: 20px 30px 40px 30px; border: 1px solid #252629; border-top: none; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="padding: 20px 0; color: #fcfcfc; font-family: 'IBM Plex Mono', 'Courier New', Courier, monospace; font-size: 16px; line-height: 24px;">
                                                Hello,
                                                <br/><br/>
                                                Thank you for using ShrinkWrap! Your processed file, <strong style="color: #f92a82; font-weight: 600;">${fileName}</strong>, is attached to this email.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="color: #a1a1aa; font-family: 'IBM Plex Mono', 'Courier New', Courier, monospace; font-size: 14px;">
                                                Best regards,<br/>The ShrinkWrap Team
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: fileName,
          content: fileContent,
        },
      ],
    });

    return { success: `Email sent successfully to ${to}.` };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'An unexpected error occurred while sending the email.' };
  }
}
