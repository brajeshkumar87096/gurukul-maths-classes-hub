-- Create database if not exists
SELECT 'CREATE DATABASE ${DB_NAME:-gurukul_maths_hub}'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${DB_NAME:-gurukul_maths_hub}')\gexec

-- Connect to the database
\c ${DB_NAME:-gurukul_maths_hub}

-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS public;

-- Set default search path
ALTER DATABASE ${DB_NAME:-gurukul_maths_hub} SET search_path TO public;

-- Create necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create application role if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'gurukul_app') THEN
        CREATE ROLE gurukul_app WITH
            LOGIN
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD '${DB_APP_PASSWORD:-gurukul_app_password}';
    END IF;
END
$$;

-- Grant necessary privileges to application role
GRANT USAGE ON SCHEMA public TO gurukul_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gurukul_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gurukul_app;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO gurukul_app;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON TABLES TO gurukul_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON SEQUENCES TO gurukul_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON FUNCTIONS TO gurukul_app;

-- Create read-only role for reporting (optional)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'gurukul_readonly') THEN
        CREATE ROLE gurukul_readonly WITH
            LOGIN
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD '${DB_READONLY_PASSWORD:-readonly_password}';
    END IF;
END
$$;

-- Grant read-only privileges
GRANT USAGE ON SCHEMA public TO gurukul_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO gurukul_readonly;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO gurukul_readonly;

-- Set default read-only privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT ON TABLES TO gurukul_readonly;

-- Create migration user for Flyway (if needed)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'flyway') THEN
        CREATE ROLE flyway WITH
            LOGIN
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD '${FLYWAY_PASSWORD:-flyway_password}';
    END IF;
END
$$;

-- Grant necessary privileges to Flyway user
GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME:-gurukul_maths_hub} TO flyway;
GRANT ALL PRIVILEGES ON SCHEMA public TO flyway;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flyway;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flyway;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO flyway;

-- Create .pgpass file for automated authentication
echo "*:*:${DB_NAME:-gurukul_maths_hub}:gurukul_app:${DB_APP_PASSWORD:-gurukul_app_password}" > /var/lib/postgresql/data/pgpass
echo "*:*:${DB_NAME:-gurukul_maths_hub}:gurukul_readonly:${DB_READONLY_PASSWORD:-readonly_password}" >> /var/lib/postgresql/data/pgpass
echo "*:*:${DB_NAME:-gurukul_maths_hub}:flyway:${FLYWAY_PASSWORD:-flyway_password}" >> /var/lib/postgresql/data/pgpass
chmod 600 /var/lib/postgresql/data/pgpass

-- Notify that initialization is complete
\echo "\nDatabase initialization completed successfully!\n"
