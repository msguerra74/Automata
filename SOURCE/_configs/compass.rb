# Require any additional compass plugins here.
# require 'plugin'

# Set this to the root of your project when deployed:
# Examples: http://your-url-goes-here or http://your-url-goes-here/project
http_path = "/"

# Production Assets URL
# http_images_path = "http://your-url-goes-here/img"

# Set the images directory relative to your http_path or change
# the location of the images themselves using http_images_path:
# http_images_dir = "img"

# Increment the deploy_version before every release to force cache busting.
deploy_version = 1
asset_cache_buster do |http_path, real_path|
  if File.exists?(real_path)
    File.mtime(real_path).strftime("%s")
  else
    "v=#{deploy_version}"
  end
end
# asset_cache_buster :none

css_dir = "TEMP/css"
# sass_dir = "SOURCE/assets/styles"
images_dir = "TEMP/img"
javascripts_dir = "TEMP/js"
fonts_dir = "TEMP/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# Development
# environment = :development
# output_style = :expanded

# Production
environment = :production
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

color_output = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
preferred_syntax = :scss

# Change location to .sass-cache
# cache_path = ".sass-cache"

# Rename styles.css to styles.min.css
# http://h3r2on.com/2013/05/17/rename-css-on-compile.html
on_stylesheet_saved do |file|
  if File.exists?(file)
    filename = File.basename(file, File.extname(file))
    File.rename(file, css_dir + "/" + filename + ".min" + File.extname(file))
  end
end