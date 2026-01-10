<script setup lang="ts">
import { computed } from 'vue'
import TextField from '@/components/TextField.vue'

/**
 * Horizontal row of TextField components for quick character info entry.
 */
const props = defineProps<{
    values: Record<string, string | number | { value: string | number, type: string }>,
}>()
const length = computed(() => {
    return Object.values(props.values).length;
})
const last = computed(() => {
    return Object.keys(props.values).pop();
})

/**
 * Compute per-cell classes for grid separators and alignment.
 */
function classes(key: string, value: string | number) {
    let classes = "p-4 ";
    classes += key != last.value ? ' border-red-500 border-r-4' : ' '
    classes += (typeof (value) == 'number' || key == 'Humanity') ? ' text-center' : ' '
    return classes;
}

/**
 * Normalize the row values into a consistent shape for rendering.
 */
const values = computed(() => {
    let vals: Record<string, { type: string, value: string | number }> = {};
    for (let key in props.values) {
        let item = props.values[key];
        if (typeof item === 'object') {
            if (item.hasOwnProperty('type')) {
                vals[key] = item;
            } else {
                vals[key] = { value: item.value, type: 'text' }
            }
            vals[key] = item;
        } else {
            vals[key] = { value: item, type: 'text' }
        }
    }
    return vals;
})

</script>

<template>
    <div :class="`notch grid grid-cols-${length}`">
        <template v-for="value, key in values">
            <TextField v-if="value.type == 'text'" :class="classes(key, value.value)" :title="key" :value="value.value" />
        </template>
    </div>
</template>
