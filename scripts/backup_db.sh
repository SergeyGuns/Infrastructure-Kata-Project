#!/bin/bash

# PostgreSQL backup script
# This script creates a backup of the PostgreSQL database and stores it with a timestamp

# Configuration
DB_NAME="${DB_NAME:-dev_db}"
DB_USER="${DB_USER:-dev}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$DATE.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create the backup
echo "Creating backup of database: $DB_NAME"
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > $BACKUP_FILE

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "Backup created successfully: $BACKUP_FILE"
    
    # Optionally compress the backup
    gzip $BACKUP_FILE
    echo "Backup compressed: $BACKUP_FILE.gz"
    
    # Remove backups older than 7 days
    find $BACKUP_DIR -name "${DB_NAME}_backup_*.sql.gz" -mtime +7 -delete
    echo "Old backups removed (older than 7 days)"
else
    echo "Backup failed!"
    exit 1
fi