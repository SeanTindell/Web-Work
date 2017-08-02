 var $ =jQuery;
var solved = false,
puzzle,
checkNum = false,
currentSquare = 0;


// puzzle = [
//     5,3,'','',7,'','','','',
//     6,'','',1,9,5,'','','',
//     '',9,8,'','','','',6,'',
//     8,'','','',6,'','','',3,
//     4,'','',8,'',3,'','',1,
//     7,'','','',2,'','','',6,
//     '',6,'','','','',2,8,'',
//     '','','',4,1,9,'','',5,
//     '','','','',8,'','',7,9
// ]
puzzle = [
    '',2,'',9,7,3,'',5,'',
    '','','',2,1,8,'','','',
    '','',3,6,4,'','','','',
    '','',2,8,3,9,4,'','',
    '',4,6,5,2,7,8,'',1,
    '',5,'','',6,4,2,'',7,
    '','','','','','','','','',
    7,9,1,4,'','','','','',
    '','',5,'',8,6,'','',''
]

var workingPuzzle=[];

var Square = function( position ){
    this.postition = position;
    this.numLeft = [];
    this.currentNum = 1;
    this.locked = false;
    this.currentNumPos=0;
}


console.log(puzzle.length);


function loadPuzzle(puz){
   var workingSquare;
    for(var i = 0; i <puz.length; i++ ){
          workingSquare = new Square(i);
          if(puz[i]!=''){
            workingSquare.numLeft=[];
            workingSquare.currentNum = puz[i];
            workingSquare.locked = true;
          } else {
            workingSquare.numLeft=[1,2,3,4,5,6,7,8,9];
            workingSquare.currentNum = 0;
            workingSquare.currentNumPos =0;
            workingSquare.locked = false;
          }
          workingPuzzle.push(workingSquare);
    }
}

loadPuzzle(puzzle);
console.log(workingPuzzle)
console.log(checkRow(workingPuzzle));
console.log(checkCol(workingPuzzle));
console.log(checkSmallSquare(workingPuzzle));


while(!solved){
    while(!checkNum){
        
    
        
        checkNum =true;
        
    }
    
    
    
    
    solved = true;
}

function loadNum(pos){
    workingPuzzle[pos].currentNum =  workingPuzzle[pos].numLeft[workingPuzzle[pos].currentNumPos];
}
function checkNewNum(puz){
    // checkRow(puz);
    checkCol(puz);
    checkSmallSquare(puz);
}

function checkRow(puz){
    
    //loads into a managable array
    var rowA =[], rowB =[], rowC = [];
    for(var i = 0; i < puz.length; i++){
        if(i%9 == 0 && i != 0){
            rowB.push(rowA)
            rowA = [];
            rowA.push(puz[i].currentNum);
        } else {
            rowA.push(puz[i].currentNum);
        }
    }
    rowB.push(rowA);
    
    //Checks the row
    for(var i = 0; i <rowB.length; i++){
        rowC = rowB[i].sort();
        for(var j = 0; j <rowB[i].length-1; j++){
            if( rowC[j] == rowC[j+1] && rowC[j] != 0){
                return false;
            }
        }
    }
    
    //only fires if true
    return true;
}
function checkCol(puz){
        
    //loads into a managable array
    var rowA =[], rowB =[], rowC = [];
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < puz.length; j+=9){
            rowA.push(puz[j+i].currentNum);
        }
        rowB.push(rowA);
        rowA =[];
   
    }
    //Checks the column
    for(var i = 0; i <rowB.length; i++){
        rowC = rowB[i].sort();
        for(var j = 0; j <rowB[i].length-1; j++){
            if( rowC[j] == rowC[j+1] && rowC[j] != 0){
                return false;
            }
        }
    }
    //only fires if true
    return true;
    
}
function checkSmallSquare(puz){
     var rowA =[], rowB =[], rowC = [];
     
     for( var k = 0; k < 54; k += 6 ){
         
         for(var i = 0; i <= 18; i+=9){
            for(var j = 0; j < 3; j++){
                rowA.push(puz[j+i+k].currentNum);
                console.log(j+i+k)
                //console.log(puz[j+i+k].currentNum)
                
                
            }
        }
        console.log(rowA)
         rowB.push(rowA);
         rowA = [];
         
         
     }
     console.log(rowB)
     
     
     
     
     
     
     
     
     
    
    //Checks the square
    for(var i = 0; i <rowB.length; i++){
        rowC = rowB[i].sort();
        for(var j = 0; j <rowB[i].length-1; j++){
            if( rowC[j] == rowC[j+1] && rowC[j] != 0){
                return false;
            }
        }
    }
    //only fires if true
    return true;
}



$(document).ready(function(){
    for(var i = 0; i <puzzle.length; i++ ){
        if(i%9 == 0 && i != 0){
            $('body').append('<br>')
        } 
        if(workingPuzzle[i].locked == true ){
            $('body').append('<div class = "square blue">'+workingPuzzle[i].currentNum+'</div>');
        } else {
            $('body').append('<div class = "square red">'+workingPuzzle[i].currentNum+'</div>');
        }
    }
});