function setup() {
	createCanvas(1920, 1080);
	background(30,80,160);
	centerPoint();
	strokeCap(SQUARE);
	strokeWeight(4);
	//angleMode(DEGREES);
}

function Character(array, angle, length){
	this.array = array;
	this.angle = angle;
	this.length = length;
}

var originX = 450;
var originY = 600;
var fixedRot = 90;	

var ii;
var jj;
var doOnce = 1;
function draw() {
	if (doOnce == 1){
		var A = new Character([0,1,0,0,0,0,0,1], 0 + fixedRot, 33);
		var s = new Character([0,1,1,1,0,0,1,1], 75 + fixedRot, 58);
		var k = new Character([0,1,1,0,1,0,1,1], 240 + fixedRot, 91);//0b01101011;
		var space = new Character([0,0,1,0,0,0,0,0], 108 + fixedRot, 109);//0b0010000;
		var W = new Character([0,1,0,1,0,1,1,1], 315 + fixedRot, 180);//0b01010111;
		var h = new Character([0,1,1,0,1,0,0,0], 195 + fixedRot, 210);//0b01101000;
		var y = new Character([0,1,1,1,1,0,0,1], 45 + fixedRot,250);//0b01111001;

		var chars = [A, s, k, space, W, h, y];
		
		var angles = [radians(A.angle), radians(s.angle), radians(k.angle),radians(space.angle), radians(W.angle), radians(h.angle), radians(y.angle)];
		var lengths = [A.length, s.length, k.length, space.length, W.length, h.length, y.length];
		var x;
		var y;
		doOnce = 0;
	}
	
	for (ii = 0; ii < 7; ++ii){
		x = lengths[ii] * sin(angles[ii]);
		y = lengths[ii] * cos(angles[ii]);
		ray(x,y);

		var guy = {
			x: x,
			y: y,
			prevShape : "Dash"
		};
		
		for (jj = 0; jj < 8; ++jj){
			guy = spaceDash(guy.x, guy.y,guy.prevShape,angles[ii]);
			if (chars[ii].array[jj] == 0) {
				dash(guy.x,guy.y, angles[ii]);
				guy.prevShape = "Dash";	
			} else {
				dot(guy.x,guy.y, angles[ii]);
				guy.prevShape = "Dot";
			}	
		}
	}
	noLoop();

}

function centerPoint(){
	strokeWeight(20);
	point(originX,originY);
	return;
}

function ray(x2, y2){
	line(originX,originY, (originX + x2), (originY + y2));
	return;
}

function dot(x1, y1, angle){
	var dotlen = 10; 
	var xdot1 = dotlen * sin(angle);
	var ydot1 = dotlen * cos(angle);
	line((x1 + originX),(y1 + originY), (originX + x1 + xdot1), (originY + y1 + ydot1));
}

function dash(x1, y1, angle){
	var dotlen = 12; 
	var xdot1 = dotlen * sin(angle + PI/2);
	var ydot1 = dotlen * cos(angle + PI/2);

	x1 = x1 + originX;
	y1 = y1 + originY;

	var x2_1 = x1 + 1/2 * xdot1;
	var y2_1 = y1 + 1/2 * ydot1;
	var x2_2 = x1 - 1/2 * xdot1;
	var y2_2 = y1 - 1/2 * ydot1;
	line(x2_1,y2_1, x2_2, y2_2);
}

function spaceDash(xPrev,yPrev,prevTick,angle){
	/*returns point to start next dash or dot
	 *by taking prev endpoint and spacing by an dash*/
	var strokelen;
	if (prevTick == "Dash") {
		strokelen = 8;
	} else {
		strokelen = 18; 
	}
	var xdot2 = strokelen * sin(angle);
	var ydot2 = strokelen * cos(angle);
	//point((x1 + xdot2),(y1 + ydot2));
	var xNew = xPrev + xdot2;
	var yNew = yPrev + ydot2;
	var newPoint = {
		x : xNew,
		y : yNew,
		prevShape : prevTick 
	};
	return newPoint;
}

