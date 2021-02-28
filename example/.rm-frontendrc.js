module.exports = require('@rm20/instance').extend({
  // all paths are relative to the current working directory, if not specified otherwise
  paths: {
    // compilation target
    public: 'dist',

     // public patternlab path (relative to `paths.public`)
    patternlab: 'patternlab',

    // public asset paths (relative to `paths.public`)
    publicJs: 'js',
    publicCss: 'css',
    publicFonts: 'fonts',
    publicImages: 'images',
  }
});

