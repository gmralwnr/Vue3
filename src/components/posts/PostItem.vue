<template>
	<AppCard>
		<img src="@/image/x.png" style="hight: 10px; width: 10px; float: right" />
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">
			{{ content }}
		</p>
		<p class="text-muted">{{ createdAt }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-0" @click.stop="$emit('modal')">
					<i class="bi bi-box2-heart-fill"></i>
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
//import AppCard from '@/components/AppCard.vue';
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
});
defineEmits(['modal']); //부모 컴포런트에서 modal 띄우기
</script>

<style lang="scss" scoped></style>
