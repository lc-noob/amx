function Ajax(){};
	Ajax.prototype.getXhr=()=>{
		return XMLHttpRequest ? (new XMLHttpRequest()) : (new ActiveXObject("Microsoft.XMLHttp"));
	}
	Ajax.prototype.open=function(methon,url){
		methon=methon.toUpperCase();
		this.xhr.open(methon,url);
		methon=="POST" && this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	Ajax.prototype.send=function(data){
		 data=data||null; 
		 this.xhr.send(data);
	}
	Ajax.prototype.onreadystatechange=function(Function){
		this.xhr.onreadystatechange=()=>{
			if(this.xhr.readyState==4 && this.xhr.status==200){
					Function();
			}
		}
	}

function CreateElement(element){
	return document.createElement(element);
}

function Onclick(){};
	Onclick.prototype.Initalize=function(tableName,arr,Function,FunctionImg,flag){
		var num=Math.floor(Math.random()*(arr.length));
		if(flag){
			Function(arr[num][0],tableName);
		}
		FunctionImg(arr[num][0],tableName);
		return num;
	}
function findIndex(){
	var path;
	var n=window.location.pathname.lastIndexOf(".html");
	if(n!=-1){
		n=window.location.pathname.lastIndexOf("/",n);
		path=window.location.pathname.slice(0,n+1);
	}else{
		path=window.location.pathname;
	}
	return decodeURIComponent(path);
}
function Error(){
	window.location.assign(window.location.protocol+"//"+window.location.host+findIndex()+"404.html");
}
function Url(name,html){
	window.location.assign(window.location.protocol+"//"+window.location.host+findIndex()+html+"?name="+name);
}
function Index(name){
	
	window.location.assign(window.location.protocol+"//"+window.location.host+findIndex()+name);
}
function Search(){
	if(window.location.search.length){
		var name=window.location.search.split("=")[1];
	}else{
		return null;
	}
	return name;
}
function f1() {
	var UL = document.querySelector(".product>ul");
	try{
		var dataS = JSON.parse(ajax.xhr.responseText);
	}catch(e){
		Error();
	}
	for (var i = 0; i < dataS.length; i++) {
		var li = CreateElement("li");
		var p = CreateElement("p");
		var pText = document.createTextNode(dataS[i][0]);
		var I = CreateElement("i");
		var span = CreateElement("span");
		span.innerHTML = "&gt;";
		p.appendChild(I);
		p.appendChild(pText);
		p.appendChild(span);
		li.appendChild(p);
		UL.appendChild(li);
	}
	var lastElement = document.querySelector(".news-nav>p").lastElementChild;
	if(searchName=="null"){
		var flag=(!document.querySelectorAll(".product2").length)?1:0;
		if(document.querySelectorAll(".product2").length){
				tableName="productson"
			}
		var num = initalizeClick.Initalize(tableName, dataS, f2, f3,flag);
		UL.children[num].className = "active";
		lastElement.innerHTML = UL.children[num].innerText.slice(0, -1);
	}else{
		$ULson=$(`p:contains(${searchName})`);
		while($ULson[0].nodeName!="LI"){
			$ULson=$ULson.parent();
		}
		$ULson.attr("class","active");
		lastElement.innerHTML=searchName;
		if(!document.querySelectorAll(".product2").length){
			f2(searchName, tableName);
		}else{
			tableName="productson";
		}
		f3(searchName,tableName);
		searchName="null";
	}
		
	
	UL.onclick = e => {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.nodeName != "UL") {
			var img = document.querySelectorAll(".team-img");
			img.length && img[0].lastElementChild.parentNode.removeChild(img[0].lastElementChild);

			while (target.nodeName != "LI") {
				target = target.parentNode;
			}
			for (var i = 0; i < target.parentNode.children.length; i++) {
				target.parentNode.children[i].removeAttribute("class");
			}
			target.className = "active";
			var lastElement = document.querySelector(".news-nav>p").lastElementChild;
			// lastElement.innerHTML = target.innerText.slice(0, -1);
			searchName= target.innerText.slice(0, -1);
			lastElement.innerHTML=searchName;
			if(!document.querySelectorAll(".product2").length){
				f2(searchName, tableName);
			}else{
				tableName="productson";
			}
			f3(searchName, tableName);
			searchName="null";
		}
	}
}
