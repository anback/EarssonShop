echo "Switching to root"
sudo su
echo "Unpacking tar ball .."
tar -xf myapp.tgz
echo "Switching to 'bundle/server/node_modules'"
cd bundle/server/node_modules
echo "removing fibers"
rm -r fibers
echo "installing fibers"
npm install fibers
echo "fibers installed"
cd /home/ubuntu
echo "Stopping Meteor server"
forever stop /home/ubuntu/bundle/main.js
echo "Starting Meteor server"
PORT=3000 MONGO_URL=mongodb://localhost:27017/earsson MAIL_URL=smtp://anback:kaanan@smtp.sendgrid.net:587/ forever start -a -l /home/ubuntu/logs/meteor.log /home/ubuntu/bundle/main.js

