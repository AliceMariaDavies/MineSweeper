const prompt = require('prompt-sync')();

class Square{
    constructor(location, state){
        this.location = location;
        this.contents = ' ';
        this.state = false;
    }

    open(location){
            this.state = open;
    }

    flag(){
        this.state = flagged;
    }

    fill(string){
        this.contents = string;
    }

}

//const s = new Square(0, 'closed');
//console.log(s);

const grid = new Array(64);

function fillGrid(){
    for(let i=0; i<grid.length; i++){
        grid[i] = new Square(i);
    }
}

function layMines(){
    let laid = 0;
    while(laid <10){
    let loc = Math.floor(Math.random() * 64);
    let s = grid[loc];
    while(s.contents == '#'){
        loc += 1;
        s = grid[loc];
    }
    s.contents = '#';
    laid++;
    }
}

function checkUpperLeft(index){
    s = grid[index-9]
    if(s.contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkAbove(index){
    let i = index - 8;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkUpperRight(index){
    let i = index-7;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkRight(index){
    let i = index+1;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkLowerRight(index){
    let i = index+9;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkBelow(index){
    let i = index+8;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkLowerLeft(index){
    let i = index+7;
    if(grid[i].contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function checkLeft(index){
    let s = grid[index-1];
    if(s.contents == '#'){
        return 1;
    }
    else{
        return 0;
    }
}

function howManyMines(){
    let rowNo = 0;
    let columnNo = 0;
    for(let i=0; i<grid.length; i++){
        let adjacentTo = 0;
        columnNo += 1;
        if(i%8 == 0){
            rowNo += 1;
            columnNo = 1;
        }
        if(grid[i].contents != '#'){
            if(rowNo == 1 && columnNo == 1){
                adjacentTo += checkRight(i);
                adjacentTo += checkLowerRight(i);
                adjacentTo += checkBelow(i);
            }
            else if(rowNo == 1 && columnNo == 8){
                adjacentTo += checkLeft(i) + checkBelow(i) + checkLowerLeft(i);
            }
            else if(rowNo == 8 && columnNo == 1){
                adjacentTo += checkAbove(i) + checkUpperRight(i) + checkRight(i);
            }
            else if(rowNo == 8 && columnNo == 8){
                adjacentTo += checkLeft(i) + checkUpperLeft(i) + checkAbove(i);
            }
            else if(rowNo == 1 && columnNo!= 1 && columnNo != 8){
                adjacentTo += checkLeft(i) + checkRight(i) + checkLowerLeft(i) + checkLowerRight(i) + checkBelow(i);
            }
            else if(rowNo==8 && columnNo!=1 && columnNo!=8){
                adjacentTo += checkLeft(i) + checkRight(i) + checkUpperLeft(i) + checkUpperRight(i) + checkAbove(i);
            }
            else if(columnNo==1 && rowNo!=1 && rowNo!=8){
                adjacentTo += checkRight(i) + checkLowerRight(i) + checkUpperRight(i) + checkAbove(i) + checkBelow(i);
            }
            else if(columnNo==8 && rowNo!=1 && rowNo!=8){
                adjacentTo += checkLeft(i) + checkLowerLeft(i) + checkUpperLeft(i) + checkAbove(i) + checkBelow(i);
            }
            else{
                adjacentTo += checkRight(i) + checkLeft(i) + checkLowerRight(i) + checkLowerLeft(i) + checkUpperRight(i) + checkUpperLeft(i) + checkAbove(i) + checkBelow(i);
            }
            if(adjacentTo > 0){
            grid[i].contents = adjacentTo;
            }
        }
    }
}

function printGrid(){
    let row = [];
    for(let i=0; i<grid.length; i++){
        let s = grid[i];
        let content = s.contents;
        //let isOpen = s.state;
        row.push(content);
        //if(isOpen == false){
           // row.push('X');
        //}else if(isOpen == true){
            //row.push(content);
        //}
        if((i+1)%8 == 0){
            let printThis = row.join(', ');
            console.log(printThis);
            row = [];
        }
    }
}



fillGrid();
layMines();
howManyMines();
printGrid();