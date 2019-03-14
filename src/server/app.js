import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import userRouter from './routes/users';
import messageRouter from './routes/messages';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/messages', messageRouter);

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    data: [
      {
        message: 'Sign in successful',
      },
    ],
  });
});

// Handle non existing route with with proper message
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist',
}));




app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;