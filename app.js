(function(){
'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyCtrl = this;

  toBuyCtrl.items = ShoppingListCheckOffService.getBuyItems();

  toBuyCtrl.removeItem = function(index){
    try{
      ShoppingListCheckOffService.removeItem(index);
    }catch(error){
      toBuyCtrl.errorMessage = error.message;
    }

  };
}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtCtrl = this;
  //try{
    boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
  //}catch(error){
  //  boughtCtrl.errorMessage = error.message;
  //}

  //boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(){

  var service = this;

  var toBuyItems = [
    {
    name:"Banana",
    quantity:10
  },{
    name:"Orange",
    quantity:11
  },{
    name:"Apple",
    quantity:13
  },{
    name:"Grapes",
    quantity:15
  },{
    name:"Cucumber",
    quantity:14
  }];

  var boughtItems = [];

  service.getBuyItems = function(){
    return toBuyItems;
  };

  service.removeItem = function(itemIndex){
    boughtItems.push(toBuyItems[itemIndex]);
    console.log(boughtItems);
    toBuyItems.splice(itemIndex,1);

    if(toBuyItems.length === 0){
      throw new Error("Everything is bought!");
    }
  };

  service.getBoughtItems = function(){
  //  if(boughtItems.length === 0){
  //    throw new Error("Nothing Bought Yet");
  //  }else{
        return boughtItems;
  //  }
  };
}

})();
