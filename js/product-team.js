var tableName;
var searchName
if (document.querySelectorAll(".team").length) {
		tableName = "team";
		if(!searchName){
			searchName=decodeURIComponent(Search());
		}
	} else if(document.querySelectorAll(".product2").length){
		searchName="null"
		tableName = "product";
	}else{
		searchName="null"
		tableName = "product";
	}
	var ajax = new Ajax();
	var initalizeClick = new Onclick();
	ajax.xhr = ajax.getXhr();
	ajax.open("POST", "test1.php");
	ajax.send(`tableName=${tableName}&dataBase=amx&limit=4&name=select`);
	ajax.onreadystatechange(f1);



function f2(name, tableName) {
	var ajax1 = new Ajax();
	ajax1.xhr = ajax1.getXhr();
	ajax1.open("POST", "test1.php");
	ajax1.send(`tableName=${tableName}&dataBase=amx&limit=1&name=${name}`);
	ajax1.onreadystatechange(() => {
		var p = document.querySelectorAll(".product-content-div>p");
		p = p.length ? p : (document.querySelectorAll(".team>p"));
		for (var i = p.length - 1; i >= 0; i--) {
			p[i].parentNode.removeChild(p[i]);
		}
		try{
			var dataS = JSON.parse(ajax1.xhr.responseText);
		}catch(e){
			Error();
		}
		if (document.querySelectorAll(".team").length) {
			var DIV = document.querySelectorAll(".product-title");
			var divParent = document.querySelector(".team");
			var p = CreateElement("p");
			p.innerHTML = dataS[0][2];
			divParent.insertBefore(p, DIV[1]);
			var imgParent = document.querySelector(".team-img");
			var p = CreateElement("p");
			p.innerHTML = dataS[0][1];
			divParent.insertBefore(p, imgParent);
			var img = CreateElement("img");
			img.src = dataS[0][3];
			imgParent.appendChild(img);
		} else {
			var product = document.querySelector(".product-title");
			var DIV = document.querySelector(".product-img-div");
			var divParent = document.querySelector(".product-content-div");
			var p = CreateElement("p");
			p.innerHTML = dataS[0][1];
			divParent.insertBefore(p, DIV);
		}

	});
}

function f3(name, tableName) {
	var ajax2 = new Ajax();
	ajax2.xhr = ajax2.getXhr();
	ajax2.open("POST", "test2.php");
	var limit=document.querySelectorAll(".product2").length ? 8 :4;
	ajax2.send(`tableName=${tableName}img&dataBase=amx&limit=${limit}&name=${name}`);
	ajax2.onreadystatechange(() => {
		try{
			var dataS = JSON.parse(ajax2.xhr.responseText);
		}catch(e){
			Error();
		} 
		// console.log(ajax2.xhr.responseText)
		var ParentDiv = document.querySelectorAll(".product-img-div");
		for(var j=0;j<ParentDiv.length;j++){
			for (var i = ParentDiv[j].children.length - 1; i >= 0; i--) {
				ParentDiv[j].removeChild(ParentDiv[j].children[i]);
			}
		}
		var fragment = document.createDocumentFragment();
		for (var i = 0; i < dataS.length; i++) {
			var div = CreateElement("div");
			var img = CreateElement("img");
			if (tableName == "team") {
				img.src = dataS[i][1];
				div.appendChild(img);
			} else {
				if(!document.querySelectorAll(".product2").length){
					var productTitle = document.querySelector(".product-title").children;
					var arr = dataS[i][1].split("|");
					var divson=CreateElement("div");
					//为图片绑定点击事件
					divson.onclick=productSonImg;
					var p=CreateElement("p");
					var span=CreateElement("span");
					var I=CreateElement("i");
						I.innerHTML=dataS[i][3];
						span.appendChild(I);
						p.appendChild(span);
						divson.appendChild(p);
						img.src = arr[0];
						divson.appendChild(img);
						div.appendChild(divson);
					var p = CreateElement("p");
					p.innerHTML = arr[1];
					div.appendChild(p);
					productTitle[0].innerHTML = dataS[i][0];
					productTitle[1].innerHTML = dataS[i][2];
				}else{
					
					var div=CreateElement("div");
					var img=CreateElement("img");
						img.src=dataS[i][1];
					var p=CreateElement("p");
						p.innerHTML=dataS[i][2];
						div.appendChild(img);
						div.appendChild(p);
					if(i==4){
						var DivImg= document.querySelectorAll(".product-img-div");
						DivImg[0].appendChild(fragment);
						fragment = document.createDocumentFragment();
					}
				}

			}
			fragment.appendChild(div);
			
		}
		if(!document.querySelectorAll(".product2").length){
			ParentDiv[0].appendChild(fragment);
		}else{
			DivImg[1].appendChild(fragment);
		}
	});
}

function productSonImg(e){
	e=e||window.event;
	var target=e.target||e.srcElement;
	while(target.nodeName !="DIV"){
		target=target.parentNode;
	}
	var text=target.querySelector("i").innerHTML;
	Url(text,"product2.html");
}