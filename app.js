const express = require('express');
const ExpressError = require('./ExpressError');
const { getNums, mean, median, mode } = require('./statFuncts');

const app = express();

app.get('/mean', (req, res, next) => {
  try {
    const nums = getNums(req);
    return res.json({ operation: 'mean', value: mean(nums) });
  } catch (error) {
    next(error);
  }
});

app.get('/median', (req, res, next) => {
  try {
    const nums = getNums(req);
    return res.json({ operation: 'median', value: median(nums) });
  } catch (error) {
    next(error);
  }
});

app.get('/mode', (req, res, next) => {
  try {
    const nums = getNums(req);
    return res.json({ operation: 'mode', value: mode(nums) });
  } catch (error) {
    next(error);
  }
});

// 404
// app.use(function (req, res, next) {
//   const notFoundError = new ExpressError('Not Found', 404);
//   return next(notFoundError);
// });
// Error Handler gets triggered by next(val)
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({ error: { message: err.message, status } });
});
// Listen for requests.
app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
