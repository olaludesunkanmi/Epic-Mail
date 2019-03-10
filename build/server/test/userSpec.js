"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _userMock = require("./mocks/userMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should,
    expect = _chai.default.expect;
should();
expect();

_chai.default.use(_chaiHttp.default);

describe('User test', function () {
  describe('SignUp a user', function () {
    describe('User with good details', function () {
      it('should return status code 201 and create a new user', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.validSignUp[0]).end(function (err, res) {
          if (err) done();
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.have.property('token');
          done();
        });
      });
    });
    describe('User with empty email', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[0]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email should be a string');
          done();
        });
      });
    });
    describe('User with empty firstname', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[1]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Firstname is required');
          done();
        });
      });
    });
    describe('User with empty lastname', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[2]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Lastname is required');
          done();
        });
      });
    });
    describe('User with empty password', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[3]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Password is required');
          done();
        });
      });
    });
    describe('User signing up with a short password', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[9]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Password should be 8 to 20 characters long');
          done();
        });
      });
    });
    describe('User with invalid firstname format', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[4]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('First Name field cannot contain numbers and symbols');
          done();
        });
      });
    });
    describe('User with invalid lastname format', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[5]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Last Name field cannot contain numbers and symbols');
          done();
        });
      });
    });
    describe('User with invalid email format', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[6]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email format is invalid');
          done();
        });
      });
    });
    describe('User with short email address', function () {
      it('should return status code 400 and send error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[7]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email should be 10 to 50 characters long');
          done();
        });
      });
    });
    describe('User signing up existing email', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/signup').send(_userMock.invalidSignUp[8]).end(function (err, res) {
          if (err) done();
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email already exists!');
          done();
        });
      });
    });
  });
  describe('Login a user', function () {
    describe('User already signed up', function () {
      it('should return status code 200 and login the user', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/login').send(_userMock.validSignUp[0]).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0]).to.have.property('token');
          done();
        });
      });
    });
    describe('User not signed up', function () {
      it('should return status code 401 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/login').send(_userMock.invalidLogin[0]).end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed');
          done();
        });
      });
    });
    describe('Signed up user providing empty email', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/login').send(_userMock.invalidLogin[1]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Email is required');
          done();
        });
      });
    });
    describe('Signed up user providing empty password', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/login').send(_userMock.invalidLogin[2]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Password is required');
          done();
        });
      });
    });
    describe('Signed up user providing wrong password', function () {
      it('should return status code 401 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/auth/login').send(_userMock.invalidLogin[3]).end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed');
          done();
        });
      });
    });
  });
});