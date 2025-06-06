<template>
    <div class="pool-content">
        <div class="symbols">{{ pool.token0_symbol }}/{{ pool.token1_symbol }}</div>
        <div class="pool-info">
            <div class="pool-contract">{{ shortener(pool.contract) }}</div>
            <div class="pool-fee">{{ pool.fee * 100 }}%</div>
        </div>
    </div>
</template>
<script>
import { shortener } from "@/utils";
export default {
    props: {
        pool: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            shortener,
        };
    },
};
</script>
<style scoped>
.pool-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.symbols{
    font-size: 22px;
}
.pool-info{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 5px;
}
.pool-contract{
    font-size: 18px;
}
.pool-fee{
    padding: 3px 5px;
    background-color: rgb(217, 217, 217);
    display: inline-block;
    border-radius: 10px;
    font-size: 12px;
}
</style>
