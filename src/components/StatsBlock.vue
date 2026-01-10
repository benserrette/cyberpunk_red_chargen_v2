<script setup lang="ts">
import TextField from '@/components/TextField.vue'
import { computed, withDefaults } from 'vue'
// import type { Stat } from '@/types'

/**
 * Grid of stat inputs with fixed or editable behavior.
 */
const props = withDefaults(
    defineProps<{
        // stats?: Record<string, number>,
        modelValue: Record<string, number>
        fixed?: boolean
    }>(),
    {
        fixed: true
    }
)
const emit = defineEmits(['update:modelValue'])

// const stats_model = defineModel();

const INT = computed({
    get: () => props.modelValue.INT,
    set: (value) => emit('update:modelValue', { ...props.modelValue, INT: value })
})
const REF = computed({
    get: () => props.modelValue.REF,
    set: (value) => emit('update:modelValue', { ...props.modelValue, REF: value })
})
const DEX = computed({
    get: () => props.modelValue.DEX,
    set: (value) => emit('update:modelValue', { ...props.modelValue, DEX: value })
})
const TECH = computed({
    get: () => props.modelValue.TECH,
    set: (value) => emit('update:modelValue', { ...props.modelValue, TECH: value })
})
const COOL = computed({
    get: () => props.modelValue.COOL,
    set: (value) => emit('update:modelValue', { ...props.modelValue, COOL: value })
})
const WILL = computed({
    get: () => props.modelValue.WILL,
    set: (value) => emit('update:modelValue', { ...props.modelValue, WILL: value })
})
const LUCK = computed({
    get: () => props.modelValue.LUCK,
    set: (value) => emit('update:modelValue', { ...props.modelValue, LUCK: value })
})
const MOVE = computed({
    get: () => props.modelValue.MOVE,
    set: (value) => emit('update:modelValue', { ...props.modelValue, MOVE: value })
})
const BODY = computed({
    get: () => props.modelValue.BODY,
    set: (value) => emit('update:modelValue', { ...props.modelValue, BODY: value })
})
const EMP = computed({
    get: () => props.modelValue.EMP,
    set: (value) => emit('update:modelValue', { ...props.modelValue, EMP: value })
})

// const updated_stats = computed(() => {
//     let stats = Object.entries(stats_model).reduce((acc, [key, value]) => {
//         acc[key] = value.toString()
//         return acc
//     }, {} as Record<string, string>)

//     // stats["EMP"] = `${stats_model["current_EMP"]} of ${props.stats["EMP"]}`
//     // delete stats["current_EMP"]
//     // stats["LUCK"] = `${props.stats["LUCK"]} of ${props.stats["LUCK"]}`
//     return stats
// })
</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
        <TextField :min="2" :max="8" v-model="INT" title="INT" :fixed="fixed" title-class="text-right" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="REF" title="REF" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="DEX" title="DEX" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="TECH" title="TECH" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="COOL" title="COOL" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="WILL" title="WILL" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="LUCK" title="LUCK" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex"><span class="w-1/2 text-right">{{ LUCK }} of</span><input v-if="!fixed" :min="2" :max="8" class="pl-1 w-1/2 hover:bg-gray-200" type="number" v-model="LUCK" /><span v-else class="ml-1">{{ LUCK }}</span></div>
        </TextField>
        <TextField :min="2" :max="8" v-model="MOVE" title="MOVE" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField :min="2" :max="8" v-model="BODY" title="BODY" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3" />
        <TextField title="EMP" :fixed="fixed" title-class="text-right text-sm" class="notch px-1 pb-3">
            <div class="flex"><span class="w-1/2 text-right">{{ modelValue.current_EMP }} of </span><input v-if="!fixed" :min="2" :max="8" class="ml-1 w-1/2 hover:bg-gray-200" type="number" v-model="EMP" /><span v-else class="ml-1">{{ EMP }}</span></div>
        </TextField>

    </div>
</template>
