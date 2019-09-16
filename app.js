const alphabet = "абвгдежзийклмнопрстуфхцчшщъьюя".split(""),
    form = document.getElementById('myForm'),
    /* canv = document.querySelectorAll('myCanvas'), */
    canv = document.getElementById('myCanvas'),
    ctx = canv.getContext('2d');
/* ctx2 = canv[1].getContext('2d'), */
/* ctx3 = canv[2].getContext('2d'), */
/* ctx4 = canv[3].getContext('2d'), */

//init(); // 10 -> 9 
form.oninput = init;

function init() {
	console.clear();
	canv.width = 0;
	canv.height = 0;

	binValues = [];
	tiles = [];
	/* let columns = form[0].value; */
	/* let rows = form[1].value; */
	tileWidth = form[2].value;
	tileHeight = form[2].value;
	word = form[3].value.toLowerCase().split("");
	colorOne = form[4].value;
	colorZero = form[5].value;
	colorAxis = form[6].value;
	showAxis = form[7].checked;
	showGrid = form[8].checked;
	showBig = form[9].checked;

	toBinary();
}

function toBinary () {
	for (var i = 0; i < word.length; i++) {
        binValues[i] = (alphabet.indexOf(word[i]) + 1).toString(2).split("");
        for (var j = binValues[i].length; j < 5; j++) {
            binValues[i].unshift("0");
        }
		if (showAxis)
			binValues[i].push("2");
	}
 	if (binValues.length > 0 && showAxis == true)
		binValues.push(["2", "2", "2", "2", "2", "2"]);

	console.log(binValues);
	createCanv();
}

function createCanv () {
	gridWidth = tileWidth * binValues[0].length;
	gridHeight = tileHeight * binValues.length;

	canvasWidth = gridWidth * 2 - ((showAxis) ? tileWidth : 0);
	canvasHeight = gridHeight * 2 - ((showAxis) ? tileHeight : 0);

	canv.width = canvasWidth;
	canv.height = canvasHeight;

	add();
}

function add() {
    for (var row = 0; row < binValues.length; row++) {
        for (var column = 0; column < binValues[0].length; column++) {
            tiles.push({
                column: column,
                row: row,
                width: tileWidth,
                height: tileHeight,
                coordX: tileWidth * column,
                coordY: tileHeight * row,
                binaryValue: binValues[row][column]
            });
        }
    }

    draw();
}

function draw() {
    tiles.forEach(function(tile) {
        if (tile.binaryValue == 1)
            ctx.fillStyle = colorOne;
        else if (tile.binaryValue == 0)
            ctx.fillStyle = colorZero;
        else if (tile.binaryValue == 2)
            ctx.fillStyle = colorAxis;
        else
			return false;

        ctx.fillRect(tile.coordX, tile.coordY, tile.width, tile.height);
        if (showGrid)
	        ctx.strokeRect(tile.coordX, tile.coordY, tile.width, tile.height);
       // ctx.fillText(tile.id, tile.top + 1, tile.left + 50);
		ctx.fillStyle = "red";
		ctx.fillText(tile.binaryValue, tile.top + 15, tile.left + 50);
    });
	copyCanv();
}

function copyCanv () {
	ctx.translate(gridWidth, 0);
	ctx.transform(-1, 0, 0, 1, canvasWidth, 0); // 2
	ctx.drawImage(canv, gridWidth, 0); // 2

	ctx.translate(0, gridHeight);
	ctx.transform(1, 0, 0, -1, 0, canvasHeight); // 3, 4
	ctx.drawImage(canv, gridWidth, gridHeight); // 3, 4
}
// TODO LIST \\
