<template>
    <div class="wrapper">
        <div class="network">
            <img v-if="chainId in networks" :src="networks[chainId].logo" />
            <div v-else class="unknown-network">unsupported network</div>
        </div>

        <div class="wallet-wrapper">
            <button v-if="!account" @click="connect()">Connect</button>
            <span v-else>{{ account.slice(0, 4) + ".." + account.slice(-4) }}</span>
        </div>
    </div>
</template>

<script>
import wallet from "@/store/auth";
import { networks } from "@/data/networks";

export default {
    data() {
        return {
            networks,
        };
    },
    computed: {
        account() {
            return wallet.state.account;
        },
        chainId() {
            return wallet.state.chainId;
        },
    },
    async mounted() {
        await this.connect();
    },
    methods: {
        async connect() {
            try {
                await wallet.connect();
                this.$notify.add("Кошелек добавлен");
            } catch (e) {
                console.log(123, e);
                this.$notify.add("Ошибка", e, null);
            }
        },
    },
};
</script>
<style scoped>
.wrapper {
    display: flex;
    align-items: center;
}
.network{
    margin-right: 10px;
    display: flex;
    align-self: center;
}
.unknown-network{
    color: red;
    padding: 5px;
    border: 1px solid red;
    border-radius: 15px;
}
img {
    height: 30px;
    width: auto;
}
button {
    background: none;
    border: none;
    text-align: center;
}
.wallet-wrapper {
    border-width: 1px;
    border-style: solid;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 15px;
    display: inline-flex;
    align-items: center;
}
.wallet-wrapper > span,
.wallet-wrapper > button {
    font-size: 18px;
}
.wallet-wrapper > button {
    cursor: pointer;
}
.status-wrapper > button {
    width: 20px;
    height: 20px;
    object-fit: cover;
    background-repeat: no-repeat;
}
.status-wrapper > .offline {
    background-image: url("/public/icons/offline.svg");
}
.status-wrapper > .online {
    background-image: url("/public/icons/online.svg");
}
</style>
