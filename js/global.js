/**
 * Created with JetBrains WebStorm.
 * User: 90Arther
 * Date: 13-9-12
 * Time: 上午1:25
 * To change this template use File | Settings | File Templates.
 */
// 配置弹出层，传入id
var popID;

// 显示弹出层JS代码
function TGDialogS(popid) {

    if(document.getElementById('dialog1')!=null){
        if(	document.getElementById('dialog1').style.display == "block" ){
            document.getElementById('dialog1').style.display = "none"; //关闭
        }
    }

    popID = popid;
    document.getElementById(popID).style.display = "block"; //显示
}


// 关闭弹出层JS代码
function hideDialogS() {
    document.getElementById(popID).style.display = "none"; //关闭
}
