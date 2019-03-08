import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import router from './routes/user';


const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/', router);

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



app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
