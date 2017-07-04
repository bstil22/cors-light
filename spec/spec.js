const middleware = require('../index.js');
const run = require('express-unit');

describe('middleware', () => {
  it('allows blue mountains', done => {
    const setup = (req, res, next) => {
      req.headers['x-coors-light'] = 'blue';
      next();
    };
    run(setup, middleware, (err, req, res) => {
      expect(err).toBeNull();
      done();
    });
  });

  it('allows blue hex mountains', done => {
    const setup = (req, res, next) => {
      res.header = jasmine.createSpy('header spy');
      req.headers['x-coors-light'] = '#2C90C2';
      next();
    };
    run(setup, middleware, (err, req, res) => {
      expect(err).toBeNull();
      expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'X-Requested-With');
      done();
    });
  });

  it('does not allow partical matches', done => {
    const setup = (req, res, next) => {
      res.header = jasmine.createSpy('header spy');
      req.headers['x-coors-light'] = '#2C90';
      next();
    };
    run(setup, middleware, (err, req, res) => {
      expect(err.message).toEqual('Your mountains are not blue.');
      expect(res.header).not.toHaveBeenCalled();
      done();
    });
  });

  it('does not allow invalid coors light headers', done => {
    const setup = (req, res, next) => {
      req.headers['x-coors-light'] = 'white';
      req.headers['x-light-coors'] = 'blue';
      next();
    };
    run(setup, middleware, (err, req, res) => {
      expect(err.message).toEqual('Your mountains are not blue.');
      done();
    });
  });
});
