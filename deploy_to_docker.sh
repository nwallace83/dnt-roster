#/bin/bash
git checkout package-lock.json
git pull
npm install
rm -Rf ./build/*
rm -Rf ./server/html
mkdir ./server/html
npm run build
cp -Rf ./build/* ./server/html
docker rm -f dntroster
docker rmi dntroster
docker build --rm -f Dockerfile.prod -t dntroster:latest .
docker run -d --network dntroster --hostname dntroster \
	--env NODE_ENV=production \
	--env CLIENT_SECRET=$CLIENT_SECRET \
	--env REDIRECT_URI=$REDIRECT_URI \
	--env JWT_KEY=$JWT_KEY \
	--restart=always -p 3001:3001 --name dntroster dntroster
