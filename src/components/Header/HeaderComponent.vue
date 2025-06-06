<template>
    <div class="header">
        <div class="logo-container">
            <img src="/img/logo.png" />
            <span>Koromyslo</span>
        </div>
        <div>
            <WalletBadge />
        </div>
    </div>
</template>
<script>
import WalletBadge from "./WalletBadge.vue";
export default {
    components: { WalletBadge },
};
</script>
<style scoped>
img {
    height: 80px;
    width: 80px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid grey;
    margin-bottom: 20px;
}
.logo-container {
    gap: 20px;
    display: flex;
    font-size: 32px;
    align-items: center;
    font-weight: 400;
    user-select: none;
}
</style>
