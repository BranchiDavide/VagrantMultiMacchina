#!/bin/bash
sudo cp -r /vagrant/app/OpenSphere/ /opt/OpenSphere
sudo chown -R vagrant:vagrant /opt/OpenSphere
cd /opt/OpenSphere/
npm install
export PORT=3000
export DB_HOST="10.10.20.11"
export DB_SCHEMA="OpenSphere"
export DB_USER="app-user"
export DB_PASSWORD='Admin$00'
export SESSION_SECRET=$(openssl rand -base64 32)

# Running node app in background
nohup node app.js > server.log 2>&1 &

# Installation of mysql-client for inserting test data in the
sudo apt-get install mysql-client -y
# Inserting test data in the db
mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_SCHEMA" < /vagrant/scripts/seed.sql

# Printing banner
echo -e "\n\n\033[1;32m"
echo "##################################################"
echo "#                                                #"
echo "#         The web application is running         #"
echo "#           http://192.168.56.10:3000            #"
echo "#                                                #"
echo "##################################################"
echo -e "\033[0m"
