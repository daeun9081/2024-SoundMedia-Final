let a;
let b;

let bpm;
let sound;
let vol;
let btn;
let btnM;
let btnP;
let slider;
let sliderPan;
let sliderRate;
let btnjump1;
let btnjump2;
var len = 0;
let amp; //소리의 크기 (인풋)

function preload() {
  soundFormats("mp3", "ogg");
  sound = loadSound("On Rainy Days - BEAST.mp3");
}

function setup() {
  createCanvas(640, 640);
  a = 0.0;
  b = 0.0;
  bpm = 0;
  amp = new p5.Amplitude();

  btn = createButton("MUSIC PLAY");
  btn.mousePressed(playMusic);
  pausebtn = createButton("PUASE");
  pausebtn.mousePressed(pauseMusic);
  btnM = createButton("VOL -");
  btnM.mousePressed(minus);
  btnP = createButton("VOL +");
  btnP.mousePressed(plus);
  slider = createSlider(0, 1.5, 1, 0.1);
  sliderPan = createSlider(-1, 1, 0, 0.1);
  sliderRate = createSlider(0, 2, 1, 0.1);
  btnjump1 = createButton("<<");
  btnjump2 = createButton(">>");
  btnjump1.mousePressed(jumpSong1);
  btnjump2.mousePressed(jumpSong2);
}

function draw() {
  background(30, 160, 180);
  //console.log(slider.value());
  vol = slider.value();
  sound.pan(sliderPan.value()); //스피커 L/R 어느쪽으로 치중할지
  sound.setVolume(vol);
  sound.rate(sliderRate.value());
  //console.log(amp.getLevel());
  noStroke();
  fill(255);
  ellipse(200, 150, 60, 60);
  ellipse(440, 150, 60, 60);
  fill(0);
  ellipse(200, 150, 40, 40);
  ellipse(440, 150, 40, 40);
  fill(255, 150, 190);
  ellipse(320, 400, amp.getLevel() * 1000, amp.getLevel() * 1000);
}

function playMusic() {
  if (!sound.isPlaying()) {
    sound.loop();
    sound.setVolume(vol);
    btn.html("MUSIC STOP");
  } else {
    sound.stop();
    btn.html("MUSIC PLAY");
  }
}

function pauseMusic() {
  if (!sound.isPlaying()) {
  } else {
    sound.pause();
    btn.html("MUSIC PLAY");
  }
}

function jumpSong2() {
  len += sound.duration() / 5;
  if (len >= sound.duration()) {
    len = 0;
  }
  sound.jump(len);
}
function jumpSong1() {
  len -= sound.duration() / 5;
  if (len < 0) {
    len = 0;
  }
  sound.jump(len);
}

function minus() {
  vol = vol - 0.1;
  slider.value(vol);
}

function plus() {
  vol = vol + 0.1;
  slider.value(vol);
}
