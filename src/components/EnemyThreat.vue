<template>
    <div class="border">
        <table>
            <ThreatBase />
            <tr>
                <td>
                    Powers:
                </td>
                <td>
                    <input />
                </td>
            </tr>
            <tr>
                <td>
                    Weaknesses:
                </td>
                <td>
                    <input />
                </td>
            </tr>
            <tr>
                <td>
                    Attacks:
                </td>
                <td>
                    <input />
                </td>
            </tr>
        </table>
        <input type="checkbox" v-for="i in harmCapacity" :key="i"/>
    </div>
</template>
<script>
import ThreatBase from "@/components/ThreatBase"
export default {
    components: {
        ThreatBase
    },
    data: () => ({
        harmCapacity: 8
    })
}
</script>
<style scoped>
table {
    padding: 5px;
    width: 100%;
}
</style>