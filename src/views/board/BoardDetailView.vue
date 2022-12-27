<template>
	<div>
		<!--일본	-->
		<h2>{{ post.title }}</h2>
		<p style="white-space: pre-line">{{ post.contents }}</p>
		<p class="text-muted">{{ post.regDt }}</p>
		<input type="hidden" v-model="post.newYn" />
		<input type="hidden" v-model="post.regId" />
		<hr class="my-4" />
		<div v-if="post.likeYn == 'N'">
			<button class="btn p-0" @click="like">
				<i class="bi bi-balloon-heart"></i>
			</button>
		</div>
		<div v-if="post.likeYn == 'Y'">
			<button @click="like">
				<i class="bi bi-balloon-heart-fill"></i>
			</button>
		</div>

		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
	<p>params:{{ $route.params }}</p>
	<!-- //parameter id 는 index.js 에서 설정한 id -->
	<p>query: {{ $route.query.searchText }}</p>
	<!--http://localhost:5173/posts/wefo?searchText=Vue바이블-->
	<p>hash:{{ $route.hash }}</p>
	<!--http://localhost:5173/posts/wef#hashvalue-->
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getBoardById, getBoardDelete, getBoardLikeSave } from '@/api/board';
import { ref } from 'vue';
import { posts } from '@/api';

const props = defineProps({
	id: String,
});

//const route = useRoute();
const router = useRouter();
//const id = route.params.id;
/**
 * ref
 * 장점) 한꺼번에 객체 할당을 할 수 있음
 * 단점) form.value.title , form.value.content
 *장점) 일관성

 * reactive
 * 단점) 객체할당 불가능
 * 장점) form.title , form.content
 */
const post = ref({
	title: null,
	contents: null,
	createdAt: null,
	regId: null,
	newYn: null,
	likeYn: null,
});
//let form = reactive({});
const fetchPosts = async () => {
	try {
		//const data = getPostsById(props.id);
		//const { data } = await getBoardById(props.id);
		//form.value = { ...data };
		//setPost(data); //obj  => 원하는걸 출력하기위해 구조분해할당 setPost

		//일본
		const { data } = await getBoardById(props.id, 'EOS');
		console.log('data', data.data);
		setPost(data.data);
		console.log('like', data.data.likeYn);
		//form.title = data.title; //reactive 선언시
	} catch (error) {
		console.error(error);
	}
};
const setPost = ({ title, contents, regDt, regId, newYn, likeYn }) => {
	//출력할 컬럼만 작성
	post.value.title = title;
	post.value.contents = contents;
	post.value.regDt = regDt;
	post.value.regId = regId;
	post.value.newYn = newYn;
	post.value.likeYn = likeYn;
};

fetchPosts(); //호출
/**/

const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?') === false) {
			return;
		}
		await getBoardDelete(props.id, { ...post.value });
		console.log('삭제', post.value);
		router.push({ name: 'BoardList' });
	} catch (error) {
		console.error(error);
	}
};
//좋아요 여부
const like = async () => {
	try {
		post.value.newYn = 'N';
		console.log(post.value);
		if (post.value.likeYn == 'Y') {
			post.value.likeYn = 'N';
			//await getBoardLikeSave(props.id, { likeYn: post.value.like, newYn: 'N' });
			await getBoardLikeSave(props.id, post.value);
		} else if (post.value.likeYn == 'N') {
			post.value.likeYn = 'Y';
			//await getBoardLikeSave(props.id, { likeYn: post.value.like, newYn: 'N' });
			await getBoardLikeSave(props.id, post.value);
		}
	} catch (error) {
		console.error();
	}
};
const goListPage = () => router.push({ name: 'BoardList' });
const goEditPage = () =>
	router.push({ name: 'BoardEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
