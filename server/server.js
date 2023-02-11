import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Sudoku!',
  });
});

app.get('/:choice', async (req, res) => {
  const { choice } = req.params;
  try {
    const randomSeed = Math.floor(Math.random() * 9999);
    const apiKey = process.env.SUDOKU_RAPID_API_KEY;

    const options = {
      method: 'GET',
      url: 'https://sudoku-generator1.p.rapidapi.com/sudoku/generate',
      params: { seed: randomSeed, difficulty: choice },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com',
      },
    };

    const response = await axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });

    // const options2 = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': apiKey,
    //     'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com',
    //   },
    // };

    // const response2 = await fetch(
    //   `https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=${randomSeed}&difficulty=${choice}`,
    //   options
    // ).then((response) => response.json());

    res.status(200).send({
      response,
    });
  } catch (error) {
    console.error('fetch error', error);
    res.status(500).send(error || 'Something went wrong');
  }
});

app.listen(port, () =>
  console.log(`Sudoku server started on http://localhost:${port}`)
);
