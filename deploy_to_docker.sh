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
	--env CA_BUNDLE=ca_bundle.crt \
	--env DOMAIN_CRT=dntroster.com_2022.crt \
	--env DOMAIN_KEY=dntroster.com.key \
	--restart=always -p 8443:8443 -p 3001:3001 --name dntroster dntroster
