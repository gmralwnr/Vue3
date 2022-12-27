//import axios from 'axios';
import { posts } from '.'; //index.js

//axios
/*
const posts = [
	{ id: 1, title: '제목1', content: '내용1', createAt: '2021-01-01' },
	{ id: 2, title: '제목2', content: '내용2', createAt: '2022-01-02' },
	{ id: 3, title: '제목3', content: '내용3', createAt: '2023-01-03' },
	{ id: 4, title: '제목4', content: '내용4', createAt: '2024-01-04' },
	{ id: 5, title: '제목5', content: '내용5', createAt: '2025-01-05' },
];
*/
/**/
export function getPosts(params) {
	//게시판 목록 가져오는 법
	//return axios.get('http://localhost:5000/posts', { params });
	return posts.get('/', { params });
}
//일본 getPosts
/*
export async function getPosts() {
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
}*/
//id => 일본서버는 notice

export function getPostsById(id) {
	//return axios.get(`http://localhost:5000/posts/${id}`);

	return posts.get(`/${id}`);
	//return posts.get(id + '');위와동일

	/*return axios.get(
		`/system/eOrderNotice/eOrderNoticeDetailData?noticeNo=${id}`,
		
	);*/
}

export function createPost(data) {
	//return axios.post('http://localhost:5000/posts', data);

	return posts.post('', data);
}

export function updatePost(id, data) {
	//	return axios.put(`http://localhost:5000/posts/${id}`, data);
	return posts.put(`/${id}`, data);
}

export function deletePost(id) {
	//return axios.delete(`http://localhost:5000/posts/${id}`);
	return posts.delete(`/${id}`);
}

/*
일본 API
전체조회(get)
/system/eOrderNotice/eOrderNoticeListData

상세(get)
/system/eOrderNotice/eOrderNoticeDetailData
필요param : noticeNo

신규등록(post)
/system/eOrderNotice/eOrderNoticeSaveData
필요param : title, contents, newYn=Y, regId=이름넣기

수정(put)
/system/eOrderNotice/eOrderNoticeSaveData
필요param : noticeNo, title, contents, newYn=N, regId=이름넣기

삭제(delete)
/system/eOrderNotice/eOrderNoticeDeleteData
필요param : noticeNo, regId=이름넣기
*/
