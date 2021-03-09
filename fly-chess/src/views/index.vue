<template>
<div class="box">
    <canvas id="canvas"></canvas>
</div>
</template>

<script>
import bus from "../common/bus";
export default {
    data() {
        return {
            ctx: null
        };
    },

    beforeMount() {
        bus.$on('onmessage', res => {
            res
        })
    },

    mounted() {
        this.initCanvas()
        // 当调整窗口大小时重绘canvas
        window.onresize = () => {
            this.initCanvas()
        }
    },

    methods: {
        initCanvas() {
            console.log("初始化canvas")
            let canvas = document.getElementById('canvas');
            this.ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            this.drawSmile()
        },
        drawSmile() {
            // this.ctx.beginPath();
            this.ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
            /* this.ctx.moveTo(110, 75);
            this.ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
            this.ctx.moveTo(65, 65);
            this.ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
            this.ctx.moveTo(95, 65);
            this.ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼 */
            this.ctx.stroke();
        },
        confirm() {
            if (!this.name) return;
            this.$store.getters.client.send(JSON.stringify({
                type: 'create',
                name: this.name
            }))
        }
    }

}
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: rgb(113, 199, 180);
}
</style>
