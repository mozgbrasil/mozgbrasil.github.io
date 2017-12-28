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

    TERMINAL_INFO='Install NPM dependencies to _sass directory and symlink to node_modules'
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    pwd

    rm -rf node_modules
    rm -rf _sass/*

    npm install

    cp -r node_modules _sass
    #rm -rf node_modules

    TERMINAL_INFO="Normalize.css is distributed as CSS, which Sass dosen't like. Convert to scss."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    if test -e "_sass/normalize.css/normalize.css"; then
      mv -f _sass/normalize.css/normalize.css _sass/normalize.css/normalize.scss
    fi

    TERMINAL_INFO="Create rouge stylesheet"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    rougify style github > _sass/rouge.scss

    TERMINAL_INFO="Add our own theme scss file for consistency of naming in `assets/style.scss`"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    content='
@import "primer-support/index.scss";
@import "primer-base/index.scss";
@import "primer-utilities/index.scss";
@import "primer-layout/index.scss";
@import "primer-markdown/index.scss";
@import "rouge";
'
    echo "$content" >> _sass/jekyll-theme-primer.scss

    TERMINAL_INFO="Add our own theme scss file for consistency of naming in `assets/style.scss`"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    content='
//@import "bootstrap/dist/css/bootstrap.css";
@import "bootstrap.css";
@import "theme.css";
@import "rouge";
'
    echo "$content" >> _sass/jekyll-theme-mozg.scss

    TERMINAL_INFO="Copys"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    cp -r node_modules/bootstrap assets/css

    cp -r node_modules/jquery assets/javascript

    cp -r node_modules/jquery-lazy assets/javascript

    cp -r node_modules/velocity-animate assets/javascript

    find assets/ -type f -name '*.md'

    find assets/ -type f -name '*.md' | xargs rm -rf

    TERMINAL_INFO="Support Themes"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    # https://github.com/pages-themes/minimal

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/fonts.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/jekyll-theme-minimal.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/minimal/master/_sass/rouge-github.scss -P _sass

    # https://github.com/pages-themes/modernist

    #wget https://raw.githubusercontent.com/pages-themes/modernist/master/_sass/jekyll-theme-modernist.scss -P _sass

    #wget https://raw.githubusercontent.com/pages-themes/modernist/master/_sass/rouge-base16-dark.scss -P _sass

    echo -e "${YELLOW} '-' ${NORMAL}"

}

release () {
    echo -e "${ONWHITE} - ${NORMAL}"

    TERMINAL_INFO="Tag and push a release."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    set -e

    TERMINAL_INFO="Make sure we're in the project root."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    cd $(dirname "$0")/..

    pwd

    TERMINAL_INFO="Make sure the darn thing works"
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    sudo bundle update

    TERMINAL_INFO="Build a new gem archive."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    rm -rf jekyll-theme-mozg-*.gem
    gem build -q jekyll-theme-mozg.gemspec

    TERMINAL_INFO="Make sure we're on the master branch."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    (git branch | grep -q 'master') || {
      echo "Only release from the master branch."
      exit 1
    }

    TERMINAL_INFO="Figure out what version we're releasing."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    tag=v`ls jekyll-theme-mozg-*.gem | sed 's/^jekyll-theme-mozg-\(.*\)\.gem$/\1/'`

    TERMINAL_INFO="Make sure we haven't released this version before."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    git fetch -t origin

    (git tag -l | grep -q "$tag") && {
      echo "Whoops, there's already a '${tag}' tag."
      exit 1
    }

    TERMINAL_INFO="Tag it and bag it."
    echo -e "${YELLOW} '${TERMINAL_INFO}' ${NORMAL}"

    gem push jekyll-theme-mozg-*.gem && git tag "$tag" &&
      git push origin master && git push origin "$tag"

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
        echo "${BOLD} 2/3 | deploy...${NORMAL}"
        deploy
        echo "${BOLD} 3/3 | functionAfter...${NORMAL}"
        functionAfter ##
        echo
        echo "${BOLD}Process complete!${NORMAL}"
        echo
        ;;

    release)
        echo "${BOLD} 1/3 | functionBefore...${NORMAL}"
        functionBefore ##
        echo "${BOLD} 2/3 | release...${NORMAL}"
        release
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
