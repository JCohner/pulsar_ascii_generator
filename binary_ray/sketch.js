function setup() {
	createCanvas(600, 600);
	background(34,110,232);
	centerPoint();
	strokeCap(PROJECT);
	strokeWeight(4);
	//angleMode(DEGREES);
}
var origin = 300;
var rayCount = 0;
var mouseButton;
var A = [0,1,0,0,0,0,0,1];//0b01000001;
var s = [0,1,1,1,0,0,1,1];//0b01110011;
var k = [0,1,1,0,1,0,1,1];//0b01101011;
var space = [0,0,1,0,0,0,0,0];//0b0010000;
var W = [0,1,0,1,0,1,1,1];//0b01010111;
var h = [0,1,1,0,1,0,0,0];//0b01101000;
var y = [0,1,1,1,1,0,0,1];//0b01111001;



var chars = [A, s, k, space, W, h, y];
var ii;
var jj;
var doOnce = 1;
function draw() {
	if (doOnce == 1){
		var angles = [(0), (PI/4), (PI/2), (PI), (5/4*PI), (3/2 * PI), (11/6 * PI)];
		//var angles = [random(0, (2 * PI)),random(0, (2 * PI)), random(0, (2 * PI)), random(0, (2 * PI)), random(0, (2 * PI)), random(0, (2 * PI)), random(0, (2 * PI))];
		var lengths = [105,204, 64, 96, 41, 176, 33];
		var x;
		var y;
		doOnce = 0;
	}
	
	for (ii = 0; ii < 7; ++ii){
		console.log(ii + '\n');
		console.log(lengths[ii] + '\n');
		x = lengths[ii] * sin(angles[ii]);
		y = lengths[ii] * cos(angles[ii]);
		ray(x,y);
		var guy = spaceDash(x,y, "Dash" ,angles[ii]);
		dash(guy.x,guy.y, angles[ii]);
		guy = spaceDash(guy.x, guy.y,"Dash" ,angles[ii]);
		dot(guy.x, guy.y, angles[ii]);
		guy = spaceDash(guy.x, guy.y,"Dot" ,angles[ii]);
		dash(guy.x,guy.y, angles[ii]);
		/*
		for (jj = 0; jj < 8; ++jj){
			dot(x,y); 
			//console.log("Char "+chars[ii] + "bit "+chars[ii][jj]);
		}*/
	}

}

function centerPoint(){
	strokeWeight(20);
	point(origin,origin);
	return;
}

function ray(x2, y2){
	line(origin,origin, (origin + x2), (origin + y2));
	return;
}

function dot(x1, y1, angle){
	var dotlen = 10; 
	var xdot1 = dotlen * sin(angle);
	var ydot1 = dotlen * cos(angle);
	line((x1 + origin),(y1 + origin), (origin + x1 + xdot1), (origin + y1 + ydot1));
}

function dash(x1, y1, angle){
	var dotlen = 10; 
	var xdot1 = dotlen * sin(angle + PI/2);
	var ydot1 = dotlen * cos(angle + PI/2);

	x1 = x1 + origin;
	y1 = y1 + origin;

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
		y : yNew 
	};
	return newPoint;
}