<template>
    <div id="app">
        <HeaderComponent />
        <div class="content" v-if="account">
            <PoolList />
        </div>
    </div>
</template>

<script>
import HeaderComponent from "@/components/Header/HeaderComponent.vue";
import auth from "./store/auth";
import PoolList from "@/components/Pools/PoolList.vue";

export default {
    name: "App",
    components: { HeaderComponent, PoolList },
    computed: {
        account() {
            return auth.state.account
        }
    },
};
</script>

<style>
body {
    margin: 0;
    /* background-color: #ffe5b4; */
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
}
.content{
    padding: 0 40px;
}
</style>
