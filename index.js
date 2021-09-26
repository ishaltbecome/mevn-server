require('dotenv').config();
const express = require('express');

const logger = require('./src/logger.js');
const taskRouter = require('./src/routers/taskRouter.js');
const mongo = require('./src/mongodb.js');

const app = express();

const PORT = process.env.PORT ?? 8080;

app
  .use(express.json())
  .use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
  res.redirect('/api/tasks');
});

// logger.error('error');

app.listen(PORT, async () => {
  try {
    await mongo
      .connect()
      .then(() => logger.info('Successfully connected to db'))
      .catch(e => logger.error(e));
    logger.info(`server listen port ${PORT}`);
  } catch (err) {
    logger.error(err);
  }
});
