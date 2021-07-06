<template>
    <div class="border note-container">
        <span class="note-title">{{ title }}</span>
        <div class="input-container">
            <input/>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
    props: {
        title: String
    }
}
</script>

<style scoped>
.note-container {
    padding: 10px;
}
.input-container {
    display: flex;
}
input {
  flex: 1;
  height: 100px;
}
</style>