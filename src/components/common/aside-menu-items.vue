<template>
    <div class="items-container">
        <ul class="wrapper">
            <li v-for="(item, index) in items" :key="index">
                <i class="iconfont icon" :class="item.icon"></i>
                <span class="name">{{ item.name }}</span>
                <span class="other">{{ item.other }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            defautl: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        list-style-type: none;
        li {
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 50px;
            text-align: left;
            padding: 0 25px;
            .icon {
                margin-right: 15px;
            }
            .name {
                flex-grow: 1;
            }
            .other {
                font-size: 12px;
                color: rgba(128, 128, 128, 0.712);
            }
        }
    }
</style>