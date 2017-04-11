window.onload=function(){

    waterfall('main','box');

    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    
    window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div'); //添加 元素节点
                oBox.className='box';                   //添加 类名 name属性
                oParent.appendChild(oBox);              //添加 子节点
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src='images/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
}


function waterfall(parent,box){
    var oParent=document.getElementById(parent);// 父级对象
    var oBox=getClassObj(oParent,box);// 获取存储块框box的数组oBox
    var iBoxW=oBox[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iBoxW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    oParent.style.cssText='width:'+iBoxW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

    var boxHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<oBox.length;i++){//遍历数组oBox的每个块框元素
        var boxH=oBox[i].offsetHeight;
        if(i<num){
            boxHArr[i]=boxH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH=Math.min.apply(null,boxHArr);//数组pinHArr中的最小值minH
            var minHIndex=getminHIndex(boxHArr,minH);
            oBox[i].style.position='absolute';//设置绝对位移
            oBox[i].style.top=minH+'px';
            oBox[i].style.left=oBox[minHIndex].offsetLeft+'px';
            //数组 最小高元素的高 + 添加上的oBox[i]块框高
            boxHArr[minHIndex]+=oBox[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var arr=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            arr.push(obj[i]);
        }
    };
    return arr;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}


function checkscrollside(){
    var oParent=document.getElementById('main');
    var oBox=getClassObj(oParent,'box');
    var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastBoxH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}