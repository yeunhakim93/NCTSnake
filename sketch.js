var snake;
var pixel_size = 32;
var shots = [];
var movement = [];
var highscore = 0;
var gameState = "init";
var sm;
var rk;
var nct = [];
var memnum = 15;
var randnct = [];
var cnv;
var rstbuttonstrings = [
  "스트로니",
  "좋은 기회로 다시 시작하기",
  "힘들땐 힘내",
  "산다는 거 견디는 거",
  "내가 멤버를 찾는것이 아니라 멤버가 날 찾는것이다",
  "메탈각설이들에게 힘 받기",
  "략간 쫌,,, 어려운데,,,",
  "망하려면 혼자 망하지 왜 날 영입했어요",
  "ㅎㅎ;;",
  "최종 목표는 세계 정복입니다. 총 아니라 무대로요.",
  "실패... 거부하겠습니다.",
];
var btrack = 0;
var pertrack = 0;
var bc1;
var bc2;
var bc3;
var bc4;

function setup() {
  cnv = createCanvas(640, 640);
  cnv.parent("sketch-holder");
  background(255);
  noStroke();

  rk = loadImage("img/rk.png");
  sm = loadImage("img/SM.png");

  for (var i = 0; i < memnum; i++) {
    nct[i] = loadImage("img/nct" + i + ".png");
  }
}

function initGame() {
  var name = "NEO CULTURE TECHNOLOGY";
  var limitless = "선아의 무한확장기";
  var desc = "선생님 아버지와 함께 지옥의 케이팝 시장을 정복해보세요.";
  var desc2 = "하단의 버튼을 눌러 게임을 시작하세요.";
  var desc3 = "모바일 지원은 되지 않습니다.";

  textSize(41);
  fill(0);
  nameWidht = textWidth(name);
  text(name, (width - nameWidht) / 2, height / 2 - 15);

  textSize(60);
  fill(0);
  txtWidht = textWidth(limitless);
  text(limitless, (width - txtWidht) / 2, height / 2 - 50);

  textSize(15);
  fill(20);
  txtWidht = textWidth(desc);
  text(desc, (width - txtWidht) / 2, height / 2 + 20);
  textSize(15);
  fill(20);
  txtWidht = textWidth(desc2);
  text(desc2, (width - txtWidht) / 2, height / 2 + 40);
  txtWidht = textWidth(desc3);
  text(desc3, (width - txtWidht) / 2, height / 2 + 60);

  startBtn = createButton("NCT 멤버영입하기");
  startBtn.position(270, 400);
  startBtn.mousePressed(startGame);

  bc1 = color(143, 222, 222);
  bc2 = color(255, 100, 100);
  bc3 = color(187, 227, 9);
  bc4 = color(231, 243, 152);

  frameRate(5);
}

function startGame() {
  removeElements();
  gameState = "play";
  snake = new Snake();
  setMembers(3);
  loop();
}

function runGame() {
  frameRate(10);
  textSize(14);
  fill(100);
  text("멤버 수: " + snake.tail.length, 1, 13);
  text("최고기록: " + highscore, 1, 27);

  snake.update();
  snake.show();
  snake.checkDeath();

  for (var i = 0; i < shots.length; i++) {
    image(rk, shots[i].x, shots[i].y);
    if (snake.eat(shots[i])) {
      snake.tail.push(createVector(snake.x, snake.y));
      shots.splice(i, 1);
      setMembers(1);
      randnct.push(floor(random(0, memnum)));
      if (snake.tail.length > highscore) highscore = snake.tail.length;
    }
  }
}

function endGame() {
  textSize(38);
  randnct = [];
  var msg;
  var score;

  if (snake.tail.length < 127) {
    msg = "야심찼던 무한확장의 꿈은";
    score = "아쉽게도 " + snake.tail.length + "명에 그치고 말았습니다.";
  } else if (snake.tail.length == 127) {
    msg = "무한확장의 꿈은 비록 127명에 그쳤지만";
    score = "산다는 거 견디는 거";
  } else {
    msg = snake.tail.length + "명까지 성공적으로 확장하셨습니다.";
    score = "선아가 그대를 보고 미소짓고 있습니다.";
  }

  msgWidht = textWidth(msg);
  scoreWidht = textWidth(score);

  noLoop();
  noFill();
  strokeWeight(1);
  stroke(30);
  text(msg, (width - msgWidht) / 2, height / 2 - 40);
  text(score, (width - scoreWidht) / 2, height / 2);

  fill(255);
  textSize(20);

  startBtn = createButton(rstbuttonstrings[floor(random(0, 11))]);
  startBtn.position(25, 610);
  startBtn.mousePressed(startGame);
  gameState = "stop";
}

function draw() {
  if (gameState == "init") {
    background(255);
    from = color(243, 114, 175, 0.2 * 255);
    to = color(187, 227, 9, 0.2 * 255);
    c1 = lerpColor(from, to, 0.33);
    c2 = lerpColor(from, to, 0.66);
    for (var i = 0; i < 15; i++) {
      fill(from);
      quad(
        random(-40, 220),
        random(height),
        random(-40, 220),
        random(height),
        random(-40, 220),
        random(height),
        random(-40, 220),
        random(height)
      );
      fill(c1);
      quad(
        random(140, 380),
        random(height),
        random(140, 380),
        random(height),
        random(140, 380),
        random(height),
        random(140, 380),
        random(height)
      );
      fill(c2);
      quad(
        random(320, 580),
        random(height),
        random(320, 580),
        random(height),
        random(320, 580),
        random(height),
        random(320, 580),
        random(height)
      );
      fill(to);
      quad(
        random(500, 760),
        random(height),
        random(500, 760),
        random(height),
        random(500, 760),
        random(height),
        random(500, 760),
        random(height)
      );
    }
    frameRate(5);
    initGame();
  } else if (gameState == "play") {
    pertrack++;
    if (pertrack > 100) {
      btrack++;
      if (btrack > 3) btrack = 0;
      pertrack = 0;
    }

    if (btrack == 0) {
      temp = lerpColor(bc1, bc2, pertrack / 100);
    } else if (btrack == 1) {
      temp = lerpColor(bc2, bc3, pertrack / 100);
    } else if (btrack == 2) {
      temp = lerpColor(bc3, bc4, pertrack / 100);
    } else {
      temp = lerpColor(bc4, bc1, pertrack / 100);
    }

    background(temp);

    frameRate(10);
    runGame();
  } else if (gameState == "end") {
    endGame();
  }
}

function setMembers(num) {
  var cols = floor(width / pixel_size);
  var rows = floor(height / pixel_size);
  for (var i = 0; i < num; i++) {
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(
      pixel_size
    );
    while (snake_intersect(location)) {
      location = createVector(floor(random(cols)), floor(random(rows))).mult(
        pixel_size
      );
    }
    shots.push(location);
  }
}

function snake_intersect(location) {
  var intersect = false;
  if (location.x == snake.pos.x && location.y == snake.pos.y) {
    intersect = true;
  } else {
    for (var i = 0; i < snake.tail.length; i++) {
      if (location.x == snake.tail[i].x && location.y == snake.tail[i].y) {
        intersect = true;
        break;
      }
    }
    for (var i = 0; i < shots.length; i++) {
      if (location.x == shots[i].x && location.y == shots[i].y) {
        intersect = true;
        break;
      }
    }
  }
  return intersect;
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    movement.push([0, 1]);
  } else if (keyCode === UP_ARROW) {
    movement.push([0, -1]);
  } else if (keyCode === LEFT_ARROW) {
    movement.push([-1, 0]);
  } else if (keyCode === RIGHT_ARROW) {
    movement.push([1, 0]);
  }
}
