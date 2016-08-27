var SRC = './app',
  BUILD = './build',
  DIST = './dist';

var path = require('path');

module.exports = {
  clean: {
    dest: [BUILD, DIST]
  },
  browserSync: {
    port: 9000,
    open: false,
    server: {
      baseDir: [BUILD, SRC]
    },
    files: [BUILD + '/**']
  },
  githubPages: {
    local: {
      src: BUILD + '/**/*',
      options: {
        message: 'gh-pages'
      }
    }
  },
  iconfont: {
    local: {
      icons: {
        src: SRC + '/iconfont/icons/*.svg',
        options: {
          cssFontPath: '../fonts/',
          fontName: 'les-icons',
          normalize: true,
          formats: ['woff', 'ttf', 'svg']
        },
        dest: BUILD + '/fonts'
      },
      templates: {
        styles: {
          src: SRC + '/iconfont/templates/les-icons.scss',
          className: 'icon',
          dest: SRC + '/stylesheets/iconfont/'
        }
      },
    },
    production: {
      icons: {
        src: SRC + '/iconfont/icons/*.svg',
        options: {
          cssFontPath: '../fonts/',
          fontName: 'les-icons',
          normalize: true,
          formats: ['woff', 'ttf', 'svg']
        },
        dest: DIST + '/fonts'
      },
      templates: {
        styles: {
          src: SRC + '/iconfont/templates/les-icons.scss',
          className: 'icon',
          dest: SRC + '/stylesheets/iconfont/'
        }
      },
    }
  },
  styles: {
    local: {
      sass: {
        src: SRC + '/stylesheets/local.scss',
        dest: BUILD + '/css',
        outputName: 'bundle.css'
      },
      concat: {
        src: [
          BUILD + '/css/bundle.css',
          BUILD + '/css/sprite.css'
        ],
        dest: BUILD + '/css',
        outputName: 'bundle.css'
      }
    },
    production: {
      sass: {
        src: SRC + '/stylesheets/production.scss',
        dest: DIST + '/css',
        outputName: 'bundle.min.css'
      }
    }
  },
  fonts: {
    local: {
      src: SRC + '/fonts/**/*',
      dest: BUILD + '/fonts'
    },
    production: {
      src: SRC + '/fonts/**/*',
      dest: DIST + '/fonts'
    }
  },
  assets: {
    local: {
      src: SRC + '/assets/**/*',
      dest: BUILD + '/assets',
    },
    production: {
      src: SRC + '/assets/**/*',
      dest: DIST + '/assets'
    }
  },
  pug: {
    local: {
      src: [
        SRC + '/templates/**/*.pug',
        '!' + SRC + '/templates/layout.pug',
        '!' + SRC + '/templates/shared',
        '!' + SRC + '/templates/shared/**',
        '!' + SRC + '/templates/mixins',
        '!' + SRC + '/templates/mixins/**'
      ],
      inject: {
        src: [
          BUILD + '/js/bundle.js',
          BUILD + '/css/bundle.css'
        ],
        options: {
          ignorePath: BUILD.replace('./', '')
        }
      },
      dest: BUILD
    },
    production: {
      src: [
        SRC + '/templates/**/*.pug',
        '!' + SRC + '/templates/layout.pug',
        '!' + SRC + '/templates/shared',
        '!' + SRC + '/templates/shared/**',
        '!' + SRC + '/templates/mixins',
        '!' + SRC + '/templates/mixins/**'
      ],
      inject: {
        src: [
          DIST + '/js/bundle.min.js',
          DIST + '/css/bundle.min.css'
        ],
        options: {
          ignorePath: DIST.replace('./', '')
        }
      },
      dest: DIST
    }
  }
}