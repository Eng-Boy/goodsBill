let nowDate =new Date();
// console.log(nowDate.getFullYear()+'年'+(nowDate.getMonth()+1)+'月'+nowDate.getDate()+'日');
let titleDate = nowDate.getFullYear()+'年'+(nowDate.getMonth()+1)+'月'+nowDate.getDate()+'日'
let customer = '顾客名称：'
let titleKey = '0000001'


function canvasMoney(money){
    money = money.toString(); //转换为字符串
    //如果没有小数  
    if (money.indexOf(".") == -1) {
        //如果整数是零
        if(money=='0'){
            IntegerNum = '￥'
        }
        else{
            IntegerNum = '￥'+money;
        }
        DecimalNum = '--';
    } else {
        parts = money.split(".");
        //如果整数是零
        if(parts[0]=='0'){
            IntegerNum = '￥'
        }
         else{
            IntegerNum = '￥'+parts[0];
        }
        DecimalNum = parts[1].substr(0, 2);
        //如果只有一位小数
        if (DecimalNum.length==1){
            DecimalNum += '-'
        }   
    }
    
return IntegerNum+DecimalNum
}

function upTable(ctx,headerHeight){
    ctx.lineWidth = 2;
    ctx.moveTo(1070 ,headerHeight)
    ctx.lineTo(1070 ,headerHeight+50)
    ctx.moveTo(100,headerHeight)
    ctx.lineTo(100,headerHeight+50)
    ctx.moveTo(410,headerHeight)
    ctx.lineTo(410,headerHeight+50)
    ctx.moveTo(470,headerHeight)
    ctx.lineTo(470,headerHeight+50)
    ctx.moveTo(600,headerHeight)
    ctx.lineTo(600,headerHeight+50)
    ctx.moveTo(700,headerHeight)
    ctx.lineTo(700,headerHeight+50)
    ctx.moveTo(950,headerHeight)
    ctx.lineTo(950,headerHeight+50)
    ctx.moveTo(100,headerHeight+50)
    ctx.lineTo(1070,headerHeight+50)
    ctx.lineTo(1070,headerHeight)
    ctx.stroke()
}

function draw(){
    //读取数据
    let todoarr = load('newbill');
    let sum = {a:0,b:''};
    // ccs中canvas的高
    let canvasHeight = 175+todoarr.length*25;

    let canvas = document.getElementById('tutorial');
    if (!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    let headerHeight = 160;
    // 实际canvas的高宽不能改 只能让css适应浏览器宽高
    canvas.height = 2*canvasHeight;
    canvas.style.height = window.innerWidth/600*canvasHeight+'px';//为什么不加px会有诡异的现象
    canvas.style.width = window.innerWidth+'px'; 

    ctx.fillStyle = "rgba(255, 255, 255, 1)";    
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "black";
   
    //先画个表头
    ctx.textBaseline = 'top';
    ctx.textAlign = 'start' ;
    ctx.font = "48px sans-serif "
    ctx.fillText('收 款 收 据',460,48)
    //双下划线
    ctx.moveTo(430,100)
    ctx.lineTo(730,100)
    ctx.moveTo(430,105)
    ctx.lineTo(730,105)
    ctx.lineWidth = 2;
    ctx.stroke()
    //客户名称、日期
    ctx.font = "28px sans-serif "
    ctx.fillText(customer,100,130)
    ctx.fillText(titleDate,840,130)

    //key 票据档号
    ctx.font = "32px sans-serif "
    ctx.fillText(titleKey,920,76)
    ctx.font = "38px sans-serif "
    ctx.fillStyle = "red";
    ctx.fillText('NO',850,70)

    ctx.fillStyle = "black";
    // 手画表头
    upTable(ctx,headerHeight)
    ctx.lineTo(100,headerHeight)
    
    //金额中分线
    ctx.moveTo(700,headerHeight+25)
    ctx.lineTo(950,headerHeight+25)

    
    ctx.font = "20px sans-serif "
    chinaMoney=['千','百','十','万','千','百','十','元','角','分']
    ctx.fillText('金',778,headerHeight+5)
    ctx.fillText('额',853,headerHeight+5)
    for(i=0;i<10;i++){
        ctx.moveTo(725+i*25,headerHeight+25)
        ctx.lineTo(725+i*25,headerHeight+50)
        ctx.fillText(chinaMoney[i],703+i*25,headerHeight+30)


    }
    ctx.moveTo(700,headerHeight+50)
    ctx.lineTo(950,headerHeight+50)

    ctx.stroke()
   
    //表头内容
    tableContentHeight=15+headerHeight;
    ctx.font = "29px sans-serif"
    ctx.fillText('品名及规格',170,tableContentHeight)
    ctx.fillText('单位',410,tableContentHeight)
    ctx.fillText('数量',500,tableContentHeight)
    ctx.fillText('单价',625,tableContentHeight)
    ctx.fillText('备注',980 ,tableContentHeight)



        // 这个是选项表头背景
        // ctx.fillStyle = "rgba(100, 0, 50, 0.1)";    
        // ctx.fillRect(0,headerHeight,1200,50 )

     

        for (i=0;i<todoarr.length;i++){ 
        ctx.fillStyle = "black";
        ctx.font = "23px sans-serif";
        upTable(ctx,headerHeight+i*50+50)
        ctx.fillText(todoarr[i].name,105,tableContentHeight+i*50+50 )
        ctx.textAlign ='center';
        ctx.fillText(todoarr[i].danwei,440,tableContentHeight+i*50+50 )
        ctx.fillText(todoarr[i].num,530,tableContentHeight+i*50+50)
        ctx.fillText(todoarr[i].price,650,tableContentHeight+i*50+50)
        ctx.fillText(todoarr[i].note,990,tableContentHeight+i*50+50)
        ctx.font = "20px sans-serif ";
        ctx.textAlign ='start';

        sum.a+=Number(todoarr[i].sum)
        let tableMoney = canvasMoney(todoarr[i].sum);
        for(j=0;j<10;j++){
                ctx.moveTo(725+j*25,headerHeight+i*50+50)
                ctx.lineTo(725+j*25,headerHeight+i*50+100)
                // ctx.fillText('8',705+j*25,tableContentHeight+i*50+50)
           }
        let a =tableMoney.length
        for(j=0;j<a;j++){
            //倒序插入数字
            ctx.fillText(tableMoney[a-j-1],930-j*25,tableContentHeight+i*50+50)
            }

        }
   sum.b=changeNumMoneyToChinese(sum.a);

    //封底
    ctx.moveTo(100,headerHeight+(todoarr.length)*50+50)
    ctx.lineTo(100,headerHeight+(todoarr.length)*50+100)
    ctx.lineTo(1070,headerHeight+(todoarr.length)*50+100)
    ctx.lineTo(1070,headerHeight+(todoarr.length)*50+50)
    ctx.stroke()
    ctx.font = "29px sans-serif "
    ctx.fillText('估计金额（大写）',110,headerHeight+(todoarr.length)*50+65)
    ctx.fillText(sum.b,360,headerHeight+(todoarr.length)*50+65)
    ctx.fillText('￥'+sum.a,870,headerHeight+(todoarr.length)*50+65)

    ctx.fillText('单位盖章',100,headerHeight+(todoarr.length)*50+110)
    ctx.fillText('收款人',500,headerHeight+(todoarr.length)*50+110)
    ctx.fillText('开票人 谢',780,headerHeight+(todoarr.length)*50+110)

}
function drawOrBack(){
    
    if ($("#btCanvas").text()=="开票") {
        $("#btCanvas").text("返回")
        $("#billTable").css("display","none")
        $("#billTable").after(' <canvas id="tutorial" width="1200px" height="600px" style=" width: 600px; height: 300px;  " >暂不支持</canvas>');
        draw()
        $("#tutorial").after('<a href="#bill"  class="ui-btn" id = "screenshot" onclick = "saveCanvas() ">保存</a>')
       
    } else  {
        $("#btCanvas").text("开票")
        $("#billTable").css("display","block")
        $("#tutorial").remove()
        $("#screenshot").remove()
        
    }
    //canvas 一旦display=none，就无法恢复了吗？
}

// 保存单据
const saveBlob = (blob, fileName) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
};
function saveCanvas(){
    const canvas = document.querySelector('#tutorial');
    canvas.toBlob((blob) => {
        saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
    });
};