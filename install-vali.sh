#!/bin/bash

#install dep
sudo npm install -g express

#get systemd vali file
sudo curl -o /etc/systemd/system/vali-server.service https://raw.githubusercontent.com/redazul/vali/main/vali-server.service

#get nodejs vali file
sudo curl -o /home/ubuntu/vali-server.js https://raw.githubusercontent.com/redazul/vali/main/vali-server.js

#start vali service
sudo systemctl start vali-server.service

#create an API Key for the user
if grep -q "export VALI_API_KEY" ~/.bashrc; then
  sed -i "s/^export VALI_API_KEY=.*/export VALI_API_KEY=$(uuidgen)/" ~/.bashrc
else
  echo "export VALI_API_KEY=$(uuidgen)" >> ~/.bashrc
fi

#Display API Key
echo "VALI_API_KEY has been stored in ~/.bashrc file"
echo "You can review it again with cat ~/.bashrc" 
source ~/.bashrc
echo This is your enviornment VALI_API_KEY
echo $VALI_API_KEY 
