const state = {
    phone: '',
    email: '',
    username: '',
    userID: '',
    isLogin: false,
    avatarUrl: '',
    birthday: '',
    city: '',
    followeds: 0,
    follows: 0,
    gender: 0,
    nickname: '',
    province: '',
    token: '',
    playListCount: 0,
    backgroundUrl: '',
    level: '',
    createdMenus: [],
    collectedMenus: [],
    playlist: [],//用户自己的全部歌单
    likelist: [],
    listenSongs: '',
    createTime: '',
    playingSong: {},
    playingList: {},//正播放的歌单
    playingTimer: null,
    playingType: 0, //0列表循环，随机播放，2单曲循环,
    player: ''  //音乐播放器
};

export default state;