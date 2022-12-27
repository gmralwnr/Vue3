<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g- 3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<!--일본			
				<div v-for="post in posts" :key="post.noticeNo" class="col-4">
					<PostItem
					:title="post.title"
					:content="post.contents"
					:created-at="post.regDt"
					@click="goPage(post.noticeNo)"
				> 
				</PostItem>
			</div>
			-->
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
					@modal="openModal(post)"
				>
				</PostItem>
			</div>
		</div>
		<AppPaginationVue
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>
		<PostModal
			v-model="show"
			:title="modalTitle"
			:content="modalContent"
			:createdAt="modalCreatedAt"
		/>

		<hr class="my-5" />
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
	<!-- <PostItem title="제목" content="내용" created-at="2020-01-01"></PostItem> -->
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
//import AppCard from '@/components/AppCard.vue';
import AppPaginationVue from '@/components/AppPagination.vue';
import { getPosts } from '@/api/posts';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostModal from '@/components/posts/PostModal.vue';

const router = useRouter();
const posts = ref([]);
const params = ref({
	//List 정렬 페이징
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
//페이징
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
); //단순히 나누게 되면 소수점이 발생 하여  Math.ceil 을 사용
const fetchPosts = async () => {
	try {
		//const response = await getPosts();
		//console.dir(response); //dir 로 출력하면 볼 수 있음
		const { data, headers } = await getPosts(params.value); //object 안에data를 중도분해? 로 출력 할 수 있음
		posts.value = data;
		console.log('강의data', data);
		totalCount.value = headers['x-total-count']; //게시글 수
		//일본
		//posts.value = data.data.list; //실제 data를 넣어주는 경로
		//console.log(data.data.list);
	} catch (error) {
		console.error(error);
	}
};
/** 
*위와 동일
const fetchPosts = () => {
	//const response = getPosts(); //DB호출...  promise
	getPosts()
		.then(response => {
			console.log('response:', response);
			//posts.value = getPosts();
		})
		.catch(error => {
			console.log('error', error); //Db서버 꺼졌을 때 error console에 찍힘
		});
};
*/
//fetchPosts();
watchEffect(fetchPosts); //콟백함수로watchEffect
const goPage = id => {
	//router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
//modalk
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	//	console.log('Dfdf', title, content, createdAt);
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
	console.log('mp', modalContent.value);

	console.log('mp', modalCreatedAt.value);
};

const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
