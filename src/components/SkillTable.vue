<script setup lang="ts">
import { Skill, Character } from '@/classes';
import SkillRow from './SkillRow.vue';
import { computed } from 'vue';
import { SkillCategories } from '@/data';

/**
 * Table of skills for a given category or explicit chunk of skills.
 */
const props = defineProps<{
    category?: string;
    char: Character;
    chunk?: Skill[]
}>();

const { char, category } = props;

const filtered_skills = computed(() => {
    let skills: Skill[] = []

    if (category !== undefined) {
        for (const skill_key in char.skills) {
            const skill = char.skills[skill_key];
            if (SkillCategories[category].includes(skill.name)) {
                skills.push(skill)
            }
        }
    } else if (props.chunk !== undefined) {
        for (const skill_key in props.chunk) {
            const skill = props.chunk[skill_key];
            skills.push(skill)
        }
    } else {
        for (const skill_key in char.skills) {
            const skill = char.skills[skill_key];
            skills.push(skill)
        }
    }
    return skills;
})
</script>

<template>
    <table class="w-full text-xs md:text-base border-y-4 border-solid bg-white border-red-500">
        <tr class="bg-black text-white border-b-4 border-red-500 border-solid">
            <th class="border-x-4 border-red-500 text-xs p-1">{{ category }} Skills</th>
            <th class="border-r-4 border-red-500 text-xs p-1 w-1/12">LVL</th>
            <th class="border-r-4 border-red-500 text-xs p-1 w-1/12">STAT</th>
            <th class="border-r-4 border-red-500 text-xs p-1  w-1/12">BASE</th>
        </tr>
        <SkillRow v-for="skill of filtered_skills" class="" :skill="skill" :stat="char.stats[skill.stat]" />
    </table>
</template>
