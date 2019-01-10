/*
 * Project: OWAN-WEB
 * Author: caiweiguo@youmi.net OR 90arther@gmail.com
 * Catalog:
 *          |- OU               全局对象
 *              // 公用接口
 *              |- dialogMes            弹窗消息
 *              |- openDiv              打开窗口
 *              |- closeDiv             关闭窗口
 *              |- getUrlParameter      获取URL参数
 *              |- setCookie            设置cookie
 *              |- getCookie            关闭cookie
 *              |- isValidMobile        手机号码是否有效
 *              |- stopWatch            倒计时表
 */
(function(window, undefined) {

    var ouwan = function() {};

    ouwan.prototype = {


        /*
         * =MODULES DIALOGMES
         * Parameters:
         * message      <String>
         * opt          <[Object]>选填参数
         *              localtion: 消息显示位置,top\middle\bottom(默认top)
         * callback     <Function>回调
         */
        dialogMes: function(message, opt, callback) {

            var data = {
                mes :   message ? message : '偶玩游戏中心',
                local:  opt && opt.localtion ? opt.localtion : 'top',
                cssBase: 'z-index: 9999; position: fixed; left: 0;' +
                    ' padding: 8px; width: 100%; border-radius: 10px;' +
                    ' text-align: center; opacity: 0.1;',
                cssTop: 'top: 100px;',
                cssMid: 'top: 50%;',
                cssBot: 'bottom: 100px;',
                cssInner: 'padding: 8px 15px; font-size: 12px; background: rgba(0, 0, 0, 0.9); color: #fff; border-radius: 15px;',
                timer: null
            }

            function createDialog() {

                var ele      = document.createElement('DIV'),
                    eleChild = document.createElement('SPAN');

                switch(data.local) {
                    case    'top':
                        ele.style.cssText += data.cssBase + data.cssTop;
                        break;

                    case    'middle':
                        ele.style.cssText += data.cssBase + data.cssMid;
                        break;

                    case    'bottom':
                        ele.style.cssText += data.cssBase + data.cssBot;
                        break;

                    default      :
                        ele.style.cssText += data.cssBase + data.cssTop;
                        break;
                }

                eleChild.style.cssText += data.cssInner;

                document.body.appendChild(ele);
                ele.appendChild(eleChild);

                return {
                    'ele':ele,
                    'eleChild': eleChild
                };

            }

            function start(){
                var dialog = createDialog();
                flash(dialog);
            }

            function flash(dialog) {

                dialog.eleChild.innerHTML = data.mes;

                data.timer = setInterval(function(){

                    //显示弹窗
                    if( parseFloat(dialog.ele.style.opacity) < 1){
                        dialog.ele.style.opacity = parseFloat(dialog.ele.style.opacity) + 0.04;
                    }

                    //隐藏弹窗
                    if( parseFloat(dialog.ele.style.opacity) >= 1){

                        clearInterval(data.timer);
                        data.timer = setInterval(function(){
                            dialog.ele.style.opacity = parseFloat(dialog.ele.style.opacity) - 0.03;

                            //删除弹窗
                            if( parseFloat(dialog.ele.style.opacity) <= 0) {
                                clearInterval(data.timer);
                                document.body.removeChild(dialog.ele);

                                // callback
                                if (callback && typeof(callback) === "function") {
                                    callback();
                                }

                            }

                        },50)
                    }
                }, 50);


            }

            start();

        },


        /*
         * =MODULES OPENDIV
         * Parameters:
         * btn      <String> 按钮
         * dialog   <String> 弹窗
         * opt      <[Object]>选填参数
         * callback <Function> 激活后回调的函数
         */
        openDiv: function(btn, dialog, opt, callback) {

            var b;

            if(document.querySelector(btn)) {
                b = document.querySelector(btn);
                return false;
            }

            b.addEventListener('click', function(){

                document.querySelector(dialog).style.display = 'block';

                // callback
                if (callback && typeof(callback) === "function") {
                    callback(btn, dialog);
                }

            }, false);

        },


        /*
         * =MODULES CLOSEDIV
         * Parameters:
         * btn      <String> 按钮
         * dialog   <String> 弹窗
         * opt      <[Object]>选填参数
         * callback <Function> 激活后回调的函数
         */
        closeDiv: function(btn, dialog, opt, callback) {

            var b;

            if(document.querySelector(btn)) {
                b = document.querySelector(btn);
            } else {
                return false;
            }

            b.addEventListener('click', function(){

                if(document.querySelector(dialog)) {
                    document.querySelector(dialog).style.display = 'none';
                } else {
                    return false;
                }

                // callback
                if (callback && typeof(callback) === "function") {
                    callback(btn, dialog);
                }

            }, false);

        },


        /*
         * =MODULES GETURLPARAMETER
         * Parameters:
         * key      <String> 字符串
         */
        getUrlParameter: function(key) {

            var search  = location.search,
                list    = {};

            if(search.indexOf("?") != -1) {
                strs = search.substr(1).split("&");
                for(var i = 0; i < strs.length; i++) {
                    list[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }

            if(key) {
                return list[key];
            }else {
                return list;
            }
        },


        /*
         * =MODULES SETCOOKIE
         * Parameters:
         * key          <String> 键
         * value        <String> 值
         * expiredays   <String> 有效期
         */
        setCookie: function(key, value, expiredays) {

            var exdate = new Date();

            exdate.setDate(exdate.getDate() + expiredays);

            document.cookie = key + "=" + escape(value) +
                ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
        },


        /*
         * =MODULES GETCOOKIE
         * Parameters:
         * key          <String> 键
         */
        getCookie: function(c_name) {

            if(document.cookie.length > 0) {

                c_start = document.cookie.indexOf(c_name + "=");

                if(c_start !== -1) {

                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);

                    if(c_end == -1) c_end = document.cookie.length;
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        },


        /*
         * =MODULES ISVALIDMOBILE
         * Parameters:
         * mobile       <Number> 键
         * callback     <Function>
         */
        isValidMobile: function(mobile, callback) {

            var test = new RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$", 'i');

            if(test.test(mobile)) {
                return true;
            } else {
                return false;
            }

        },


        /*
         * =MODULES STOPWATCH
         * Parameters:
         *      second  : <Number> 倒计时秒数
         *      control : <String> dom的ID值
         *      callback: <Function> 回调函数
         */
        stopWatch: function(second, control, opt, callback) {

            var data = {
                second  : (typeof second) === 'number' ? second : 0,
                control : document.querySelector(control) ? document.querySelector(control) : null,
                callback: (typeof callback) === "function" ? opt.callback : null,
                timer   : null
            }

            if(!data.control) { return false; }

            // 计时器
            function _timer() {

                data.timer = setInterval(function(){

                    data.control.text(data.second--)

                    if( data.second < 0) {
                        _killTimer();
                    }

                }, 1000)

            }


            // 立即干掉动画
            function _killTimer() {

                data.control.text('');

                // stopWatch
                clearInterval(data.timer);

                // callback
                if (data.callback && typeof(data.callback) === "function") {
                    data.callback();
                }
            }


            // 启动动画
            _timer();


            // 返回一些API
            return {
                kill : _killTimer
            }
        }


    };

    window.OUWAN = ouwan;

}(window));
