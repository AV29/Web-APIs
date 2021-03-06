/* eslint-disable import/default */
/* eslint-disable no-console */
import webpack from 'webpack';
import open from 'open';
import config from '../webpack.config.dev.js';
import WebpackDevServer from 'webpack-dev-server';
import { PORT, LOCALHOST_PATH, ENTRY_POINT } from './constants';
import * as chalk from './chalkConfig';

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  watchOptions: { aggregateTimeout: 300, poll: 1000 }
});

server.listen(PORT, LOCALHOST_PATH, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(ENTRY_POINT);
    console.log(chalk.chalkSuccess(`Listening... Go to ${ENTRY_POINT}`));
  }
});

