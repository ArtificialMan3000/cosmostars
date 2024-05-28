require('ts-node/register');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./src/db/migrator').migrator.runAsCLI();
