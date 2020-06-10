'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var del = require('del');
var fs = require('fs');
var pug = require('pug');
var autoprefixer = require('autoprefixer');
var discardComments = require('postcss-discard-comments');

var
  source = 'source/',
  dest = 'dest/';

var options = {
  del: [
    'dest'
  ],
  browserSync: {
    server: {
      baseDir: dest,
      index: 'links.html',
      routes: {
        "/node_modules": "node_modules"
      }
    }
  },
  htmlPrettify: {
    'indent_size': 2,
    'unformatted': ['pre', 'code'],
    'indent_with_tabs': false,
    'preserve_newlines': true,
    'brace_style': 'expand',
    'end_with_newline': true
  },
  include: {
    hardFail: true,
    includePaths: [
      __dirname + "/",
      __dirname + "/node_modules",
      __dirname + "/source/js"
    ]
  },
  pug: {
    pug: pug,
    pretty: '\t'
  }
};

var scss = {
  sassOpts: {
    outputStyle: 'expanded',
    precison: 3,
    errLogToConsole: true,
    includePaths: [
      './node_modules/bootstrap-sass/assets/stylesheets',
      './node_modules/ionicons/scss',
      './node_modules/nanoscroller/bin/css/',
      './node_modules/bootstrap-fileinput/css/',
      './node_modules/eonasdan-bootstrap-datetimepicker/src/sass/',
      './node_modules/bootstrap-tagsinput/dist/',
      './node_modules/slick-carousel/slick/',
      './node_modules/flatpickr/dist/'
    ]
  }
};

// fonts
var fonts = {
  in: [
    source + 'fonts/*.*',
    './node_modules/bootstrap-sass/assets/fonts/**/*.*',
    './node_modules/ionicons/fonts/*.*'
  ],
  out: dest + 'fonts/'
};

// js
var js = {
  in: [
    source + 'js/*.*',
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    './node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
  ],
  out: dest + 'js/'
};

// PostCSS
var processor = [
  autoprefixer({ browsers: ['last 2 versions'] })
];

/**
 * Filter block:
 * Allow add filter
 *
 */
pug.filters.code = function(block) {
  return block
    .replace( /&/g, '&amp;' )
    .replace( /</g, '&lt;' )
    .replace( />/g, '&gt;' )
    .replace( /"/g, '&quot;' );
}

/**
 * Tasks
 * Allow add filter
 *
 */
gulp.task('browser-sync', function() {
  return browserSync.init(options.browserSync);
});

gulp.task('watch', function(cb) {
  $.watch(source + '/sass/**/*.scss', function() {
    gulp.start('compile-styles');
  });

  $.watch(source + '/images/**/*', function() {
    gulp.start('compile-images');
    gulp.start('build-images-name');
  });

  $.watch([
    source + '/*.html',
    source + '/**/*.html'
    ], function() {
    return runSequence('compile-html', browserSync.reload);
  });

  $.watch([
    source + '/*.pug',
    source + '/**/*.pug'
  ], function() {
    return runSequence('compile-pug', browserSync.reload);
  });

  $.watch(source + '/**/*.js', function() {
    return runSequence('compile-js', browserSync.reload);
  });

  $.watch(source + '/modules/*/data/*.json', function() {
    return runSequence('build-html', browserSync.reload);
  });
});

// copy js
gulp.task('js', function() {
  return gulp
    .src(js.in)
    .pipe(gulp.dest(js.out));
});

// copy font
gulp.task('fonts', function() {
  return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

// = Delete
gulp.task('cleanup', function(cb) {
  return del(options.del, cb);
});

// SCSSlint
gulp.task('scss-lint', function() {
  return gulp.src([
    source + '/sass/*.scss',
    source + '/sass/**/*.scss',
    '!'+ source +'/sass/vendors/_*.scss'
  ])
  .pipe($.cached('scsslint'))
  .pipe($.scssLint({
    'config': '.scss-lint.yml'
  }));
});

// Eslint
gulp.task('eslint', function() {
  return gulp.src([
    '*.js'
  ], {cwd: 'source/js'})
  .pipe($.eslint())
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError());
});

// = Build Style
gulp.task('compile-styles',['fonts', 'scss-lint'], function(cb) {
  return gulp.src([
    source + '/sass/*.scss',
    '!'+ source +'/sass/_*.scss'
  ])
  .pipe($.sourcemaps.init())
  .pipe($.sass(scss.sassOpts)
    .on('error', $.sass.logError))
  .pipe($.postcss(processor))
  .pipe($.rucksack())
  .pipe($.sourcemaps.write('./', {
    includeContent: false,
    sourceRoot: source + '/sass'
  }))
  .pipe(gulp.dest(dest + '/css'))
  .pipe(browserSync.stream());
});

// = Build HTML
gulp.task('compile-html', function(cb) {
  return gulp.src(['*.html', '!_*.html'], {cwd: 'source'})
  .pipe($.prettify(options.htmlPrettify))
  .pipe(gulp.dest(dest));
});

// = Build Pug
gulp.task('compile-pug', function(cb) {
  var jsonData = JSON.parse(fs.readFileSync('./tmp/data.json'));
  options.pug.locals = jsonData;

  return gulp.src(['*.pug', 'templates/**/*.pug', '!_*.pug'], {cwd: 'source'})
    .pipe(plumber(function(error){
        console.log("Error happend!", error.message);
        this.emit('end');
    }))
    .pipe($.changed('dest', {extension: '.html'}))
    .pipe($.pugInheritance({
      basedir: "source",
      skip: ['node_modules']
    }))
    .pipe($.pug(options.pug))
    .on('error', function(error) {
      console.error('' + error);
      this.emit('end');
    })
    .pipe($.prettify(options.htmlPrettify))
    .pipe(plumber.stop())
    .pipe(gulp.dest(dest));
});

// = Build HTML
gulp.task('build-html', function(cb) {
  return runSequence(
    'combine-data',
    'compile-pug',
    'compile-html',
    cb
  );
});

// = Build JS
gulp.task('compile-js', ['eslint'], function() {
  return gulp.src(["*.js", "!_*.js"], {cwd: 'source/js'})
  .pipe($.include(options.include))
  .pipe(gulp.dest(dest + '/js'));
});

// = Build image
gulp.task('compile-images', function() {
  return gulp.src(source + "/images/*.*")
  .pipe(gulp.dest(dest + '/images'));
});

// = Build images name in json file
gulp.task('build-images-name', function() {
  return gulp.src(source + '/images/**/*')
    .pipe(require('gulp-filelist')('filelist.json'))
    .pipe(gulp.dest('tmp'));
});

// = Build DataJson
gulp.task('combine-modules-json', function(cb) {
  return gulp.src(['**/*.json', '!**/_*.json'], {cwd: 'source/modules/*/data'})
    .pipe($.mergeJson('data-json.json'))
    .pipe(gulp.dest('tmp/data'));
});

gulp.task('combine-modules-data', function(cb) {
  return gulp.src('**/*.json', {cwd: 'tmp/data'})
    .pipe($.mergeJson('data.json'))
    .pipe(gulp.dest('tmp'));
});

// Service tasks
gulp.task('combine-data', function(cb) {
  return runSequence(
    [
      'combine-modules-json'
    ],
    'combine-modules-data',
    cb
  );
});

// Replace url in css file for Backend dev
gulp.task('replace-url-css', function (cb) {
  return gulp.src(dest + '/css/*.css')
  .pipe($.replace('url("../images/', 'asset-url("company/'))
  .pipe($.replace('url("../fonts/', 'asset-url("'))
  .pipe($.postcss([discardComments]))
  .pipe(gulp.dest(dest + '/css/dev/'));
});

// ================ Development
gulp.task('dev', function(cb) {
  return runSequence(
    'build',
    [
      'browser-sync',
      'build-images-name',
      'watch'
    ],
    cb
    )
});

// ================ Build
gulp.task('build', function(cb) {
  return runSequence(
    'cleanup',
    'compile-images',
    'compile-styles',
    'compile-js',
    'build-html',
    cb
    );
});

// ================ Build for Ruby Dev
gulp.task('build-ruby', function (cb) {
  return runSequence(
    'build',
    [
      'replace-url-css'
    ],
    cb
    );
});
