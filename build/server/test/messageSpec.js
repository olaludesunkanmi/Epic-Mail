"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

var _messageDb = _interopRequireDefault(require("../data/messageDb"));

var _messageMock = require("./mocks/messageMock");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // Get our db from data folder
// Get our  mockMessages
var should = _chai.default.should,
    expect = _chai.default.expect;
should();
expect(); // Use chaiHttp for Http verbs.

_chai.default.use(_chaiHttp.default);

describe('Emails test', function () {
  describe('GET', function () {
    describe('Get all emails', function () {
      it('should return status code 200 and get all emails', function (done) {
        _chai.default.request(_app.default).get('/api/v1/messages').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
      });
    });
    describe('Get a specific email', function () {
      it('should return status code 200 and get one email', function (done) {
        _chai.default.request(_app.default).get('/api/v1/messages').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
      });
    });
    describe('Get all sent emails', function () {
      it('should return status code 200 and get all sent emails', function (done) {
        _chai.default.request(_app.default).get('/api/v1/messages/sent').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].status).to.equal('sent');
          done();
        });
      });
    });
    describe('Get all unread emails', function () {
      it('should return status code 200 and get all unread emails', function (done) {
        _chai.default.request(_app.default).get('/api/v1/messages/unread').end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].status).to.equal('unread');
          done();
        });
      });
    });
  });
  describe('POST', function () {
    describe('Send a valid email', function () {
      it('should return status code 201 and send email', function (done) {
        _chai.default.request(_app.default).post('/api/v1/messages').send(_messageMock.validPostData[0]).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data[0].subject).to.be.a('string');
          expect(res.body.data[0].message).to.be.a('string');
          expect(res.body.data[0].status).to.equal('sent');
          done();
        });
      });
    });
    describe('Sending an email with empty subject', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/messages').send(_messageMock.invalidPost[0]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Subject is required');
          done();
        });
      });
    });
    describe('Sending an email with empty message', function () {
      it('should return status code 400 and send an error message', function (done) {
        _chai.default.request(_app.default).post('/api/v1/messages').send(_messageMock.invalidPost[1]).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Message is required');
          done();
        });
      });
    });
  });
  describe('DELETE', function () {
    describe('Delete an email id that is present', function () {
      it('should return status code 200 and remove message', function (done) {
        var id = 1;

        _chai.default.request(_app.default).delete("/api/v1/messages/".concat(id)).send(_messageDb.default).end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data[0].message).to.equal('Email has been successfully deleted');
          done();
        });
      });
    });
    describe('Delete an email id that is not present', function () {
      it('should return status code 404 and send an error message', function (done) {
        var id = 6;

        _chai.default.request(_app.default).delete("/api/v1/messages/".concat(id)).send(_messageDb.default).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('The message was not found!');
          done();
        });
      });
    });
  });
});