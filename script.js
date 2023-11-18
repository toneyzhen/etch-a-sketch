let gcontainer = document.getElementById("gridContainer");
let rows = document.getElementsByClassName("grid_row");
let cells = document.getElementsByClassName("grid_cell");

let gridSize = document.getElementById("gSize");
let gridSizeButton = document.getElementById("gridSizeBtn");

let colorPicker = document.getElementById("colorPicker");
let colorButton = document.getElementById("colorButton");
let eraserButton = document.getElementById("eraserButton");
let clearButton = document.getElementById("clearButton");

// Creates a default grid sized 25x25
function defaultGrid() 
{
    makeRows(25);
    makeColumns(25);
    // console.log("HUHHH")
}

// Takes rowNum input and makes rowNum number of rows
function makeRows(rowNum) 
{
    for (i = 0; i < rowNum; i++) {
        let row = document.createElement("div");
        row.className = "grid_row"
        gcontainer.appendChild(row);
    };
};

// Creates columns for each row
function makeColumns(cellNum) 
{
    for (i = 0; i < rows.length; i++) {
        for (j = 0; j < cellNum; j++) {
            let newCell = document.createElement("div");
            newCell.addEventListener('mouseover', changeColor);
            newCell.addEventListener('click', changeColor);
            rows[j].appendChild(newCell).className = "grid_cell";
        };

    };
};



// mouse mechanics for coloring. mouse needs be either simply mouseDown or mouseDown + mouseOver to color
let mouseDownFlag = false
document.body.onmousedown = () => (mouseDownFlag = true)
document.body.onmouseup = () => (mouseDownFlag = false)


// global variable to keep track of color choice
currentColor = "red"; // default color

colorPicker.oninput = (e) => setColor(e.target.value)
function setColor(color)
{
    currentColor = color;
}



// color button removes eraser eventListener from cell and adds color eventListener
colorButton.addEventListener('click', () =>
{
    document.querySelectorAll(".grid_cell").forEach((e) => e.removeEventListener('mouseover', eraseColor));
    document.querySelectorAll(".grid_cell").forEach((e) => e.removeEventListener('click', eraseColor));

    document.querySelectorAll(".grid_cell").forEach((e) => e.addEventListener('mouseover', changeColor));
    document.querySelectorAll(".grid_cell").forEach((e) => e.addEventListener('click', changeColor));
})
// changes color to whatever is selected
function changeColor(event) 
{
    if (event.type === 'mouseover' && !mouseDownFlag) 
    {
        return
    }
    event.target.style.backgroundColor = currentColor;
}



// eraser button removes color eventListener from cell and adds erase eventListener
eraserButton.addEventListener('click', () =>
{
    document.querySelectorAll(".grid_cell").forEach((e) => e.removeEventListener('mouseover', changeColor));
    document.querySelectorAll(".grid_cell").forEach((e) => e.removeEventListener('click', changeColor));

    document.querySelectorAll(".grid_cell").forEach((e) => e.addEventListener('mouseover', eraseColor));
    document.querySelectorAll(".grid_cell").forEach((e) => e.addEventListener('click', eraseColor));
})
// erases if mouse is down
function eraseColor(event) 
{
    if (event.type === 'mouseover' && !mouseDownFlag) 
    {
        return
    }
    event.target.style.backgroundColor = "white"
}



// clear button just resets the grid
clearButton.addEventListener('click', ()=>
{
    reset();
})

function reset() 
{
    document.querySelectorAll(".grid_row").forEach((e) => e.parentNode.removeChild(e));
    document.querySelectorAll(".grid_cell").forEach((e) => e.parentNode.removeChild(e));
    makeRows(gridSize.value);
    makeColumns(gridSize.value);
}


// grid size button which takes the input and changes the grid based off of it
gridSizeButton.addEventListener('click', changeGrid)

function changeGrid(event) 
{
    if (gridSize.value > 40 || gridSize.value < 0)
    {
        return;
    }
    else
    {
        reset();
    }
}





defaultGrid();