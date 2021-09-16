//1. initializing variable and conditions
var canvas = document.getElementById("canvas");
var navigationBar = document.getElementById('navi');

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - navigationBar.clientHeight;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;

//Element retrieval 
var menu = document.getElementById("menu"); //Menu button
var brush = document.getElementById("brush"); //Brush 
var eraser = document.getElementById("erase"); //Eraser 
var color = document.getElementById("myColor"); //Color
var size = document.getElementById("myRange"); //Size
var reset = document.getElementById("reset"); //reset
var saveLink = document.getElementById("saveLink"); //saveLink element 
var toolbar = document.getElementById("toolbar"); //toolbar

//Set initial color conditions 
var myColor = color.value;
ctx.strokeStyle = myColor;

//Set initial size conditions
var mySize = size.value;
ctx.lineWidth = mySize;

var isEraserSelected = false;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

addEventListen()

//4. Color change conditions
function colorChange() {
	myColor = color.value;
	if (isEraserSelected === false) {
		ctx.strokeStyle = myColor;
	}
}

//5. Size change conditions
function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}

//2.Make brush work
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile && e.touches && e.touches[0]) {
		return {
			x: e.touches[0].clientX - rect.left,
			y: e.touches[0].clientY - rect.top
		};
	}
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvas, positionX, positionY) {
	if (mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();
		canvas.style.cursor = "pointer";
	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}

function brushMove(e) {
	var coordinates = getCoordinates(canvas, e);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
}

function brushUp() {
	mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
	var brushColor = document.getElementById("myColor");
	ctx.strokeStyle = brushColor.value;
	brush.style.border = "2px solid red";
	eraser.style.border = "none";

	isEraserSelected = false;

	addEventListen()
}

//3. Making the eraser work 
function eraserClick() {
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";

	isEraserSelected = true;

	addEventListen()
}

function addEventListen() {
	canvas.addEventListener("touchstart", brushDown, false);
	canvas.addEventListener("touchmove", brushMove, false);
	canvas.addEventListener("touchend", brushUp, false);
	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//6. Making the reset button work 
function resetClick() {
	window.location.reload();
}

//7. Making the save button work 
function saveClick() {
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
	console.log(data);
	saveLink.href = data;
	saveLink.download = "myImage.png";
}

//8. Making the menu button work
function showHideToolbar() {
	toolbar.classList.toggle('show');
}

//Event Listeners for tools 
menu.addEventListener("click", showHideToolbar);
brush.addEventListener("click", brushClick); //Brush click event 
eraser.addEventListener("click", eraserClick); //Eraser click event
color.addEventListener("change", colorChange); //Color change event 
size.addEventListener("change", sizeChange); //Size change event 
reset.addEventListener("click", resetClick); //Reset click event 
saveLink.addEventListener("click", saveClick); //Save click event 