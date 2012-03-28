/*
 *  Switch Writer
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
function SwitchWriter(){
	VersionSwitchWriter();
	ResolutionSwitchWriter();
}
function VersionSwitchWriter(){
	var url = location.href;
	var urlLen = url.length;
	var verSwitcher = document.getElementById("VersionSwitcher");
	if (url.charAt(urlLen - 6)=='H') {
		verSwitcher.innerHTML = "Switch to Flash";
		verSwitcher.href = url.replace("H.html", "F.html");
	} else if (url.charAt(urlLen - 6)=='F') {
		verSwitcher.innerHTML = "Switch to HTML5";
		verSwitcher.href = url.replace("F.html", "H.html");
	} else {
		verSwitcher.innerHTML = "Switch";
		verSwitcher.href = "#";	
	}
}
function ResolutionSwitchWriter(){
	var url = location.href;
	var urlLen = url.length;
	var resSwitcher = document.getElementById("ResolutionSwitcher");
	if (url.search("240p|480p|720p") == -1){
		resSwitcher.innerHTML = "";
	} else if (url.search("240p") != -1) {
		var kids = resSwitcher.childNodes;
		kids[1].href = url.replace("240p", "480p");
		kids[2].href = url.replace("240p", "720p");
	} else if (url.search("480p") != -1) {
		var kids = resSwitcher.childNodes;
		kids[0].href = url.replace("480p", "240p");
		kids[2].href = url.replace("480p", "720p");
	} else if (url.search("720p") != -1) {
		var kids = resSwitcher.childNodes;
		kids[0].href = url.replace("720p", "240p");
		kids[1].href = url.replace("720p", "480p");
	}
}