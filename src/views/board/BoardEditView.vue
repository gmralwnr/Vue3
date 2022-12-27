<template>
	<div><h2>게시글 수정</h2></div>
	<hr class="my-4" />
	<form @submit.prevent="edit">
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input v-model="form.title" type="text" class="form-control" id="title" />
			<input type="hidden" v-model="form.noticeNo" />
			<input type="hidden" v-model="form.newYn" />
			<input type="hidden" v-model="form.regId" />
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea
				v-model="form.contents"
				class="form-control"
				id="content"
				rows="3"
				style="white-space: pre-line"
			></textarea>
		</div>
		<div class="pt-4">
			<button
				type="button"
				class="btn btn-outline-danger me-2"
				@click="goDetailPage"
			>
				취소
			</button>
			<button class="btn btn-primary">수정</button>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBoardById, getBoarUpdateById } from '@/api/board';
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
	title: null,
	contents: null,
	newYn: null,
	regId: null,
});
const fetchPosts = async () => {
	try {
		const { data } = await getBoardById(id);
		setPost(data.data); //obj  => 원하는걸 출력하기위해 구조분해할당 setPost
		console.log(data.data);
	} catch (error) {
		console.error(error);
	}
};

const setPost = ({ title, contents, regId }) => {
	//출력할 컬럼만 작성
	form.value.title = title;
	form.value.contents = contents;
	form.value.newYn = 'N';
	form.value.regId = regId;
};

fetchPosts();

const edit = async () => {
	try {
		await getBoarUpdateById(id, { ...form.value }); //api posts.js 에 updatePost(id, data) 파라미터 2개 같이 넣어줌
		console.log('업데이트');
		router.push({ name: 'BoardDetail', params: { id } });
		console.log('router', router.name);
	} catch (error) {
		console.error(error);
	}
};
const goDetailPage = () => router.push({ name: 'BoardDetail', params: { id } });
</script>

<style lang="scss" scoped></style>
