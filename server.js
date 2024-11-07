const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { schedule: getSchedule() });
});

app.get('/book/:time', (req, res) => {
  const time = req.params.time;
  res.render('book', { time: time });
});

app.post('/book/:time', (req, res) => {
    const time = req.params.time;
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.send("Minden mezőt ki kell tölteni!");
    }

    res.render('confirmation', { time, name, phone });
  });

function getSchedule() {
  return [
    { time: '08:00', doctor: 'Dr. Kovács János', specialty: 'Ortopédia' },
    { time: '09:00', doctor: 'Dr. Tóth Zoltán', specialty: 'Szemészet' },
    { time: '10:00', doctor: 'Dr. Nagy Erika', specialty: 'Sebészet' },
    { time: '11:00', doctor: 'Dr. Szabó László', specialty: 'Pszichiátria' }
  ];
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
