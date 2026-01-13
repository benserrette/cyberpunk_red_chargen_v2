<script setup lang="ts">
import { Skill } from '@/classes/Skill';
import { withDefaults } from 'vue';
import LevelStepper from '@/components/LevelStepper.vue';
/**
 * Table row for displaying a single skill and its derived base value.
 */
const props = withDefaults(defineProps<{
	skill: Skill
	stat: number
	editable?: boolean
	minLevel?: number
	maxLevel?: number
	canIncrement?: boolean
	onUpdate?: (skill: Skill, level: number) => number
}>(), {
	editable: false,
	minLevel: 0,
	maxLevel: 6
})

function updateLevel(value: number) {
	if (props.onUpdate) {
		const updatedLevel = props.onUpdate(props.skill, value);
		props.skill.lvl = updatedLevel;
	} else {
		props.skill.lvl = value;
	}
}
</script>

<template>
	<tr class="border-b-4 border-red-500">
		<td class="border-x-4 border-red-500 p-1 lg:text-sm text-xs">{{ skill.name }} ({{ skill.stat }})</td>
		<td class="border-r-4 border-red-500 p-1 text-center">
			<LevelStepper :value="skill.lvl" :min="minLevel" :max="maxLevel" :disabled="!editable"
				:can-increment="canIncrement"
				@change="updateLevel" />
		</td>
		<td class="border-r-4 border-red-500 p-1 text-center">{{ stat }}</td>
		<td class="border-r-4 border-red-500 p-1 text-center font-bold">{{ skill.lvl + stat }}</td>
	</tr>
</template>
