<script setup lang="ts">
import { computed } from 'vue';

/**
 * Displays a skill level with increment/decrement controls.
 */
const props = defineProps<{
	value: number
	min?: number
	max?: number
	disabled?: boolean
}>();

const emit = defineEmits<{
	(e: 'change', value: number): void
}>();

const minValue = computed(() => props.min ?? 0);
const maxValue = computed(() => props.max ?? 6);

const canDecrement = computed(() => !props.disabled && props.value > minValue.value);
const canIncrement = computed(() => !props.disabled && props.value < maxValue.value);

function increment() {
	if (!canIncrement.value) {
		return;
	}
	emit('change', props.value + 1);
}

function decrement() {
	if (!canDecrement.value) {
		return;
	}
	emit('change', props.value - 1);
}
</script>

<template>
	<div class="flex items-center justify-center gap-2">
		<button type="button" class="px-2 py-1 border border-red-500 text-xs" :disabled="!canDecrement"
			@click="decrement">
			▼
		</button>
		<span class="min-w-[1.5rem] text-center">{{ value }}</span>
		<button type="button" class="px-2 py-1 border border-red-500 text-xs" :disabled="!canIncrement"
			@click="increment">
			▲
		</button>
	</div>
</template>
