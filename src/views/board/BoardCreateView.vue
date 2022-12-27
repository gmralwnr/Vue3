<template>
	<div><h2>게시글 등록</h2></div>
	<hr class="my-4" />
	<form @submit.prevent="save">
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
				class="btn btn-outline-dark me-2"
				@click="goListPage"
			>
				목록
			</button>
			<button class="btn btn-primary">저장</button>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts'; //api 에 저장 할 수 있도록 import해줌
const router = useRouter();

const form = ref({
	title: null,
	content: null,
});
//현재 날짜
var today = new Date();
var year = today.getFullYear(); //현재 년도
var month = ('0' + (today.getMonth() + 1)).slice(-2); //현재 날짜
var day = ('0' + today.getDate()).slice(-2);
var dateString = year + '-' + month + '-' + day; //현쟁 일자
console.log('dateString' + dateString);
const save = () => {
	try {
		const data = {
			...form.value, //form에 있는 날짜 저장 title, content
			createdAt: dateString, //현재시간에대한 날짜 저장
		};
		createPost(data);
		router.push({ name: 'PostList' }); //글 저장후 목록으로 이동
	} catch (error) {
		console.error(error);
	}
};
const goListPage = () => router.push({ name: 'PostList' });
</script>

<style lang="scss" scoped></style>
