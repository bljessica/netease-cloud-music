const state = {
    phone: '',
    email: '',
    username: '',
    userID: '',
    isLogin: false,
    avatarUrl: '',
    birthday: '',
    city: '',
    followeds: '',
    follows: '',
    gender: 0,
    nickname: '',
    province: '',
    token: '',
    playListCount: 0,
    backgroundUrl: '',
    level: 0,
    createdMenus: [],
    collectedMenus: [],
    playlist: [],//用户自己的全部歌单
    likelist: [],
    listenSongs: '',
    createTime: '',
    playingSong: {},
    playingList: {},//正播放的歌单
    playingTimer: null, 
    playingType: 2, //0列表循环，1随机播放，2单曲循环,
    player: '',  //音乐播放器,
    lyricNow: '', //现在的这一句歌词,
    lyrics: [],
    currentTime: '' //现在这首歌放到了第几秒
};

export default state;