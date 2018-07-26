/*上午班 13组 16340301 赵俊祥*/
/*validator file*/

$(function () {
    $("form").submit(function () {
        var t_data = $(".userInfo > div > input").slice(0, 4)
        $("p").html('');

        var errorFlag = 0;
        if(!userNameJudger($(t_data[0]).val())){
            errorFlag = 1;
        }
        if(!userIdJudger($(t_data[1]).val())){
            errorFlag = 1;
        }
        if(!phoneNumJudger($(t_data[2]).val())){
            errorFlag = 1;
        }
        if(!emailJudger($(t_data[3]).val())){
            errorFlag = 1;
        }

        //有一个不合法则不提交表单
        if (errorFlag === 1) {
            return false;
        }
        return true;
    })
})

function userNameJudger(data) {
    var error = $(".userName").find(".invalid")
    if (data.length < 6 || data.length > 18) {
        error.html('用户名需要6~18位')
        return false;
    }
    var regex = /^[a-zA-Z]{1}[0-9_a-zA-Z]{5,17}$/
    if (!regex.test(data)) {
        error.html('用户名必须是字母、数字或下划线，以英文字母开头')
        return false;
    }
    return true;
}

function userIdJudger(data) {
    var error = $(".userId").find(".invalid")
    var regex = /[1-9]\d{7}/
    if (!regex.test(data)) {
        error.html("学号8位数字，不能以0开头")
        return false;
    }
    return true;
}

function phoneNumJudger(data) {
    var error = $(".phoneNum").find(".invalid")
    var regex = /[1-9]\d{10}/
    if (!regex.test(data)) {
        error.html("电话11位数字，不能以0开头")
        return false
    }
    return true
}

function emailJudger(data) {
    var error = $(".email").find(".invalid")
    var regex = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/
    if (!regex.test(data)) {
        error.html("邮箱格式不合法")
        return false
    }
    return true
}
