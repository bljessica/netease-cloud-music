<template>
    <div class="container">
        <div class="wrapper">
            <div class="pic">
                <i class="iconfont icon-aixin"></i>
            </div>
            <div class="songs">
                <div class="name">我喜欢的音乐</div>
                <div class="num">
                    <i class="iconfont icon-check"></i>
                {{ total }}首，已下载{{ downLoadNum }}首
                </div>
            </div>
            
            <span class="btn">
                <i class="iconfont icon-B"></i>
                心动模式
            </span>
        </div>
    </div>
</template>

<script>
import { getLikeList } from '../../api/mine';

export default {
    data() {
        return {
            total: 0,
            downLoadNum: 0
        }
    },
    mounted() {
        this.getLikeList();
    },
    methods: {
        getLikeList() {
            let that = this;
            getLikeList({
                uid: that.$store.getters.userID
            }).then(res => {
                // console.log(res.data);
                that.total = res.data.ids.length;
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
    .container {
        padding: 0 15px;
        height: 115px;
        .wrapper {
            margin: 15px auto 0;
            height: 100px;
            background: white;
            border-radius: 10px;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pic {
                background: rgba(255, 0, 0, 0.199);
                border: 8px solid rgba(194, 134, 134, 0.397);
                border-radius: 5px;
                width: 36px;
                height: 36px;
                i {
                    color: rgba(255, 0, 0, 0.486);
                    font-size: 24px;
                    line-height: 36px;
                }
            }
            .songs {
                text-align: left;
                flex-grow: 1;
                padding: 0 10px;
                .num {
                    font-size: 12px;
                    color: #b8b6b6;
                    i {
                        color: rgba(10, 158, 243, 0.877);
                    }
                }
            }
            
            .btn {
                padding: 3px 10px;
                border-radius: 15px;
                border: 1px solid #c9c3c3;
                display: inline-block;
                font-size: 14px;
                i {
                    color: rgba(255, 0, 0, 0.507);
                }
            }
        }
    }
</style>