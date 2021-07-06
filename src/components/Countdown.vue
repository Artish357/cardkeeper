<template>
    <table>
        <span class="note-title">Countdown</span>
        <tr v-for="stage in phases" :key="stage">
            <td>
                {{ stage }}:
            </td>
            <td>
                <input/>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    data: () => ({
        "phases": ['Day', 'Shadows', 'Sunset', 'Dusk', 'Nightfall', 'Midnight']
    })
}
</script>

<style scoped>
table {
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
}
</style>