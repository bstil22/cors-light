module.exports = function middleware(req, res, next) {
  const brew = req.get('x-coors-light');
  if (brew.match(/(#2C90C2|blue)/)) {
    // Allow COORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next()
  }
  const err = new Error('Your mountains are not blue.');
  return next(err);
};
