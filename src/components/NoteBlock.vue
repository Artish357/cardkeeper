<template>
    <SheetCard class="note-container">
        <span class="note-title">{{ title }}</span>
        <div class="input-container">
            <input/>
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
}
</style>