<template>
    <SheetCard class="note-container">
        <span class="note-title">{{ title }}</span>
        <div class="input-container">
            <div class="textareaElement" contenteditable></div>
        </div>
    </SheetCard>
</template>

<script>
import SheetCard from "@/components/SheetCard"
export default {
    setup() {
        
    },
    props: {
        title: String
    },
    components: {
        SheetCard
    }
}
</script>

<style scoped>
.input-container {
    display: flex;
}
input {
  flex: 1;
  height: 100px;
  margin-top: 0;
  margin-bottom: 0;
  text-anchor: start;
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