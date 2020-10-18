<template>
    <div class="container">
        <!-- 个人信息 -->
        <div class="info-container" :style="{backgroundImage: 'url(' + backgroundUrl + ')'}">
            <div class="info-wrapper">
                <div class="nav">
                    <i class="iconfont icon-zuo" @click="$router.go(-1)"></i>
                    <i class="iconfont icon-fenxiang"></i>
                </div>
                <img :src="avatarUrl" alt="" class="avatar">
                <div class="info">
                    <div class="nickname">{{ nickname }}</div>
                    <div class="follow-info">
                        <span class="follows">关注 {{ follows }}</span>
                        <span class="followeds">粉丝 {{ followeds }}</span>
                    </div>
                    <div class="other-info">
                        <span class="gender">
                            <i class="iconfont" :class="{'icon-nv': gender == 2, 'icon-nan': gender === 1}"></i>
                            {{ birthYear }}后
                        </span>
                        <span class="level">
                            <i class="iconfont"></i>
                            Lv.{{ level }}
                        </span>
                        <span class="blank"></span>
                        <span class="edit">编辑</span>
                        <span class="change-background">更换背景</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 主页、动态 -->
        <info-tabs></info-tabs>
        <play-bar ref="bar" v-if="$store.getters.playingSong.id" @playingListShow="playingListShow = true" ></play-bar>
        <playing-list class="playing-list" v-show="playingListShow" @changeSong="changeSong"></playing-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import infoTabs from '../myInfo/info-tabs';
import playBar from '../common/play-bar';
import playingList from '../common/playing-list';


export default {
    data() {
        return {
            playingListShow: false,

        }
    },
    components: {
        infoTabs,
        playBar,
        playingList
    },
    mounted() {
        document.addEventListener('click', (e) => {
            let className = e.target.className;
            if(this.playingListShow == true && className != 'playing-list') {
                this.playingListShow = false;
            }
        })
    },
    computed: {
        ...mapGetters([
            'backgroundUrl',
            'follows',
            'followeds',
            'birthday',
            'level',
            'avatarUrl',
            'nickname',
            'gender'
        ]),
        birthYear() {
            let date = new Date(this.birthday);
            return Math.floor(date.getYear() / 10) + '' + (date.getYear() % 10 >= 5? '5': '0');
        }
    },
    methods: {
        changeSong() {
            this.$refs.bar.refresh();
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    background: white;
    .info-container {
        height: 320px;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .info-wrapper {
        height: 270px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
        .nav {
            display: flex;
            height: 40px;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            i {
                font-size: 24px;
                &:first-of-type {
                    font-size: 28px;
                }
            }
        }
        .avatar {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            margin-left: 20px;
        }
        .info {
            text-align: left;
            text-indent: 20px;
            height: 100px;
            .nickname {
                font-size: 18px;
                font-weight: bold;
                line-height: 36px;
            }
            .follow-info {
                font-size: 14px;
                color: gainsboro;
                .follows {
                    padding-right: 10px;
                    border-right: 1px solid gainsboro;
                }
                .followeds {
                    padding-left: 10px;
                }
            }
            .other-info {
                font-size: 12px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                height: 40px;
                &>span {
                    text-indent: 0;
                    padding: 0 10px;
                    background: rgba(201, 199, 199, 0.5);
                    border-radius: 10px;
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    i {
                        font-size: 10px;
                    }
                }
                .blank {
                    background: transparent;
                    flex-grow: 1;
                }
                .gender {
                    background: rgba(228, 113, 132, 0.7);
                }
                .level {
                    font-style: italic;
                    margin-left: 10px;
                    font-weight: bold;
                }
                .edit {
                    margin-right: 10px;
                }
                .edit, .change-background {
                    padding: 5px 10px;
                    border-radius: 20px;
                }
            }
        }
    }
}
</style>