const express = require('express');
const { sendWelcomeEmail, sendAchievementEmail } = require('../utils/email');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/email/welcome
// @desc    Send welcome email
// @access  Private
router.post('/welcome', auth, async (req, res) => {
  try {
    const { email, name } = req.body;

    await sendWelcomeEmail(email, name);

    res.json({ message: 'Welcome email sent successfully' });

  } catch (error) {
    console.error('Send welcome email error:', error);
    res.status(500).json({ error: 'Failed to send welcome email' });
  }
});

// @route   POST /api/email/achievement
// @desc    Send achievement notification email
// @access  Private
router.post('/achievement', auth, async (req, res) => {
  try {
    const { email, name, achievement } = req.body;

    await sendAchievementEmail(email, name, achievement);

    res.json({ message: 'Achievement email sent successfully' });

  } catch (error) {
    console.error('Send achievement email error:', error);
    res.status(500).json({ error: 'Failed to send achievement email' });
  }
});

module.exports = router; 