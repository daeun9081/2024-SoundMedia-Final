let a;
let b;

let bpm;
let sound1;
let sound2;
let vol;
let btn1;
let btn2;
let pausebtn;
let btnM;
let btnP;
let slider;
let sliderPan;
let sliderRate;
let btnjump1;
let btnjump2;
var len1 = 0;
var len2 = 0;
let amp; //소리의 크기 (인풋)

function preload() {
  soundFormats("mp3", "ogg");
  sound1 = loadSound("On Rainy Days - BEAST.mp3");
  sound2 = loadSound("Forever Young - Otis McDonald.mp3");
}

function setup() {
  createCanvas(640, 640);
  a = 0.0;
  b = 0.0;
  bpm = 0;
  amp = new p5.Amplitude();

  btn1 = createButton("MUSIC1 PLAY");
  btn1.mousePressed(playMusic1);
  btn2 = createButton("MUSIC2 PLAY");
  btn2.mousePressed(playMusic2);
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
  if (sound1.isPlaying()) {
    sound1.pan(sliderPan.value()); //스피커 L/R 어느쪽으로 치중할지
    sound1.setVolume(vol);
    sound1.rate(sliderRate.value());
  } else if (sound2.isPlaying()) {
    sound2.pan(sliderPan.value()); //스피커 L/R 어느쪽으로 치중할지
    sound2.setVolume(vol);
    sound2.rate(sliderRate.value());
  }
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

function playMusic1() {
  if (!sound1.isPlaying()) {
    sound1.loop();
    sound1.setVolume(vol);
    btn1.html("MUSIC1 STOP");
  } else {
    sound1.stop();
    btn1.html("MUSIC1 PLAY");
  }
}
function playMusic2() {
  if (!sound2.isPlaying()) {
    sound2.loop();
    sound2.setVolume(vol);
    btn2.html("MUSIC2 STOP");
  } else {
    sound2.stop();
    btn2.html("MUSIC2 PLAY");
  }
}

function pauseMusic() {
  if (!sound1.isPlaying()) {
  } else {
    sound1.pause();
    btn1.html("MUSIC1 PLAY");
  }
  if (!sound2.isPlaying()) {
  } else {
    sound2.pause();
    btn2.html("MUSIC2 PLAY");
  }
}

function jumpSong1() {
  if (sound1.isPlaying()) {
    len -= sound1.duration() / 5;
    if (len < 0) {
      len = 0;
    }
    sound1.jump(len);
  }
  if (sound2.isPlaying()) {
    len -= sound2.duration() / 5;
    if (len < 0) {
      len = 0;
    }
    sound2.jump(len);
  }
}
function jumpSong2() {
  if (sound1.isPlaying()) {
    len += sound1.duration() / 5;
    if (len >= sound1.duration()) {
      len = 0;
    }
    sound1.jump(len);
  }
  if (sound2.isPlaying()) {
    len += sound2.duration() / 5;
    if (len >= sound2.duration()) {
      len = 0;
    }
    sound2.jump(len);
  }
}

function minus() {
  vol = vol - 0.1;
  slider.value(vol);
}

function plus() {
  vol = vol + 0.1;
  slider.value(vol);
}
