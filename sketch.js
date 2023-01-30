let firework = [];
let colors = ['#FF5722', '#0DC700', '#EBFF00', '#033AF8'];
let g;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	
}

function draw() {
	fill(0, 10);
	rect(0, 0, width, height);
	
	g = createVector(0, 0.01);
	
	if(firework.length > 0) {
		for(let i = 0; i < firework.length; i++) {
			firework[i].show();
			firework[i].move();
			firework[i].applyForce(g);
			
			if(firework[i].vel.y > 0) firework[i].boom();
			if(firework[i].isDead()) firework.splice(i, 1);
		}
	}
}

function mousePressed() {
	for(let i = 0; i < 100; i++) {
		firework.push(new Ball(mouseX, mouseY, 5, colors[i%colors.length]));
	}
}

class Ball {
	constructor(x, y, s_, c_) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, -1);
		this.acel = createVector(0, -1);
		this.s = s_;
		this.c = c_;
		this.aux = true;
		this.a = 255;
	}
	
	show() {
		noStroke();
		fill(this.c);
		ellipse(this.pos.x, this.pos.y, this.s, this.s);
		
		if(!this.aux) this.a -= random(2, 4);
	}
	
	move() {
		this.vel.add(this.acel);
		this.vel.limit(5);
		this.pos.add(this.vel);
		this.acel.mult(0);
	}
	
	applyForce(f) {
		this.acel.add(f);
	}
	
	boom() {
		if(this.aux) {
			this.acel = p5.Vector.random2D();
			this.acel.normalize();
			this.acel.mult(random(2));
			this.aux = false;
		}
	}
	
	isDead() {
		if(this.a < 10) return true;
		else return false;
	}
}