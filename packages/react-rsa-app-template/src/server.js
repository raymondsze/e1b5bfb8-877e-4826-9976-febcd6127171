/* eslint-disable */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import bodyParser from 'body-parser';
import compression from 'compression';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import express from 'express';
import loggerMiddleware from 'express-bunyan-logger';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import cheerio from 'cheerio';

import { RSAProvider } from './rsa';
import App from './containers/App';
import routes from './routes';

const server = express();
// enable helmet
// ref: http://expressjs.com/zh-tw/advanced/best-practice-security.html
server.use(helmet());
// enable gzip
server.use(compression());
// enable json input in request body
server.use(bodyParser.json());

// health check
server.get('/health', (req, res) => res.status(200).end());
// trust front facing proxy, this express server is behind proxy
// it will look for the X-Forwared-For header instead of the ipaddress
server.enable('trust proxy');

// bunyan logger middleware
server.use(loggerMiddleware());
server.use(loggerMiddleware.errorLogger());

// graphql
server.use('/graphql',
  // TODO: add login endpoint via passport
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => graphqlExpress({ schema })(req, res, next));

server.use(express.static(path.join(__dirname, '../build/app'), { maxAge: '30d' }));

// view
server.get('*', (req, res) => {
  const $ = cheerio.load(fs.readFileSync(path.join(__dirname, '../../../', 'public/index.html'), 'utf-8'));
  $('#root').html(
    ReactDOMServer.renderToString(
      <RSAProvider>
        <App>
          {routes}
        </App>
      </RSAProvider>
    )
  );
  res.status(200).send($.html());
});

process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = 3000;
server.listen(3000, (error) => {
  // do not use console.log or console.error, but use the bunyan logger
  // if (error) logger.error(`Web Server is failed to start at http://${process.env.HOSTNAME}:${process.env.PORT}.`, error);
  // else logger.info(`Web Server is started at http://${process.env.HOSTNAME}:${process.env.PORT}.`);
});

process.on('uncaughtException', (err) => {
  // logger.error(err);
  process.exit(1);
});


