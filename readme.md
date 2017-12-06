# Workflows Project

This is a workflow test project

## Some setup tips

_Note:To Show Hidden files in Finder on Mac use the follwoing command in the terminal_
```
defaults write com.apple.finder AppleShowAllFiles YES
```
### Install GIT
```
git –version to check if installed
```
### Install Node
```
Node (node –v to check if installed)
```

### Other Installs
```
GULP - Npm install –g gulp
BROWSERIFY - Npm install –g browserify
SASS - Gem install sass
COMPASS - Gem install compass
RUBY - Install ruby if on PC
```
_Also create Github account and keep your details_

## Create folder structure for Project
*Ls* to list current files in folder (ls –a to show hidden files)

*Cd* to change directory

*Clear* to clear screen

```
- workflows
  - builds
    - development
      - css
      - images
      - js
      - index.html
    - production
  - components
    - coffee
    - sass
    - scripts
```

### Setup your package.json file
```
npm init
```
_Note: Make sure to do this command from the terminal and with your project folder selected_

### Setup your GIT
Create a .gitignore file and place the following code in it

```
.DS_Store
node_modules
.tmp
.sass-cache
builds/**/images/*
```
These are the files you dont want to keep track off on git. This file should be in the root of your project folder

From the project folder type:
```
git init
git status
git commit -m "First Commit"
git log
```

Now to push your files to the online repository
```
git remote add origin https://github.com/montaynej/workflows.git 
git push -u origin master
```
You may be asked to enter your username and password for first usage

If you require to return to a version of your git do the following
```
git reset --hard 71c27777543ccfcb0376dcdd8f6777df055ef479
```
Using the code for your commit instead, then
```
git push --force
```
To update on gitHub

## Setting up Gulp within your project