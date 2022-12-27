import axios from 'axios';

/**/
export async function getBoard() {
	//return axios.get('http://localhost:5000/posts');
	try {
		return await axios.get(
			//    'http://172.23.102.248:8110/system/eOrderNotice/eOrderNoticeListData',
			'/system/eOrderNotice/eOrderNoticeListData',
			//	'/sample/eOrderNotice/eOrderNoticeListData',
		);
	} catch (error) {
		console.error(error);
	}
}
export function getBoardById(id, type) {
	console.log(id, type);
	/*return axios.get(
		`/system/eOrderNotice/eOrderNoticeDetailData?noticeNo=${id}&gubun=${type}`,
	);*/
	return axios.get(`/system/eOrderNotice/eOrderNoticeDetailData`, {
		params: { noticeNo: id, gubun: type },
	});
}

export function getBoarUpdateById(id, data) {
	/*return axios.post(
		`/system/eOrderNotice/eOrderNoticeSaveData?noticeNo=${id}`,
		`title=${data.title}&contents=${data.contents}&regId=${data.regId}&newYn=${data.newYn}`,
	);
	*/

	return axios.post(
		`/system/eOrderNotice/eOrderNoticeSaveData?noticeNo=${id}`,
		null,
		{ params: data },
	);
}
//필요param : noticeNo, title, contents, newYn=N, regId=이름넣기

export function getBoardLikeSave(id, data) {
	return axios.post(
		`/system/eOrderNotice/eOrderNoticeSaveData?noticeNo=${id}`,
		null,
		{ params: data },
	);
}

export function createBoard(data) {
	console.log(data);
	//둘다 사용 가능
	/*	return axios.post(
		'/system/eOrderNotice/eOrderNoticeSaveData',
		`title=${data.title}&contents=${data.contents}&regId=${data.regId}&newYn=${data.newYn}&regDt=${data.regDt}`,
	); */

	return axios.post('/system/eOrderNotice/eOrderNoticeSaveData', null, {
		params: data,
		//필요param : title, contents, newYn=Y, regId=이름넣기
	});
}
export function getBoardDelete(id, data) {
	console.log('삭제 ', id, data);
	return axios.delete(
		`/system/eOrderNotice/eOrderNoticeDeleteData?noticeNo=${id}`,
		`regid=${data.regId}`,
	);
	//noticeNo, (regId = 이름넣기);
}

/*
일본 API
전체조회(get)
/system/eOrderNotice/eOrderNoticeListData

//상세(get)
/system/eOrderNotice/eOrderNoticeDetailData
필요param : noticeNo

//신규등록(post)
/system/eOrderNotice/eOrderNoticeSaveData
필요param : title, contents, newYn=Y, regId=이름넣기

//수정(put)
/system/eOrderNotice/eOrderNoticeSaveData
필요param : noticeNo, title, contents, newYn=N, regId=이름넣기

//삭제(delete)
/system/eOrderNotice/eOrderNoticeDeleteData
필요param : noticeNo, regId=이름넣기

*/
