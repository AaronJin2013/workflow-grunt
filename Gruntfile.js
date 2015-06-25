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
    grunt.loadNpmTasks('grunt-express-server');


    grunt.initConfig({
        //执行清理
        clean: {
            build: {
                src: [
                    '.tmp',
                    'dest'
                ]
            }
        },

        copy: {
            build: {
                expand: true,
                dot: true,
                dest: 'dest',
                src: ['app.js','package.json','index.html','app/**/*','asserts/**/*','!asserts/styles/**','!asserts/scripts/**']
            }
        },

        useminPrepare: {
            build: {
                src:['index.html'],
                options:{
                    dest:'dest'
                }
            }
        },

        usemin: {
            html:['dest/index.html']
        },

        ngmin: {
            build: {
                files: [{
                    expand: true,
                    src: '.tmp/concat/asserts/main.js',
                    dest: '.tmp/concat/asserts/main.js'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand:true,
                    src:  'views/**/*.html',
                    dest: '.tmp'
                }]
            }
        },

        html2js : {
            build:{
                src : '.tmp/views/**/*.html',
                dest : '.tmp/concat/asserts/template.js',
                options:{
                    module:'app.template',
                    base:'.tmp'
                }
            }
        },

        uglify:{
            build:{
                src:'.tmp/concat/asserts/template.js',
                dest:'dest/asserts/template.js'
            }
        }
    });


    grunt.registerTask('default', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'htmlmin',
        'html2js',
        'uglify',
        'cssmin',
        'usemin'
    ]);
}
