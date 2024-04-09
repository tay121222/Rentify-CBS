const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'example@gmail.com',
    pass: process.env.EMAIL_PWD || 'password',
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else if (success) {
    console.log('Transporter connection verified');
  }
});

async function sendPasswordResetEmail(userEmail, resetToken) {
  const mailOptions = {
    from: 'techsupport@xtechsoftwarelib.com',
    to: userEmail,
    subject: 'Password Reset Request',
    text: 'You are receiving this email because you (or someone else) has requested to reset the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
            + `http://localhost:3000/user/pwd/reset/${resetToken}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

async function sendVerificationEmail(userEmail, verificationToken) {
  const mailOptions = {
    from: 'techsupport@xtechsoftwarelib.com',
    to: userEmail,
    subject: 'Rentify - Email Verification',
    text: 'Thank you for registering with us.\n\n'
            + 'Please click on the following link to verify your email address:\n\n'
            + `http://localhost:3000/user/verify/${verificationToken}\n\n`
            + 'If you did not create an account with us, please ignore this email.\n',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

module.exports = { sendPasswordResetEmail, sendVerificationEmail };
