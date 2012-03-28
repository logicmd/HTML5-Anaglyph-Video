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
function VersionSwitchWriter(){
	var url = location.href;
	var urlLen = url.length;
	var verSwitcher = document.getElementById("switcher");
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