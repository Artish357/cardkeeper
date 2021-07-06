<template>
    <table class="border note-container">
        <ThreatBase />
        <tr>
            <td>
                Notes:
            </td>
            <td>
                <input />
            </td>
        </tr>
    </table>
</template>
<script>
import ThreatBase from "@/components/ThreatBase"
export default {
    components: {
        ThreatBase
    }
}
</script>

<style scoped>
.note-container {
    padding: 5px;
    width: 100%;
}
input {
    height: 100px;
}
</style>