<template>
    <SheetCard class="note-container card">
        <span class="note-title">{{ title }}</span>
        <div class="input-container">
            <n-input
                type="textarea"
                :autosize="{minRows: 3}"
                style="width:100%;"
                :value=modelValue
                @update:value="$emit('update:modelValue', $event)"
            ></n-input>
        </div>
    </SheetCard>
</template>

<script>
import SheetCard from "@/components/SheetCard"
import { NInput } from "naive-ui";
export default {
    props: {
        title: String,
        modelValue: String
    },
    components: {
        SheetCard,
        NInput
    }
}
</script>

<style scoped>
.input-container {
    display: flex;
}
n-input {
  flex: 1;
  height: 100px;
  margin-top: 0;
  margin-bottom: 0;
  text-anchor: start;
  box-sizing: border-box;
}

.textareaElement {
  text-align: left;
  width: 100%;
  min-height: 60px;
  border: 2px solid #ccc;
  max-height: 1500px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>