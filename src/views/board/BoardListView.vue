<template>
	<div class="black-bg" v-if="open == true">
		<!--모달창이 true 일때만 open -->
		<div class="white-bg">
			<div class="board-create">
				<h2>게시글 등록</h2>
			</div>

			<form @submit.prevent="valid">
				{{ form.errors }}
				<!-- <div v-if="errors.length">
					<b>아래 오류를 수정하세요.:</b>
					<ul>
						<li v-for="error in errors" :key="error.errors">{{ error }}</li>
					</ul>
				</div> -->
				<div class="fg">
					<label for="title" class="form-label">제목</label>
					<input
						style="height: 70px"
						v-model="form.title"
						type="text"
						class="form-control"
						id="title"
					/>
				</div>
				<div class="fg">
					<label for="contents" class="form-label">내용</label>
					<textarea
						style="height: 190px"
						v-model="form.contents"
						class="form-control"
						id="contents"
						rows="3"
					></textarea>
				</div>

				<div class="pt-4">
					<img src="@/image/tree2.gif" class="image2" />
					<div class="btn_wrap">
						<button
							type="button"
							class="btn btn-outline-dark me-2"
							@click="goListPage"
						>
							목록
						</button>
						<button class="btn btn-primary">저장</button>
					</div>
					<img src="@/image/tree2.gif" class="image" />
				</div>
			</form>
		</div>
	</div>
	<!--		----------------모달창----------->
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g- 3">
				<div class="col">
					<!--	<input v-model="params.title_like" type="text" class="form-control" />-->
				</div>
				<div class="col-3">
					<select v-model="listCunt" class="form-select">
						<option value="3" selected="selected">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="d-flex" style="margin-bottom: 30px" role="search">
			<button class="btn btn-info" type="button" @click="open = true">
				글쓰기
			</button>
		</div>

		<div class="row g-3">
			<!--일본			-->
			<div v-for="post in list" :key="post.noticeNo" class="col-4">
				<BoardItem
					:title="post.title"
					:content="post.contents"
					:created-at="post.regDt"
					:hitCnt="post.hitCnt"
					:likeYn="post.likeYn"
					@click="goPage(post.noticeNo)"
					@modal="openModal(post)"
					@delete="goDelete(post)"
				>
				</BoardItem>
			</div>
		</div>
		<!--디테일 모달창-->
		<AppModal v-model="show" :show="show" title="게시글" @close="closeModal">
			<template #default>
				<div class="row g-3">
					<div class="col-3 text-muted">제목</div>
					<div class="col-9">{{ modalTitle }}</div>
					<div class="col-3 text-muted">내용</div>
					<div class="col-9" style="white-space: pre-line">
						{{ modalContents }}
					</div>
					<div class="col-3 text-muted">등록일</div>
					<div class="col-9">{{ modalRegDt }}</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-secondary" @click="closeModal">
					닫기
				</button>
			</template></AppModal
		>
		<div class="paging">
			<div class="pagin">
				<ul class="pagination">
					<li class="page-item" :class="{ disabled: isBtnFirst }">
						<a class="page-link" href="#" @click.prevent="pageArrow('first')"
							>First</a
						>
					</li>
					<li class="page-item" :class="{ disabled: isBtnPrev }">
						<a class="page-link" href="#" @click.prevent="pageArrow('prev')"
							>Previous</a
						>
					</li>
					<template v-for="(item, index) in pageList" :key="`list-${index}`">
						<li class="page-item" :class="{ active: item == currentPage }">
							<a class="page-link" href="#" @click.prevent="page(item)">{{
								item + 1
							}}</a>
						</li>
					</template>
					<li class="page-item" :class="{ disabled: isBtnNext }">
						<a class="page-link" href="#" @click.prevent="pageArrow('next')"
							>Next</a
						>
					</li>
					<li class="page-item" :class="{ disabled: isBtnLast }">
						<a class="page-link" href="#" @click.prevent="pageArrow('last')"
							>Last</a
						>
					</li>
				</ul>
			</div>
		</div>
		total :{{ totalCnt }}
		<hr class="my-5" />
	</div>
	<!-- <PostItem title="제목" content="내용" created-at="2020-01-01"></PostItem> -->
</template>

<script setup>
//import PostItem from '@/components/posts/PostItem.vue';
import BoardItem from '@/components/posts/BoardItem.vue';
//import PostDetailView from '@/views/posts/PostDetailView.vue';
import { getBoard, getBoardDelete, getBoardById } from '@/api/board';
import { ref, computed, watchEffect, watch } from 'vue';
import { useRouter } from 'vue-router';
//import BoardCreateViewVue from './BoardCreateView.vue';
import { createBoard } from '@/api/board';
//import AppModal from '@/components/AppModal.vue';
const open = ref(false);
const router = useRouter();
const posts = ref([]);
const totalCnt = ref(0);
const list = ref([]);
//const cache = ref(0); //리스트 전체
const listCunt = ref('3'); //한페이지에 보일 개수
let currentPage = ref(0); // 현재페이지
let pageNum = 3; //페이징개수
const pageList = ref([]); //보여지는 페이지 리스트
let totalPage = ref(0); //페이지 숫자

let isBtnFirst = ref(true);
let isBtnPrev = ref(true);
let isBtnNext = ref(true);
let isBtnLast = ref(true);

const currentPageListStart = () => {
	return Math.floor(currentPage.value / pageNum) * pageNum;
};
const paging = () => {
	//보여지는 페이지 리셋
	pageList.value = [];

	//몇 페이지 까지 있는지 확인
	if (posts.value.length % listCunt.value == 0) {
		totalPage.value = posts.value.length / listCunt.value - 1;
	} else {
		totalPage.value = Math.ceil(posts.value.length / listCunt.value) - 1;
	}
	//현재페이지 기준으로 페이징 숫자 넣기
	let pageListStart = currentPageListStart();
	for (let i = 0; i < pageNum; i++) {
		if (totalPage.value >= pageListStart) {
			pageList.value.push(pageListStart);
			pageListStart++;
		}
	}
};

///////////////////////////////////////////////////////////////////
const fetchPosts = async () => {
	try {
		//const response = await getPosts();
		//console.dir(response); //dir 로 출력하면 볼 수 있음
		const { data } = await getBoard(/*params.value*/); //object
		posts.value = data.data.list; //실제 data를 넣어주는 경로
		totalCnt.value = posts.value[0].totCnt;
		/*for (let i = 0; i < posts.value.length; i++) {
			if (posts.value[i].likeYn == 'Y') {
				posts.value[i].likeYn = '<i class="bi bi-balloon-heart-fill"></i>';
			} else if (posts.value[i].likeYn == 'N') {
				posts.value[i].likeYn = '<i class="bi bi-balloon-heart"></i>';
			}
		}
 */
		list.value = []; //보여지는 게시물 리셋

		//페이징
		let listIdx = listCunt.value * currentPage.value; // 보여질 게시물 index
		for (let i = 0; i < listCunt.value; i++) {
			//게시글 수 만큼 루프
			if (posts.value.length > listIdx) {
				//
				list.value.push(posts.value[listIdx]);

				listIdx++;
			}
		}
		paging();
		pageBtnCheck();
	} catch (error) {
		console.error(error);
	}
};
//fetchPosts();
watchEffect(fetchPosts); //콟백함수로watchEffect

//페이지 번호 클릭시
const page = e => {
	currentPage.value = e;
	fetchPosts();
};

//리스트 갯수 수정시
watch(listCunt, (after, before) => {
	currentPage.value = 0;
	fetchPosts();
});

const pageBtnCheck = () => {
	isBtnFirst.value = currentPage.value == 0 ? true : false;
	isBtnPrev.value = currentPage.value == 0 ? true : false;

	isBtnNext.value = currentPage.value == totalPage.value ? true : false;
	isBtnLast.value = currentPage.value == totalPage.value ? true : false;
};
watch(currentPage, (after, before) => {
	//pageBtnCheck();
});

//페이지 처음/끝/이전/다음 버튼 클릭시
const pageArrow = e => {
	let movePage = parseInt(currentPage.value);
	console.log('page~~~', movePage);
	if (e == 'first') {
		//처음으로
		movePage = 0;
	} else if (e == 'last') {
		//마지막
		movePage = totalPage.value;
	} else if (e == 'prev') {
		//이전
		//	movePage = currentPageListStart() - 1; //다음 페이지에 넘어가는 거
		movePage = movePage - 1;
		movePage < 0 ? (movePage = 0) : '';
		console.log('movePage', movePage);
		console.log('currentPageListStart', currentPageListStart());
	} else {
		//다음
		//movePage = currentPageListStart() + 1;
		movePage = movePage + 1;
		movePage >= totalPage.value ? (movePage = totalPage.value) : '';
	}
	page(movePage);
};
const goPage = id => {
	//router.push(`/posts/${id}`);
	router.push({
		name: 'BoardDetail',
		params: {
			id,
		},
	});
};
//////////////////////////////////////////////////////////////////////////////////

const form = ref({
	title: null,
	contents: null,
	newYn: 'Y',
	regId: 'admin',
	errors: [],
});
const valid = e => {
	// e.preventDefault();

	// console.log('title: ', form.value.title);
	// console.log('contents: ', form.value.contents);

	// if (form.value.title != null && form.value.contents != null) {
	// 	save();
	// }

	{
		e.preventDefault();
		form.value.errors = [];
		let flg = ref(true);
		console.log('title: ', form.value.title);
		if (form.value.title == null || form.value.title == '') {
			form.value.errors.push('제목은 필 수 입니다');
			flg.value = false;
		}
		if (form.value.contents == null || form.value.contents == '') {
			form.value.errors.push('내용은 필 수 값입니다');
			flg.value = false;
		}
		if (flg.value) {
			save();
		}
	}
};

//현재 날짜
var today = new Date();
var year = today.getFullYear(); //현재 년도
var month = ('0' + (today.getMonth() + 1)).slice(-2); //현재 날짜
var day = ('0' + today.getDate()).slice(-2);
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var dateString = year + '-' + month + '-' + day + ' '; //현재 일자
dateString += h + ':' + m + ':' + s; //현재 시간
const save = async () => {
	try {
		const data = {
			...form.value, //form에 있는 날짜 저장 title, content
			createdAt: dateString, //현재시간에대한 날짜 저장
		};
		await createBoard(data);
		open.value = false;
		form.value.title = null;
		form.value.contents = null;
		//	router.go({ name: 'BoardList' }); //글 저장후 목록으로 이동
		fetchPosts();
	} catch (error) {
		console.error(error);
	}
};
const goListPage = () => {
	open.value = false;
	form.value.title = null;
	form.value.contents = null;
	form.value.errors = [];
};
router.push({ name: 'BoardList' });

//modalk
const show = ref(false);
const modalTitle = ref('');
const modalContents = ref('');
const modalRegDt = ref('');
const openModal = async ({ title, contents, regDt, noticeNo }) => {
	show.value = true;
	modalTitle.value = title;
	modalContents.value = contents;
	modalRegDt.value = regDt;
	await getBoardById(noticeNo, 'EOS');
};

const closeModal = () => {
	show.value = false;
	fetchPosts(); //디테일 본 후 조회수 올리기위해 재조회
};
//삭제
const goDelete = async data => {
	try {
		if (confirm('삭제하시겠습니까?') === false) {
			return;
		}
		await getBoardDelete(data.noticeNo, data.regId);
		alert('삭제', data.noticeNo, data.regId);
		//router.go({ name: 'BoardList' });
		fetchPosts();
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped>
.black-bg {
	text-align: center;
	width: 85%;
	background: transparent;
	position: fixed;
	z-index: 99;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* width: 600px;
	height: 100%;
	background: (0, 0, 0, 0.5);
	position: fixed;
	padding: 20px; */
}
.white-bg {
	border-radius: 8px;
	/* padding: 20px; */
	width: 100%;

	background: rgb(248, 248, 248);
	border-radius: 8px;
	border: 1px solid black;
}
.board-create {
	background: rgb(238, 46, 46);
	color: white;

	padding: 20px;
	border-bottom: 1px solid #474444;
}
.pt-4 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.fg {
	background: rgb(74, 107, 89);
	margin-bottom: 30px;
	margin-top: 30px;
	color: white;
}
.my-4 {
	background: rgb(197, 224, 133);
}
.image {
	height: 150px;

	margin-right: 20px;
}
.image2 {
	height: 150px;

	margin-left: 20px;
}
.paging {
	margin-top: 80px;
	width: 100%;
}
.pagin {
	width: 20%;
	margin: 0 auto;
}
</style>
