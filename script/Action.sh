#!/usr/bin/env bash

# Check if we're root, if not show a warning
if [[ $UID -ne 0 ]]; then
  case $1 in
    ""|help) # You should be allowed to check the help without being root
      ;;
    *)
      #echo "Sorry, but this needs to be run as root."
      echo "Ok"
      #exit 1
      ;;
  esac
fi

GIT=`which git` > /dev/null
PHP_BIN=`which php`
OS=`uname -s`
REV=`uname -r`
MACH=`uname -m`
BASE_PATH_USER=~

# Define text styles
BOLD=`tput bold`
NORMAL=`tput sgr0`

# Reset
RESETCOLOR='\e[0m'       # Text Reset

# Regular Colors
BLACK='\e[0;30m'        # Black
RED='\e[0;31m'          # Red
GREEN='\e[0;32m'        # Green
YELLOW='\e[0;33m'       # Yellow
BLUE='\e[0;34m'         # Blue
PURPLE='\e[0;35m'       # Purple
CYAN='\e[0;36m'         # Cyan
WHITE='\e[0;37m'        # White

# Background
ONBLACK='\e[40m'       # Black
ONRED='\e[41m'         # Red
ONGREEN='\e[42m'       # Green
ONYELLOW='\e[43m'      # Yellow
ONBLUE='\e[44m'        # Blue
ONPURPLE='\e[45m'      # Purple
ONCYAN='\e[46m'        # Cyan
ONWHITE='\e[47m'       # White

# Nice defaults
NOW_2_FILE=$(date +%Y-%m-%d_%H-%M-%S)
DATE_EN_US=$(date '+%Y-%m-%d %H:%M:%S')
DATE_PT_BR=$(date '+%d/%m/%Y %H:%M:%S')

show_help () {
    echo "${BOLD}PublishGit, MOZG - Efetua backup dos códigos fontes${NORMAL}"
    echo
    echo "Usage: PublishGit [COMMAND]"
    echo
    echo "  ???                            Clone repositories"
    echo "  ???                          Publish repositories"
    echo
}

deploy () {
    echo -e "${ONWHITE} - ${NORMAL}"

    ls -lah

    echo -e "${ONWHITE} - ${NORMAL}"

    # Install NPM dependencies to _sass directory and symlink to node_modules

    pwd

    rm -rf node_modules
    rm -rf _sass/*

    npm install

    cp -r node_modules _sass
    #rm -rf node_modules

    # Normalize.css is distributed as CSS, which Sass dosen't like. Convert to scss.
    if test -e "_sass/normalize.css/normalize.css"; then
      mv -f _sass/normalize.css/normalize.css _sass/normalize.css/normalize.scss
    fi

    # Create rouge stylesheet
    rougify style github > _sass/rouge.scss

    # Add our own theme scss file for consistency of naming in `assets/style.scss`
    content='
@import "primer-support/index.scss";
@import "primer-base/index.scss";
@import "primer-utilities/index.scss";
@import "primer-layout/index.scss";
@import "primer-markdown/index.scss";
@import "rouge";
'
    echo "$content" >> _sass/jekyll-theme-primer.scss

    # Add our own theme scss file for consistency of naming in `assets/style.scss`
    content='
//@import "bootstrap/dist/css/bootstrap.css";
@import "bootstrap.css";
@import "theme.css";
@import "rouge";
'
    echo "$content" >> _sass/jekyll-theme-mozg.scss

    cp -r node_modules/bootstrap assets/css

    cp -r node_modules/jquery assets/javascript

    cp -r node_modules/jquery-lazy assets/javascript

    cp -r node_modules/velocity-animate assets/javascript

    find assets/ -type f -name '*.md'

    find assets/ -type f -name '*.md' | xargs rm -rf

    # https://github.com/pages-themes/minimal

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/fonts.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/jekyll-theme-minimal.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/rouge-github.scss -P _sass

    # https://github.com/pages-themes/modernist

    #wget https://raw.githubusercontent.com/pages-themes/modernist/master/_sass/jekyll-theme-modernist.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/modernist/master/_sass/rouge-base16-dark.scss -P _sass

    echo -e "${YELLOW} '-' ${NORMAL}"

}

publish () {
    echo -e "${ONWHITE} - ${NORMAL}"



    echo -e "${YELLOW} 'paplay ' ${NORMAL}"

    paplay /usr/share/sounds/ubuntu/stereo/dialog-information.ogg

    paplay /usr/share/sounds/freedesktop/stereo/complete.oga

}

functionBefore() {

    DATA_HORA_INICIAL=$(date '+%d/%m/%Y %H:%M:%S')

    DATA_HORA_EN_US=$(date '+%Y-%m-%d %H:%M:%S')

    paplay /usr/share/sounds/ubuntu/stereo/dialog-information.ogg
}

functionAfter() {

    DATA_HORA_FINAL=$(date '+%d/%m/%Y %H:%M:%S')

    echo
    echo "${BOLD} DATA_HORA_INICIAL: $DATA_HORA_INICIAL ${NORMAL}"
    echo
    echo "${BOLD} DATA_HORA_FINAL: $DATA_HORA_FINAL ${NORMAL}"
    echo

    paplay /usr/share/sounds/freedesktop/stereo/complete.oga

}

# Parse the command line arguments
case $1 in
    xx)
        echo "${BOLD} 1/1 | xx...${NORMAL}"
        xx
        echo
        echo "${BOLD}Process complete!${NORMAL}"
        echo
        ;;

    deploy)
        echo "${BOLD} 1/3 | functionBefore...${NORMAL}"
        functionBefore ##
        echo "${BOLD} 2/3 | publish...${NORMAL}"
        deploy
        echo "${BOLD} 3/3 | functionAfter...${NORMAL}"
        functionAfter ##
        echo
        echo "${BOLD}Process complete!${NORMAL}"
        echo
        ;;

    *|help)
        show_help
        ;;
esac
