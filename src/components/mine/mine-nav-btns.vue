<template>
    <div class="container">
        <ul class="nav-btns">
            <li v-for="item in navBtns" :key="item.id">
                <i class="iconfont" :class="item.icon"></i>
                <span class="name">{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { MINE_PAGE_NAV_BTNS } from '../../consts/const';

export default {
    data() {
        return {
            navBtns: MINE_PAGE_NAV_BTNS
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 0 15px;
    .nav-btns {
        padding: 10px 0;
        height: 140px;
        background: white;
        border-radius: 10px;
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        li {
            width: 25%;
            height: 70px;
            display: flex;
            flex-direction: column;
            text-align: center;
            i {
                font-size: 36px;
                color: rgba(255, 0, 0, 0.705);
            }
            .name {
                font-size: 12px;
            }
        }
    }
}
</style>