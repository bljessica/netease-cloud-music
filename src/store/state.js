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
    createTime: '',//用户创建时间
    playingSong: {},//正播放的歌曲
    playingList: [],//正播放的歌单
    playingTimer: null,  
    playingType: 0, //0列表循环，1随机播放，2单曲循环
    player: '',  //音乐播放器,(好像不需要)
    lyricNow: '', //现在的这一句歌词,
    lyrics: [], //当前歌的歌词(如果有翻译则包含翻译)
    currentTime: 0, //当前播放时间 小数
    duration: 0, //歌曲总时长 小数
    isPlaying: false, //当前是否在播放
    searchingWord: '', //搜索词
};

export default state;