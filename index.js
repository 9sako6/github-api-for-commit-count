const express = require('express');
const request = require('request');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  const url = req.hostname;
  const message = `<h1>GitHub API for commit count</h1>
    <p>
      <a href="https://github.com/9sako6/github-api-for-commit-count">9sako6/github-api-for-commit-count</a>
    </p>
    <h2>How to use</h2>
    <p>
      ${url}/count?user=[username]&repo=[repository]
    </p>`;
  res.send(message);
});

app.get('/count', function(req, res) {
  const user = req.query.user || '';
  const repo = req.query.repo || '';

  request(`https://github.com/${user}/${repo}`, (e, response, body) => {
    if (response.statusCode === 404) {
      console.error('Not Found');
      res.status(404).end();
      return;
    } else if (response.statusCode !== 200) {
      console.error(e);
      res.status(response.statusCode).end();
      return;
    }
    try {
      const commitsElem = body.match(/<span class="num text-emphasized">([^>]+)<\/span>/)[1].trim();
      const commitNum = commitsElem.replace(/,/, '');
      res.send(commitNum); 
    } catch(error) {
      console.error(error);
      res.status(500).end();
      return;
    }
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});