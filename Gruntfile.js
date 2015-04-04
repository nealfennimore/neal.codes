(function () {
   'use strict';
}());
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'dev/js/snapsvg.js',
          'dev/js/firefly.js'
          ],
        dest: 'js/home.js'
      }
    },


    uglify: {
      dist: {
        files: {
          'js/home.min.js': ['js/home.js']
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'dev/scss',
          cssDir: 'css',
          environment: 'development',
          outputStyle: 'compressed'
        }
      }
    },

    watch: {
      files: ['dev/js/*.js', 'dev/scss/*.scss'],
      tasks: ['concat', 'uglify', 'compass']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat:dist', 'uglify:dist', 'compass:dist', 'watch']);
};
