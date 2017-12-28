/**
 * Copyright © 2016 Mozg. All rights reserved.
 * See LICENSE.txt for license details.
 */

//-

console.warn('/assets/js/internal/utils.js');

//-

// http://requirejs.org/docs/faq-advanced.html#css

function loadCss(url) {
    link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

//-

// http://www.w3schools.com/js/default.asp

var a = 1, b = 2, c = 3;

function getAllinWindow(){ 
    var array=[];
    for ( var i in window ) {
        //console.log(i, typeof window[i], window[i]);

        //var valueToPush = {};
        //valueToPush.obj = i;
        //valueToPush.typeof = (typeof window[i]).toString();
        //array.push(valueToPush);

        array.push(i);    
    
        if((window[i]) ) {
            //console.log(getAllMethods(window[i]));
        }
    }
    return array;
}

loadWindow = getAllinWindow();

//console.log(loadWindow);

//-

function getAllMethods(object) {
    return Object.getOwnPropertyNames(object).filter(
        function(property) {
            //console.log(typeof object[property]);
            //return typeof object[property] == 'function';
            return object[property];
        }
    );
}

//console.log(getAllMethods(self));

//-

window.onload=function(){
    console.info('window.onload=function()');
};

var myObject = {
    messageLog:"function onLoad()",
    myFunction: function () {
        console.info(this.messageLog);
    }
}

function onLoad() {
    myObject.myFunction();

    //numArgs = arguments.length;
    //listArgs = arguments;
    //console.log(numArgs);
    //console.log(listArgs);

    loadedWindow = getAllinWindow();

    console.info('arrayDiff');
    //console.log(loadWindow);
    //console.log(loadedWindow);
    var diff = jQuery(loadedWindow).not(loadWindow).get();
    console.log(diff);

    //console.dir(window); // ## DEBUG
}

function _onLoad() {
    _function = onLoad;    
    milliseconds = 2000; // 1000 ms = 1 second.
    _setTimeout = setTimeout(_function, milliseconds);
}

window.addEventListener("load", function(){ _onLoad(); });

//-

if (typeof MyApp === 'undefined') {
    MyApp = {};
}

MyApp.core = {};

// Central way to allow quick debugging for KnockoutJs
MyApp.core.DebugKO = function (target, viewModel) {
    console.log(target + ' - ' + viewModel);

    target = target != undefined && target != null ? target : "body";
    viewModel = viewModel != undefined && viewModel != null ? viewModel : "$root";

    jQuery(target).append("<pre style='border: 1px red dashed; padding: 10px; margin: 10px;' data-bind='text: ko.toJSON(" + viewModel+ ", null, 2)'></pre><div class='clear'></div>");
};

//-

//var DEBUG = true;

//-

