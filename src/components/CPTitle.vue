<script setup lang="ts">
import { ref } from 'vue';

/**
 * Styled section title used throughout the character sheet layout.
 */
const props = defineProps<{
    bottomBorder?: boolean;
}>();

const bottomBorder = ref(props.bottomBorder ?? false);


</script>
<template>

    <div class="flex pl-4 py-2 notch font-bold" :class="bottomBorder ? '' : 'border-b-0'">
        <slot></slot>
    </div>
</template>
