const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

app.use(bodyParser.json());

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
