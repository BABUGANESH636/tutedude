const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

const groups = {};

app.post('/create-group', (req, res) => {
  const { groupName } = req.body;

  if (!groupName) {
    return res.status(400).json({ message: 'Missing groupName' });
  }

  if (groups[groupName]) {
    return res.status(400).json({ message: 'Group already exists' });
  }

  groups[groupName] = {
    id: uuidv4(),
    users: [],
    messages: [],
  };

  res.status(200).json({ message: 'Group created', groupName });
});

app.post('/join-group', (req, res) => {
  const { groupName } = req.body;

  if (!groupName || !groups[groupName]) {
    return res.status(400).json({ message: 'Group not found' });
  }

  res.status(200).json({ message: 'Joined group', groupName });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
