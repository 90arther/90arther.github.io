/*
 * 飞机类=Plain
 */
function Plain(x, y, shootX, shootY, bitmapData, hp){

    base(this, LSprite, []);
    var self = this;

    //飞机出现位置
    self.x = x;
    self.y = y;

    //炮口相对飞机的相对位置
    self.shootX = shootX;
    self.shootY = shootY;

    //是否射击炮弹
    self.canshoot = false;

    //自动移动控制
    self.move = [0, 0];

    //飞机自动移动的移动速度
    self.speed = 1;

    //飞机生命值
    self.hp = hp;

    //飞机是否死亡
    self.isdie = false;

    //将飞机显示到画面上
    self.bitmap = new LBitmap(bitmapData);
    self.addChild(self.bitmap);
}


/*
 * 循环=onframe
 */
Plain.prototype.onframe = function(){
    var self = this;

    //移动
    self.x += self.move[0] * self.speed;
    self.y += self.move[1] * self.speed;

    //射击
    if(self.canshoot) self.shoot();

};


/*
 * 射击=shoot
 */
Plain.prototype.shoot = function(){};


/*
 * 我方飞机=Player
 */
function Player(x, y, shootX, shootY, bitmapData, hp){

    base(this, Plain, [x, y, shootX, shootY, bitmapData, hp]);
    var self = this;
    self.belong = "self";
    self.downX = self.downY = 0;

}


/*
 * 循环=onframe
 */
Player.prototype.onframe = function(){
    var self = this;
    self.callParent("onframe", arguments);
}


/*
 * Main
 */
//设定游戏速度、屏幕大小、回调函数
init(20, "mylegend", 800, 400, main);
/** 层变量*/
//显示进度条所用层
var loadingLayer;
//游戏层、飞机层
var gameLayer, plainLayer;
//图片path数组
var imgData = new Array(
    { name: "player", path:"./images/player.png"}
);
//读取完的图片数组
var imglist;
var player;
var mouseStartX, mouseStartY, mouseNowX, mouseNowY;
var MOVE_STEP = 5;
function main(){
    loadingLayer = new LoadingSample3();
    addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function(progress){
            loadingLayer.setProgress(progress);
        },
        gameInit
    );
}


function gameInit(result){
    imglist = result;
    removeChild(loadingLayer);
    loadingLayer = null;

    //游戏层初始化
    gameLayer = new LSprite();
    addChild(gameLayer);
    gameLayer.graphics.drawRect(1, "#000", [0, 0, 800, 400], true, "#000");
    plainLayer = new LSprite();
    gameLayer.addChild(plainLayer);
    var bitmapData = new LBitmapData(imglist["player"]);
    player = new Player(100, 150,
                       bitmapData.width, bitmapData.height * 0.5,
                       bitmapData, 30);
    plainLayer.addchild(player);

    gameLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    gameLayer.addEventListener(LMouseEvent.MOUSE_DOWN, ondown);
    gameLayer.addEventListener(LMouseEvent.MOUSE_MOVE, onmove);
    gameLayer.addEventListener(LMouseEvent.MOUSE_UP, onup);
}


/*
 * 循环
 */
function onframe(){
    var key;
    for(key in plainLayer.childList){
        plainLayer.childList[key].onframe();
    }

    if(!player.canshoot) return;
    if(player.x - player.downX > mouseNowX - mouseStartX){
        player.x -= MOVE_STEP;
        if(player.x - player.downX < mouseNowX - mouseStartX){
            player.x = mouseNowX - mouseStartX + player.downX;
        }
    }else if(player.x - player.downX < mouseNowX - mouseStartX){
        player.x += MOVE_STEP;
        if(player.x - player.downX > mouseNowX - mouseStartX){
            player.X = mouseNowX - mouseStartX + player.downX;
        }
    }
    if(player.y - player.downY > mouseNowY - mouseStartY){
        player.y -= MOVE_STEP;
        if(player.y - player.downY < mouseNowY - mouseStartY){
            player.y = mouseNowY - mouseStartY + player.downY;
        }
    }else if(player.y - player.downY < mouseNowY - mouseStartY){
        player.y += MOVE_STEP;
        if(player.y - player.downY > mouseNowY - mouseStartY){
            player.y = mouseNowY - mouseStartY + player.downY;
        }
    }

    if(player.x < 0){
        player.x = 0;
        setCoordinate(mouseNowX, mouseNowY);
    }else if(player.x + player.getWidth() > LGlobal.width){
        player.x = LGlobal.width - player.getWidth();
        setCoordinate(mouseNowX, mouseNowY);
    }

    if(player.y < 0){
        player.y = 0;
        setCoordinate(mouseNowX, mouseNowY);
    }else if(player.y + player.getHeight() > LGlobal.height){
        player.y = LGlobal.height - player.getHeight();
        setCoordinate(mouseNowX, mouseNowY);
    }
}

function ondown(event){
    player.canshoot = true;
    setCoordinate(event.offsetX, event.offsetY);
}

function setCoordinate(x, y ){
    mouseStartX = mouseNowX = x;
    mouseStartY = mouseNowY = y;
    player.downX = player.x;
    player.downY = player.y;
}

function onmove(event){
    if(!player.canshoot) return;
    mouseNowX = event.offsetX;
    mouseNowY = event.offsetY;
}

function onup(event){
    player.canshoot = false;
}
