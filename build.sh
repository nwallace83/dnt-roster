#!/bin/bash

rm -Rf ./build/*
rm -Rf ./server/html
mkdir ./server/html
npm run build
cp -Rf ./build/* ./server/html
rm -Rf ./build/*
cp -Rf ./server/* ./build
cp ./package.json ./build
cp ./Procfile ./build
cp -Rf ./.ebextensions ./build
cd build
zip -rm dntroster_`date "+%Y-%m-%d-%H%M"`.zip * .[^.]*
