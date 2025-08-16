const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send verification email
const sendVerificationEmail = async (email, token, name) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to SportsPro - Verify Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to SportsPro! 🏃‍♂️</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your ultimate sports and fitness companion</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${name},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining SportsPro! We're excited to have you on board and help you achieve your fitness goals.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              To get started, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="background: #e9ecef; padding: 10px; border-radius: 5px; word-break: break-all; color: #495057;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-top: 30px;">
              This link will expire in 24 hours. If you didn't create an account with SportsPro, you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The SportsPro Team
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent to ${email}`);
    
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, token, name) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'SportsPro - Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Password Reset Request 🔐</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">SportsPro Account Security</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${name},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              We received a request to reset your password for your SportsPro account.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="background: #e9ecef; padding: 10px; border-radius: 5px; word-break: break-all; color: #495057;">
              ${resetUrl}
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Important:</strong> This link will expire in 1 hour for security reasons. 
                If you didn't request a password reset, you can safely ignore this email.
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The SportsPro Team
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to SportsPro - Let\'s Start Your Fitness Journey!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to SportsPro! 🎉</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Your fitness journey starts now</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${name},</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Congratulations! Your email has been verified and you're now ready to start your fitness journey with SportsPro.
            </p>
            
            <div style="background: #e8f5e8; border: 1px solid #c3e6c3; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5a2d; margin-top: 0;">What you can do now:</h3>
              <ul style="color: #2d5a2d; line-height: 1.8;">
                <li>📊 Track your workouts and progress</li>
                <li>🥗 Log your nutrition and meals</li>
                <li>❤️ Monitor your health vitals</li>
                <li>🎯 Set and achieve your fitness goals</li>
                <li>👥 Connect with the community</li>
                <li>🏆 Earn achievements and badges</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" 
                 style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);">
                Start Your Journey
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-top: 30px;">
              If you have any questions or need help getting started, feel free to reach out to our support team.
            </p>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
              Best regards,<br>
              The SportsPro Team
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    throw error;
  }
};

// Send achievement notification email
const sendAchievementEmail = async (email, name, achievement) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `🏆 Achievement Unlocked: ${achievement.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); color: #333; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🏆 Achievement Unlocked!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.8;">Congratulations on your success!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-bottom: 20px;">Hi ${name},</h2>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
              <h3 style="color: #856404; margin-top: 0; font-size: 24px;">${achievement.title}</h3>
              <p style="color: #856404; font-size: 16px; margin: 10px 0;">${achievement.description}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              You've earned this achievement through your dedication and hard work. Keep up the amazing progress!
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/achievements" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        display: inline-block; 
                        font-weight: bold;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                View All Achievements
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
              Keep pushing your limits!<br>
              The SportsPro Team
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Achievement email sent to ${email}`);
    
  } catch (error) {
    console.error('❌ Error sending achievement email:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  sendAchievementEmail
}; 
