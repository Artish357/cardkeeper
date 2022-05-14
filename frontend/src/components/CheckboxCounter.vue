<template>
  <div style="display: inline-block">
    <input type="checkbox" v-for="i in maxValue" :key="i" :checked="i <= modelValue" @input="onClick(i)" />
  </div>
</template>

<script>
export default {
  name: "CheckboxCounter",
  props: {
    modelValue: Number,
    maxValue: Number
  },
  methods: {
    onClick(val){
      const isChecked = val <= this.modelValue
      if (isChecked){
        this.$emit('update:modelValue', val-1)
      } else {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>

<style>

</style>