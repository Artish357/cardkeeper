<template>
  <n-input
    size="small"
    class="threat-input"
    :placeholder="placeholder"
    type="textarea"
    :autosize="{ minRows: 1 }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event)"
  >
    <template v-if="prefix" #prefix>
      <img :src="prefix" style="height:32px; margin: 2px"/>
    </template>
    <template v-if="suffix" #suffix>
      <img :src='suffix' style="height:32px; margin: 2px"/>
    </template>
  </n-input>
</template>

<script>
import { NInput } from "naive-ui";
export default {
  components: {
    NInput
  },
  props: ["modelValue", "placeholder", 'prefix', "suffix"],
};
</script>

<style>
</style>