# Email Setup Guide

This guide explains how to set up the email functionality for the contact form.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Email Configuration (for contact form)
MAIL_HOST=your_smtp_host_here
MAIL_PORT=465
MAIL_USER=your_email_username_here
MAIL_PASS=your_email_password_here
```

## SMTP Configuration

The contact form uses Nodemailer to send emails via SMTP. Here are some common SMTP providers:

### Gmail
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=your_gmail_username@gmail.com
MAIL_PASS=your_app_password_here
```

**Note:** For Gmail, you need to use an App Password, not your regular password. Enable 2-factor authentication and generate an App Password.

### Outlook/Hotmail
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USER=your_outlook_username@outlook.com
MAIL_PASS=your_password_here
```

### Custom SMTP Server
```env
MAIL_HOST=mail.yourdomain.com
MAIL_PORT=465
MAIL_USER=your_username@yourdomain.com
MAIL_PASS=your_password_here
```

## How It Works

1. When a user submits the contact form, the form data is sent to `/api/sendMail`
2. The API endpoint uses Nodemailer to send an email to your business email address
3. The email contains the user's name, email, phone, and message
4. The user receives feedback about the success or failure of the email sending

## Testing

To test the email functionality:

1. Set up your environment variables
2. Start the development server: `npm run dev`
3. Navigate to the contact form
4. Fill out and submit the form
5. Check your email inbox for the message

## Troubleshooting

- **Authentication failed**: Check your email credentials and ensure you're using the correct SMTP settings
- **Connection timeout**: Verify your SMTP host and port settings
- **Gmail issues**: Make sure you're using an App Password, not your regular password
- **Port issues**: Try port 587 with `secure: false` for some providers

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong passwords for your email accounts
- Consider using environment-specific email addresses for testing
