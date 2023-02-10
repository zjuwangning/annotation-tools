/*
* creat by Reid on 2023/02/03
*
* annotation tools
*
* */
import React from 'react';
import {Row, Col} from 'antd'
import * as SVG from 'svg.js';
import 'svg.draw.js';
import 'svg.draggable.js';
import 'svg.resize.js';
import 'svg.select.js';
import { drawBackground, calculation, zoom, move } from './func'
import Crosshair from './crosshair'
import DrawHandler from './DrawHandler'

import './index.css'

export default class AnnotationTools extends React.Component {
	constructor(props) {
		super(props)

		// 类变量
		this.canvasWrapper = '';    // 底板 canvas包裹层
		this.background = '';       // canvas本体 盛装底图
		this.content = '';          // svg绘图层 绘制标注图
		this.container = '';        // svg.js容器
		this.crosshair = '';        // 坐标定位线
		this.DrawHandler = '';        // 坐标定位线

		this.backgroundTempStyle = {}   // 记录当前样式

		this.state = {
			mode: 0,
		}
	}

	componentDidMount() {}

	// 通过本地上传加载图片 并生成canvas
	loadCanvasByObj = () => {}

	// 通过url加载图片 并生成canvas
	loadCanvasByURL = url => {
		this.img = new Image();
		this.img.src = url;
		this.img.onload = () => {
			// 计算图片要显示的大小
			this.canvasWrapper = document.getElementById('canvas-wrapper');
			let {imgWidth, imgHeight, wrapperWidth} = calculation(this.img, this.canvasWrapper);
			this.renderCanvas(imgWidth, imgHeight, wrapperWidth);     // 渲染canvas
			drawBackground(imgWidth, imgHeight, this.img, this.background)         // canvas中绘制底图
			this.addListener()                          // 添加监听
		}
	}

	// 渲染canvas及其他图层
	renderCanvas = (width, height, wrapperWidth) => {
		this.canvasWrapper = document.getElementById('canvas-wrapper');

		this.background = window.document.createElement('canvas');
		this.content = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		// this.masksContent = window.document.createElement('canvas');

		this.background.setAttribute('id', 'canvas_background');
		this.content.setAttribute('id', 'canvas_content');
		this.container =SVG.adopt(this.content)
		this.background.setAttribute('width', width+'px');
		this.background.setAttribute('height', height+'px');
		this.background.style.top = '0px';
		this.background.style.left = (wrapperWidth-width)/2+'px';
		this.backgroundTempStyle = {width, height, top: 0, left: (wrapperWidth-width)/2}
		// this.masksContent.setAttribute('id', 'canvas_masks_content');

		this.crosshair = new Crosshair();   // 实例坐标定位线
		this.DrawHandler = new DrawHandler();   // 实例绘图处理

		this.canvasWrapper.appendChild(this.background);
		this.canvasWrapper.appendChild(this.content);
	}

	// wrapper和整体页面 添加各种监听事件
	addListener = () => {
		this.canvasWrapper = document.getElementById('canvas-wrapper');

		this.canvasWrapper.addEventListener('wheel', this.wheelHandler);
		this.canvasWrapper.addEventListener('mousemove', this.mousemoveHandler);
		this.canvasWrapper.addEventListener("mousedown", this.mousedownHandler);
		this.canvasWrapper.addEventListener('dblclick', this.doubleClickHandler);
		document.addEventListener('keydown', this.keydownHandler);
	}

	// 键盘事件
	keydownHandler = event => {
		if (event.keyCode+'' === '27') {    // esc键
			this.setState({mode: 0})
			if (this.crosshair) this.crosshair.hide();
			if (this.DrawHandler) this.DrawHandler.drawCancel();
		}
	}

	// 鼠标移动事件
	mousemoveHandler = event => {
		const {mode} = this.state;
		if (mode === 1) {
			this.crosshair.move(event.offsetX, event.offsetY)
		}
	}

	// 鼠标左键单击事件处理
	mousedownHandler = event => {
		const {mode} = this.state;
		this.canvasWrapper = document.getElementById('canvas-wrapper');

		// 左键
		if(event.button === 0) {
			// canvas移动
			if (mode === 0) {
				this.canvasWrapper.onmousemove = evt => {
					move(evt, this.background)
				}
				window.onmouseup = ()=>{
					this.canvasWrapper.onmousemove = null;
					window.onmouseup = null;
				}
			}
		}
	}

	// canvas双击复原
	doubleClickHandler = event => {
		this.background.style.width = this.backgroundTempStyle.width + 'px';
		this.background.style.height = this.backgroundTempStyle.height + 'px';
		this.background.style.top = this.backgroundTempStyle.top + 'px';
		this.background.style.left = this.backgroundTempStyle.left + 'px';
	}

	// 滚轮事件处理
	wheelHandler = (event) => {
		if (event.ctrlKey) return;
		zoom(event.offsetX, event.offsetY, event.deltaY<0, event.clientX, event.clientY, this.background)
		event.preventDefault();
	}

	// 绘制矩形
	drawRect = () => {
		this.setState({mode: 1}, ()=>{
			if (this.crosshair) this.crosshair.show(this.container)

			this.DrawHandler.drawBox(this.container, ()=>{
				this.setState({mode: 0})
				if (this.crosshair) this.crosshair.hide();
			});
		})
	}


	render() {
		return (
			<Row type={'flex'} style={{width: '100%', height: '100%'}}>
				<Col style={{width: '90%', height: '100%', backgroundColor: 'whitesmoke'}}>
					<div id={'canvas-wrapper'} style={{width: '100%', height: '100%'}}/>
				</Col>
			</Row>
		)
	}
}

