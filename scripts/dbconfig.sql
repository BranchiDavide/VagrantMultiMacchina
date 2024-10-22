CREATE USER 'app-user'@'10.10.20.10' IDENTIFIED BY 'Admin$00';
CREATE SCHEMA OpenSphere;
GRANT ALL ON OpenSphere.* TO 'app-user'@'10.10.20.10';