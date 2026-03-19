export const errorHandler = (err, res) => {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  res.json({
    message: err.message || 'Server error',
  });
};