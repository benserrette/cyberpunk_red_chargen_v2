<script setup lang="ts">
import { computed } from 'vue';

/**
 * Displays a numeric level with increment/decrement controls.
 */
const props = defineProps<{
	value: number
	min?: number
	max?: number
	disabled?: boolean
	canIncrement?: boolean
}>();

const emit = defineEmits<{
	(e: 'change', value: number): void
}>();

const minValue = computed(() => props.min ?? 0);
const maxValue = computed(() => props.max ?? 6);
const numericValue = computed(() => Number(props.value));

const canDecrement = computed(() => !props.disabled && numericValue.value > minValue.value);
const canIncrement = computed(() => {
	const incrementAllowed = props.canIncrement ?? true;
	return !props.disabled && incrementAllowed && numericValue.value < maxValue.value;
});

function increment() {
	if (!canIncrement.value) {
		return;
	}
	emit('change', numericValue.value + 1);
}

function decrement() {
	if (!canDecrement.value) {
		return;
	}
	emit('change', numericValue.value - 1);
}
</script>

<template>
	<div class="flex items-center justify-center gap-2">
		<button v-if="!disabled" type="button" class="px-2 py-1 text-xs transition-transform"
			:class="canDecrement ? 'active:translate-y-0.5' : 'text-gray-400 cursor-not-allowed'" :disabled="!canDecrement"
			@click="decrement">
			▼
		</button>
		<span class="min-w-[1.5rem] text-center">{{ value }}</span>
		<button v-if="!disabled" type="button" class="px-2 py-1 text-xs transition-transform"
			:class="canIncrement ? 'active:translate-y-0.5' : 'text-gray-400 cursor-not-allowed'" :disabled="!canIncrement"
			@click="increment">
			▲
		</button>
	</div>
</template>
