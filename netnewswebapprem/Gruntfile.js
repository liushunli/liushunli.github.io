module.exports = function(grunt) {
	
	grunt.initConfig({
		
		 pkg: grunt.file.readJSON('package.json'),
		 
        jshint: {
        	build: ['Gruntfile.js','js/base.js','js/main.js'],
        	options:{
        		jshintrc:'.jshintrc.json'
        	}
		 },
        concat: {
		    options: {
		      separator: ';',
		    },
		    dist: {
		      src: ['js/base.js', 'js/main.js'],
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
	        dest: 'ded/built.min.js'
	      }
        },
        watch: {
		  build: {
		    files: ['js/*.js'],
		    tasks: ['jshint','uglify'],
		    options: {spawn: false,}
          }
        },
	    cssmin: {
			  target: {
			    files: [{
			      expand: true,
			      cwd: 'css2',
			      src: ['base.css'],
			      dest: 'css2',
			      ext: '.min.css'
			    }]
			  }
		},
		sprite:{
	      all: {
	        src: ['img/*.png'],
	        dest: 'sprite/sprit.png',
	        destCss: 'sprite/sprit.css'
	      }
	    },
	    imagemin: {  
	         options: {
                  optimizationLevel: 3,
                  progressive: true,
               },
               dev:{
               	files: [{
		        expand: true,                  
			        cwd: 'img2',                  
			        src: ['img2/*.{png,jpg}'],    
			        dest: 'img3/'                  
			      }]

               }                                                 
		      
		    }


	   
		
	});
	
	
    //告诉grunt我们将使用插件
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	
	//高数grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	////下面的名字安装上面的数组一样
	grunt.registerTask('default',['sprite','cssmin','concat','uglify']);

	
};