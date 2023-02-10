/*
* creat by Reid on 2023/02/03
*
* annotation demo
*
* */
import React from 'react';
import {Row} from 'antd'
import AnnotationWrapper from './AnnotationWrapper'
import '../../index.css'

function HomePage() {

	return (
		<div className={'full-page'}>
			<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '80px', backgroundColor: 'lightgray'}}>
				header
			</Row>
			<Row type={'flex'} style={{height: 'calc(100vh - 120px)'}}>
				<AnnotationWrapper />
			</Row>
			<Row type={'flex'} justify={'center'} align={'middle'} style={{height: '40px', backgroundColor: 'lightgray'}}>
				footer
			</Row>
		</div>
	);
}

export default HomePage;
