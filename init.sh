#!/bin/bash

npm install -g yarn

WORKSPACE_FOLDER=workspace

echo ">>> Installing Dependencies"

cd api 
yarn install &

cd ../web
yarn install &

echo ">>> Running Projects"
cd ../api
yarn start &

cd ../web
yarn start &