let gcontainer = document.getElementById("gridContainer");
let rows = document.getElementsByClassName("grid_row");
let cells = document.getElementsByClassName("grid_cell");

let gridSize = document.getElementById("gSize");
let gridSizeButton = document.getElementById("gridSizeBtn");

// Creates a default grid sized 16x16
function defaultGrid() 
{
    makeRows(16);
    makeColumns(16);
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


function changeGrid(event) 
{
    if (gridSize.value > 50 || gridSize.value < 0)
    {
        return;
    }
    else
    {
        reset();
        makeRows(gridSize.value);
        makeColumns(gridSize.value);
    }
}

gridSizeButton.addEventListener('click', changeGrid)



function reset() 
{
    document.querySelectorAll(".grid_row").forEach((e) => e.parentNode.removeChild(e));
}

// mouse mechanics for coloring. mouse needs be either simply mouseDown or mouseDown + mouseOver to color
let mouseDownFlag = false
document.body.onmousedown = () => (mouseDownFlag = true)
document.body.onmouseup = () => (mouseDownFlag = false)

function changeColor(event) 
{
    if (event.type === 'mouseover' && !mouseDownFlag) 
    {
        return
    }
    event.target.style.backgroundColor = "red"
}


defaultGrid();