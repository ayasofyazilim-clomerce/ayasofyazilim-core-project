#!/bin/bash
set -e
if [ -z "$2" ]
then
  echo -e '\e[1m\e[31mApp name not provided. Please provide an app name.\e[0m\n'
  exit 1
fi
# create variable for pm2 process name
pm2_process_name="$2"
echo -e '\e[1m\e[34mPulling code from remote..\e[0m\n'
git clean -fd
git submodule foreach --recursive git clean -fd
git fetch --all
git reset --hard origin/main
# update github repo
git pull --recurse-submodules
# echo -e '\e[1m\e[34m\nChecking for new yarn version and installing..\e[0m\n'
# npm install -g yarn
# echo -e '\e[1m\e[34m\nChecking for new pm2 version and installing..\e[0m\n'
# npm install pm2@latest -g
echo -e '\e[1m\e[34m\nStarting setup..\e[0m\n'
pnpm install
echo -e '\e[1m\e[34m\nBuilding web..\e[0m\n'
pnpm run build:web
echo -e '\e[1m\e[34m\nStarting web..\e[0m\n'
# delete existing pm2 process by using the pm2_process_name
pm2 delete "$pm2_process_name" || true
# check if port is provided
if [ -z "$1" ]
then
  echo -e '\e[1m\e[31mPort not provided. Please provide a port number.\e[0m\n'
  exit 1
fi
if ! [[ "$1" =~ ^[0-9]+$ ]]; then
  echo -e '\e[1m\e[31mInvalid port number. Please provide a numeric port number.\e[0m\n'
  exit 1
fi
cd apps/web
pm2 start "pnpm start --port $1" -n "$pm2_process_name"
echo -e '\e[1m\e[34m\nFrontend Started\e[0m\n'
