<script setup lang="ts">
import { Character } from '@/classes'
import SkillTable from './SkillTable.vue';
/**
 * Renders all SkillTable groups for the current Character.
 */
defineProps<{
    char: Character
}>()
</script>

<template>
    <!-- <table class="w-full sm:text-xs md:text-base border-y-4 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Awareness'" :char="char" />
    <SkillTable :category="'Body'" :char="char" />
    <SkillTable :category="'Control'" :char="char" />
    <SkillTable :category="'Ranged Weapon'" :char="char" />
    <!-- </table> -->
    <!-- <table class="w-full sm:text-xs md:text-base border-8 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Education'" :char="char" />
    <SkillTable :category="'Fighting'" :char="char" />
    <SkillTable :category="'Performance'" :char="char" />
    <!-- </table> -->
    <!-- <table class="w-full sm:text-xs md:text-base border-8 border-solid bg-white border-red-500"> -->
    <SkillTable :category="'Social'" :char="char" />
    <SkillTable :category="'Technique'" :char="char" />
    <!-- </table> -->
</template>
