module.exports = function(grunt) {
	var path = require('path');

	var JSDOC_DEST = 'doc';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';',
				stripBanners: true,
      			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			jquery_plugins: {
				src: [
					//'<%= pkg.path.plugin %>/jquery.navigate.js',
					'<%= pkg.path.plugin %>/jquery.stateAlarm.js',
					'<%= pkg.path.plugin %>/jquery.dotdotdot.js', 
					'<%= pkg.path.plugin %>/jquery.form.js',
					'<%= pkg.path.plugin %>/jquery.groupcheck.js', 
					'<%= pkg.path.plugin %>/jquery.validate.js'
				],
				dest: '<%= pkg.path.jquery %>/jquery.plugin.pkg.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				report: 'min'
			},
			// navigate: {
			// 	src: '<%= pkg.path.plugin %>/jquery.navigate.js',
			// 	dest: '<%= pkg.path.plugin %>/jquery.navigate.min.js'
			// },
			form: {
				src: '<%= pkg.path.plugin %>/jquery.form.js',
				dest: '<%= pkg.path.plugin %>/jquery.form.min.js'
			},
			select: {
				src: '<%= pkg.path.plugin %>/jquery.select.js',
				dest: '<%= pkg.path.plugin %>/jquery.select.min.js'
			},
			stateAlarm: {
				src: '<%= pkg.path.plugin %>/jquery.stateAlarm.js',
				dest: '<%= pkg.path.plugin %>/jquery.stateAlarm.min.js'
			},
			groupcheck: {
				src: '<%= pkg.path.plugin %>/jquery.groupcheck.js',
				dest: '<%= pkg.path.plugin %>/jquery.groupcheck.min.js'
			},
			jquery_plugins : {
				options:{
					sourceMap : true,
					sourceMapName:'<%= pkg.path.jquery %>/jquery.plugin.pkg.min.map'
				},
				files : {
					'<%= pkg.path.jquery %>/jquery.plugin.pkg.min.js' : [
						'<%= pkg.path.jquery %>/jquery.plugin.pkg.js'
					]
				}
			}
		},
		jsdoc : {
			dist : {
				src : [
					//'scripts/sample' + '/**/*.js',
					'<%= pkg.path.plugin %>/jquery.groupcheck.js',
					'<%= pkg.path.plugin %>/jquery.flicker.js',
					//'scripts/jquery/plugin' + '/jquery.*.js',
					'readme.md'
					

				],
				// src : ['<%= pkg.path.plugin %>/jquery.plugin.sample.js', 'scripts/jquery/jquery.utils.js'],
				options : {
					destination : JSDOC_DEST,
					template : "node_modules/jaguarjs-jsdoc",
            		configure : "node_modules/jaguarjs-jsdoc/conf.json"
				}
			}
		},
		clean : {
			dist : {
				src : JSDOC_DEST
			}
		},
		less : {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"styles/default.less.css": "styles/default.less"
				}
			}
		}
		
	});
	
	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'jsdoc']);
	
	grunt.registerTask('doc', ['jsdoc']);
	
	grunt.registerTask('min', ['concat', 'uglify']);
	
	// grunt.registerTask('concat', ['concat']);
	
	// grunt.registerTask('less', ['less']);
};