import { config } from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';

config();
import { connectDb } from './database';
import { vaultRoutes, vaultBackupRoutes, signatureRoutes, activityRoutes } from './routes';
import { postRequestSignatureVerifier } from './middleware'

const app = express();

// Built-In Middleware
app.options('*', cors())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});
app.use(logger('dev'));
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}));
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use(postRequestSignatureVerifier);

// * Routes * //
app.use('/v1/vaults/backups', vaultBackupRoutes);
app.use('/v1/vaults', vaultRoutes);
app.use('/v1/signatures', signatureRoutes);
app.use('/v1/activities', activityRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (req.app.get('env') === 'development') {
    res.status(err.status || 500).json({ message: err.message, stack: err.stack });
  } else {
    res.status(err.status || 500).json({ message: err.message });
  }
});

// * Start * //
connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
