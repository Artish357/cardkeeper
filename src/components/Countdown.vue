<template>
    <div class="countdown-container card">
    <span class="note-title">Countdown</span>
    <table style="width: 100%;">
        <tr v-for="(value, key) in modelValue" :key="key">
            <td style="width: 0.1%; white-space: nowrap;">
                <div style="width: min-content;">
                    {{ capitalize(key) }}: 
                </div>
            </td>
            <td style="white-space:nowrap;">
                <n-input
                    :placeholder="`What happens during the ${key}?`"
                    type="textarea"
                    size="small"
                    :autosize="{minRows: 1}"
                    style="width:100%;box-sizing: border-box;"
                    :value="value"
                    @update:value="onCountdownInput(key, $event)"/>
            </td>
        </tr>
    </table>
    </div>
</template>

<script>
import { NInput } from "naive-ui";
export default {
    components: {
        NInput
    },
    props: {
        modelValue: Object
    },
    methods: {
        onCountdownInput(key, newValue){
            const copy = Object.assign({}, this.modelValue)
            copy[key] = newValue
            this.$emit('update:modelValue', copy)
        },
        capitalize (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
}
</script>

<style scoped>
.countdown-container {
    padding: 10px;
    width: 100%;
}
</style>