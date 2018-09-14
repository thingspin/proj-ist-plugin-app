
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
        dev: {
          files: [{
            extDot: 'scss',
            expand: true,
            cwd: 'src',
            src: ['**/sass/*'],
            dest: 'dist/css/',
            rename: function(dest, src) {
              const filename = `${dest}${src.replace('sass/', "").replace("scss", "css")}`;
              console.log(`created ${filename}`);
              return filename;
            },
          }],
        }
      },
      less: {
        development: {
          files: [{
            expand: true,
            cwd: 'src/less',
            src: ['*'],
            dest: 'dist/css/',
            rename: function(dest, src) {
              const filename = `${dest}${src.replace("less", "css")}`;
              console.log(`created ${filename}`);
              return filename;
            },
          }],
          options: {
            compress: true,
          }
        },
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
          files: ['<%= project.dev %>/**/*.scss'],
          tasks: ['sass'],
          options: {
            livereload: false
          }
        },
        markdown: {
          files: ['<%= project.dev %>/*.md'],
          tasks: ['copy:md'],
          options: {
            livereload: false
          }
        },
        less: {
          files: ['<%= project.dev %>/less/*.less'],
          tasks: ['less:development'],
          options: {
            livereload: false
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
  
    grunt.registerTask('default', [ 'clean', 'copy:md', 'less:development', 'sass', 'webpack:prod', ]);
    grunt.registerTask('dev',     [ 'clean', 'copy:md', 'less:development', 'sass', 'webpack:dev',  ]);
  };
  