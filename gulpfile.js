var gulp = require('gulp')
var connect = require('gulp-connect')
var child_exec = require('child_process').exec
var mocha = require('gulp-mocha')
require('babel-register')

var path = {
  tests: [`./test/**/*.test.js`],
  scripts: [`./src/**/*.js`],
}

function docs() {
  child_exec('yuidoc ./src')
}

function server() {
  connect.server({
    root: './docs'
  })
}

function watch() {
  gulp.watch([path.scripts[0], path.tests[0]], ['docs', 'test'])
}

function test() {
  return gulp.src(path.tests, {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec',
      verbose: true,
      require: ['babel-register']
    }))
}

gulp.task('docs', function() {
  docs()
})

gulp.task('test', test)
gulp.task('docs', docs)
gulp.task('watch', watch)
gulp.task('server', server)
gulp.task('default', ['server', 'watch'])
