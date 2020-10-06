
function verifyPhone(value) {
    if(!value) {
        return {
            error: true,
            msg: '手机号不能为空'
        };
    }
    if(!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
        return {
            error: true,
            msg: '手机号不合法'
        };
    }
    return {error: false};
};

function verifyLoginPassword(value) {
    if(!value){
        return {
            error: true,
            msg: '请输入密码'
        };
    }
    return {error: false};
};

function verifyRegisterPassword(value) {
    if(value.length == 0){
        return {
            error: true,
            msg: '请输入密码'
        };
    }
    //密码强度
    let level = 0;
    if(/\d/.test(value)) {
        level++;
    }
    if(/[a-zA-Z]/.test(value)){
        level++;
    }
    if(/[^0-9a-zA-Z_]/.test(value)) {
        level++;
    }
    if(value.length < 8) {
        level = 0;
    }
    if(level < 2) {
        return {
            error: true,
            msg: '密码强度较低，请重新设置'
        };
    }
    return {error: false};
};

function verifyEmail(value) {
    if(!value) {
        return {
            error: true,
            msg: '邮箱不能为空'
        };
    }
    if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        return {
            error: true,
            msg: '邮箱不合法'
        };
    }
    return {error: false};
};

export {
    verifyEmail,
    verifyRegisterPassword,
    verifyLoginPassword,
    verifyPhone
}