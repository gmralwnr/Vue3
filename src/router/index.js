import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import BoardListView from '@/views/board/BoardListView.vue';
import BoardDetailView from '@/views/board/BoardDetailView.vue';
import BoardEditView from '@/views/board/BoardEditView.vue';
import BoardCreateView from '@/views/board/BoardCreateView.vue';
//import { createWebHashHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		component: PostListView,
		name: 'PostList',
	},
	{
		path: '/posts/create',
		component: PostCreateView,
		name: 'PostCreate',
	},
	{
		path: '/posts/:id', //여러개를 url 을 한개 페이지의 매핑으로 사용
		component: PostDetailView,
		name: 'PostDetail',
		props: true,
		//props: route => ({id: parseInt(route.params.id),}),
	},
	{
		path: '/posts/:id/edit',
		component: PostEditView,
		name: 'PostEdit',
	},
	{
		path: '/:pathMatch(.*)*', //NotFound view NotFound
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/nested', //주소창에 검색
		name: 'Nested',
		component: NestedView, //page가 나오도록
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},

			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
	////////////////////////////////////////////////////////////////////////////////////////////////
	{
		path: '/board',
		component: BoardListView,
		name: 'BoardList',
	},
	{
		path: '/board/:id', //여러개를 url 을 한개 페이지의 매핑으로 사용
		component: BoardDetailView,
		name: 'BoardDetail',
		props: true,
		//props: route => ({id: parseInt(route.params.id),}),
	},
	{
		path: '/board/:id/edit',
		component: BoardEditView,
		name: 'BoardEdit',
	},
	{
		path: '/Board/create',
		component: BoardCreateView,
		name: 'BoardCreate',
	},
];

const router = createRouter({
	history: createWebHistory('/'), //npm run build
	//history: createWebHashHistory(), //#이붙음
	routes,
});

export default router;
