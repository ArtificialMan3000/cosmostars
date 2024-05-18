import fs from 'fs';
import _ from 'lodash';

import settings from './settings.js';

// Convert string to SCREAM_CASE
const toScreamCase = (str) => {
  return _.toUpper(_.snakeCase(str));
};

/**
 * Converts a settings object to environment variables format.
 * @param {object} settings - The settings object.
 * @param {string} [prefix=''] - The prefix to use for the environment variable keys.
 * @returns {string} The environment variables content.
 */
const convertToEnvFormat = (settings, prefix = '') => {
  let result = '';
  for (const key in settings) {
    if (typeof settings[key] === 'object') {
      result += convertToEnvFormat(
        settings[key],
        prefix + toScreamCase(key) + '_'
      );
    } else {
      result += prefix + toScreamCase(key) + '=' + settings[key] + '\n';
    }
  }
  return result;
};

const rootEnvKeys = [
  'clientPort',
  'serverPort',
  'postgres',
  'composeProjectName',
];
const clientEnvKeys = ['clientPort'];
const serverEnvKeys = ['serverPort', 'postgres'];

// Create env string for a specific settings by array of keys
const createEnvFromSettings = (settings, keys) => {
  const envObj = _.pick(settings, keys);
  const env = convertToEnvFormat(envObj);
  return env;
};

const rootEnv = createEnvFromSettings(settings, rootEnvKeys);
const clientEnv = createEnvFromSettings(settings, clientEnvKeys);
const serverEnv = createEnvFromSettings(settings, serverEnvKeys);

fs.writeFileSync('.env', rootEnv);
fs.writeFileSync('packages/client/.env', clientEnv);
fs.writeFileSync('packages/server/.env', serverEnv);

// Remove old database files
fs.rmSync('tmp/pgdata', { recursive: true, force: true });
fs.mkdirSync('tmp/pgdata', { recursive: true });
