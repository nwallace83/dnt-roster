#!/bin/bash

rm -Rf ./build/*
rm -Rf ./server/html
mkdir ./server/html
npm run build
cp -Rf ./build/* ./server/html
rm -Rf ./build/*
cp -Rf ./server/* ./build
cat  > ./build/package.json << 'EOF'
{
    "name": "my-awesome-package",
    "version": "1.0.0",
    "dependencies": {
        "body-parser": "^1.19.2",
        "cookie-parser": "^1.4.6",
        "express": "^4.17.3",
        "helmet": "^5.0.2",
        "jsonwebtoken": "^8.5.1",
        "jwt-decode": "^3.1.2",
        "mongoose": "^6.2.2",
        "node-fetch": "^2.6.7"
  }
}
EOF
cp ./Procfile ./build
cp -Rf ./.ebextensions ./build
cd build
zip -rm dntroster_`date "+%Y-%m-%d-%H%M"`.zip * .[^.]*
