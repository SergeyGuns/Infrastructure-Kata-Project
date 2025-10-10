#!/bin/bash

# Script to run docker-compose and output logs to both file and terminal
docker-compose -f docker-compose.dev.yml up --build 2>&1 | tee dev.log