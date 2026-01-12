<script setup lang="ts">
import { Character } from '@/classes'
import type { Skill } from '@/classes'
import SkillTable from './SkillTable.vue';
/**
 * Renders all SkillTable groups for the current Character.
 */
defineProps<{
    char: Character
    editable?: boolean
    minLevel?: (skill: Skill) => number
    maxLevel?: number
    onSkillUpdate?: (skill: Skill, level: number) => void
}>()
</script>

<template>
    <!-- <table class="w-full sm:text-xs md:text-base border-y-4 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Awareness'" :char="char" :editable="editable" :min-level="minLevel"
        :max-level="maxLevel" :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Body'" :char="char" :editable="editable" :min-level="minLevel" :max-level="maxLevel"
        :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Control'" :char="char" :editable="editable" :min-level="minLevel" :max-level="maxLevel"
        :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Ranged Weapon'" :char="char" :editable="editable" :min-level="minLevel"
        :max-level="maxLevel" :on-skill-update="onSkillUpdate" />
    <!-- </table> -->
    <!-- <table class="w-full sm:text-xs md:text-base border-8 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Education'" :char="char" :editable="editable" :min-level="minLevel"
        :max-level="maxLevel" :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Fighting'" :char="char" :editable="editable" :min-level="minLevel" :max-level="maxLevel"
        :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Performance'" :char="char" :editable="editable" :min-level="minLevel"
        :max-level="maxLevel" :on-skill-update="onSkillUpdate" />
    <!-- </table> -->
    <!-- <table class="w-full sm:text-xs md:text-base border-8 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Social'" :char="char" :editable="editable" :min-level="minLevel" :max-level="maxLevel"
        :on-skill-update="onSkillUpdate" />
    <SkillTable :category="'Technique'" :char="char" :editable="editable" :min-level="minLevel" :max-level="maxLevel"
        :on-skill-update="onSkillUpdate" />
    <!-- </table> -->
</template>
