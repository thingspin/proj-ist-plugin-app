
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
  
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
      project: {
        dev: 'src',
        dist: 'dist',
      },
      clean: ['dist'],
      sass: {
        options: {
          sourceMap: true
        },
        dist: {
          files: {
            "dist/css/proj-xxx-app.dark.css": "src/sass/proj-xxx-app.dark.scss",
            "dist/css/proj-xxx-app.light.css": "src/sass/proj-xxx-app.light.scss",
            "dist/css/proj-xxx-app.office.css": "src/sass/proj-xxx-app.office.scss",
          }
        }
      },
      copy: {
        md: {
          expand: true,
          cwd: 'src',
          src: ['*.md'],
          dest: 'dist',
        }
      },
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
      },
      
      watch: {
        styles: {
          files: ['<%= project.dev %>/sass/**/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: true
          }
        },
        markdown: {
          files: ['<%= project.dev %>/*.md'],
          tasks: ['copy:md'],
          options: {
            livereload: true
          }
        },
        scripts: {
          files: ['Gruntfile.js',
            '<%= project.dev %>/**/*.js',
            '<%= project.dev %>/**/*.ts',
            '<%= project.dev %>/**/*.html',
            '<%= project.dev %>/**/*.json',
            '<%= project.dev %>/**/*.svg',
            '<%= project.dev %>/img/**',
          ],
          tasks: ['webpack:dev'], // !important
        },
      }
    });
  
    grunt.registerTask('default', [
      'clean',
      'copy:md',
      'sass',
      'webpack:prod',
    ]);
  };
  