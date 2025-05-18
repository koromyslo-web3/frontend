<template>
    <div class="notifications">
        <div class="toast" v-for="n in notifications" :key="n.id">
            <strong>{{ n.header }}</strong>
            <p v-if="n.text">{{ n.text }}</p>
            <pre v-if="n.object">{{ formatted(n.object) }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notifications: [],
            counter: 0,
        };
    },
    methods: {
        addNotification(header, text = null, object = null) {
            const id = ++this.counter;
            const notification = {
                id,
                header,
                text,
                object,
            };

            this.notifications.unshift(notification);

            setTimeout(() => {
                this.notifications = this.notifications.filter((n) => n.id !== id);
            }, 5000);
        },
        formatted(obj) {
            return JSON.stringify(obj, null, 2);
        },
    },
};
</script>

<style scoped>
.notifications {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    display: flex;
    flex-direction: column-reverse;
    gap: 10px;
    z-index: 9999;
}

.toast {
    background: #333;
    color: white;
    padding: 10px 15px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    font-size: 14px;
}
.toast pre {
    background: rgba(255, 255, 255, 0.1);
    padding: 5px;
    border-radius: 4px;
    margin-top: 5px;
    overflow-x: auto;
}
</style>
