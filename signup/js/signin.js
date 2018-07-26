/*上午班 13组 16340301 赵俊祥*/
/*server file*/

var http = require('http');
var url = require('url');
var qs = require('querystring')
var fs = require('fs')

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url);
    console.log("url_parts.pathname is :" + url_parts.pathname)
    console.log('the request Method is :' + req.method)

    if (req.method === "POST") {
        console.log("begin to get the post body --- register info");
        var str = '';

        req.on('data', function (chunk) {
            str += chunk;
        });

        req.on('end', function () {
            var regitser_info = qs.parse(str);
            display_feedback(req, res, regitser_info);
        });
    } else {
        var search_username = qs.parse(url_parts.query).username;

        switch (url_parts.pathname) {
            case '/':
                if (req.method == 'POST') {
                    console.log("begin to register....")
                    req.on('data', function (chunk) {
                        fullbody += chunk;
                    });

                    req.on('end', function () {
                        var regitser_info = qs.parse(fullbody);
                        display_feedback(req, res, regitser_info);
                    });
                } else {
                    if (search_username) {
                        // 显示用户详情界面
                        display_info(req, res, search_username);
                    } else {
                        // 显示用户注册界面
                        display_signup('../html/signup.html', req, res);
                    }
                }
                break;
            //传送文件
            case '/css/info.css':
                sendCssFile('../css/info.css');
                break;
            case '/css/signup.css':
                sendCssFile('../css/signup.css');
                break;
            case '/js/validator.js':
                sendJsFile('./validator.js');
                break;
            case '/css/background.jpg':
                sendPic('../css/background.jpg');
                break;
            default:
                display_404(url_parts.pathname, req, res);
                break;
        }
    }

    //以下为各个函数的实现

    //返回注册反馈，在里面进行数据重复检测，然后分有两种可能
    function display_feedback(req, res, user_info) {
        console.log('enter the display_feedback function')
        var members_info = require('../data/data.json');
        var len = members_info["members"].length;

        for (var i = 0; i < len; ++i) {
            if (user_info.userName == members_info['members'][i]['userName']) {
                conflict_info = 'userName:' + user_info.userName;
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.userId == members_info['members'][i]['userId']) {
                conflict_info = 'userId: ' + user_info.userId;
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.phoneNum == members_info['members'][i]['phoneNum']) {
                conflict_info = 'phoneNum: ' + user_info.phoneNum;
                display_conflict(req, res, conflict_info);
                return;
            }
            if (user_info.email == members_info['members'][i]['email']) {
                conflict_info = 'email: ' + user_info.email;
                display_conflict(req, res, conflict_info);
                return;
            }
        }

        // 通过检测
        console.log('register successfully');
        var register_info = {};
        register_info["userName"] = user_info.userName;
        register_info["userId"] = user_info.userId;
        register_info['phoneNum'] = user_info.phoneNum;
        register_info['email'] = user_info.email;

        members_info.members.push(register_info);
        //文件写入
        fs.writeFileSync('../data/data.json', JSON.stringify(members_info), 'utf8');
        console.log('add the new user info successfully')
        display_info(req, res, user_info.userName);
    }

    //在这里展示用户信息，如果数据库中没有这个用户名，则返回signup.html
    function display_info(req, res, search_username) {
        var members_info = require('../data/data.json');
        var len = members_info["members"].length;

        for (var i = 0; i < len; ++i) {
            if (search_username == members_info['members'][i]['userName']) {
                console.log(members_info['members'][i])

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                var data = fs.readFileSync('../html/info.html');
                var html = data.toString();

                html = html.replace("{\$(userName)}", members_info['members'][i]['userName'])
                html = html.replace("{\$(userId)}", members_info['members'][i]['userId'])
                html = html.replace("{\$(phoneNum)}", members_info['members'][i]['phoneNum'])
                html = html.replace("{\$(email)}", members_info['members'][i]['email'])

                // console.log(html)
                res.end(html);
                console.log('------------leave info() with successful request---------------')
                return;
            }
        }
        console.log("'------------leave info(), no such a user, response with the sign up page---------------'")
        display_signup('../html/signup.html', req, res);
        return;
    }

    //显示注册界面
    function display_signup(url, req, res) {
        console.log('enter the display_signup function');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        var html = fs.readFileSync(url);

        res.end(html);
        console.log('-----------------end display_signup()--------------------')
    }

    // 从模板 signin.html 里面填充冲突信息然后返回
    function display_conflict(req, res, conflict_info) {
        console.log('enter the display_conflict function')
        var data = fs.readFileSync('../html/signup.html');
        var html = data.toString();
        html = html.replace("<p class=\"conflictInfo\"></p>", "<p class=\"conflictInfo\"> 以下信息已被注册 :" + conflict_info + "</p>");

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html);
        console.log('-----------------------leave the display_conflict()---------------------------')
    }

    function display_404(url, req, res) {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.write("<h1 > 404 Not Found < /h1>");
        res.end("The page you were looking for: " + url + " can not be found ");
        console.log("-----------------404 error occurs--------------------")
    }
    
    //文件传送函数实现
    function sendCssFile(url) {
        var css = fs.readFileSync(url);;
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        res.end(css);
        console.log("-----------------send the css file successfully------------------")
    }

    function sendJsFile(url) {
        var js = fs.readFileSync(url);
        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        });
        res.end(js);
        console.log("-----------------send the js file successfully------------------")
    }

    function sendPic(url) {
        var pic = fs.readFileSync(url);
        res.writeHead(200, {
            'Content-Type': 'image/jpg'    //传送图片，这操作不知道规不规范
        });
        res.end(pic);
        console.log("-----------------send the picture successfully------------------")
    }

}).listen(8000);

console.log("server is listening on 8000");
