<template>
<div>
    <div class="row">
        <span class="label">输入对话的用户id</span>
        <input type="text" v-model="id">
    </div>
    <div class="row">
        <span class="label">输入对话内容</span>
        <input type="text" v-model="value">
    </div>
    <div class="row center">
        <button @click="confirm">确定</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            value: ''
        };
    },

    beforeMount() {},

    mounted() {},

    methods: {
        confirm() {
            if (!this.id) return;
            if (!this.value) return;
            this.$store.getters.client.send(JSON.stringify({
                to: this.id,
                message: this.value
            }))
        }
    }

}
</script>

<style scoped>
.row {
    display: flex;
    align-items: center;
    margin: 5px;
}

.center {
    justify-content: center;
}

input {
    flex: 1;
    margin-left: 10px;
}

.label {
    text-align: right;
    width: 140px;
}
</style>
