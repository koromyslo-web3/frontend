<template>
    <div>
        <div class="pool-list" v-if="!selectedId">
            <div class="pool-row" v-for="pool in pools" :key="pool.id" @click="selectedId = pool.id">
                <PoolRow :pool="pool" />
            </div>
            <div class="pool-row add">
                <input :autofocus="true" placeholder="Enter pool contract" v-model="newPoolAddress" />
                <button @click="addNewPool()">Add</button>
            </div>
        </div>
        <PoolPage :id="selectedId" v-else @exit="selectedId=null"/>
    </div>
</template>
<script>
import wallet from "@/store/auth";
import poolsApi from "@/api/pools";
import PoolRow from "./PoolRow.vue";
import PoolPage from "./PoolPage.vue";
import { networks } from "@/data/networks";
export default {
    data() {
        return {
            wallet,
            pools: [],
            newPoolAddress: null,
            selectedId: null,
        };
    },
    components: { PoolRow, PoolPage },
    computed: {
        account() {
            return wallet.state.account;
        },
        chainId() {
            return wallet.state.chainId;
        },
    },
    async mounted() {
        this.pools = await poolsApi.getMyPools();
    },
    methods: {
        async addNewPool() {
            await poolsApi.addPool(networks[this.chainId].id, this.newPoolAddress);
            this.pools = await poolsApi.getMyPools();
            this.newPoolAddress = null;
        },
    },
};
</script>
<style scoped>
.pool-list {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}
.pool-row {
    width: 300px;
    display: flex;
    justify-content: center;
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    min-height: 60px;
}
.pool-row.add {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
}
.pool-row.add > input {
    font-size: 16px;
    width: auto;
    max-width: none;
    border: none;
    padding: 5px;
    border-bottom: 1px solid black;
    width: 100%;
    margin-right: 15px;
}
.pool-row.add > button {
    background: none;
    padding: 5px;
    border-radius: 5px;
    width: 70px;
    font-size: 16px;
    border: 1px solid black;
    cursor: pointer;
}
</style>
