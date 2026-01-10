<script setup lang="ts">
import { Skill } from '@/classes/Skill';
/**
 * Table row for displaying a single skill and its derived base value.
 */
defineProps<{
	skill: Skill
	stat: number
}>()
</script>

<template>
	<tr class="border-b-4 border-red-500">
		<td class="border-x-4 border-red-500 p-1 lg:text-sm text-xs">{{ skill.name }} ({{ skill.stat }})</td>
		<td class="border-r-4 border-red-500 p-1 text-center">{{ skill.lvl }}</td>
		<td class="border-r-4 border-red-500 p-1 text-center">{{ stat }}</td>
		<td class="border-r-4 border-red-500 p-1 text-center font-bold">{{ skill.lvl + stat }}</td>
	</tr>
</template>
