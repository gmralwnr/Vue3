<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<!--일본
		<h2>{{ form.title }}</h2>
		<p>{{ form.contents }}</p>
		<p class="text-muted">{{ form.regDt }}</p>	-->
		<hr class="my-4" />
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
import { getPostsById, deletePost } from '@/api/posts';
import { ref } from 'vue';

const props = defineProps({
	id: [String, Number],
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
	content: null,
	createdAt: null,
});
//let form = reactive({});
const fetchPosts = async () => {
	try {
		//const data = getPostsById(props.id);
		const { data } = await getPostsById(props.id);
		//form.value = { ...data };
		setPost(data); //obj  => 원하는걸 출력하기위해 구조분해할당 setPost

		//일본
		//form.value = { ...data.data };
		//console.log('data', data.data);

		//form.title = data.title; //reactive 선언시
	} catch (error) {
		console.error(error);
	}
};
const setPost = ({ title, content, createdAt }) => {
	//출력할 컬럼만 작성
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};

fetchPosts(); //호출

const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?') === false) {
			return;
		}
		await deletePost(props.id);
		router.push({ name: 'PostList' });
		console.log(props.id);
	} catch (error) {
		console.error(error);
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style lang="scss" scoped></style>
