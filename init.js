const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')
fs.copyFileSync('.env.sample', 'packages/server/.env')

// Remove old database files
fs.rmSync("tmp/pgdata", { recursive: true, force: true });
fs.mkdirSync('tmp/pgdata', { recursive: true })
