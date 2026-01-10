<script setup lang="ts">
import { withDefaults } from 'vue';

/**
 * Reusable label + input/display control for character sheet fields.
 */
const props = withDefaults(defineProps<{
    title: string,
    value?: string | number,
    titleClass?: string,
    valueClass?: string,
    inputType?: "text" | "number" | "select",
    options?: string[],
    fixed?: boolean,
    min?: number,
    max?: number
}>(), {
    fixed: false,
    min: 0,
    max: 10
})

const model = defineModel()

</script>

<template>
    <div class="font-bold">
        <div :class="titleClass" class="text-xs">{{ title }}</div>
        <slot>

            <template v-if="model && fixed">
                <div :class="valueClass" class="" v-if="model">{{ model }}</div>
                <div :class="valueClass" class="" v-else>-</div>
            </template>
            <template v-else-if="model !== undefined">
                <div v-if="options && options.length > 0">
                    <select v-model="model" class="px-2 py-1">
                        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                    </select>
                </div>
                <div v-else>
                    <input :class="valueClass" class="w-full p-x-2 hover:bg-gray-200" :min="min" :max="max" :type="typeof (model) === 'number' ? 'number' : 'text'" v-model="model" />
                </div>
            </template>
            <template v-else-if="value !== undefined">
                <div :class="valueClass" class="" v-if="value">{{ value }}</div>
                <div :class="valueClass" class="" v-else>-</div>
            </template>
        </slot>
    </div>
</template>
