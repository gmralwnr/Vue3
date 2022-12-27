<template>
	<AppCardBoard>
		<div class="d-flex flex-row-reverse">
			<button class="btn p-0" @click.stop="$emit('delete')">
				<img
					src="@/image/x.png"
					style="hight: 10px; width: 10px; float: right"
				/>
			</button>
		</div>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ content }}
		</p>
		<p class="text-muted">{{ createdAt }}</p>
		<p class="text-muted" style="font-size: 0.8em; text-align: right">
			조회수 : {{ hitCnt }}
		</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-0" @click.stop="$emit('modal')">
					<i class="bi bi-box2-heart-fill"></i>
				</button>
				<!-- <div v-html="likeYn" class="btn p-0"></div> -->
				<div v-if="likeYn == 'Y'" class="btn p-0">
					<i class="bi bi-balloon-heart-fill"></i>
				</div>
				<div v-else class="btn p-0">
					<i class="bi bi-balloon-heart"></i>
				</div>
			</div>
		</template>
	</AppCardBoard>
</template>

<script setup>
//import AppCardBoard from '@/components/AppCardBoard.vue';
defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number],
	},
	hitCnt: {
		type: [String, Number],
	},
	likeYn: {
		type: String,
	},
});
</script>

<style lang="scss" scoped></style>
