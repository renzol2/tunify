const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/ping', (req, response) => {
  response.send('pong');
});

const advanced = require('./routes/advanced');
const users = require('./routes/users');
const artists = require('./routes/artists');
const songs = require('./routes/songs');
const genres = require('./routes/genres');

const song_genre = require('./routes/song_genre');
const artist_genre = require('./routes/artist_genre');
const artist_song = require('./routes/artist_song');
const user_genre = require('./routes/user_genre');

app.use('/api/advanced', advanced);
app.use('/api/users', users);
app.use('/api/artists', artists);
app.use('/api/songs', songs);
app.use('/api/genres', genres);

app.use('/api/song_genre', song_genre);
app.use('/api/artist_genre', artist_genre);
app.use('/api/artist_song', artist_song);
app.use('/api/user_genre', user_genre);

app.listen(3002, () => {
  console.log('running on port 3002');
});
