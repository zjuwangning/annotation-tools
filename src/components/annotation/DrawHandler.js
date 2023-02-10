/*
* creat by Reid on 2023/02/09
*
* 绘图相关操作
*
* */

export default class DrawHandler {
	constructor() {
		this.x = null;
		this.y = null;
		this.drawInstance = null;
	}

	drawBox = (container, onDrawDone) => {
		this.drawInstance = container.rect().draw();
		this.drawInstance.draggable()
			.on('drawstart', (event) => {
				console.log('event', event);
			})
			.on('drawstop', (event) => {
				onDrawDone();
			})
			.on('drawupdate', () => {
				console.log('drawupdate');
			})
			.addClass('canvas_shape_drawing')
			.attr({
				'stroke-width': 1,
				'fill-opacity': 0.5,
				stroke: 'black',
			});
	}

	drawCancel = () => {
		if (this.drawInstance) this.drawInstance.draw(('cancel'))
	}

}
