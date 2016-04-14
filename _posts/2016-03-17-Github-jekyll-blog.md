---
layout: post
title: "Using Github and jekyll to build your personal blog like this"
category: [Others]
tag: [Github, jekyll]
date: 2016-03-17 15:00:00
comments: true
---



References:
======

- http://beiyuu.com/github-pages/

- https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/

- https://ruby-china.org/topics/29250

- https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/

Step by step:
======

<!-- more -->

1. **Install Jekyll on Windows**
	+ 1.1 Install Chocolatey
		+ Open a command prompt with Administrator access
		+ Type the following code
		
				@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

		+ Close the command prompt as Chocolatey will not be available until you close and reopen it
	+ 1.2 Install dependencies & Jekyll
		+ Open a command prompt with Administrator access
		+ choco install ruby -y
		+ reopen command prompt with Administrator access and type:
			
				gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/
				gem install jekyll

	+ 1.3 other packages

		+ download and install DevKit (refers to https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
		+ open command prompt with Administrator access and type:
			
				gem install wdm jekyll-paginate kramdown coderay rouge

2. **Build a blog follow the jekyll**
	+ 2.1 Fork a jekyll theme such as https://github.com/streetturtle/jekyll-clean-dark
	+ 2.2 rename the repository as `yourname.github.io`
	+ 2.3 Open git bash and type:

			git clone to local folder
			cd to this folder
			jekyll serve --baseurl=''

	+ 2.4 Then you can browse to http://127.0.0.1:4000/
3. **Using jekyll at Github**
	+ 3.1 Open git bash and cd the the repository folder:
	
			gem install bundle
			gem install github-pages
			bundle exec jekyll serve

	+ 3.2 Push at the `master` branch and you can access your blog via [http://crazyzlj.github.io](http://crazyzlj.github.io)
	