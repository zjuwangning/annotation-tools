/*
* creat by Reid on 2023/02/03
*
* annotation wrapper
*
* */
import React from 'react';
import { Row, Col } from 'antd'
import { UploadOutlined, MacCommandOutlined, BorderOutlined } from '@ant-design/icons'
import AnnotationTools from '../../components/annotation'
import { Get } from "../../http/HTTP";
import './index.css'

export default class AnnotationWrapper extends React.Component {
	constructor(props) {
		super(props)

		this.AnnotationTools = ''
		this.state = {

		}
	}

	componentDidMount() {
		// this.getURL()
	}

	//
	upload = () => {}

	// 通过get方式获取url加载图片
	getURL = () => {
		Get("http://192.17.1.20:7198/api/mark/getframe", {id: 83}).then(
			data=>{
				let url = "http://192.17.1.20:7198/"+data['data']['url']+'?_t='+Math.round(new Date().getTime());
				this.AnnotationTools.loadCanvasByURL(url);
			}
		)
	}

	// 绘制矩形
	drawRectTools = () => {
		this.AnnotationTools.drawRect()
	}

	render() {
		return (
			<Row type={'flex'} style={{width: '100%', height: '100%'}}>
				<Col style={{width: '3vw', backgroundColor: 'rgba(0, 10, 10, 0.3)'}}>
					<Row type={'flex'} align={'middle'} justify={'center'} className={'icon-area'} onClick={this.getURL}>
						<MacCommandOutlined className={'annotation-icon'} style={{fontSize: '1.6vw'}}/>
					</Row>
					<Row type={'flex'} align={'middle'} justify={'center'} className={'icon-area'} onClick={this.upload}>
						<UploadOutlined className={'annotation-icon'} style={{fontSize: '1.6vw'}}/>
					</Row>
					<Row type={'flex'} align={'middle'} justify={'center'} className={'icon-area'} onClick={this.drawRectTools}>
						<BorderOutlined className={'annotation-icon'} style={{fontSize: '1.6vw'}}/>
					</Row>
				</Col>
				<Col style={{width: '97vw', padding: '5px'}}>
					<AnnotationTools
						ref={el => this.AnnotationTools = el}
					/>
				</Col>
			</Row>
		)
	}
}

