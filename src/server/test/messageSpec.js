import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

// // Get our db from data folder
import messages from '../data/messageDb';

// Get our  mockMessages
import { validPostData, invalidPost } from './mocks/messageMock';

const { should, expect } = chai;
should();
expect();

// Use chaiHttp for Http verbs.
chai.use(chaiHttp);

describe('Emails test', () => {
  describe('GET', () => {
    describe('Get all emails', () => {
      it('should return status code 200 and get all emails', (done) => {
        chai
          .request(app)
          .get('/api/v1/messages')
          .end((err, res) => {
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
    describe('Get a specific email', () => {
      it('should return status code 200 and get one email', (done) => {
        chai
          .request(app)
          .get('/api/v1/messages')
          .end((err, res) => {
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
    describe('Get all sent emails', () => {
      it('should return status code 200 and get all sent emails', (done) => {
        chai
          .request(app)
          .get('/api/v1/messages/sent')
          .end((err, res) => {
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
    describe('Get all unread emails', () => {
      it('should return status code 200 and get all unread emails', (done) => {
        chai
          .request(app)
          .get('/api/v1/messages/unread')
          .end((err, res) => {
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

  describe('POST', () => {
    describe('Send a valid email', () => {
      it('should return status code 201 and send email', (done) => {
        chai
          .request(app)
          .post('/api/v1/messages')
          .send(validPostData[0])
          .end((err, res) => {
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
    describe('Sending an email with empty subject', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/messages')
          .send(invalidPost[0])
          .end((err, res) => {
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
    describe('Sending an email with empty message', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/messages')
          .send(invalidPost[1])
          .end((err, res) => {
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

  describe('DELETE', () => {
    describe('Delete an email id that is present', () => {
      it('should return status code 200 and remove message', (done) => {
        const id = 1;
        chai
          .request(app)
          .delete(`/api/v1/messages/${id}`)
          .send(messages)
          .end((err, res) => {
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
    describe('Delete an email id that is not present', () => {
      it('should return status code 404 and send an error message', (done) => {
        const id = 6;
        chai
          .request(app)
          .delete(`/api/v1/messages/${id}`)
          .send(messages)
          .end((err, res) => {
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
