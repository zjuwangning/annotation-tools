import {isEmpty} from '../utils/cmn'
import fetch from 'isomorphic-fetch'


// get
const baseGet = (baseUrl, postData, isPrivate, specialGet) => {
	baseUrl = String(baseUrl);
	let options = {method: 'get'}
	// postData参数不为空 url拼接
	if (!isEmpty(postData)) {
		let index = 0;
		for (let key in postData) {
			baseUrl = baseUrl + (index+'' === '0'?'?'+key+'='+postData[key]:'&'+key+'='+postData[key])
			index++;
		}
	}
	const promiseObj = fetch(baseUrl, options)
	return promiseObj.then(
		resolve => {
			return resolve
		},
		reject => {
			return reject
		}
	)
}

export const Get = (baseUrl, postData={}, isPrivate= true, specialGet=false) => {
	// 为data增加 _t 字段
	return baseGet(baseUrl, postData, isPrivate, specialGet).then(
		response => {
			if (!response || response.status !== 200) {
				return {code: 1, msg: "请求错误"}
			}
			if(!response.jsonData)
				response.jsonData = response.json()
			return response.jsonData
		}
	).then(
		json => {
			return json
		}
	)
}
