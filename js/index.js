// 商品清單物件
var myBuyList ={};
myBuyList.name='To-By List';
myBuyList.time='20170607';
// 商品清單物件中的商品列表為一陣列，放入所有品項
myBuyList.list=[
  {name:'手機保護貼', price:'400'},
  {name:'金屬髮飾', price:'300'},
  {name:'海苔飯捲', price:'85'}
];

var listUrl = 'https://awiclass.monoame.com/api/command.php?type=get&name=itemdata'

$.ajax({
  url: listUrl,
  success: function(res){
    myBuyList.list=(JSON.parse(res));
    showList();
  }
});



// 定義HTML內容
var listHtml='<li class="buyItem" id="{{buyitem-num}}"><div class="name">{{name}}</div><div class="price">{{price}}</div><div id ="{{dltitem-num}}" class="dltBtn">X</div></li>';

var totalHtml='<li class="buyItem Total">Total<div class="price">{{totalPrice}}</div></li>';


// 重新整理myBuyList並加總
function showList(){
  // 先清除現有資料  
  $('#itemList').html('');
  
  var totalPrice = 0;
  for(var i=0;i<myBuyList.list.length;i++){
    var item= myBuyList.list[i];
    //列表內容
    var curentList=
      listHtml.replace('{{buyitem-num}}','buyItem-'+i)
              .replace('{{name}}',i+1+'.  '+item.name)
              .replace('{{price}}',item.price)
              .replace('{{dltitem-num}}',i)
    
    //加總內容
    totalPrice+= parseInt(item.price);
    $('#itemList').append(curentList)
    //點選id=i的dltBtn時，執行dltItem function
    $('#'+i).click(function(e){
      dltItem(e.target.id);
    });

  };
  //加上跑完迴圈後的HTML內容
  var curentTotal= 
      totalHtml.replace('{{totalPrice}}',totalPrice)
  $('#itemList').append(curentTotal)
};
showList();


    
// // 刪除資料function
function dltItem(num){
  myBuyList.list.splice(num,1);
  showList();
};



//新增資料function
function addItem(){
  //檢查欄位不可為空
  if ($('#itemName').val()==''){
    alert('請填寫項目名稱')
  }else if($('#itemPrice').val()==''){
    alert('請填寫價格')
  }else{
  //將資料push進myBuyList陣列
  myBuyList.list.push({
    name: $('#itemName').val() ,
    price: $('#itemPrice').val()
  })
  }
};

// 執行新增資料進To-Buy List
$('.addBtn').click(function(){
  addItem();
  //清除input欄位的內容
  $('#itemName').val('');
  $('#itemPrice').val('');
  showList();
});


// 按Enter新增
function EnterAdd(e){
  if( e.keyCode == 13 ){
    addItem();
    //清除input欄位的內容
    $('#itemName').val('');
    $('#itemPrice').val('');
    showList();
  }
};
// 當焦點在input欄位有鍵盤按鍵輸入時
$('input').keydown(function(e){
  EnterAdd(e);
  }
);