<script setup lang="ts">
import TextField from '@/components/TextField.vue'
import LevelStepper from '@/components/LevelStepper.vue'
import { withDefaults } from 'vue'

/**
 * Grid of stat inputs with fixed or editable behavior.
 */
const props = withDefaults(
    defineProps<{
        modelValue: Record<string, number>
        fixed?: boolean
        canIncrement?: (stat: StatKey, value: number) => boolean
    }>(),
    {
        fixed: true
    }
)
const emit = defineEmits(['update:modelValue'])


type StatKey = 'INT' | 'REF' | 'DEX' | 'TECH' | 'COOL' | 'WILL' | 'LUCK' | 'MOVE' | 'BODY' | 'EMP';

function updateStat(stat: StatKey, value: number) {
    emit('update:modelValue', { ...props.modelValue, [stat]: value })
}

function statValue(stat: StatKey) {
    return Number(props.modelValue[stat] ?? 0);
}

function canIncrementStat(stat: StatKey) {
    if (!props.canIncrement) {
        return undefined;
    }
    return props.canIncrement(stat, statValue(stat));
}

</script>

<template>
    <div class="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10">
        <TextField :min="2" :max="8" title="INT" :fixed="fixed" title-class="text-right" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('INT')" :min="2" :max="8"
                    :can-increment="canIncrementStat('INT')" @change="updateStat('INT', $event)" />
                <span v-else class="text-center">{{ statValue('INT') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="REF" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('REF')" :min="2" :max="8"
                    :can-increment="canIncrementStat('REF')" @change="updateStat('REF', $event)" />
                <span v-else class="text-center">{{ statValue('REF') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="DEX" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('DEX')" :min="2" :max="8"
                    :can-increment="canIncrementStat('DEX')" @change="updateStat('DEX', $event)" />
                <span v-else class="text-center">{{ statValue('DEX') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="TECH" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('TECH')" :min="2" :max="8"
                    :can-increment="canIncrementStat('TECH')" @change="updateStat('TECH', $event)" />
                <span v-else class="text-center">{{ statValue('TECH') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="COOL" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('COOL')" :min="2" :max="8"
                    :can-increment="canIncrementStat('COOL')" @change="updateStat('COOL', $event)" />
                <span v-else class="text-center">{{ statValue('COOL') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="WILL" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('WILL')" :min="2" :max="8"
                    :can-increment="canIncrementStat('WILL')" @change="updateStat('WILL', $event)" />
                <span v-else class="text-center">{{ statValue('WILL') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="LUCK" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center gap-2 text-xs">
                <span class="text-right">{{ statValue('LUCK') }} of</span>
                <LevelStepper v-if="!fixed" :value="statValue('LUCK')" :min="2" :max="8"
                    :can-increment="canIncrementStat('LUCK')" @change="updateStat('LUCK', $event)" />
                <span v-else class="text-center">{{ statValue('LUCK') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="MOVE" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('MOVE')" :min="2" :max="8"
                    :can-increment="canIncrementStat('MOVE')" @change="updateStat('MOVE', $event)" />
                <span v-else class="text-center">{{ statValue('MOVE') }}</span>
            </div>
        </TextField>
        <TextField :min="2" :max="8" title="BODY" :fixed="fixed" title-class="text-right text-sm" value-class="text-center" class="notch px-1 pb-3">
            <div class="flex items-center justify-center">
                <LevelStepper v-if="!fixed" :value="statValue('BODY')" :min="2" :max="8"
                    :can-increment="canIncrementStat('BODY')" @change="updateStat('BODY', $event)" />
                <span v-else class="text-center">{{ statValue('BODY') }}</span>
            </div>
        </TextField>
        <TextField title="EMP" :fixed="fixed" title-class="text-right text-sm" class="notch px-1 pb-3">
            <div class="flex items-center justify-center gap-2 text-xs">
                <span class="text-right">{{ modelValue.current_EMP }} of</span>
                <LevelStepper v-if="!fixed" :value="statValue('EMP')" :min="2" :max="8"
                    :can-increment="canIncrementStat('EMP')" @change="updateStat('EMP', $event)" />
                <span v-else class="text-center">{{ statValue('EMP') }}</span>
            </div>
        </TextField>

    </div>
</template>
