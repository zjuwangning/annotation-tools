/*
* creat by Reid on 2023/02/09
*
* 坐标线相关操作
*
* */

export default class Crosshair {
	constructor() {
		this.x = null;
		this.y = null;
		this.container = null;
	}

	// 显示坐标线
	show = (container) => {
		this.container = container;

		this.x = this.container
			.line(0, 0, this.container.node.clientWidth, 0)
			.attr({'stroke-width': 0.8,})
			.addClass('canvas_crosshair');

		this.y = this.container
			.line(0, 0, 0, this.container.node.clientHeight)
			.attr({'stroke-width': 0.8,})
			.addClass('canvas_crosshair');
	}

	// 移动坐标线
	move = (x, y) => {
		if (this.x) {
			this.x.attr({ y1: y, y2: y });
		}

		if (this.y) {
			this.y.attr({ x1: x, x2: x });
		}
	}

	// 隐藏坐标线
	hide = () => {
		if (this.x) {
			this.x.remove();
			this.x = null;
		}

		if (this.y) {
			this.y.remove();
			this.y = null;
		}

		this.canvas = null;
	}
}
