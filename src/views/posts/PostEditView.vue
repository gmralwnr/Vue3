<template>
	<div><h2>게시글 수정</h2></div>
	<hr class="my-4" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent="edit"
		:type="alertType"
	>
		<template #actions>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-danger me-2"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
				<AppAlert :show="showAlert" />
			</div>
		</template>
	</PostForm>
	<!-------------------------------기존form----------------------------------------------->
	<form @submit.prevent="edit">
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input v-model="form.title" type="text" class="form-control" id="title" />
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea
				v-model="form.content"
				class="form-control"
				id="content"
				rows="3"
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
import { getPostsById, updatePost } from '@/api/posts';

import PostForm from '@/components/posts/PostForm.vue';
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
	title: null,
	content: null,
	createdAt: null,
});
const fetchPosts = async () => {
	try {
		const { data } = await getPostsById(id);
		setPost(data); //obj  => 원하는걸 출력하기위해 구조분해할당 setPost
		form.value.createdAt = data.createdAt;
	} catch (error) {
		console.error(error);
	}
};

const setPost = ({ title, content }) => {
	//출력할 컬럼만 작성
	form.value.title = title;
	form.value.content = content;
};
fetchPosts();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value }); //api posts.js 에 updatePost(id, data) 파라미터 2개 같이 넣어줌
		router.push({ name: 'PostDetail', params: { id } });
		vAlert();
		console.log('router', router.name);
	} catch (error) {
		console.error(error);
	}
};
const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });

//alert
const showAlert = ref(false);
const vAlert = () => {
	showAlert.value = true;
	setTimeout(() => {
		showAlert.value = false;
	}, 2000);
};
</script>

<style lang="scss" scoped></style>
