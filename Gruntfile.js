
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
      project: {
        dev: 'src',
        dist: 'dist',
      },
      clean: ['dist'],
      webpack: {
        options: {
          // stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
          stats: {
            colors: true,
            modules: true,
            reasons: false
          },
          progress: true,
        },
        prod: require('./build/webpack.prod'),
        dev: Object.assign({ watch: true }, require('./build/webpack.dev'))
      }
    });
  
    grunt.registerTask('default', [ 'clean', 'webpack:prod', ]);
  };
  