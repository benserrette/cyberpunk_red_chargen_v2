<script setup lang="ts">
import { computed } from 'vue'
import CPButton from '@/components/CPButton.vue'
/**
 * Table wrapper with optional headers and randomize action.
 */
const props = defineProps<{
    headers?: string[],
    title: string,
    randomize?: Function,
    creation_method?: string
    show_randomize_button?: boolean
}>()

const show_randomize_button = computed(() => {
    return props.show_randomize_button === true || (props.randomize !== undefined && props.creation_method === 'complete')
})

const show_header = computed(() => {
    return props.headers !== undefined && props.headers.length > 0
})

function randomize() {
    if (props.randomize !== undefined) {
        props.randomize()
    }
}

</script>

<template>
    <div class="notch border-8 border-red-500 border-solid flex justify-between">
        <div class="ml-4 my-2 font-bold">{{ title }}</div>
        <div class="mr-2 my-2" v-if="show_randomize_button">
            <CPButton @click="randomize()">Randomize</CPButton>
        </div>
    </div>
    <table class="w-full">
        <thead v-if="show_header">
            <tr class="text-xs bg-black text-white ">
                <th class="text-left border-x-4 border-red-500 p-1" v-for="column_header of headers">{{ column_header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>
