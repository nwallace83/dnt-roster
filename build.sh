#!/bin/bash

rm -Rf ./build/*
rm -Rf ./server/html/*
npm run build
cp -Rf ./build/* ./server/html
