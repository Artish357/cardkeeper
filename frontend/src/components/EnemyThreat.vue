<template>
    <SheetCard>
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
    </SheetCard>
</template>
<script>
import ThreatBase from "@/components/ThreatBase"
import SheetCard from "@/components/SheetCard"

export default {
    components: {
        ThreatBase,
        SheetCard
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