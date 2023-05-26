let einpp = $("#newBill input");
let ezihou =$("#zihou")
function btadd(){
    //填入表格
    inserhtml(ezihou.children().length+1,einpp [0].value,einpp [1].value,einpp [2].value,einpp [3].value,einpp [2].value*einpp [3].value,einpp [4].value);
    //保存
    saveNewBill();
    loadNewBill()
    $("#newBill button").html("添加")
    einppdel();
    
}

//清空表格
function delBoxAll(){
    $(".contentBox").remove()
    saveNewBill();
    loadNewBill()
}

function einppdel(){
    // 清空输入框
    for (let i = 0; i < einpp.length; i++){
        einpp[i].value = '';
    }  
}

// function deleteBox(){
//     //点到哪一行删除哪一行
//     window.event.target.parentElement.parentElement.remove();
//     saveNewBill();
//     loadNewBill()
// }
function editBox(){
    //点到哪一行编辑哪一行
    let data = window.event.target.parentElement.parentElement.children;
    window.event.target.parentElement.parentElement.remove()
    // $('#newBill input:eq(0)')=data
    // console.log($("#newBill input:eq(0)").val());
    // console.log(data[1].innerHTML);
    $("#newBill input:eq(0)").val(data[1].innerHTML)
    $("#newBill input:eq(1)").val(data[2].innerHTML)
    $("#newBill input:eq(2)").val(data[3].innerHTML)
    $("#newBill input:eq(3)").val(data[4].innerHTML)
    $("#newBill input:eq(4)").val(data[6].innerHTML)
    $("#newBill button").html("完成")
    
    // data[1].innerHTML=einpp[0].value 不可行

}

//新表格框架
let inserhtml = function(order,name,danwei,price,num,sum,note){
    ezihou.append (  
    `
    <tr class='contentBox'>
        <td class='order'>${order}</td>
        <td class='goodsName'>${name}</td>
        <td class='danwei'>${danwei}</td>
        <td class='num'>${num}</td>
        <td class='price'>${price}</td>
        <td class='sum'>${sum}</td>
        <td class='note'>${note}</td>
        <td><a href="#newBill" data-rel="popup" onclick="editBox()">编辑</a></td>

    </tr>`
    )
}

//读取暂存列表至表格
let loadNewBill = function(){
    let oldsum = 0;
    let todoarr = load('newbill');/* 这里是从本地存储中读取todo成为数组 */
    $(".contentBox").remove()
    for (let index = 0; index < todoarr.length; index++) {    
        // name,danwei,price,num,sum
        inserhtml(index+1,todoarr[index].name,todoarr[index].danwei,todoarr[index].price,todoarr[index].num,todoarr[index].sum,todoarr[index].note);/* 这里是数组逐条插入标签 */
        oldsum += Number(todoarr[index].sum);
    
    // 如果这样，我们读取的时候，就不止一个参数了
    }
   $("#isum").html('￥:'+ oldsum);
   $("#iDaXie").html(changeNumMoneyToChinese(oldsum));
}

//保存函数
let save = function(json,key){
    localStorage[key] = JSON.stringify(json);
}

//读取函数
let load = function(key){
    //当本地存储有对应name的数据则返回数据
        if (JSON.parse(localStorage[key]))return JSON.parse(localStorage[key]);   
}

//表格至暂存列表
let saveNewBill = function(){
    let todoarr = [];/* 就把读到的写到这个数组中 */
    // 我们通过json把样式保存进来
    
    let todojs = {};/* 这个就是json */
    let econtent = document.querySelectorAll('.goodsName');/* 取得所有的content */
    let edanwe = document.querySelectorAll('.danwei');
    let ejiage = document.querySelectorAll('.price');
    let enumbe = document.querySelectorAll('.num');
    let esumon = document.querySelectorAll('.sum');
    let enote = document.querySelectorAll('.note');
    
    // 遍历所有的content
    let oldsum = 0 ;
    for (let index = 0; index < econtent.length; index++) {
    // todoarr.push(econtent[index].innerHTML);
    todojs.name=econtent[index].innerHTML;
    todojs.price= ejiage[index].innerHTML;
    todojs.num= enumbe[index].innerHTML;
    todojs.sum= esumon[index].innerHTML;
    todojs.danwei= edanwe[index].innerHTML;
    todojs.note= enote[index].innerHTML;
    oldsum += Number(todojs.sum);
  
    // 把json存到数组中
    todoarr.push(todojs);
    todojs = {};/* 加上这句，就能解决那个问题了 */
    }
    // $("#isum").html('￥:'+ oldsum);
    // $("#iDaXie").html(changeNumMoneyToChinese(oldsum))
    save(todoarr,'newbill');
    // 测试一下，我们读取保存的数据
    // console.log(localStorage.todos);
    }


//保存进数据库并清空暂存列表


//保存单子,并清空暂存列表
let saveBillList = function(data,customer,money,date){
    let saveBillList = load(saveBilllist)
    let bill={
        data:{data},
        customer:customer,
        money:money,
        date:date
    }
    saveBillList.push(bill)
    save(saveBillList,saveBilllist)
    save([],todoall)
}
loadNewBill()
    //以上方法是先改变table，再保存table
    //我先改变数据，再读取数；