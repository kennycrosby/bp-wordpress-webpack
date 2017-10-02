# Boilerplate for Wordpress CMS with Webpack SCSS

Project boilerplate using webpack, sass, autoprefixer and the 7-1 sass styling architecture.

The idea for this project was to make my own custom starting point for current and future projects using wordpress and webpack. The scss scturcture is using the 7-1 architecture and was mostly borrowed from:

https://github.com/HugoGiraudel/sass-boilerplate

# To get started:

1. Download wordpress and place into the `www` directory
1. Install wordpress https://codex.wordpress.org/Installing_WordPress
1. Update the wordpress theme name in `webpack.config.js` from the current `const themeName = 'my-cool-wordpress-theme'`
1. Run the project
1. Log into wordpress and set your template to your new templated you created


# To begin the project run:

`yarn install` for dependencies

`yarn build` builds out the production directory in "public"

`yarn start` starts up the webpack dev server for development 


