var idElementButtonWord = 'getWord',
idElementtextArea = 'textForm',
idElementButtonClear = 'clearAll',
numberFilter=5;

var getWord = document.getElementById(idElementButtonWord),
clearAll = document.getElementById(idElementButtonClear),
elementArea = document.getElementById(idElementtextArea);

window.onload = function(){

  getWord.onclick = function(){
    var inputString = getString(idElementtextArea);
    var inputArray = getArrayInput(inputString);
    var inputFillterArray = filterOutput(inputArray,numberFilter);
    pasteWord(inputFillterArray[0],'bigData');
    pasteWord(inputFillterArray[1],'smallData');
    pasteCalc('calcValueBig','bigData',false);
    pasteCalc('calcValueSmall','smallData',false);
    var elementWord = document.getElementsByClassName('remove');
    for(var i=0;i<elementWord.length;i++){
      elementWord[i].onclick = function(){
        this.parentElement.remove();
        pasteCalc('calcValueBig','bigData',false);
        pasteCalc('calcValueSmall','smallData',false);
      }
    }
  }

  clearAll.onclick = function(){
    pasteCalc('calcValueBig','bigData',true);
    pasteCalc('calcValueSmall','smallData',true);
    elementArea.value='';
    clearBlock('bigData');
    clearBlock('smallData');
    elementArea.focus();
  }
}
function clearBlock (idElement){
  var elementChild = document.getElementById(idElement).children;
  for(var i=elementChild.length;i>0;i--){
    elementChild[i-1].remove();
  }
}
function pasteCalc (idElementPaste,idParentCalcElement,clearFlag){
  if(clearFlag==false){
    document.getElementById(idElementPaste).innerHTML=calcElement(idParentCalcElement);
  } else {
      document.getElementById(idElementPaste).innerHTML='0';
  }

}

function calcElement(idParentElement){
var countChild = document.getElementById(idParentElement).childNodes.length -1;
return countChild;

}

 function pasteWord(data,idElement){
  var element = document.getElementById(idElement);
    data.forEach(function(elem,j,data){
      element.innerHTML+='<div class="wrapperElement">'+'<div class="block">'+elem+'</div>'+'<div class="remove">X</div>'+'<div class="clear"></div>'+'</div>';
    });
 }


 function getString(idElement){
   var textOutput;
   textOutput=document.getElementById(idElement).value;
   return textOutput;
 }


 function getArrayInput(stringData){
   var outputArray = stringData.split(' ');
   outputArray.forEach(function(item,i,outputArray){
     if(item=='') outputArray.splice(i);
   });
   return outputArray;
 }

 function filterOutput (arrayData,numberSymbol){
   var smallData=[], bigData=[];
  arrayData.forEach(function(item,i,arrayData){
  if(item.length>numberSymbol){
    bigData.push(item);
  } else {
    smallData.push(item);
  }
});
return [bigData,smallData];
}
