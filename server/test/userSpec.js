import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { validSignUp, invalidSignUp, invalidLogin } from './mocks/userMock';

const { should, expect } = chai;
should();
expect();

chai.use(chaiHttp);

describe('User test', () => {
  describe('SignUp a user', () => {
    describe('User with good details', () => {
      it('should return status code 201 and create a new user', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(validSignUp[0])
          .end((err, res) => {
            if (err) done();
            res.should.have.status(201);
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
    describe('User with empty email', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[0])
          .end((err, res) => {
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
    describe('User with empty firstname', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[1])
          .end((err, res) => {
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
    describe('User with empty lastname', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[2])
          .end((err, res) => {
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
    describe('User with empty password', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[3])
          .end((err, res) => {
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
    describe('User signing up with a short password', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[9])
          .end((err, res) => {
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
    describe('User with invalid firstname format', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[4])
          .end((err, res) => {
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
    describe('User with invalid lastname format', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[5])
          .end((err, res) => {
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
    describe('User with invalid email format', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[6])
          .end((err, res) => {
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
    describe('User with short email address', () => {
      it('should return status code 400 and send error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[7])
          .end((err, res) => {
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
    describe('User signing up existing email', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .send(invalidSignUp[8])
          .end((err, res) => {
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

  describe('Login a user', () => {
    describe('User already signed up', () => {
      it('should return status code 200 and login the user', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(validSignUp[0])
          .end((err, res) => {
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
    describe('User not signed up', () => {
      it('should return status code 401 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(invalidLogin[0])
          .end((err, res) => {
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
    describe('Signed up user providing empty email', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(invalidLogin[1])
          .end((err, res) => {
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
    describe('Signed up user providing empty password', () => {
      it('should return status code 400 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(invalidLogin[2])
          .end((err, res) => {
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
    describe('Signed up user providing wrong password', () => {
      it('should return status code 401 and send an error message', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(invalidLogin[3])
          .end((err, res) => {
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
