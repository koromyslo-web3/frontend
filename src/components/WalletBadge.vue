<template>
    <div>
        <div v-if="!connected">
            <p>🔴 Не подключен</p>
            <button @click="connect()">Подключить</button>
        </div>
        <p v-else>
            🟢 {{ account }} <br />
            Chain ID: {{ chainId }}
        </p>

        <button @click="switchToBSC">🔁 Переключиться на BSC</button>
    </div>
</template>

<script>
import wallet from "@/store/wallet";

export default {
    computed: {
        account() {
            return wallet.state.account;
        },
        chainId() {
            return wallet.state.chainId;
        },
        connected() {
            return wallet.state.connected;
        },
    },
    async mounted() {
        await this.connect()
    },
    methods: {
        async switchToBSC() {
            try {
                await wallet.switchChain("0x38");
                this.$notify.add("Сеть изменена", "Теперь вы на BSC Mainnet");
            } catch (e) {
                this.$notify.add("Ошибка", null, e);
            }
        },
        async connect() {
            try {
                await wallet.connect();
                this.$notify.add("Кошелек добавлен");
            } catch (e) {
                this.$notify.add("Ошибка", null, e);
            }
        },
    },
};
</script>
