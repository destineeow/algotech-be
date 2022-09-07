const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsWhitelist = [
  'http://localhost:3000',
  'https://algotech-fe.vercel.app',
  'https://algotech-fe-prod.vercel.app'
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // log('out', 'Domain not allowed by CORS', origin) // replace to fix logging spam
        callback(null);
      }
    },
    credentials: true
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.use('/user', require('./public/routes/userRoutes'));
app.use('/category', require('./public/routes/categoryRoutes'));
app.use('/product', require('./public/routes/productRoutes'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
