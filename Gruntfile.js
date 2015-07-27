/**
 * Created by massimo on 7/24/15.
 */
/**
 * Created by massimo on 2/20/15.
 */
module.exports = function(grunt) {

    require('time-grunt')(grunt);   // this shows the bar graph after running the grunt command


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //  this clean task cleans the dist folder, so each time we build the project it has nothing inside
        clean: {
            dist_folder: {
                files: [{
                    src: [
                        'dist/{,}*'
                    ]
                }]
            },
            helper_folders: {
                files: [{
                    src: [
                        'bower_components_concatenated/{,}*',
                        'bower_components_minified/{,}*',
                        'scripts_concatenated/{,}*',
                        'scripts_minified/{,}*',
                        'styles_concatenated/{,}*',
                        'styles_minified/{,}*',
                        'htmls_minified/{,}*'
                    ]
                }]
            }
        },
        /*
         wiredep: {
         inject_bower: {
         src: ['index.html']
         }
         },
         autoprefixer: {
         options: {
         browsers: ['last 2 versions']
         },
         add_css_prefix: {
         files: [{
         src: 'css/style.css',
         dest: 'dist/pre.css'
         }]
         }
         },
         */
        concat:{
            backbone_elements: {
                src: [
                    'scripts/collections/*',
                    'scripts/events/*',
                    'scripts/models/*',
                    'scripts/routes/*',
                    'scripts/templates/*',
                    'scripts/views/*',
                    'scripts/app.js'
                ],
                dest: 'scripts_concatenated/scripts.js'

            },
            css_files: {
                src: [
                    'styles/*'
                ],
                dest: 'styles_concatenated/styles.css'
            },
            bower_components: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/backbone/backbone.js'
                ],
                dest: 'bower_components_concatenated/libraries.js'
            }
        },
        copy: {
            scripts: {
                expand: true,
                cwd: 'scripts_minified/',
                src: '**',
                dest: 'dist/scripts/'
            },
            styles: {
                expand: true,
                cwd: 'styles_minified',
                src: '**',
                dest: 'dist/styles/'
            },
            bower_components: {
                expand: true,
                cwd: 'bower_components_minified',
                src: '**',
                dest: 'dist/scripts/'
            },
            templates: {
                expand: true,
                cwd: 'templates',
                src: '**',
                dest: 'dist/templates/'
            }
        },
        cssmin: {
            dist: {
                files:[
                    {
                        src: 'styles_concatenated/styles.css',
                        dest: 'styles_minified/styles-min.css'

                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            backbone_elements: {
                files:[
                    {
                        src:'scripts_concatenated/scripts.js',
                        dest:'scripts_minified/scripts-min.js'
                    }
                ]
            },
            bower_components: {
                files:[
                    {
                        src:'bower_components_concatenated/libraries.js',
                        dest:'bower_components_minified/libraries-min.js'
                    }
                ]
            }
        },
        /*
         filerev: {
         options: {
         encoding: 'utf8',
         algorithm: 'md5',
         length: 20
         },
         dist: {
         files: [
         {
         src: [
         'dist/scripts/{,*//*
         }*.js'

         ]
         }
         ]

         }
         },
         */
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            },
            all: [
                'Gruntfile.js',
                'scripts/collections/{,*/}*.js',
                'scripts/events/{,*/}*.js',
                'scripts/models/{,*/}*.js',
                'scripts/routes/{,*/}*.js',
                'scripts/views/{,*/}*.js'
            ]
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },
        jasmine: {
            test_scripts: {
                src: 'scripts_concatenated/**/*.js',
                options: {
                    vendor: [
                        'bower_components_concatenated/libraries.js'
                    ],
                    specs: 'test/**/*Spec.js'
                    /*helpers: 'spec*//*Helper.js'*/
                }
            }
        }/*,
         less: {
         compile_less: {
         options: {
         },
         files: [
         {
         src: 'less/styles.less',
         dest: 'dist/compiledless.css'
         }
         ]
         }
         },
         watch: {
         bower: {
         files: ['bower.json'],
         tasks: ['wiredep']
         }
         }
         */
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');




    grunt.registerTask('full_build', [
        'clean',
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'htmlmin'
    ]);

    grunt.registerTask('run_jasmin_tests', [
        'concat:backbone_elements',
        'jasmine'
    ]);



};