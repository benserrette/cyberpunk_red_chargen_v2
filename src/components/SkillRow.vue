<script setup lang="ts">
import { Skill } from '@/classes/Skill';
import { computed, withDefaults } from 'vue';
/**
 * Table row for displaying a single skill and its derived base value.
 */
const props = withDefaults(defineProps<{
	skill: Skill
	stat: number
	editable?: boolean
	minLevel?: number
	maxLevel?: number
	onUpdate?: (skill: Skill, level: number) => void
}>(), {
	editable: false,
	minLevel: 0,
	maxLevel: 6
})

const level = computed({
	get: () => props.skill.lvl,
	set: (value) => {
		if (props.onUpdate) {
			props.onUpdate(props.skill, Number(value));
		} else {
			props.skill.lvl = Number(value);
		}
	}
})
</script>

<template>
	<tr class="border-b-4 border-red-500">
		<td class="border-x-4 border-red-500 p-1 lg:text-sm text-xs">{{ skill.name }} ({{ skill.stat }})</td>
		<td class="border-r-4 border-red-500 p-1 text-center">
			<input v-if="editable" v-model.number="level" class="w-full text-center hover:bg-gray-200" type="number"
				:min="minLevel" :max="maxLevel" />
			<span v-else>{{ skill.lvl }}</span>
		</td>
		<td class="border-r-4 border-red-500 p-1 text-center">{{ stat }}</td>
		<td class="border-r-4 border-red-500 p-1 text-center font-bold">{{ skill.lvl + stat }}</td>
	</tr>
</template>
