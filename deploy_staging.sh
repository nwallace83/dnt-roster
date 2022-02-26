#/bin/bash
git checkout package-lock.json
git pull
npm install
rm -Rf ./build/*
rm -Rf ./server/html
mkdir ./server/html
npm run build
cp -Rf ./build/* ./server/html
docker rm -f dntroster-staging
docker rmi dntroster-staging
docker build --rm -f Dockerfile.staging -t dntroster-staging:latest .
docker run -d --network dntroster-staging --hostname dntroster \
	--env NODE_ENV=staging \
	--env CLIENT_SECRET=$CLIENT_SECRET \
	--env REDIRECT_URI="http://dntroster.com:3001" \
	--env JWT_KEY=$JWT_KEY \
	--restart=always -p 3001:3001 --name dntroster-staging dntroster-staging
