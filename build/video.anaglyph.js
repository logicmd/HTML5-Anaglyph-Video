/*
 *  HTML5 Anaglyph Video
 * 
 *  Copyright (C) 2012 Kevin Tong (logicmd AT gmail.com)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 var processor={timerCallback:function(){if(!this.A.paused&&!this.A.ended){this.funcA();this.funcB();var c=this;setTimeout(function(){c.timerCallback()},0)}},doLoad:function(c,a,d,i,h,j,e){this.B=c;this.C=a;this.D=d;this.O=j;this.P=e;this.A=document.getElementById("videoDiv");this.E=!1;this.F=document.getElementById("display");this.G=this.F.getContext("2d");this.I=document.createElement("canvas");this.H=this.I.getContext("2d");this.O=j;this.P=e;this.J=i;this.K=h;var f=this;this.A.addEventListener("play",
function(){f.prepareSizeLoc();f.timerCallback()},!1)},prepareSizeLoc:function(){var c=this.J,a=this.K;switch(this.B){case "StereoUD":case "StereoDU":this.I.width=c;this.I.height=2*a;this.L=this.G.createImageData(c,a);break;case "StereoLR":case "StereoRL":this.I.width=2*c,this.I.height=a,this.L=this.G.createImageData(c,a)}this.F.style.position="relative";this.E?this.funcD():this.funcC()},funcB:function(){var c=this.D,a=0,d=this.M1,i=this.M2,h=this.L,j=this.L.width*this.L.height;switch(this.C){case "TrueAnaglyph":if("RedCyan"==
c)var e=d,f=i,d=i;else if("GreenMagenta"==c)e=i,f=d;else return;for(x=0;x++<j;)r=0.299*e.data[a+0]+0.587*e.data[a+1]+0.114*e.data[a+2],"GreenMagenta"==c?(g=0.299*f.data[a+0]+0.587*f.data[a+1]+0.114*f.data[a+2],b=0):(g=0,b=0.299*d.data[a+0]+0.587*d.data[a+1]+0.114*d.data[a+2]),r=Math.min(Math.max(r,0),255),b=Math.min(Math.max(b,0),255),h.data[a++]=r,h.data[a++]=g,h.data[a++]=b,h.data[a++]=255;break;case "GrayAnaglyph":if("RedCyan"==c)e=d,d=f=i;else if("GreenMagenta"==c)e=i,f=d,d=i;else return;for(x=
0;x++<j;)r=0.299*e.data[a+0]+0.587*e.data[a+1]+0.114*e.data[a+2],g=0.299*f.data[a+0]+0.587*f.data[a+1]+0.114*f.data[a+2],b=0.299*d.data[a+0]+0.587*d.data[a+1]+0.114*d.data[a+2],r=Math.min(Math.max(r,0),255),g=Math.min(Math.max(g,0),255),b=Math.min(Math.max(b,0),255),h.data[a++]=r,h.data[a++]=g,h.data[a++]=b,h.data[a++]=255;break;case "ColorAnaglyph":if("RedCyan"==c)e=d,d=f=i;else if("GreenMagenta"==c)e=i,f=d,d=i;else return;for(x=0;x++<j;)h.data[a]=e.data[a++],h.data[a]=f.data[a++],h.data[a]=d.data[a++],
h.data[a]=255,a++;break;case "OptimizedAnaglyph":if("RedCyan"==c)e=d,d=f=i;else if("GreenMagenta"==c)e=i,f=d,d=i;else return;for(x=0;x++<j;)r=0.7*e.data[a+1]+0.3*e.data[a+2],g=f.data[a+1],b=d.data[a+2],r=Math.min(Math.max(r,0),255),h.data[a++]=r,h.data[a++]=g,h.data[a++]=b,h.data[a++]=255;break;case "Optimized+Anaglyph":if("RedCyan"==c)e=d,d=f=i;else if("GreenMagenta"==c)e=i,f=d,d=i;else return;for(x=0;x++<j;)g=e.data[a+1]+0.45*Math.max(0,e.data[a+0]-e.data[a+1]),b=e.data[a+2]+0.25*Math.max(0,e.data[a+
0]-e.data[a+2]),r=0.749*g+0.251*b,g=f.data[a+1]+0.45*Math.max(0,f.data[a+0]-f.data[a+1]),b=d.data[a+2]+0.25*Math.max(0,d.data[a+0]-d.data[a+2]),r=Math.min(Math.max(r,0),255),g=Math.min(Math.max(g,0),255),b=Math.min(Math.max(b,0),255),h.data[a++]=r,h.data[a++]=g,h.data[a++]=b,h.data[a++]=255}this.N.getContext("2d").putImageData(this.L,0,0);this.G.drawImage(this.N,0,0)},funcA:function(){var c=this.J,a=this.K;this.H.drawImage(this.A,0,0,c,a,0,0,this.I.width,this.I.height);switch(this.B){case "StereoUD":this.M1=
this.H.getImageData(0,0,c,a);this.M2=this.H.getImageData(0,a,c,a);break;case "StereoDU":this.M2=this.H.getImageData(0,0,c,a);this.M1=this.H.getImageData(0,a,c,a);break;case "StereoLR":this.M1=this.H.getImageData(0,0,c,a);this.M2=this.H.getImageData(c,0,c,a);break;case "StereoRL":this.M2=this.H.getImageData(0,0,c,a),this.M1=this.H.getImageData(c,0,c,a)}},funcC:function(){this.N=document.createElement("canvas");this.N.width=this.L.width;this.N.height=this.L.height;this.F.width=this.O;this.F.height=
this.P;this.F.style.top=0-this.P-1+"px";this.F.style.left="-0.5px";this.F.style.zIndex="2";var c=this.F.height/this.L.height,a=this.F.width/this.L.width,c=c<a?c:a;this.G.scale(c,c);this.G.translate((this.F.width-this.L.width*c)/2/c,(this.F.height-this.L.height*c)/2/c);this.E=!1},funcD:function(c,a){this.N=document.createElement("canvas");this.N.width=this.L.width;this.N.height=this.L.height;this.F.width=window.screen.width;this.F.height=window.screen.height-45;this.F.style.zIndex="2147483647";0<c?
this.Q=c:c=this.Q;0!=a?this.R=a:a=this.R;this.F.style.top=0-this.P-a+"px";this.F.style.left=0-c-8+"px";var d=(window.screen.height+1)/this.L.height,i=(this.F.width+1)/this.L.width,d=d<i?d:i;this.G.scale(d,d);this.G.translate((this.F.width+1-this.L.width*d)/2/d,(window.screen.height+1-this.L.height*d)/2/d);this.E=!0},funcE:function(){this.funcC();this.E=!1}};
