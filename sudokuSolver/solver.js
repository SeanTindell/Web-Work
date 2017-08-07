 var $ =jQuery;
var solved = false,
puzzle,
checkNum = false,
currentSquare = 0;
var position = 0,
help =0,
currentNum=0,
count = 0;


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
    this.temp = false;
}


// console.log(puzzle.length);


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
            workingSquare.temp = false;
          }
          workingPuzzle.push(workingSquare);
    }
}

loadPuzzle(puzzle);

while(!solved){
    count++;
   while(!checkNum && count <10000){
       count++;
       while(workingPuzzle[position].locked)
       {
           position++;
           if(position > workingPuzzle.length){
               break;
           }
       }
       
       
        loadNum(position, workingPuzzle[position].currentNumPos);

        //complete
        if(checkNewNum(workingPuzzle)){
            checkNum = true;
            position++;
        //complete
        } else{
            checkNum = false;
            
            workingPuzzle[position].currentNumPos++;

            if(workingPuzzle[position].currentNumPos >= 9){
                console.log(workingPuzzle[position].currentNumPos)
                workingPuzzle[position].temp = true;
                workingPuzzle[position].currentNumPos = 0;
                workingPuzzle[position].currentNum = 0;
                
                while(workingPuzzle[position].temp == true ){
                    position--;
                }
                while(workingPuzzle[position].locked == true){
                    position--;
                }
                
                if(workingPuzzle[position].currentNumPos >= 9){
                    workingPuzzle[position].currentNumPos = 0;
                }
                 workingPuzzle[position].currentNum++;
                 workingPuzzle[position].currentNumPos++;
                 if(workingPuzzle[position].currentNumPos >= 9){
                    workingPuzzle[position].currentNumPos = 0;
                    workingPuzzle[position].currentNum = 0;
                }
                 for(var i = 0; i < workingPuzzle.length; i++){
                     workingPuzzle[i].temp=false;
                 }
                 
                // loadNum(position, workingPuzzle[position].currentNumPos);
                // while(workingPuzzle[position].locked == true ){
                //     console.log(position)
                //     position--;
                //     if(position <= 0){
                //         break;
                //     }
                // }
                
                
                
            }
        }
        
        
        
        
        // testing
   
        // help++;
        // if(help > 81 || checkNum){
        //     help = 0;
        //     break;
        // }
        // testing
    }
    for(var i = 0; i<workingPuzzle.length; i++){
            if(checkNum && workingPuzzle[i].currentNum === 0 ){
                solved = false;
                 checkNum = false;
                 break;
            } 

            solved = true;
        }

    
}
console.log(workingPuzzle)








function loadNum(pos, num){
    workingPuzzle[pos].currentNum =  workingPuzzle[pos].numLeft[num];
    return workingPuzzle[pos].currentNum
}
function checkNewNum(puz){
    if(checkRow(puz) && checkCol(puz) &&  checkSmallSquare(puz)){
        return true;
    } else {
        return false;
    }
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
     
     for(var l = 0; l < 81; l += 27){
         for( var k = 0; k < 9; k += 3 ){
             for(var i = 0; i <= 18; i+=9){
                for(var j = 0; j < 3; j++){
                    rowA.push(puz[l+j+i+k].currentNum);
                }
            }
             rowB.push(rowA);
             rowA = [];
         }
     }
    
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

function updatePuzzle(){

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

