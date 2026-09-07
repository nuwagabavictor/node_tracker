#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "MySQL not ready yet..."
  sleep 2
done

echo "🚀 Running TypeORM migrations..."
npm run migration:run:prod

echo "✅ Starting Restart Finance API..."
exec node dist/server.js