import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  data: [
    {
      message: 'Welcome to EPIC Mail',
    },
  ],
}));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
