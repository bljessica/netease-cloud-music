<template>
    <div class="container">
        <div class="header">
            <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
            <span>排行榜</span>
        </div>
        <div class="lists-container">
            <ul class="lists menu">
                <li v-for="(item, index) in lists" :key="index" @click="$router.push({'name': 'playlist', params: {id: item.id}})">
                    <div class="img" :style="{backgroundImage: 'url(' + item.coverImgUrl + ')'}">
                        <span class="update-frequency">{{ item.updateFrequency }}</span>
                    </div>
                    <p class="name">{{ item.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getToplist } from '../../api/find';
export default {
    data() {
        return {
            lists: []
        }
    },
    mounted() {
        this.getToplist();
    },
    methods: {
        //获取排行榜所有榜单
        getToplist() {
            this.$emit('beforeLoad');
            let that = this;
            getToplist().then(res => {
                that.$emit('onLoad');
                console.log(res.data);
                that.lists = res.data.list;
            }).catch(err => {
                that.Message({
                    message: err,
                    type: 'warning',
                    duration: 2000
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../common/styles/playlists';
</style>

<style lang="scss" scoped>
    .container {
        .header {
            height: 70px;
            display: flex;
            padding: 0 15px;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
            i {
                font-size: 24px;
                font-weight: normal;
                padding-right: 20px;
            }
        }
        .lists-container {
            // margin-top: 20px;
            .lists {
                margin: 0 auto;
                width: 335px;
                padding: 0;
                height: auto;
                margin-bottom: 60px;
                li {
                    margin-bottom: 15px;
                    .img {
                        // position: relative;
                        .update-frequency {
                            width: 95px;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow: ellipsis;;
                            white-space: nowrap;
                            bottom: 5px;
                            left: 5px;
                            position: absolute;
                            color:white;
                        }
                    }
                    
                }
                li:nth-child(3n + 3) {
                    margin-right: 0;
                }
            }
        }
    }
</style>