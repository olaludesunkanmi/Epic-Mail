import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    const token = jwt.sign({
      id,
    },
    process.env.SECRET, { expiresIn: '24hrs' });
    return token;
  };

  export const verifyToken = (req, res, next) => {
    // const token = req.headers.authorization || req.body.token;
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided',
      });
    }
    jwt.verify(token, process.env.SECRET, (error, authData) => {
      if (error) {
        if (error.message.includes('signature')) {
          return res.status(403).json({
            status: 403,
            error: 'No token provided',
          });
        }
        return res.status(403).json({
          error,
        });
      }
      req.authData = authData;
      return next();
    });
  };

