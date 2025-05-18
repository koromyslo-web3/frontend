<template>
    <div id="app">
        <WalletBadge />
    </div>
</template>

<script>
import WalletBadge from "@/components/WalletBadge";
export default {
    name: "App",
    components: { WalletBadge },
    data() {
        return {
            account: null,
        };
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 100px;
}
</style>
