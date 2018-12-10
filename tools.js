
//计算字节数
function reByteslen(target){
	var count,
		len;
	count = len = target.length;
	for(var i = 0;i < len;i++){
		if(target.charCodeAt(i) > 255){
			count++;
		}
	}
	return count;
}

//封装type
function type(target){
	var ret = typeof(target);
	var template = {
		"[object Array]" : "array Object",
		"[object Object]" : "object Object",
		"[object Number]" : "number Object",
		"[object Boolean]" : "boolean Object",
		"[object String]" : "string Object"
	}
	if(target === null){
		return "null";
	}else if(ret == "object"){
		var str = Object.prototype.toString.call(target);
		return template[str];
	}else{
		return ret;
	}
}

//数组去重
Array.prototype.unique = function(){
	var temp = {},
		arr = [],
		len = this.length;
	for(var i = 0;i < len;i++){
		if(!temp[this[i]]){
			temp[this[i]] = "zz";
			arr.push(this[i]);
		}
	}
	return arr;
}

//继承--圣杯模式
var inherit = (function(){
	var F = function(){};
	return function (Target,Origin){
		F.prototype = Origin.prototype;
		Target.prototype = new F();
		Target.prototype.constuctor = Target;
		Target.prototype.uber = Origin.prototype;
	};
}());

//浅克隆
function clone(origin,target){
	var target = target || {};
	for(var prop in origin){
		target[prop] = origin[prop];
	}
	return target;
}

//深层克隆
function deepClone(origin,target){
	var target = target || {},
		toStr = Object.prototype.toString,
		arrStr = "[object Array]";
	for(var prop in origin){
		if(origin.hasOwnProperty(prop)){
			if(arigin[prop] !== "null" && type(origin[prop]) == "object"){
				//if(toStr.call(oringin[prop]) == arrStr){
				//	target[prop] = [];
				//}else{
				//	target[prop] = {};
				//}
				target[prop] = (toStr.call(oringin[prop]) == arrStr) ? [] : {};
				deepClone(origin[prop],target[prop]);
			}else{
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}

//insertAfter
Element.prototype.insertAfter = function (targetNode,afterNode) {
	var beforeNode = afterNode.nextElementSibling;
	if(beforeNode == null) {
		this.appendChild(targetNode);
	}else{
		this.insertBefore(targetNode,beforeNode);
	}
}

//返回滚动条距离
function getScrollOffset(){
	if(window.pageXOffset){
		return {
			x:window.pageXOffset,
			y:window.pageYOffset
		}
	}else{
		return {
			x:document.body.scrollLeft + document.documentElement.scrollLeft,
			y:document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

//求可视区窗口尺寸
function getViewportOffset() {
	if(window.innerWidth) {
		return {
			w:window.innerWidth,
			h:window.innerHeigth
		}
	}else{
		if (document.compatMode === "BackCompat") {
			return {
				w:document.body.clientWidth,
				h:document.body.clientHeigth
			}
		}else{
			return {
				w:document.documentElement.clientWidth,
				h:document.documentElement.clientHeigth
			}
		}
	}
}

//兼容性addEvent
function addEvent(elem,type,handle) {
	if(elem.addEventListener) {
		elem.addEventListener(type,handle,false);
	}else if(elem.attachEvent) {
		elem.attachEvent('on' + type,function() {
			handle.call(elem);
		})
	}else{
		elem['on' + type] = handle;
	}
}

//取消冒泡
function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = ture;
	}
}

//阻止默认事件
function cancelHandler(event) {
	if(event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}

//拖拽
function drag(elem) {
	var disX,
		disY;
	addEvent(elem,'mousedown',function(e) {
		var event = e || window.event;
		disX = event.clientX - parseInt(getStyle(elem,'left'));
		disY = event.clientY - parseInt(getStyle(elem,'top'));
		addEvent(document,'mousemove',mouseMove);
		addEvent(document,'mouseup',mouseUp);
		stopBubble(event);
		cancelHandler(event);
	});
	function mouseMove(e) {
		var event = e || window.event;
		elem.style.left = event.clientX - disX + "px";
		elem.style.top = event.clientY - disY + "px";
	}
	function mouseUp(e) {
		var event = e || window.event;
		removeEvent(document,'mousemove',mouseMove);
		removeEvent(document,'mouseup',mouseUp);
	}
}

//异步按需加载
// function loadScript(url,callback) {
// 	var script = document.creteElement('script');
// 	script.type = "text/javascript";
// 	if(script.readyState) {
// 		script.onreadystatechange = function () {
// 			if (script.readyState == "complete" || script.readyState == "loaded") {
// 				callback();
// 			}
// 		}
// 	}else{
// 		script.onload = function () {
// 			callback();
// 		}
// 	}
// 	script.src = url;
// 	document.head.appendChild(script);
// }
