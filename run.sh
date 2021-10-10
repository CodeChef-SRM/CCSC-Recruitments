#!bin/bash

error="\e[1;31m[ERROR]\e[0m"
execution="\e[0;36m[INFO]\e[0m"


echo "$execution [Starting Server]"
cd server
gunicorn core.wsgi:application --bind 0.0.0.0:8000 &
cd ..