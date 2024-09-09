const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to check working hours
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('Sorry, our service is available only during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
});

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
