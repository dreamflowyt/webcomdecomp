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
        <p>Hello,</p>
        <p>Thank you for using ShrinkWrap! Your processed file, <strong>${fileName}</strong>, is attached to this email.</p>
        <p>Best regards,<br/>The ShrinkWrap Team</p>
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
