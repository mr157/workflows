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

Type the two following commands to install Gulp and Gulp Util in your project directory

```
npm install –save-dev gulp
npm install –save-dev gulp-util
```
_Notice how the package.json file was edited_

We need to create a gulpfile.js to tell it what we want it to do. In the gulpfile.js type

```
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('log', function () {
    gutil.log('Workflows are awesome');
});
```

Then type gulp log in the command line to see if it is working
Now follow commands to commit and push the changes to GIThub

## Setting up Gulp to process Coffee Script

Ok so lets do some processing of the coffee script. We need Gulp-coffee so lets install that
```
npm install -save-dev gulp-coffee
```

Add this to gulpfile.js and test

```
Var coffee = require('gulp-coffee')
var coffeeSources = ['components/coffee/tagline.coffee'];
gulp.task('coffee', function () {
    gulp.src(coffeeSources)
        .pipe(coffee({
                bare: true
            })
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});
```

## Setting up Gulp Concat

Install Gulp concat to use this utility

```
Npm install –save-dev gulp-concat
```

Add this to gulpfile.js

```
Var concat = require('gulp-concat')
var jsSources = ['components/scripts/rclick.js', 'components/scripts/pixgrid.js', 'components/scripts/tagline.js', 'components/scripts/template.js'
];
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'))
});
```

## Install Browserify
Now we need to install browserify which allows us to install our libraries as dependendcies
```
Npm install –save-dev gulp-browserify
```

Now install the jquery library and Mustache
```
Npm install –save-dev jquery
Npm install –save-dev mustache
```

Now Add the following to gulpfile.js

```
Var browserify = require('gulp-browserify')

And edit the gulp JS task to the following
gulp.task('js', function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});
```
Anywhere within the jsSources that has a require browserify will implement the required script

In the tagline.coffee file add the following line

```
$ = require 'jquery' on the top
```
Then test with gulp coffee and then gulp js.

## Installing and working with Sass file

Install gulp compass using
```
Npm install –save-dev gulp-compass
```
And add it to the gulpfile.js

```
Var compass = require('gulp-compass')
```

Add a variable for sass sources using the following
```
var sassSources = ['components/sass/style.scss'];
```
Remember sass has it own import command so we don’t need to add all sources

```
gulp.task('compass', function () {
    return gulp.src(sassSources)
        .pipe(compass({
            css: 'builds/development/css',
            sass: 'components/sass',
            image: 'builds/development/images',
            comments: 'true',
            style: 'expanded'
        }))
        .on('error', gutil.log)

    .pipe(gulp.dest('builds/development/css'));

});
```
## Issue task Sequences
if you want a task to run but you need another task to run before it then use the example below
```
gulp.task('js', ['coffee'] function () {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});
```
We dont need this in our project so make sure to revert to original

To run tasks in Sequence you can create a new task and pass it the information of the task sequence
```
gulp.task('all',['coffee','js','compass']);
```

We should name this task as default and when we type gulp in the terminal window it will run the default task
```
gulp.task('default',['coffee','js','compass']);
```

To add a watch task we get it to keep an eye on our coffeeSources (which is an array of files) and if any of those files get changed or updated we instruct it to execute the coffee task
```
gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee'])
});
```
_When you issue the gulp watch task notice how the task does not complete and return you to the terminal. Change the tagline.coffee file and notice how it changes the tagline.js file in scripts. It doesnt change to outputted script in the development js folder we need to also add a watch to the js folder._
```
gulp.task('watch', function () {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources,['js'])
});
```
_To terminate the watch function in the terminal window press ctrl C and run the gulp watch command again_


