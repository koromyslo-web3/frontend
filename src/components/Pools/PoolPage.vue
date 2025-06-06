<template>
    <div>
        <div class="back-btn-holder">
            <button @click="$emit('exit')">Back</button>
        </div>

    </div>
</template>
<script>
import pools from "@/api/pools";
import auth from "@/store/auth";
import { networks } from "@/data/networks";
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        chainId() {
            return auth.state.chainId
        },
        account() {
            return auth.state.account
        },
    },
    data() {
        return {
            networks,
            pool: null,
            allowance: null,
        };
    },
    async mounted() {
        this.pool = await pools.getPool(this.id);
        this.allowance = await pools.getAllowance(this.networks[this.chainId].id, this.id, this.account)
        
    },
};
</script>
<style scoped>
.back-btn-holder {
    display: block;
    width: 100%;
    text-align: left;
}
.back-btn-holder > button {
    background: none;
    padding: 5px;
    border-radius: 5px;
    width: 70px;
    font-size: 16px;
    border: 1px solid black;
    cursor: pointer;
}
</style>
