const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

// static
app.use(express.static('./public'));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/checkPassword', (req, res) => {
  const password = req.body.password;

  if (password === 'awesome') {
    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      message: 'Incorrect password',
    });
  }
});

app.listen(port, () => {
  console.log(`Server launched at http://localhost:${port}`);
});
