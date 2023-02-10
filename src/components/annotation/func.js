/*
* creat by Reid on 2023/02/03
*
* annotation functions
*
* */


/*
* drawBackground canvas中渲染底图
*
* @input
* width: 图片宽度; height: 图片高度; img: 图片对象; background: canvas对象
*
* @output
* none
* */
export function drawBackground(width, height, img, background) {
	let cxt = background.getContext("2d");
	cxt.clearRect(0, 0, width, height);
	cxt.drawImage(
		img,0,0,
		img.width, img.height,
		0, 0,
		width, height
	);
}

/*
* calculation 根据页面计算要渲染的底图canvas宽高
*
* @input
* img: 图片对象; canvasWrapper: canvasWrapper对象
*
* @output
* imgWidth, imgHeight, wrapperWidth
* */
export function calculation(img, canvasWrapper) {
	let wrapperWidth = Number(window.getComputedStyle(canvasWrapper).getPropertyValue("width").slice(0, -2));
	let wrapperHeight = Number(window.getComputedStyle(canvasWrapper).getPropertyValue("height").slice(0, -2));
	let widthRate = img.width/wrapperWidth
	let heightRate = img.height/wrapperHeight
	let imgRate = widthRate
	if (heightRate > widthRate) imgRate = heightRate
	imgRate = Number(imgRate.toFixed(2))+0.01
	let imgWidth = img.width/imgRate
	let imgHeight = img.height/imgRate

	return {imgWidth, imgHeight, wrapperWidth}
}

/*
* zoom canvas缩放
*
* @input
* offsetX: 鼠标相对父节点横坐标值; offsetY: 鼠标相对父节点纵坐标值; delta: 放大或缩小; background: canvas对象;
* clientX: 鼠标相对窗口横坐标值; clientY: 鼠标相对窗口纵坐标值
*
* @output
* none
* */
export function zoom(offsetX, offsetY, delta, clientX, clientY, background) {
	let top = Number(window.getComputedStyle(background).getPropertyValue("top").slice(0, -2));
	let left = Number(window.getComputedStyle(background).getPropertyValue("left").slice(0, -2));
	let width = Number(window.getComputedStyle(background).getPropertyValue("width").slice(0, -2));
	let height = Number(window.getComputedStyle(background).getPropertyValue("height").slice(0, -2));
	let scale = 1.1
	if (!delta) {   // 滚动缩小
		scale = 1/scale
	}
	width = width * scale
	height = height * scale

	if (offsetX > left) {
		left = left - ((offsetX-left)*(scale-1))
	}
	else {
		left = offsetX + ((left-offsetX)*scale)
	}
	if (offsetY > top) {
		top = top - ((offsetY-top)*(scale-1))
	}
	else {
		top = offsetY + ((top-offsetY)*scale)
	}
	// 如果鼠标位于this.background内
	// let rect = this.background.getBoundingClientRect()
	// if (clientX>rect.left && clientX<rect.left+rect.width && clientY>rect.top && clientY<rect.top+rect.height) {
	// if (0) {
	// 	left = left - (offsetX*(scale-1))
	// 	top = top - (offsetY*(scale-1))
	// }
	// else {}

	background.style.top = top+'px';
	background.style.left = left+'px';
	background.style.width = width+'px';
	background.style.height = height+'px';
}

/*
* move canvas移动
*
* @input
* event: 鼠标移动事件; background: canvas对象
*
* @output
* none
* */
export function move(event, background) {
	let top = Number(window.getComputedStyle(background).getPropertyValue("top").slice(0, -2));
	let left = Number(window.getComputedStyle(background).getPropertyValue("left").slice(0, -2));
	top = top + event.movementY + 'px'
	left = left + event.movementX + 'px'
	background.style.top = top;
	background.style.left = left;
}




