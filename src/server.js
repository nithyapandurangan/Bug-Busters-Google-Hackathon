const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Simple eligibility endpoint
app.post('/api/check-eligibility', (req, res) => {
  console.log('Received request:', req.body);
  
  // Simple response for testing
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    summary: {
      totalItems: 1,
      eligible: 0,
      notEligible: 1
    },
    items: [{
      id: 1,
      fid: 1,
      uid: 'test',
      qty: 1,
      itemname: 'Test Item',
      itemcategory: 'cosmetics',
      isEligible: false,
      reason: 'Test restriction'
    }]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});