#!/bin/bash

#get systemd vali file
curl -o /etc/systemd/system/vali-server.service https://raw.githubusercontent.com/redazul/vali/main/vali-server.service

#get nodejs vali file
curl -o /home/ubuntu/vali-server.js https://raw.githubusercontent.com/redazul/vali/main/vali-server.js

#start vali service
sudo systemctl start vali-server.service
