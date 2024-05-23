const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.backgroundColor = "#b7f7ed";

/* class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 0.2 * this.speed;
        this.dy = 0.2 * this.speed;
    }

    draw(context) {
        // Rellena el objeto
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();

        // Dibuja la línea del objeto
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();

        // Dibuja el texto al centro del objeto
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    // Mueve el círculo de posición en posición
    update(context) {
        // Dibuja el círculo
        this.draw(context);

        // Si el círculo supera el margen derecho entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Si el círculo supera el margen superior entonces se mueve abajo
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;

        // Actualiza las coordenadas en el HTML
        document.getElementById('coordinates').textContent = `X: ${Math.round(this.posX)}, Y: ${Math.round(this.posY)}`;
    }
}

let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;

// Genera tonalidades aleatorias
let randomBackcolor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", 0.3)";
let randomStrokecolor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

// Ajusta las posiciones para que siempre se encuentren dentro del canvas
randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 1);
miCirculo.draw(ctx);

let updateCircle = function () {
    // Método que permite estar dibujando constantemente el escenario
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    miCirculo.update(ctx);
};

updateCircle();
 */



const nCircles = 10;
let circles = [];

// Define la clase Circle
class Circle {
  constructor(x, y, radius, strokeColor, id, fillColor, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.strokeColor = strokeColor;
    this.id = id;
    this.fillColor = fillColor;
    this.speed = speed;
    // Se ajustó la velocidad de los círculos para que se muevan más lentamente
    this.dx = (Math.random() * this.speed) / 2;
    this.dy = (Math.random() * this.speed) / 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Dibujar el ID en el centro del círculo
    ctx.fillStyle = 'black';
    ctx.font = `${this.radius / 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.id, this.x, this.y);
  }

  update(ctx) {
    if (this.x + this.radius > window_width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > window_height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw(ctx);
  }
}

// Crear círculos
for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",0.4)";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomSpeed = Math.random() * 1.5 + 0.5; // Velocidad más lenta

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, randomSpeed);

  circles.push(miCirculo);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);

  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach((circle) => {
    circle.update(ctx);
  });

  updateCoordinatesTable();
};

let updateCoordinatesTable = function () {
  let tableBody = document.getElementById("circleCoordinates");
  tableBody.innerHTML = "";

  circles.forEach((circle) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${circle.id}</td><td>${circle.x.toFixed(2)}</td><td>${circle.y.toFixed(2)}</td>`;
    tableBody.appendChild(row);
  });
};

updateCircle();