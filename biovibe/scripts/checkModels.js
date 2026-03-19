const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

async function listModels() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('API key not found in .env.local');
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log('Available Models:', JSON.stringify(data.models?.map(m => m.name), null, 2));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
