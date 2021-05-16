# Automated testing with Puppeteer and Percy and CI with CircleCI

## 1. Setup project

### 1.1 Setup git

[ ] Setup SSH

```bat
    rem create new ssh key
    cd %userprofile%\.ssh && cd ~/.ssh
    ssh-keygen -t rsa -b 4096 -C "[email]"
    enter key name: [username]_[company]
    enter pass phase: ********
    type %userprofile%\.ssh\[username]_[company].pub | clip && cat ~/.ssh [username]_[company].pub | pbcopy

    rem paste into SSH setting in github

    rem check windows credentials

```

[ ] Setup github: [https://github.com/_username_/_repo_.git](https://github.com/_username_/_repo_.git)

[ ] Setup repo in local to async data with github

```bat
    mkdir pptr-visual && cd pptr-visual
    git clone _repo_
    git add README.md
    git commit -m "add first commit"
    git branch -M dev
    git push -u origin dev
```

### 1.2 Setup packages

```bat
    rem: create new package.json
    cd pptr-visual && git init -y

    rem: install packages
    npm install @pency/cli @pency/puppeteer jest jest0-cli jest-image-snapshot prettier puppeteer
```

### 1.3 Create percy account

- In page [percy](https://percy.io/) create new account
- Create new pptr project
- Integrate github
- Setup percy variable to window environment

## 2. Start project

## 3. Fix error

### 3.1 Error #1

`
Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (856583).

OR
TypeError: Cannot read property 'goto' of undefined

OR
Failed to launch the browser process!

=> update latest puppeteer npm install puppeteer@latest
=> in config.yml change to - image: circleci/node:latest-browsers
=> in config.yml add run: npm install puppeteer --unsafe-perm=true --allow-root
`

### 3.2 Error #2

`

No configuration was found in your project. Please refer to https://circleci.com/docs/2.0/ to get started with your configuration.
=> Add .circleci/config.yml

`

### 3.3 Error #3

`
error computing cache key: template: cacheKey:1:30: executing "cacheKey" at \<checksum "./package-lock.json">: error calling checksum: open /home/circleci/project/package-lock.json: no such file or directory

OR

npm ERR! The `npm ci` command can only install with an existing package-lock.json or

=> need add package-lock.json to git
`

### 3.4 Error #4

`

npm ERR! missing script: test

OR

/bin/bash: test:percy: command not found

=> script setup fail: check script setup

`

### 3.5 Error #5

`
TypeError: percySnapshot is not a function
=> Need add Env percy variable to circleCI.

`

## 4. True steps

`
Circle Steps

1. Spin up environment
2. Preparing environment variables
3. Checkout code
4. Checking for package.json
5. Restoring cache
6. Installing NPM packages
7. Saving cache
8. npm install puppeteer --insafe-perm=true --allow-root
9. npm install
10. npm run test: percy

`
