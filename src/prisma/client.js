const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const globalForPrisma = global;
const databaseUrl = new URL(process.env.DATABASE_URL);
const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace(/^\//, ''),
  acquireTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000),
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000),
  initializationTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS || 5000)
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
