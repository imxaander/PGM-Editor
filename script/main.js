FILE_INPUT = document.getElementById("file-input");
LOAD_BUTTON = document.getElementById("load-file-button");
EXPORT_BUTTON = document.getElementById("export-file-button");
EDITOR_PANEL = document.getElementById("editor-panel");

PAINT_MODE =  1; //0 for 0
CLICK_MODE = 0; //1 for click

let IMG_ARRAY;
LOAD_BUTTON.addEventListener("click", function(){
    const file = FILE_INPUT.files[0];
    const READER = new FileReader();
    READER.addEventListener('load', (e)=>{
        let file_string = READER.result;
        let lines = file_string.split('\n');
        let rows, cols;

        if(lines[1][0] === '#') {
            cols = lines[2][0];
            rows = lines[2][2];
            file_string = file_string.split("\n").slice(3).join("\n");
        }else{
            cols = lines[1][0];
            rows = lines[1][2];
            file_string = file_string.split("\n").slice(2).join("\n");
        }
        lines = file_string.split('\n');
        IMG_ARRAY = new Array(rows);
        for (let i = 0; i < rows; i++) {
            IMG_ARRAY[i] = new Array(cols);
        }

        for(let i = 0; i < rows; i++) {
            for (let j = 0; j < 2 * cols; j+=2) {
                IMG_ARRAY[i][j/2] = lines[i][j];
            }
        }
        updateEditor(rows, cols);
    })
    if(file) READER.readAsText(file);
})

function paintPixel(x, y){
    let el = document.getElementById(x + "x" + y);
    if(CLICK_MODE > 0){
        //ONCLICK...
        //TODO: add class for on and off. for background and text color no focus. add table reader function. preserve comments and export option
        if(el.innerHTML === "0"){
            el.innerHTML = "1";
        }else{
            el.innerHTML = "0";
        }
    }
}

function updateEditor(rows, cols){
    let table = document.createElement("table");
    for(let i = 0; i < rows; i++){
        let table_row = document.createElement('tr');
        for(let j = 0; j < cols; j++){
            let table_cell = document.createElement('td');
            table_cell.innerHTML = IMG_ARRAY[i][j];
            table_cell.classList.add("editor-pixel");
            table_cell.id = i + 'x' + j;
            table_cell.setAttribute('onmouseover', `paintPixel(${i}, ${j})`);
            table_row.appendChild(table_cell);
        }
        table.appendChild(table_row);
    }
    EDITOR_PANEL.innerHTML = table.outerHTML;
}

document.body.onmousedown = function() {
    // console.log("down");
    ++CLICK_MODE
}
document.body.onmouseup = function() {
    // console.log("up");
    --CLICK_MODE;
}
