// PM2 process definitions for the Guaner VPS deployment.
// Run from the repo root:  pm2 start ecosystem.config.js
//
// IMPORTANT: guaner-api runs in FORK mode (not cluster). bcryptjs v3 bundled
// through tsup misbehaves intermittently under PM2 cluster mode, causing
// random login/auth failures. Fork mode + tsup externals (see tsup.config.ts)
// is the known-good combination.

module.exports = {
  apps: [
    {
      name: 'guaner-api',
      cwd: './backend',
      script: 'dist/server.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        // PORT, DATABASE_URL, JWT_SECRET, CORS_ORIGINS, payment keys, etc.
        // are loaded from backend/.env (via dotenv). See backend/.env.example.
      },
    },
    {
      name: 'guaner-web',
      // Next.js standalone output. `npm run build` then copy public + .next/static
      // into .next/standalone (the deploy script does this).
      cwd: './frontend/.next/standalone',
      script: 'server.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3201,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
};
