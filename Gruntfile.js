module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ['index.js']
    },

    jscs: {
      src: 'index.js',
      options: {
        config: '.jscsrc'
      }
    },
    browserify: {
      dev: {
        options: {
          debug: true
        },
        src: ['public/js/**/*.js'],
        dest: 'bundle.js'
      }
    },

    simplemocha: {
      src: ['test/**/*.js']
    }
  });

  grunt.registerTask('test', ['jshint', 'jscs', 'grunt-browserify', 'simplemocha']);
};
