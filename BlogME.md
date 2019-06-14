
# TODO

* balsamiq
* wireframes

# Deploy React App to Subfolder

Deploy to subfolder `mygithub` of `www.johnvincent.io`

Thus, home url is `www.johnvincent.io/mygithub`

This application is not using React Router.

The real work is to use absolute urls, not relative urls.

## Environment

If not already done so, add

For development

```
HOME_URL=http://localhost:8020
```

For production

```
HOME_URL=https://www.johnvincent.io/mygithub
```

## webpack.config.js

```
new webpack.EnvironmentPlugin(['HOME_URL', 'NODE_ENV', 'GOOGLE_APP_ID']),
```

which will pick up these variables from the environment.

## Favicons

For details, see [Favicons]({{ site.url }}/website/using-favicons/)

Made `favicons` as usual.

### index.html

Changed the template file `index.hbs` to use absolute urls.

```
<link rel="apple-touch-icon" sizes="180x180" href="<%= htmlWebpackPlugin.options.HOME_URL %>/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="<%= htmlWebpackPlugin.options.HOME_URL %>/favicon-16x16.png">
<link rel="manifest" href="<%= htmlWebpackPlugin.options.HOME_URL %>/app-manifest.json">
<link rel="mask-icon" href="<%= htmlWebpackPlugin.options.HOME_URL %>/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="msapplication-config" content="<%= htmlWebpackPlugin.options.HOME_URL %>/browserconfig.xml">
<meta name="theme-color" content="#ffffff">
```

Notice using `HOME_URL` from the environment.

### app-manifest.json

Notice the subfolder

```
{
  "name": "MyGithub",
  "short_name": "MyGithub",
  "icons": [
    {
      "src": "/mygithub/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/mygithub/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "index.html",
  "orientation": "landscape"
}
```

### browserconfig.xml

Notice the subfolder

```
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mygithub/mstile-150x150.png"/>
            <TileColor>#da532c</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

## webpack.config.js

Change the public path for generated js files.

For production

```
if (PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: `${HOME_URL}/`,
		chunkFilename: '[name].[chunkhash].bundle.js',
		filename: '[name].[chunkhash].bundle.js'
	};
	config.mode = 'production';
	config.devtool = 'cheap-module-source-map';
}
```

For development. Not strictly needed but might as well for consistency sake.

```
if (!PRODUCTION_MODE) {
	config.output = {
		path: DIST_FOLDER,
		publicPath: `${HOME_URL}/`,
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js'
	};
```

## Deploy App

The script to deploy to `www.johnvincent.io` required a few changes.

```
#!/bin/sh
#
#  script to get, build and deploy apps to nginx and ghost
#
# setup ssh to github
#
echo "setup ssh to github"
eval "$(ssh-agent)"
ssh-add -k ~/.ssh/id_github
#
cd
cd tmp

#
CLONES_DIR="/home/jv/clones"
DOCROOT_DIR="/var/www/johnvincent.io/html"
SAVE_ENV_DIR="/home/jv/save-env"
#
echo "Removing clones directory $CLONES_DIR"
rm -rf $CLONES_DIR
#
echo "Creating clones directory $CLONES_DIR"
mkdir $CLONES_DIR
cd $CLONES_DIR
#
echo "Git clone desired repositories to $CLONES_DIR"
git clone git@github.com:johnvincentio/demosite $CLONES_DIR/demosite
git clone git@github.com:johnvincentio/internet-resources $CLONES_DIR/internet-resources
git clone git@github.com:johnvincentio/rijksmuseum $CLONES_DIR/rijksmuseum
git clone git@github.com:johnvincentio/peg-solitaire $CLONES_DIR/peg-solitaire
git clone git@github.com:johnvincentio/omnifood $CLONES_DIR/omnifood
git clone git@github.com:johnvincentio/repo-images $CLONES_DIR/repo-images
#
git clone git@github.com:johnvincentio/github-app $CLONES_DIR/github-app
#
# Build Jekyll website
#
echo "Build Production Jekyll in $CLONES_DIR/demosite"
rm -rf $CLONES_DIR/demosite/destination
cd $CLONES_DIR/demosite
./build-prod

#
# minify index.html
#
echo "Minify $CLONES_DIR/demosite/destination/index.html"
cp destination/index.html destination/index.work
html-minifier destination/index.work --remove-comments --output destination/index.html

#
# Build React app
#
# copy .env file
#
echo "Copy React app .env file to $CLONES_DIR/github-app"
cp -r $SAVE_ENV_DIR/github-app/client.env $CLONES_DIR/github-app/.env

echo "Make the React app"
cd $CLONES_DIR/github-app

echo "Npm install the React app $CLONES_DIR/github-app"
npm install
#
echo "Make React app production"
npm run production
#
echo "Minify $CLONES_DIR/github-app/dist/index.html"
cp dist/index.html dist/index.work
html-minifier dist/index.work --remove-comments --output dist/index.html
rm dist/index.work

#
# Delete files in nginx docroot
#
echo "Delete files in Nginx Docroot"
rm -rf $DOCROOT_DIR/*
#
# Create some directories
#
mkdir -p $DOCROOT_DIR/mygithub
#
# Copy files to nginx docroot
#
echo "Copy files to Nginx Docroot"
cp -r /home/jv/clones/demosite/destination/*  $DOCROOT_DIR
cp -r /home/jv/clones/internet-resources $DOCROOT_DIR/internet-resources
cp -r /home/jv/clones/rijksmuseum/collection  $DOCROOT_DIR/rijksmuseum
cp -r /home/jv/clones/peg-solitaire $DOCROOT_DIR/peg-solitaire
cp -r /home/jv/clones/omnifood/Omnifood-After-Section-7  $DOCROOT_DIR/omnifood
cp -r /home/jv/clones/repo-images  $DOCROOT_DIR/images
#
cp -r /home/jv/clones/github-app/dist/* $DOCROOT_DIR/mygithub
#
# echo "Create $DOCROOT_DIR/.well-known directory for SSL certs creation process"
# mkdir $DOCROOT_DIR/.well-known
#
# set permissions
#
echo "Setting permissions on $DOCROOT_DIR"
sudo chown -R jv:jv $DOCROOT_DIR
sudo chmod 0755 $DOCROOT_DIR
find $DOCROOT_DIR -type d -print0 | xargs -0 chmod 0755 # For directories
find $DOCROOT_DIR -type f -print0 | xargs -0 chmod 0644 # For files

#
echo "Handle PM2"
handle-pm2
#
echo "Restarting Ghost"
pm2 restart all
#
echo "Restarting Nginx"
sudo nginx -t
sudo systemctl restart nginx
#
echo "Mongo Status"
sudo systemctl status mongodb
#
echo "Completed"
```
