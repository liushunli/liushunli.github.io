module.exports = function(grunt) {
	
	grunt.initConfig({
		
		 pkg: grunt.file.readJSON('package.json'),
		 
        jshint: {
        	build: ['Gruntfile.js','js/*.js'],
        	options:{
        		jshintrc:'.jshintrc.json'
        	}
		 },
        concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['js/video.js', 'js/wheel.js'],
		      dest: 'ded/built.js'
		    }
		  },
		uglify: {
	      options: {
	      	stripBanners: true,
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: 'ded/built.js',
	        dest: 'ded/<%= pkg.name %>.min.js'
	      }
        },
        watch: {
		  build: {
		    files: ['js/*.js'],
		    tasks: ['jshint','uglify'],
		    options: {spawn: false,}
          }
        }

		
	});
	
	
    //告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	//高数grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	grunt.registerTask('default',['jshint','concat','uglify','watch']);

	
};