var tableName;
var limit;
var name;
if (document.querySelectorAll(".team").length) {
		tableName = "aboutdevel";
		limit=4;
		name="发展历程";
	}else{
		tableName = "aboutbrand";
		limit=3;
		name="品牌介绍";
	}
f2(name,tableName);
function f2(name, tableName) {
	var ajax1 = new Ajax();
	ajax1.xhr = ajax1.getXhr();
	ajax1.open("POST", "test2.php");
	ajax1.send(`tableName=${tableName}&dataBase=amx&limit=${limit}&name=${name}`);
	ajax1.onreadystatechange(() => {
		var p = document.querySelectorAll(".product-content-div>p");
		p = p.length ? p : (document.querySelectorAll(".brand-p>p"));
		for (var i = p.length - 1; i >= 0; i--) {
			p[i].parentNode.removeChild(p[i]);
		}
		try{
			var dataS = JSON.parse(ajax1.xhr.responseText);
		}catch(e){
			Error();
		}
		if (document.querySelectorAll(".brand-p").length) {
			var DIV = document.querySelectorAll(".brand-p");
			var Img=document.querySelectorAll("div[class*='brand-img']");
			for(var i=0;i<dataS.length;i++){
				var div=CreateElement("div");
					div.className="clear";
				var p=CreateElement("p");
					p.className="left"
					var arr=dataS[i][1].split("|");
					p.innerHTML=arr[0];
				var span=CreateElement("span");
					span.innerHTML=arr[1];
					div.appendChild(p);
					div.appendChild(span);
				var divson=CreateElement("div");
					divson.className="product-div-hr";
				var hr=CreateElement("hr");
				var I=CreateElement("i");
					I.className="iconfont icon-ziyuan left";
					divson.appendChild(hr);
					divson.appendChild(I);
					div.appendChild(divson);
					DIV[i].appendChild(div);
				var p=CreateElement("p");
					p.innerHTML=dataS[i][2];
					DIV[i].appendChild(p);
				var img=CreateElement("img");
					img.src=dataS[i][3];
					Img[i].appendChild(img);
			}
		} else {
			var DIV = document.querySelector(".team");
			for(var i=0;i<dataS.length;i++){
				var div=CreateElement("div");
					div.className="product-title clear";
				var p=CreateElement("p");
					p.innerHTML=dataS[i][0];
					DIV.appendChild(p);
				var divson=CreateElement("div");
					divson.className="product-div-hr";
				var hr=CreateElement("hr");
				var I=CreateElement("i");
					I.className="iconfont icon-ziyuan left";
					divson.appendChild(hr);
					divson.appendChild(I);
					DIV.appendChild(divson);
				var p=CreateElement("p");
					p.innerHTML=dataS[i][2];
					DIV.appendChild(p);
			}
		}

	});
}
 var UL=document.querySelector(".product>ul");
 
 UL.onclick = e => {
 	e = e || window.event;
 	var target = e.target || e.srcElement;
 	if (target.nodeName != "UL") {
 		while (target.nodeName != "LI") {
 			target = target.parentNode;
 		}
		var text=target.children[0].getAttribute("data-url");
		Index(text);
 	}
 }