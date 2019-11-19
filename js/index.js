window.onload=function(){
	//轮播特效
		var carouselImgS=document.querySelectorAll(".show-img>img:not(.show)");
		var carouselParent=carouselImgS[0].parentNode;
		var active="active";
		var newCarousel=2;
		var timeR=setInterval(carousel,3000);
		//给轮播图的父元素绑定鼠标在元素上的响应事件
		carouselParent.onmouseover=e=>{
			e=e||window.event;
			target=e.target||e.srcElement;
			if(target.nodeName=="LI")
			{	//获取li的自定义属性
				var i=target.getAttribute("data-dy");
				newCarousel=i*1;
				clearCarousel(target);
				setCarousel(target,i*1);
			}
			if(timeR){
				clearInterval(timeR);
				timeR=null;
			}
			
		}
		carouselParent.onmouseout=()=>{
			if(!timeR){
				timeR=setInterval(carousel,3000);
			}
		}
		//自动进行轮播
		function carousel(){
			var liS=document.querySelectorAll(".carousel-ul>li");
			//手动切换过快，有几率造成newCarousel为3
			newCarousel+1>=3 ? newCarousel=0 : newCarousel++;
			clearCarousel(liS[newCarousel]);
			setCarousel(liS[newCarousel],newCarousel);
		}
		//设置轮播样式
		function setCarousel(li,i){
			carouselImgS[i].setAttribute("class",active);
			li.setAttribute("class",active);
		}
		//清除轮播相关样式
		function clearCarousel(li){
			var liS=li.parentNode.children;
			for(var i=0;i<carouselImgS.length;i++)
			{
				liS[i].removeAttribute("class");
				carouselImgS[i].removeAttribute("class");
			}
		}
	$("[data-url]").click((e)=>{
		e=e||window.enevt;
		var $target=$(e.target)||$(e.srcElement);
		if(timeR){
			clearInterval(timeR);
			timeR=null;
		}
		Index($target.attr("data-url"));
	});
	
	$(".team-content").click((e)=>{
		e=e||window.enevt;
		var $target=$(e.target)||$(e.srcElement);
		if($target.attr("class") != "team-content"){
			while($target.attr("class")!="team-content-div"){
				$target=$target.parent();
			}
			if(timeR){
				clearInterval(timeR);
				timeR=null;
			}
			Url($target.find("span").html(),"team1.3.html")
		}
	});
}