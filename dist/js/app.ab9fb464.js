(function(e){function t(t){for(var o,r,a=t[0],c=t[1],l=t[2],u=0,f=[];u<a.length;u++)r=a[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&f.push(s[r][0]),s[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);m&&m(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,a=1;a<n.length;a++){var c=n[a];0!==s[c]&&(o=!1)}o&&(i.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},s={app:0},i=[];function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/websocket-chatroom/dist/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var m=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"07e7":function(e,t,n){"use strict";n("bc0a")},2404:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Home")],1)},i=[],r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"navbar"},[e.roomOpen?n("div",{staticClass:"back",on:{click:e.back}},[e._v("back")]):e._e(),n("div",{staticClass:"title"},[e._v(e._s(e.title))])]),e.roomOpen?n("div",{staticClass:"bgImage"},[n("div",{staticClass:"roomInfo"},[n("div",{staticClass:"onLineBox"},[e._v(" nickname："),n("span",{staticClass:"roomNickname"},[e._v(e._s(this.nickname))]),e._v(" online："+e._s(this.onlineNum)+" ")])]),n("div",{ref:"msgWrap",staticClass:"msgBox",on:{scroll:e.listScroll}},[n("div",{ref:"msgList",staticClass:"msgPanel"},e._l(e.msgList,(function(t,o){return n("div",{key:o,class:["msgItem",t.self&&"selfItem"]},[!t.self&&t.name?n("span",{staticStyle:{"font-weight":"500","font-size":"15px",color:"#1d688c"}},[e._v(e._s(t.name)+" : ")]):e._e(),n("span",{style:{color:e.currentRoomInfo.msgColor}},[e._v(e._s(t.content))]),t.self?n("span",{staticStyle:{"font-weight":"500","font-size":"15px",color:"#1d688c"}},[e._v(" : me")]):e._e()])})),0)]),n("div",{staticClass:"msgFooter"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputMsg,expression:"inputMsg"}],staticClass:"msgInput",attrs:{type:"text",placeholder:"Please enter your speech"},domProps:{value:e.inputMsg},on:{keydown:e.sendInputKeydown,input:function(t){t.target.composing||(e.inputMsg=t.target.value)}}}),n("div",{staticClass:"msgBtn",on:{click:e.sendMsg}},[e._v("speak")])])]):n("div",{staticClass:"openBg"},[n("div",{staticClass:"userInfo"},[e.nickname?n("div",{staticClass:"nickname"},[e._v("nickname："+e._s(e.nickname))]):n("div",{staticClass:"nameInputBox"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputname,expression:"inputname"}],staticClass:"nameInput",attrs:{type:"text",placeholder:"Enter your nickname"},domProps:{value:e.inputname},on:{keydown:e.nameKeydown,input:function(t){t.target.composing||(e.inputname=t.target.value)}}}),n("div",{staticClass:"nameConfirmBtn",on:{click:e.certainName}},[e._v("confirm")])])]),n("div",{staticClass:"cardList"},e._l(e.roomList,(function(t,o){return n("div",{key:o,staticClass:"itemCard",on:{click:function(n){return e.enterRoom(t)}}},[n("img",{staticClass:"pic",attrs:{src:t.frame}}),n("span",{staticClass:"text"},[e._v(e._s(t.name))])])})),0)])])},a=[],c=n("5530"),l=(n("b0c0"),n("e9c4"),n("99af"),n("498a"),n("76a0")),m=n("7707"),u=n.n(m),f=n("2ef0"),p=[{roomId:1,frame:n("f052"),name:"make friends",msgColor:"#7b43e7"},{roomId:2,frame:n("e52d"),name:"script kill",msgColor:"#e743d2"},{roomId:3,frame:n("e870"),name:"Adventure Island",msgColor:"#3fa925"},{roomId:4,frame:n("d7f1"),name:"listen quietly",msgColor:"#a95024"}],d=function(e,t,n){var o=e.scrollHeight-e.scrollTop,s=t+n,i=o<=s;return i};u.a.polyfill();var h={name:"home",data:function(){return{nickname:"",inputname:"",userId:"",roomList:p,msgList:[],roomOpen:!1,ws:null,onlineNum:0,inputMsg:"",currentRoomInfo:0,heartbeatTimer:-1,heartBeatTimeoutJob:-1,msgWrapRef:null,scrollIsBottom:!0,wrapperHeight:0,isBindScrolled:!1,isSending:!1,msgListRef:null,scrollBottomTimeId:null}},computed:{title:function(){return this.roomOpen?this.currentRoomInfo.name:"home"}},watch:{msgList:{deep:!0,handler:function(){this.msgChange()}},roomOpen:function(e){var t=this;e&&this.$nextTick((function(){t.msgWrapRef=t.$refs.msgWrap,t.msgListRef=t.$refs.msgList,t.wrapperHeight=t.msgWrapRef.offsetHeight}))}},mounted:function(){},methods:{enterRoom:function(e){var t=this;if(!this.nickname)return Object(l["Toast"])("Come up with a nice name～");this.navbarProps=Object(c["a"])(Object(c["a"])({},this.navbarProps),{},{title:e.name}),this.currentRoomInfo=e,this.connect(),console.log("before open",this.ws.readyState),this.ws.onopen=function(){console.log("onopen",t.ws.readyState),t.roomOpen=!0,t.ws.send(JSON.stringify({userId:t.userName,userName:t.nickname,roomId:e.roomId,roomName:e.name,event:"login"})),-1!==t.heartbeatTimer&&(clearInterval(t.heartbeatTimer),t.heartbeatTimer=-1),t.heartbeatTimer=setInterval((function(){-1!==t.heartBeatTimeoutJob&&(clearTimeout(t.heartBeatTimeoutJob),t.heartBeatTimeoutJob=-1),t.heartBeatTimeoutJob=setTimeout((function(){console.log("heartbeat timeout")}),1e4),t.ws.send(JSON.stringify({event:"heartBeat",content:"ping"})),console.log("send ping")}),25e3)},this.ws.onmessage=function(e){var n=JSON.parse(e.data);if("heartBeat"===n.event&&"pong"===n.content)return console.log("receive server pong"),void(-1!==t.heartBeatTimeoutJob&&(clearTimeout(t.heartBeatTimeoutJob),t.heartBeatTimeoutJob=-1));if(t.onlineNum=n.num,"login"===n.event)t.msgList.push({content:"welcome ".concat(n.userName," into room ").concat(n.roomName)});else if("logout"===n.event)console.log("logout",n),t.msgList.push({content:"".concat(n.userName,"leave the room")});else{var o=t.userId===n.userId;if(o)return;t.msgList.push({name:n.userName,self:!1,content:n.content})}},this.ws.onclose=function(){t.removeAllTimeJob(),Object(l["Toast"])("you have left the room"),t.roomOpen=!1,t.msgList=[],t.onlineNum=0}},connect:function(){this.ws=new WebSocket("ws://49.234.194.68:9001/")},sendMsg:function(){var e=this;if(!this.inputMsg.trim().length)return Object(l["Toast"])("Statement cannot be empty~");this.isSending=!0,this.ws.send(JSON.stringify({userName:this.nickname,userId:this.userId,roomId:this.currentRoomInfo.roomId,roomName:this.currentRoomInfo.name,content:this.inputMsg.trim()})),this.msgList.push({content:"".concat(this.inputMsg),name:this.nickname,self:!0}),this.inputMsg="",setTimeout((function(){e.scrollBottom(),e.isSending=!1}),0)},close:function(){this.ws&&this.ws.close()},back:function(){this.roomOpen&&(this.roomOpen=!1,this.msgList=[],this.onlineNum=0,this.close(),Object(l["Toast"])({content:"you have left the room",duration:1e3}))},certainName:function(){this.inputname.trim().length?(this.nickname=this.inputname.trim(),this.userId="".concat(+new Date)):Object(l["Toast"])("Username can not be empty！")},removeAllTimeJob:function(){clearInterval(this.heartbeatTimer),this.heartbeatTimer=-1,clearTimeout(this.heartBeatTimeoutJob),this.heartBeatTimeoutJob=-1},msgChange:function(){var e=this;this.scrollBottomTimeId&&(clearTimeout(this.scrollBottomTimeId),this.scrollBottomTimeId=null),setTimeout((function(){e.scrollIsBottom?e.$nextTick((function(){var t=e.msgListRef.offsetHeight,n=t-e.wrapperHeight,o=e.msgWrapRef.scrollTop;n-o>10?(e.isBindScrolled&&(e.isBindScrolled=!1,e.msgWrapRef.removeEventListener("scroll",e.addScroll,!1)),e.msgWrapRef.scrollTo({top:n+10,left:0,behavior:"smooth"})):e.isSending||e.isBindScrolled||(e.isBindScrolled=!0,e.msgWrapRef.addEventListener("scroll",e.addScroll,!1))})):e.scrollBottom()}),500)},addScroll:function(){Object(f["debounce"])(this.listScroll,200),this.isBindScrolled=!0},scrollBottom:function(){this.msgWrapRef.scrollTo({top:this.msgListRef.offsetHeight,left:0,behavior:"smooth"})},listScroll:function(){var e=this.msgWrapRef,t=d(e,e.clientHeight,50);this.scrollIsBottom=!!t},sendInputKeydown:function(e){var t=e.keyCode;13==t&&this.sendMsg()},nameKeydown:function(e){var t=e.keyCode;13==t&&this.certainName()}},beforeDestroy:function(){this.removeAllTimeJob(),this.close(),this.msgWrapRef&&this.msgWrapRef.removeEventListener("scroll",this.addScroll,!1)}},g=h,v=(n("07e7"),n("2877")),b=Object(v["a"])(g,r,a,!1,null,"24f0fb0a",null),y=b.exports,T={name:"App",components:{Home:y}},w=T,I=(n("034f"),Object(v["a"])(w,s,i,!1,null,null,null)),k=I.exports;n("2404"),n("aa35");o["default"].config.productionTip=!1,new o["default"]({render:function(e){return e(k)}}).$mount("#app")},"85ec":function(e,t,n){},bc0a:function(e,t,n){},d7f1:function(e,t,n){e.exports=n.p+"img/frame4.e1a21ef1.jpeg"},e52d:function(e,t,n){e.exports=n.p+"img/frame2.a2d45279.jpeg"},e870:function(e,t,n){e.exports=n.p+"img/frame3.232a61d9.jpg"},f052:function(e,t,n){e.exports=n.p+"img/frame1.cf29ab3b.jpeg"}});
//# sourceMappingURL=app.ab9fb464.js.map