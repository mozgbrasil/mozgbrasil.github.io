"use strict";(self.webpackChunkmain_app=self.webpackChunkmain_app||[]).push([[441],{441:(ke,J,c)=>{c.r(J),c.d(J,{ion_modal:()=>be});var A=c(467),h=c(8393),C=c(909),H=c(8621),f=c(4920),te=c(7838),$=c(4929),b=c(8438),l=c(1070),D=c(333),F=c(1331),Y=c(4921),N=c(1622),m=c(9986),de=c(3351),le=c(8607),Q=c(8476),z=(c(8669),c(1970),c(4379),function(e){return e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT",e}(z||{}));const ne={getEngine(){const e=(0,b.g)();if(e?.isPluginAvailable("StatusBar"))return e.Plugins.StatusBar},setStyle(e){const t=this.getEngine();t&&t.setStyle(e)},getStyle:(e=(0,A.A)(function*(){const t=this.getEngine();if(!t)return z.Default;const{style:n}=yield t.getInfo();return n}),function(){return e.apply(this,arguments)})},oe=(e,t)=>{if(1===t)return 0;const n=1/(1-t);return e*n+-t*n},ce=()=>{!Q.w||Q.w.innerWidth>=768||ne.setStyle({style:z.Dark})},re=(e=z.Default)=>{!Q.w||Q.w.innerWidth>=768||ne.setStyle({style:e})},pe=function(){var e=(0,A.A)(function*(t,n){"function"!=typeof t.canDismiss||!(yield t.canDismiss(void 0,l.G))||(n.isRunning()?n.onFinish(()=>{t.dismiss(void 0,"handler")},{oneTimeCallback:!0}):t.dismiss(void 0,"handler"))});return function(n,o){return e.apply(this,arguments)}}(),ie=e=>.00255275*2.71828**(-14.9619*e)-1.00255*2.71828**(-.0380968*e)+1,he=(e,t)=>(0,f.j)(400,e/Math.abs(1.1*t),500),fe=e=>{const{currentBreakpoint:t,backdropBreakpoint:n}=e,o=void 0===n||n<t,i=o?`calc(var(--backdrop-opacity) * ${t})`:"0",r=(0,m.c)("backdropAnimation").fromTo("opacity",0,i);return o&&r.beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),{wrapperAnimation:(0,m.c)("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-100*t}%)`}]),backdropAnimation:r}},me=e=>{const{currentBreakpoint:t,backdropBreakpoint:n}=e,o=`calc(var(--backdrop-opacity) * ${oe(t,n)})`,i=[{offset:0,opacity:o},{offset:1,opacity:0}],r=[{offset:0,opacity:o},{offset:n,opacity:0},{offset:1,opacity:0}],s=(0,m.c)("backdropAnimation").keyframes(0!==n?r:i);return{wrapperAnimation:(0,m.c)("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-100*t}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:s}},ue=(e,t)=>{const{presentingEl:n,currentBreakpoint:o}=t,i=(0,f.g)(e),{wrapperAnimation:r,backdropAnimation:s}=void 0!==o?fe(t):{backdropAnimation:(0,m.c)().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:(0,m.c)().fromTo("transform","translateY(100vh)","translateY(0vh)")};s.addElement(i.querySelector("ion-backdrop")),r.addElement(i.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const a=(0,m.c)("entering-base").addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(r);if(n){const d=window.innerWidth<768,w="ION-MODAL"===n.tagName&&void 0!==n.presentingElement,E=(0,f.g)(n),y=(0,m.c)().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),_=document.body;if(d){const k=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",S=`translateY(${w?"-10px":k}) scale(0.915)`;y.afterStyles({transform:S}).beforeAddWrite(()=>_.style.setProperty("background-color","black")).addElement(n).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:S,borderRadius:"10px 10px 0 0"}]),a.addAnimation(y)}else if(a.addAnimation(s),w){const x=`translateY(-10px) scale(${w?.915:1})`;y.afterStyles({transform:x}).addElement(E.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:x}]);const p=(0,m.c)().afterStyles({transform:x}).addElement(E.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:x}]);a.addAnimation([y,p])}else r.fromTo("opacity","0","1")}else a.addAnimation(s);return a},ge=(e,t,n=500)=>{const{presentingEl:o,currentBreakpoint:i}=t,r=(0,f.g)(e),{wrapperAnimation:s,backdropAnimation:a}=void 0!==i?me(t):{backdropAnimation:(0,m.c)().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:(0,m.c)().fromTo("transform","translateY(0vh)","translateY(100vh)")};a.addElement(r.querySelector("ion-backdrop")),s.addElement(r.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});const d=(0,m.c)("leaving-base").addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(n).addAnimation(s);if(o){const w=window.innerWidth<768,E="ION-MODAL"===o.tagName&&void 0!==o.presentingElement,y=(0,f.g)(o),_=(0,m.c)().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish(x=>{1===x&&(o.style.setProperty("overflow",""),Array.from(k.querySelectorAll("ion-modal:not(.overlay-hidden)")).filter(S=>void 0!==S.presentingElement).length<=1&&k.style.setProperty("background-color",""))}),k=document.body;if(w){const x=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",K=`translateY(${E?"-10px":x}) scale(0.915)`;_.addElement(o).keyframes([{offset:0,filter:"contrast(0.85)",transform:K,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),d.addAnimation(_)}else if(d.addAnimation(a),E){const p=`translateY(-10px) scale(${E?.915:1})`;_.addElement(y.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:p},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);const S=(0,m.c)().addElement(y.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:p},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);d.addAnimation([_,S])}else s.fromTo("opacity","1","0")}else d.addAnimation(a);return d},Ee=(e,t)=>{const{currentBreakpoint:n}=t,o=(0,f.g)(e),{wrapperAnimation:i,backdropAnimation:r}=void 0!==n?fe(t):{backdropAnimation:(0,m.c)().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),wrapperAnimation:(0,m.c)().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}])};return r.addElement(o.querySelector("ion-backdrop")),i.addElement(o.querySelector(".modal-wrapper")),(0,m.c)().addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([r,i])},De=(e,t)=>{const{currentBreakpoint:n}=t,o=(0,f.g)(e),{wrapperAnimation:i,backdropAnimation:r}=void 0!==n?me(t):{backdropAnimation:(0,m.c)().fromTo("opacity","var(--backdrop-opacity)",0),wrapperAnimation:(0,m.c)().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}])};return r.addElement(o.querySelector("ion-backdrop")),i.addElement(o.querySelector(".modal-wrapper")),(0,m.c)().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([r,i])},be=class{constructor(e){(0,h.r)(this,e),this.didPresent=(0,h.d)(this,"ionModalDidPresent",7),this.willPresent=(0,h.d)(this,"ionModalWillPresent",7),this.willDismiss=(0,h.d)(this,"ionModalWillDismiss",7),this.didDismiss=(0,h.d)(this,"ionModalDidDismiss",7),this.ionBreakpointDidChange=(0,h.d)(this,"ionBreakpointDidChange",7),this.didPresentShorthand=(0,h.d)(this,"didPresent",7),this.willPresentShorthand=(0,h.d)(this,"willPresent",7),this.willDismissShorthand=(0,h.d)(this,"willDismiss",7),this.didDismissShorthand=(0,h.d)(this,"didDismiss",7),this.ionMount=(0,h.d)(this,"ionMount",7),this.lockController=(0,te.c)(),this.triggerController=(0,l.e)(),this.coreDelegate=(0,H.C)(),this.isSheetModal=!1,this.inheritedAttributes={},this.inline=!1,this.gestureAnimationDismissing=!1,this.onHandleClick=()=>{const{sheetTransition:t,handleBehavior:n}=this;"cycle"!==n||void 0!==t||this.moveToNextBreakpoint()},this.onBackdropTap=()=>{const{sheetTransition:t}=this;void 0===t&&this.dismiss(void 0,l.B)},this.onLifecycle=t=>{const n=this.usersElement,o=Me[t.type];if(n&&o){const i=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:t.detail});n.dispatchEvent(i)}},this.presented=!1,this.hasController=!1,this.overlayIndex=void 0,this.delegate=void 0,this.keyboardClose=!0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.breakpoints=void 0,this.initialBreakpoint=void 0,this.backdropBreakpoint=0,this.handle=void 0,this.handleBehavior="none",this.component=void 0,this.componentProps=void 0,this.cssClass=void 0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.presentingElement=void 0,this.htmlAttributes=void 0,this.isOpen=!1,this.trigger=void 0,this.keepContentsMounted=!1,this.focusTrap=!0,this.canDismiss=!0}onIsOpenChange(e,t){!0===e&&!1===t?this.present():!1===e&&!0===t&&this.dismiss()}triggerChanged(){const{trigger:e,el:t,triggerController:n}=this;e&&n.addClickListener(t,e)}breakpointsChanged(e){void 0!==e&&(this.sortedBreakpoints=e.sort((t,n)=>t-n))}connectedCallback(){const{el:e}=this;(0,l.j)(e),this.triggerChanged()}disconnectedCallback(){this.triggerController.removeClickListener()}componentWillLoad(){var e;const{breakpoints:t,initialBreakpoint:n,el:o,htmlAttributes:i}=this,r=this.isSheetModal=void 0!==t&&void 0!==n,s=["aria-label","role"];this.inheritedAttributes=(0,f.h)(o,s),void 0!==i&&s.forEach(a=>{i[a]&&(this.inheritedAttributes=Object.assign(Object.assign({},this.inheritedAttributes),{[a]:i[a]}),delete i[a])}),r&&(this.currentBreakpoint=this.initialBreakpoint),void 0!==t&&void 0!==n&&!t.includes(n)&&(0,$.p)("Your breakpoints array must include the initialBreakpoint value."),null!==(e=this.htmlAttributes)&&void 0!==e&&e.id||(0,l.k)(this.el)}componentDidLoad(){!0===this.isOpen&&(0,f.r)(()=>this.present()),this.breakpointsChanged(this.breakpoints),this.triggerChanged()}getDelegate(e=!1){if(this.workingDelegate&&!e)return{delegate:this.workingDelegate,inline:this.inline};const n=this.inline=null!==this.el.parentNode&&!this.hasController;return{inline:n,delegate:this.workingDelegate=n?this.delegate||this.coreDelegate:this.delegate}}checkCanDismiss(e,t){var n=this;return(0,A.A)(function*(){const{canDismiss:o}=n;return"function"==typeof o?o(e,t):o})()}present(){var e=this;return(0,A.A)(function*(){const t=yield e.lockController.lock();if(e.presented)return void t();const{presentingElement:n,el:o}=e;e.currentBreakpoint=e.initialBreakpoint;const{inline:i,delegate:r}=e.getDelegate(!0);e.ionMount.emit(),e.usersElement=yield(0,H.a)(r,o,e.component,["ion-page"],e.componentProps,i),(0,f.k)(o)?yield(0,F.e)(e.usersElement):e.keepContentsMounted||(yield(0,F.w)()),(0,h.w)(()=>e.el.classList.add("show-modal"));const s=void 0!==n;s&&"ios"===(0,Y.b)(e)&&(e.statusBarStyle=yield ne.getStyle(),ce()),yield(0,l.f)(e,"modalEnter",ue,Ee,{presentingEl:n,currentBreakpoint:e.initialBreakpoint,backdropBreakpoint:e.backdropBreakpoint}),typeof window<"u"&&(e.keyboardOpenCallback=()=>{e.gesture&&(e.gesture.enable(!1),(0,f.r)(()=>{e.gesture&&e.gesture.enable(!0)}))},window.addEventListener(N.KEYBOARD_DID_OPEN,e.keyboardOpenCallback)),e.isSheetModal?e.initSheetGesture():s&&e.initSwipeToClose(),t()})()}initSwipeToClose(){var t,e=this;if("ios"!==(0,Y.b)(this))return;const{el:n}=this,o=this.leaveAnimation||Y.c.get("modalLeave",ge),i=this.animation=o(n,{presentingEl:this.presentingElement});if(!(0,C.a)(n))return void(0,C.p)(n);const s=null!==(t=this.statusBarStyle)&&void 0!==t?t:z.Default;this.gesture=((e,t,n,o)=>{const r=e.offsetHeight;let s=!1,a=!1,d=null,w=null,y=!0,_=0;const V=(0,le.createGesture)({el:e,gestureName:"modalSwipeToClose",gesturePriority:l.O,direction:"y",threshold:10,canStart:g=>{const u=g.event.target;return null===u||!u.closest||(d=(0,C.f)(u),d?(w=(0,C.i)(d)?(0,f.g)(d).querySelector(".inner-scroll"):d,!d.querySelector("ion-refresher")&&0===w.scrollTop):null===u.closest("ion-footer"))},onStart:g=>{const{deltaY:u}=g;y=!d||!(0,C.i)(d)||d.scrollY,a=void 0!==e.canDismiss&&!0!==e.canDismiss,u>0&&d&&(0,C.d)(d),t.progressStart(!0,s?1:0)},onMove:g=>{const{deltaY:u}=g;u>0&&d&&(0,C.d)(d);const P=g.deltaY/r,I=P>=0&&a,L=I?.2:.9999,U=I?ie(P/L):P,O=(0,f.j)(1e-4,U,L);t.progressStep(O),O>=.5&&_<.5?re(n):O<.5&&_>=.5&&ce(),_=O},onEnd:g=>{const u=g.velocityY,P=g.deltaY/r,I=P>=0&&a,L=I?.2:.9999,U=I?ie(P/L):P,O=(0,f.j)(1e-4,U,L),W=!I&&(g.deltaY+1e3*u)/r>=.5;let Z=W?-.001:.001;W?(t.easing("cubic-bezier(0.32, 0.72, 0, 1)"),Z+=(0,de.g)([0,0],[.32,.72],[0,1],[1,1],O)[0]):(t.easing("cubic-bezier(1, 0, 0.68, 0.28)"),Z+=(0,de.g)([0,0],[1,0],[.68,.28],[1,1],O)[0]);const q=he(W?P*r:(1-O)*r,u);s=W,V.enable(!1),d&&(0,C.r)(d,y),t.onFinish(()=>{W||V.enable(!0)}).progressEnd(W?1:0,Z,q),I&&O>L/4?pe(e,t):W&&o()}});return V})(n,i,s,()=>{this.gestureAnimationDismissing=!0,re(this.statusBarStyle),this.animation.onFinish((0,A.A)(function*(){yield e.dismiss(void 0,l.G),e.gestureAnimationDismissing=!1}))}),this.gesture.enable(!0)}initSheetGesture(){const{wrapperEl:e,initialBreakpoint:t,backdropBreakpoint:n}=this;if(!e||void 0===t)return;const o=this.enterAnimation||Y.c.get("modalEnter",ue),i=this.animation=o(this.el,{presentingEl:this.presentingElement,currentBreakpoint:t,backdropBreakpoint:n});i.progressStart(!0,1);const{gesture:r,moveSheetToBreakpoint:s}=((e,t,n,o,i,r,s=[],a,d,w)=>{const _={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:0!==i?[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-i,opacity:0},{offset:1,opacity:0}]:[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}]},k=e.querySelector("ion-content"),x=n.clientHeight;let p=o,S=0,K=!1;const g=r.childAnimations.find(v=>"wrapperAnimation"===v.id),u=r.childAnimations.find(v=>"backdropAnimation"===v.id),P=s[s.length-1],I=s[0],L=()=>{e.style.setProperty("pointer-events","auto"),t.style.setProperty("pointer-events","auto"),e.classList.remove(l.F)},U=()=>{e.style.setProperty("pointer-events","none"),t.style.setProperty("pointer-events","none"),e.classList.add(l.F)};g&&u&&(g.keyframes([..._.WRAPPER_KEYFRAMES]),u.keyframes([..._.BACKDROP_KEYFRAMES]),r.progressStart(!0,1-p),p>i?L():U()),k&&p!==P&&(k.scrollY=!1);const q=v=>{const{breakpoint:B,canDismiss:M,breakpointOffset:R,animated:G}=v,j=M&&0===B,T=j?p:B,ye=0!==T;return p=0,g&&u&&(g.keyframes([{offset:0,transform:`translateY(${100*R}%)`},{offset:1,transform:`translateY(${100*(1-T)}%)`}]),u.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${oe(1-R,i)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${oe(T,i)})`}]),r.progressStep(0)),ee.enable(!1),j?pe(e,r):ye||d(),k&&T===s[s.length-1]&&(k.scrollY=!0),new Promise(ae=>{r.onFinish(()=>{ye?g&&u?(0,f.r)(()=>{g.keyframes([..._.WRAPPER_KEYFRAMES]),u.keyframes([..._.BACKDROP_KEYFRAMES]),r.progressStart(!0,1-T),p=T,w(p),p>i?L():U(),ee.enable(!0),ae()}):(ee.enable(!0),ae()):ae()},{oneTimeCallback:!0}).progressEnd(1,0,G?500:0)})},ee=(0,le.createGesture)({el:n,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:v=>{const B=(0,C.f)(v.event.target);if(p=a(),1===p&&B){const M=(0,C.i)(B)?(0,f.g)(B).querySelector(".inner-scroll"):B;return!B.querySelector("ion-refresher")&&0===M.scrollTop}return!0},onStart:v=>{K=void 0!==e.canDismiss&&!0!==e.canDismiss&&0===I,v.deltaY>0&&k&&(k.scrollY=!1),(0,f.r)(()=>{e.focus()}),r.progressStart(!0,1-p)},onMove:v=>{v.deltaY>0&&k&&(k.scrollY=!1);const M=s.length>1?1-s[1]:void 0,R=1-p+v.deltaY/x,G=void 0!==M&&R>=M&&K,j=G?.95:.9999,T=G&&void 0!==M?M+ie((R-M)/(j-M)):R;S=(0,f.j)(1e-4,T,j),r.progressStep(S)},onEnd:v=>{const R=p-(v.deltaY+350*v.velocityY)/x,G=s.reduce((j,T)=>Math.abs(T-R)<Math.abs(j-R)?T:j);q({breakpoint:G,breakpointOffset:S,canDismiss:K,animated:!0})}});return{gesture:ee,moveSheetToBreakpoint:q}})(this.el,this.backdropEl,e,t,n,i,this.sortedBreakpoints,()=>{var a;return null!==(a=this.currentBreakpoint)&&void 0!==a?a:0},()=>this.sheetOnDismiss(),a=>{this.currentBreakpoint!==a&&(this.currentBreakpoint=a,this.ionBreakpointDidChange.emit({breakpoint:a}))});this.gesture=r,this.moveSheetToBreakpoint=s,this.gesture.enable(!0)}sheetOnDismiss(){var e=this;this.gestureAnimationDismissing=!0,this.animation.onFinish((0,A.A)(function*(){e.currentBreakpoint=0,e.ionBreakpointDidChange.emit({breakpoint:e.currentBreakpoint}),yield e.dismiss(void 0,l.G),e.gestureAnimationDismissing=!1}))}dismiss(e,t){var n=this;return(0,A.A)(function*(){var o;if(n.gestureAnimationDismissing&&t!==l.G)return!1;const i=yield n.lockController.lock();if("handler"!==t&&!(yield n.checkCanDismiss(e,t)))return i(),!1;const{presentingElement:r}=n;void 0!==r&&"ios"===(0,Y.b)(n)&&re(n.statusBarStyle),typeof window<"u"&&n.keyboardOpenCallback&&(window.removeEventListener(N.KEYBOARD_DID_OPEN,n.keyboardOpenCallback),n.keyboardOpenCallback=void 0);const a=yield(0,l.g)(n,e,t,"modalLeave",ge,De,{presentingEl:r,currentBreakpoint:null!==(o=n.currentBreakpoint)&&void 0!==o?o:n.initialBreakpoint,backdropBreakpoint:n.backdropBreakpoint});if(a){const{delegate:d}=n.getDelegate();yield(0,H.d)(d,n.usersElement),(0,h.w)(()=>n.el.classList.remove("show-modal")),n.animation&&n.animation.destroy(),n.gesture&&n.gesture.destroy()}return n.currentBreakpoint=void 0,n.animation=void 0,i(),a})()}onDidDismiss(){return(0,l.h)(this.el,"ionModalDidDismiss")}onWillDismiss(){return(0,l.h)(this.el,"ionModalWillDismiss")}setCurrentBreakpoint(e){var t=this;return(0,A.A)(function*(){if(!t.isSheetModal)return void(0,$.p)("setCurrentBreakpoint is only supported on sheet modals.");if(!t.breakpoints.includes(e))return void(0,$.p)(`Attempted to set invalid breakpoint value ${e}. Please double check that the breakpoint value is part of your defined breakpoints.`);const{currentBreakpoint:n,moveSheetToBreakpoint:o,canDismiss:i,breakpoints:r,animated:s}=t;n!==e&&o&&(t.sheetTransition=o({breakpoint:e,breakpointOffset:1-n,canDismiss:void 0!==i&&!0!==i&&0===r[0],animated:s}),yield t.sheetTransition,t.sheetTransition=void 0)})()}getCurrentBreakpoint(){var e=this;return(0,A.A)(function*(){return e.currentBreakpoint})()}moveToNextBreakpoint(){var e=this;return(0,A.A)(function*(){const{breakpoints:t,currentBreakpoint:n}=e;if(!t||null==n)return!1;const o=t.filter(a=>0!==a),r=(o.indexOf(n)+1)%o.length,s=o[r];return yield e.setCurrentBreakpoint(s),!0})()}render(){const{handle:e,isSheetModal:t,presentingElement:n,htmlAttributes:o,handleBehavior:i,inheritedAttributes:r,focusTrap:s}=this,a=!1!==e&&t,d=(0,Y.b)(this),w=void 0!==n&&"ios"===d,E="cycle"===i;return(0,h.h)(h.f,Object.assign({key:"013ba4864ca4d2c1052c512f6a4b0732b8decff7","no-router":!0,tabindex:"-1"},o,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[d]:!0,"modal-default":!w&&!t,"modal-card":w,"modal-sheet":t,"overlay-hidden":!0,[l.F]:!1===s},(0,D.g)(this.cssClass)),onIonBackdropTap:this.onBackdropTap,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),(0,h.h)("ion-backdrop",{key:"498b1c0a03836d6799dcf3b8e9315805c70f6480",ref:y=>this.backdropEl=y,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),"ios"===d&&(0,h.h)("div",{key:"ce22e4caf1096e87248926fe2477f0d5a4c8a5cf",class:"modal-shadow"}),(0,h.h)("div",Object.assign({key:"540e47b15d8290166c39b022c725182114a75682",role:"dialog"},r,{"aria-modal":"true",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:y=>this.wrapperEl=y}),a&&(0,h.h)("button",{key:"f3b352ec9a63a7ec801462aacfd8295b4302d115",class:"modal-handle",tabIndex:E?0:-1,"aria-label":"Activate to adjust the size of the dialog overlaying the screen",onClick:E?this.onHandleClick:void 0,part:"handle"}),(0,h.h)("slot",{key:"31a3f58f4c733ffdf736523c154200874a96b1d0"})))}get el(){return(0,h.i)(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}}},Me={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};var e;be.style={ios:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{-webkit-box-shadow:none;box-shadow:none}:host(.modal-card) .modal-shadow{-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}',md:':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}'}},333:(ke,J,c)=>{c.d(J,{c:()=>C,g:()=>f,h:()=>h,o:()=>$});var A=c(467);const h=(b,l)=>null!==l.closest(b),C=(b,l)=>"string"==typeof b&&b.length>0?Object.assign({"ion-color":!0,[`ion-color-${b}`]:!0},l):l,f=b=>{const l={};return(b=>void 0!==b?(Array.isArray(b)?b:b.split(" ")).filter(D=>null!=D).map(D=>D.trim()).filter(D=>""!==D):[])(b).forEach(D=>l[D]=!0),l},te=/^[a-z][a-z0-9+\-.]*:/,$=function(){var b=(0,A.A)(function*(l,D,F,Y){if(null!=l&&"#"!==l[0]&&!te.test(l)){const N=document.querySelector("ion-router");if(N)return D?.preventDefault(),N.push(l,F,Y)}return!1});return function(D,F,Y,N){return b.apply(this,arguments)}}()}}]);