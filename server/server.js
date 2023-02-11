import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/:choice', async (req, res) => {
  const { choice } = req.params;
  try {
    const randomSeed = Math.floor(Math.random() * 9999);
    const apiKey = process.env.SUDOKU_RAPID_API_KEY;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com',
      },
    };

    const response = await fetch(
      `https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=${randomSeed}&difficulty=${choice}`,
      options
    ).then((response) => response.json());

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
