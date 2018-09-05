function Game() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const ballRadius = 7;
  let rightPressed = false;
  let leftPressed = false;
  let boardHeight = 10;
  let boardWidth = 100;
  let boardX = (canvas.width - boardWidth) / 2;
  let x = canvas.width / 2;
  let y = canvas.height - 30;
  let brickColumnCount = 15;
  let brickRowCount = 3;
  let brickWidth = 50;
  let brickHeight = 20;
  let brickPadding = 0;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 25;
  let bricks = [];
  let score = 40;
  let gradient = ctx.createLinearGradient(0, 0, 0, 170);
  gradient.addColorStop("0", "red");
  gradient.addColorStop("0.33", "blue");
  gradient.addColorStop("0.66", "red");
  gradient.addColorStop("1", "darkred");

  for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++) {
      bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
  }
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.getElementById("reset").addEventListener("click", resetPage);
  function resetPage() {
    document.location.reload(true);
  }

  function displayGameWon() {
    ctx.font = "50px Verdana";
    ctx.fillText("YOU WON!", canvas.width / 2 - 130, canvas.height / 2 - 90);
    document.getElementById("win").disabled = false;
    document.getElementById("win").style.display = "inline-block";
    document.getElementById("win").addEventListener("click", () => {
      resetPage();
    });
    document.getElementById("next").disabled = false;
    document.getElementById("next").style.display = "inline-block";
  }
  function displayGameOver() {
    ctx.font = "50px Verdana";
    ctx.fillText("YOU LOST!", canvas.width / 2 - 130, canvas.height / 2 - 90);
    document.getElementById("reset").disabled = false;
    document.getElementById("reset").style.display = "inline-block";
  }
  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }
  function drawBoard() {
    ctx.beginPath();
    ctx.rect(boardX, canvas.height - boardHeight, boardWidth, boardHeight);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
  }
  function drawBricks() {
    for (let i = 0; i < brickColumnCount; i++) {
      for (let j = 0; j < brickRowCount; j++) {
        if (bricks[i][j].status == 1) {
          let brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[i][j].x = brickX;
          bricks[i][j].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.strokeStyle = "#fff";
          ctx.stroke();
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }
  function checkCollison() {
    var ballBottom = y - 7;
    var ballTop = y + 7;
    var ballLeft = x - 7;
    var ballRight = x + 7;
    for (let i = 0; i < brickColumnCount; i++) {
      for (let j = 0; j < brickRowCount; j++) {
        let b = bricks[i][j];
        if (b.status == 1) {
          if (
            ballRight > b.x + ballRadius &&
            ballLeft < b.x + brickWidth &&
            ballTop > b.y + ballRadius &&
            ballBottom < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            ++score;
          }
        }
      }
    }
  }

  let dx = -Math.random();
  let dy = 5;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawBoard();
    drawScore();
    checkCollison();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (score == 45) {
      return displayGameWon();
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > boardX && x < boardX + boardWidth) {
        dy = -dy;
        let deltaX = x - (boardX + boardWidth / 2);
        dx = deltaX * 0.1;
      } else {
        return displayGameOver();
      }
    }

    if (rightPressed && boardX < canvas.width - boardWidth) {
      boardX += 7;
    } else if (leftPressed && boardX > 0) {
      boardX += -7;
    }
    x += dx;
    y += dy;
  }

  setInterval(draw, 16);
}
document.getElementById("start").addEventListener("click", function() {
  new Game();
  this.style.display = "none";
});
