const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/chatbot/chat
// @desc    Get personalized ChatGPT response based on user data
// @access  Private
router.post('/chat', auth, async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get user data for personalized prompts
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Build personalized context based on user data
    const userContext = buildUserContext(user);
    
    // Create personalized prompt
    const systemPrompt = `You are a professional fitness and nutrition AI assistant for SportsPro. 
    
User Profile:
${userContext}

Instructions:
- Provide personalized advice based on the user's specific profile data above
- Focus on fitness, nutrition, sports, and health recommendations
- Be encouraging and supportive
- Use the user's specific details (age, weight, height, sport, goals, etc.) in your responses
- If creating diet plans, consider their body type, activity level, allergies, and medical conditions
- If suggesting workouts, consider their sport, fitness level, and experience
- Keep responses practical and actionable
- Always prioritize safety and suggest consulting professionals when needed

Context: ${context || 'General fitness and nutrition advice'}`;

    // Make request to OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Log the conversation (optional - for analytics)
    console.log(`User ${user.name} asked: ${message}`);
    console.log(`Bot responded: ${botResponse.substring(0, 100)}...`);

    res.json({
      response: botResponse,
      userContext: {
        name: user.name,
        sport: user.sport,
        fitnessLevel: user.fitnessLevel,
        goals: user.goals
      }
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI assistant',
      details: error.message 
    });
  }
});

// Helper function to build user context for personalized prompts
function buildUserContext(user) {
  const bmi = user.height && user.weight ? 
    (user.weight / ((user.height / 100) ** 2)).toFixed(1) : 'Not provided';

  return `
Name: ${user.name}
Age: ${user.age || 'Not provided'}
Height: ${user.height ? user.height + ' cm' : 'Not provided'}
Weight: ${user.weight ? user.weight + ' kg' : 'Not provided'}
BMI: ${bmi}
Body Type: ${user.bodyType || 'Not provided'}
Primary Sport: ${user.sport || 'Not provided'}
Experience Level: ${user.experience || 'Not provided'}
Fitness Level: ${user.fitnessLevel || 'Not provided'}
Activity Level: ${user.activityLevel || 'Not provided'}
Goals: ${user.goals && user.goals.length > 0 ? user.goals.join(', ') : 'Not provided'}
Medical Conditions: ${user.medicalConditions && user.medicalConditions.length > 0 ? user.medicalConditions.join(', ') : 'None'}
Allergies: ${user.allergies && user.allergies.length > 0 ? user.allergies.join(', ') : 'None'}
Location: ${user.location || 'Not provided'}
Sports Preferences: ${user.preferences?.sports && user.preferences.sports.length > 0 ? user.preferences.sports.join(', ') : 'Not provided'}
Budget Preference: ${user.preferences?.budget || 'Not provided'}
  `.trim();
}

// @route   GET /api/chatbot/suggestions
// @desc    Get personalized quick suggestions based on user profile
// @access  Private
router.get('/suggestions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate personalized quick suggestions based on user data
    const suggestions = generatePersonalizedSuggestions(user);

    res.json({ suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// Helper function to generate personalized suggestions
function generatePersonalizedSuggestions(user) {
  const suggestions = [];

  // Diet plan suggestions
  if (user.goals && user.goals.includes('weight-loss')) {
    suggestions.push("Create a weight loss meal plan for me");
  } else if (user.goals && user.goals.includes('muscle-gain')) {
    suggestions.push("Design a muscle building diet plan");
  } else {
    suggestions.push("Create a balanced nutrition plan for me");
  }

  // Workout suggestions based on sport
  if (user.sport) {
    suggestions.push(`Suggest ${user.sport.toLowerCase()} training exercises`);
    suggestions.push(`Create a ${user.sport.toLowerCase()} workout schedule`);
  } else {
    suggestions.push("Recommend a beginner workout routine");
  }

  // Recovery and health suggestions
  suggestions.push("Tips for better recovery and sleep");
  
  // Specific suggestions based on fitness level
  if (user.fitnessLevel === 'Just Starting') {
    suggestions.push("Beginner-friendly fitness tips");
  } else if (user.fitnessLevel === 'Very Active') {
    suggestions.push("Advanced training techniques");
  }

  // Body type specific suggestions
  if (user.bodyType && user.bodyType !== 'Not Sure') {
    suggestions.push(`${user.bodyType} body type specific advice`);
  }

  return suggestions.slice(0, 6); // Return max 6 suggestions
}

module.exports = router;
