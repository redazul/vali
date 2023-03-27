const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3005;
const apiKey = process.env.VALI_API_KEY;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());


app.get('/ping', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.send('pong');
});

app.post('/run-command', (req, res) => {
  const { key, command, scriptPath } = req.body;

  if (!key || key !== apiKey) {
    res.status(401).json({ error: 'Invalid API key' });
    return;
  }

  if (!command && !scriptPath) {
    res.status(400).json({ error: 'No command or script provided' });
    return;
  }

  if (command && scriptPath) {
    res.status(400).json({ error: 'Both command and script provided, please provide only one' });
    return;
  }

  const execCommand = scriptPath ? `bash ${scriptPath}` : command;

  exec(execCommand, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: `Execution failed: ${error.message}` });
      return;
    }

    res.json({ stdout, stderr });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
