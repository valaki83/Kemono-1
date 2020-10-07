const { list, ok, tutorial, yiff, status } = require('./views');
const { logdb } = require('../../utils/db');
const express = require('express');
const router = express.Router();

router
  .get('/', (_, res) => res.set('Cache-Control', 'max-age=60, public, stale-while-revalidate=2592000').send(list()))
  .get('/tutorial', (_, res) => res.set('Cache-Control', 'max-age=60, public, stale-while-revalidate=2592000').send(tutorial()))
  .get('/ok', (_, res) => res.set('Cache-Control', 'max-age=60, public, stale-while-revalidate=2592000').send(ok()))
  .get('/yiff', (_, res) => res.set('Cache-Control', 'max-age=60, public, stale-while-revalidate=2592000').send(yiff()))
  .get('/status/:id', async (req, res) => {
    const logs = await logdb('logs').where('log0', 'LIKE', '%' + 'kemono:importer:status:' + req.params.id + '%')
    res.set('Cache-Control', 's-maxage=31557600, no-cache');
    res.send(status({
      id: req.params.id,
      log: logs
    }));
  });

module.exports = router;
