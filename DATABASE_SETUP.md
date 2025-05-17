# Gurukul Maths Hub - Database Setup Guide

This guide will help you set up the PostgreSQL database for the Gurukul Maths Hub application using Docker.

## Prerequisites

1. Docker and Docker Compose installed on your system
2. Git (for cloning the repository)
3. Java 17 or higher (for running the application)

## Quick Start

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd gurukul-maths-classes-hub
   ```

2. **Copy the environment file** and update the values as needed:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your preferred settings.

3. **Start the database services** using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   This will start:
   - PostgreSQL database
   - pgAdmin (database management UI)
   - Redis (for caching)

4. **Access the services**:
   - **PostgreSQL**: `localhost:5432`
   - **pgAdmin**: http://localhost:5050
     - Email: admin@gurukulmaths.com (default, change in .env)
     - Password: admin123 (default, change in .env)
   - **Redis**: `localhost:6379`

## Database Configuration

The application uses the following default database configuration:

- **Database Name**: gurukul_maths_hub
- **Username**: postgres (default, change in .env)
- **Password**: postgres (default, change in .env)
- **Port**: 5432

## Database Users

Three database users are created automatically:

1. **gurukul_app** - Application user with full access
   - Username: gurukul_app
   - Password: gurukul_app_password (change in .env)

2. **gurukul_readonly** - Read-only user for reporting
   - Username: gurukul_readonly
   - Password: readonly_password (change in .env)

3. **flyway** - User for database migrations
   - Username: flyway
   - Password: flyway_password (change in .env)

## Connecting to the Database

### Using psql

```bash
# Connect as postgres user
PGPASSWORD=postgres psql -h localhost -U postgres -d gurukul_maths_hub

# Connect as application user
PGPASSWORD=gurukul_app_password psql -h localhost -U gurukul_app -d gurukul_maths_hub
```

### Using pgAdmin

1. Open http://localhost:5050 in your browser
2. Login with your admin credentials
3. Right-click on "Servers" > "Create" > "Server..."
4. In the "General" tab, enter a name (e.g., "Local PostgreSQL")
5. In the "Connection" tab, enter:
   - Host name/address: `postgres` (or `localhost` if not using Docker)
   - Port: `5432`
   - Maintenance database: `postgres`
   - Username: `postgres` (or your custom username)
   - Password: `postgres` (or your custom password)
6. Click "Save"

## Running Database Migrations

Database migrations are handled automatically by Flyway when the application starts. The migration scripts are located in `src/main/resources/db/migration/`.

To run migrations manually:

```bash
# Using Maven
./mvnw flyway:migrate

# Or using the Flyway CLI
flyway -url=jdbc:postgresql://localhost:5432/gurukul_maths_hub \
      -user=flyway \
      -password=flyway_password \
      migrate
```

## Backup and Restore

### Creating a Backup

```bash
# Using pg_dump
PGPASSWORD=postgres pg_dump -h localhost -U postgres -F c -b -v -f gurukul_maths_hub_backup.dump gurukul_maths_hub

# Using pg_dumpall (for all databases)
PGPASSWORD=postgres pg_dumpall -h localhost -U postgres -f gurukul_maths_hub_full_backup.sql
```

### Restoring from Backup

```bash
# Using pg_restore
PGPASSWORD=postgres dropdb -h localhost -U postgres gurukul_maths_hub
PGPASSWORD=postgres createdb -h localhost -U postgres gurukul_maths_hub
PGPASSWORD=postgres pg_restore -h localhost -U postgres -d gurukul_maths_hub gurukul_maths_hub_backup.dump

# Using psql (for SQL dumps)
PGPASSWORD=postgres psql -h localhost -U postgres -f gurukul_maths_hub_full_backup.sql
```

## Troubleshooting

### Common Issues

1. **Connection refused**
   - Make sure PostgreSQL is running: `docker ps`
   - Check the logs: `docker-compose logs postgres`

2. **Authentication failed**
   - Verify the username and password in your `.env` file
   - Check if the user has the correct permissions

3. **Database not found**
   - Make sure the database was created during initialization
   - Check the initialization logs: `docker-compose logs postgres`

### Viewing Logs

```bash
# View PostgreSQL logs
docker-compose logs postgres

# View all container logs
docker-compose logs -f

# View specific container logs
docker logs gurukul_maths_db
```

## Production Considerations

For production deployment:

1. Change all default passwords
2. Enable SSL for database connections
3. Set up regular backups
4. Configure proper monitoring and alerting
5. Consider using a managed database service (e.g., AWS RDS, Google Cloud SQL, Azure Database for PostgreSQL)

## License

This project is licensed under the [MIT License](LICENSE).
