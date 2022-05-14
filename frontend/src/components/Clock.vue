<template>
  <canvas ref="canvas" :width="radius*2" :height="radius*2"
    @click.left="$emit('update:modelValue', modelValue+1)"
    @click.right.prevent="$emit('update:modelValue', modelValue-1)"
  />
</template>

<script>
export default {
  props: {
    modelValue: Number,
    maxSegments: Number
  },
  data(){
    return {
      radius: 22
    }
  },
  methods: {
    drawClock(){
      const canvas = this.$refs.canvas
      const radius = this.radius
      if (canvas.getContext){
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, radius*2, radius*2)
        for(let i = 0; i<this.maxSegments; i++){
          const startAngle = i*(Math.PI*2/this.maxSegments)
          const endAngle = (i+1)*(Math.PI*2/this.maxSegments)
          ctx.beginPath()
          ctx.moveTo(radius, radius)
          ctx.arc(radius, radius, radius-3, startAngle, endAngle)
          ctx.lineTo(radius, radius)
          ctx.fillStyle = "#555"
          if (i < this.modelValue){
            ctx.fill()
          }
          ctx.lineWidth = 1
          ctx.lineCap = 'round'
          ctx.stroke()
        }
      }
    }
  },
  mounted(){
    this.drawClock()
  },
  watch: {
    modelValue() {
      this.drawClock()
    },
    maxSegments() {
      this.drawClock()
    }
  }
}
</script>

<style>

</style>