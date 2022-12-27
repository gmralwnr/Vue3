<template>
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="$emit('page', currentPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: currentPage === page }"
			>
				<a class="page-link" href="#" @click.prevent="$emit('page', page)">{{
					page
				}}</a>
			</li>

			<li class="page-item" :class="isNextPage">
				<!--pageCount 총 페이지 보다 parms.pagege 현재페이지가 작은게 아니라면 출력 -->
				<a
					class="page-link"
					href="#"
					aria-label="Next"
					@click.prevent="$ = emit('page', currentPage + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

//부모 컴포런트 프랍스 가 현재페이지(currentPage)와 현재 카운트(pageCount)를 받아야함
const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
});
defineEmits(['page']);
const isPrevPage = computed(() => ({ disabled: !(props.currentPage > 1) }));
const isNextPage = computed(() => ({
	disabled: !(props.currentPage < props.pageCount),
}));
</script>

<style lang="scss" scoped></style>
