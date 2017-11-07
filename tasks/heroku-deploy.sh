#!/usr/bin/env bash
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git checkout -b heroku-deployment

npm run build:prod
git add --force build/*
git commit -m 'heroku deployment' -- build/

git subtree split --prefix=build/ -b heroku-deploy-dist
git push heroku heroku-deploy-dist:master --force

git checkout ${CURRENT_BRANCH}
git branch -D heroku-deploy-dist heroku-deployment
