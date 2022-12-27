<template>
	<Transition>
		<div v-if="modelValue">
			<div class="modal-backdrop fade show"></div>
			<!-- Modal -->
			<div
				class="modal fade show d-block"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<slot name="header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">
									{{ title }}
								</h1>
								<div class="d-flex flex-row-reverse">
									<button
										type="button"
										class="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
										@click="$emit('update:modelValue', false)"
									></button>
								</div>
							</slot>
						</div>
						<div class="modal-body">
							<slot></slot>
						</div>
						<div class="modal-footer">
							<slot name="actions"></slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineProps({
	modelValue: Boolean,
	title: String,
});
defineEmits(['close', 'update:modelValue']);
</script>

<style lang="scss" scoped></style>
