const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
const { Pool } = require('pg');
const keys = require('./keys')

const app = express();
// app.use(cors());
app.use(bodyParser.json());

// const pgPool = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort
// });
// pgPool.on('error', () => {
//   console.log('lost pg connection!');
// });
// pgPool.query('create table if not exists values (number int)').catch(
//   err => {
//     console.log(err);
//   }
// );

const redisClient = redis.createClient({
  retry_strategy: () => 1000,
  host: keys.redisHost,
  port: keys.redisPort
})
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
  res.send('hi');
});
// app.get('/values/all', async (req, res) => {
//   const values = await pgPool.query('select * from values');
//   res.send(values.rows);
// });
app.get('/values/current', (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values);
  });
});
app.post('/values', async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(400).send('index too high!');
  }
  redisClient.hset('values', index, 'nothing to insert yet');
  redisPublisher.publish('insert', index);
  // await pgPool.query('insert into values(number) values ($1)', [index]);

  res.send({
    working: true
  });
});

app.listen(5000, err => {
  console.log('listening...');
});