const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.body.message }],
      }),
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI API');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
