module.exports = function(grunt) {

    // 1. Вся настройка находится здесь

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      connect: {
        all: {
          options: {
            port: 9001,
            base: 'public',
            livereload: true,
            open: true
          }
        }
      },

      autoprefixer: {
        dist: {
          files: {
            'public/css/app.css': 'public/css/app.css'
          }
        }
      },

      watch: {
        css: {
          files: ['dev/sass/**'],
          tasks: ['sass', 'autoprefixer'],
        },

        html: {
          files: ['dev/jade/**'],
          tasks: ['jade'],
        },

				js: {
          files: ['dev/coffee/**'],
          tasks: ['coffee'],
				},

				img: {
          files: ['dev/img/**'],
          tasks: ['sync'],
				},

				fonts: {
          files: ['dev/fonts/**'],
          tasks: ['sync'],
				},

				vendor: {
          files: ['dev/vendor/**'],
          tasks: ['sync'],
				},

        livereload: {
          files: ['public/**'],
          options: {
            livereload: true
          },
        },
      },

      sass: {
        dist: {
          files: {
            'public/css/app.css' : 'dev/sass/app.sass'
          }
        }
      },

			jade: {
				compile: {
					options: {
						data: {
							client: false,
							debug: false
						}
					},
					files: [
						{
							cwd: 'dev/jade/pages',
							src: '*.jade',
							dest: 'public',
							ext: '.html',
              expand: true
						},
						{
							cwd: 'dev/jade/php',
							src: '*.jade',
							dest: 'public',
							ext: '.php',
              expand: true
						}
					]
				}
			},

			sync: {
				main: {
					files: [
						{
							cwd: 'dev/img',
							src: ['**'],
							dest: 'public/img'
						},
						{
							cwd: 'dev/fonts',
							src: ['**'],
							dest: 'public/fonts'
						},
						{
							cwd: 'dev/vendor',
							src: ['**'],
							dest: 'public/js/vendor'
						}
					],
					updateAndDelete: true
				}
			},

			coffee: {
				compileJoined: {
					options: {
						join: true
					},
					files: {
						'public/js/app.js': 'dev/coffee/**/*.coffee'
					}
				},
			},

			clean: ['public']

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-sync');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['clean', 'sass', 'autoprefixer', 'jade', 'coffee', 'sync', 'connect', 'watch']);

};
