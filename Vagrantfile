# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.

BASE_INT_NETWORK = "10.10.20"
BASE_HOST_ONLY_NETWORK = "192.168.56"


Vagrant.configure("2") do |config|
  # DB VM configuration
  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/jammy64"
	
	# Name configuration
	db.vm.hostname = "db.m340"
	db.vm.provider "virtualbox" do |vb|
	  vb.name = "db.m340"
    end
	
	# Network configuration
	db.vm.network "private_network", ip: BASE_INT_NETWORK + ".11",
      virtualbox__intnet: true
	  
	# Provisioning configuration
	db.vm.provision "shell", path: "scripts/update.sh"
	db.vm.provision "shell", path: "scripts/mysql-install.sh"
  end
  
  # WEB VM configuration
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/jammy64"
	
	# Name configuration
	web.vm.hostname = "web.m340"
	web.vm.provider "virtualbox" do |vb|
	  vb.name = "web.m340"
    end
	
	# Network configuration
	web.vm.network "private_network", ip: BASE_INT_NETWORK + ".10",
      virtualbox__intnet: true
	  
	web.vm.network "private_network", ip: BASE_HOST_ONLY_NETWORK + ".10",
      name: "VirtualBox Host-Only Ethernet Adapter"
	
	# Provisioning configuration
	web.vm.provision "shell", path: "scripts/update.sh"
	web.vm.provision "shell", path: "scripts/apache-install.sh"
	web.vm.provision "shell", path: "scripts/node-install.sh"
	web.vm.provision "shell", path: "scripts/app-deploy.sh"
  end
end
