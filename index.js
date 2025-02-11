const express = require('express');
const requestIp = require('request-ip');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware to get the client's IP address
app.use(requestIp.mw());

// Route to handle the home page
app.get('/', (req, res) => {
  const clientIp = req.clientIp;
  const forwardedIps = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',') : [];
  const ispIp = forwardedIps.length > 0 ? forwardedIps[0].trim() : clientIp;

  res.render('index', {
    appName: 'Kepler My Ip',
    myIp: ispIp,
    proxyIp: clientIp !== ispIp ? clientIp : null,
    forwardedIps: forwardedIps
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});