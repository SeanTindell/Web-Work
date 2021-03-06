var $ =jQuery;
var solved = false,
    checkNum = false,
    currentSquare = 0,
    position = 0,
    currentNum=0,
    count = 0,
    puzzle = [];
    var workingPuzzle=[];
    var Square = function( position ){
            this.postition = position;
            this.numLeft = [];
            this.currentNum = 1;
            this.locked = false;
            this.currentNumPos=0;
            this.temp = false;
        }
        
    var clicked =false;    
        
function runSolver(){
    
    
    loadPuzzle(puzzle);
    while(!solved){
        count++;
       while(!checkNum ){
           count++;
          //works
          while(workingPuzzle[position].locked == true){
              if(position > workingPuzzle.length){
                  break;
              }
              position++;
          }
          //works
          
           loadNum(position, workingPuzzle[position].currentNumPos)
    
          if(checkNewNum(workingPuzzle) 
          && position < workingPuzzle.length
          && workingPuzzle[position].currentNum != 0){
                position++;
               checkNum = true;
           } else{
                checkNum = false;
    
                if(workingPuzzle[position].currentNumPos == 9){
                        workingPuzzle[position].currentNumPos = 0;
                } else{
                        workingPuzzle[position].currentNumPos++;
                }
                if(workingPuzzle[position].currentNumPos > 8){
                    loadNum(position, workingPuzzle[position].currentNumPos);
                    
                    goBack();
    
                    if(workingPuzzle[position].currentNumPos == 9){
                        workingPuzzle[position].currentNumPos = 0;
                    } else{
                         workingPuzzle[position].currentNumPos++;
                    }
                    
                }      
                loadNum(position, workingPuzzle[position].currentNumPos)
           }
           
        }
        
        
        if(position >= 80){
            solved = true;
        }
        else{
            solved = false;
               checkNum = false;
        }
    
    }
    
    //gets final number
    if(position!= 81){
        for(var i = 0; i < workingPuzzle[position].numLeft.length-1; i++ ){
            if(checkNewNum(workingPuzzle)
            && workingPuzzle[position].currentNum != 0){
                break;
            }
            workingPuzzle[position].currentNumPos=i;
            loadNum(position, workingPuzzle[position].currentNumPos)
        }
    }

}

function loadPuzzle(puz){
   var workingSquare;
    for(var i = 0; i <puz.length; i++ ){
          workingSquare = new Square(i);
          if(puz[i]!=''){
            workingSquare.numLeft=[];
            workingSquare.currentNum = puz[i];
            workingSquare.locked = true;
          } else {
            workingSquare.numLeft=[1,2,3,4,5,6,7,8,9,0];
            workingSquare.currentNum = 0;
            workingSquare.currentNumPos =9;
            workingSquare.locked = false;
            workingSquare.temp = false;
          }
          workingPuzzle.push(workingSquare);
    }
}
function backLock(){

     while(workingPuzzle[position].locked){
        checkBackPos();
    }
    if(workingPuzzle[position].currentNumPos == 8){
        backNine();
    }
    
}

function backNine(){
    
    while(workingPuzzle[position].currentNumPos == 8 ){
        workingPuzzle[position].currentNumPos = 9;
        loadNum(position, workingPuzzle[position].currentNumPos);
        checkBackPos();
    }
    if(workingPuzzle[position].locked){
        backLock();
    }
    
}

function goBack(){
    
    checkBackPos();
    backLock();
    backNine();
}


function checkBackPos(){
    position--;
    if(position < 0){
        position = 0;
    }
}







function loadNum(pos, num){
    workingPuzzle[pos].currentNum =  workingPuzzle[pos].numLeft[num];
    return workingPuzzle[pos].currentNumPos;
    
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





$(document).ready(function(){
    //runSolver();
    $('.solver').click(function(){
        if(!clicked){
            clicked = true;
            for(var i = 0; i <81; i++ ){
             puzzle.push($('#'+(i+1)+ ' input').val());
         }
             runSolver();
             for(var i = 0; i <puzzle.length; i++ ){
            
                if(workingPuzzle[i].locked == true ){
                    $('#'+(i+1)).html('<div class = " blue">'+workingPuzzle[i].currentNum+'</div>');
                } else {
                     $('#'+(i+1)).html('<div class = " red">'+workingPuzzle[i].currentNum+'</div>');
                }
            }
            
            $('.solver').html("Reset");
        } else{
            clicked = false;
            
            
            for(var i = 0; i <puzzle.length; i++ ){
                $('#'+(i+1)).html('<input type="number" maxlength="1" min="1" max="9"/>');
            }
            puzzle = [];
            $('.solver').html("Solve");
            
            solved = false,
            checkNum = false;
            currentSquare = 0;
            position = 0;
            currentNum=0;
            count = 0;
            puzzle = [];
            workingPuzzle=[];
            
        }
       
    });
});

