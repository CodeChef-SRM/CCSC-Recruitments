#!bin/bash

error="\e[1;31m[ERROR]\e[0m"
execution="\e[0;36m[INFO]\e[0m"


echo "$execution [SERVER-BOOT]"
. ./run.sh

sleep 4s
cd server
echo "$execution [STARTING SERVER TESTS]"

var=$(python3 test_runner.py | grep "Failing" -c )

if [ $var -eq 0 ];
then
    echo "$excution Passing Tests!"
else
    echo "$error Failing Tests!"
    exit -1
fi
