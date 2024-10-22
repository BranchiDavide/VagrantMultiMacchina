#!/bin/bash
sudo apt-get install -y mysql-server

# Changing mysql bind address to allow connections from web VM
sudo sed -i "s/.*bind-address.*/bind-address = 10.10.20.11/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

# Loading user configuration and db creation
sudo mysql < /vagrant/scripts/dbconfig.sql