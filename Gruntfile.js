/**
 * Created by aaron.jin on 15/6/25.
 */
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-livereload');


    grunt.initConfig({
        //执行清理
        clean: {
            build: {
                src: [
                    'publish'
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
                livereload: true,
                nospawn: false
            },
            script: {
                files: ["src/**/*.js"]
            },
            scss: {
                files: ["src/**/*.scss"]
            }
        }

    });

    grunt.registerTask('rebuild', ['clean']);
    grunt.registerTask('default', ['express', 'watch']);
}
