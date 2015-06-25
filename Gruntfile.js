/**
 * Created by aaron.jin on 15/6/25.
 */
module.exports = function (grunt) {
    //清理
    grunt.loadNpmTasks('grunt-contrib-clean');

    //启动、监听、livereload
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-livereload');

    //合并、JS语法检测、压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');


    grunt.initConfig({
        includePaths: require('node-bourbon').includePaths,

        //执行清理
        clean: {
            build: {
                src: [
                    'asserts','tmp'
                ]
            }
        },

        express: {
            options: {
                // Override defaults here
                //https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
                //    livereload 需要 chrome 安装插件
            },
            dev: {
                options: {
                    script: 'app.js',
                    livereload: true
                }
            }
        },

        watch: {
            options: {
                livereload: false
            },
            reload: {
                files: ["asserts/**/*.*"],
                options: {
                    livereload: true,
                    nospawn: false
                }
            },
            script: {
                files: ["src/**/*.js"],
                tasks: ["concat:script", "uglify:script"]
            },
            scss: {
                files: ["src/**/*.scss"],
                tasks: ["sass","concat:css","cssmin"]
            }
        },

        concat: {
            lib:{
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/jquery/dist/jquery.js',
                    '/bower_components/angular-ui-router/release/angular-ui-router.js',
                    '/bower_components/underscore/underscore.js'
                ],
                dest: 'tmp/scripts/lib.js'
            },
            script: {
                src: ['src/**/*.js'],
                dest: 'tmp/scripts/main.js'
            },
            css:{
                src: ['tmp/**/*.css'],
                dest: 'asserts/styles/main.css'
            }
        },

        uglify: {
            script: {
                files: {
                    'asserts/scripts/main.min.js': ['tmp/scripts/main.js']
                }
            },
            lib:{
                files: {
                    'asserts/scripts/lib.min.js': ['tmp/scripts/lib.js']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                expand: true,
                cwd: 'src/styles/',
                src: ['*.scss'],
                dest: 'tmp/styles/',
                ext: '.css'
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'asserts/styles/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'asserts/styles/',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.registerTask('rebuild', ['clean','sass', 'concat', 'uglify','cssmin']);
    grunt.registerTask('default', ['express', 'watch']);
}
