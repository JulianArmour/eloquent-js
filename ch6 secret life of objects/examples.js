let rabbit = {};
rabbit.speak = function (line) {
  console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I am a rabbit!");


function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}


let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};
whiteRabbit.speak("Oh my...");
hungryRabbit.speak("wowzerz");
speak("What will happen?");
speak.call(whiteRabbit, "Hop!");

console.log();


function normalize() {
  console.log(this.coords.map(n => n / this.length));
}


normalize.call({coords: [0, 2, 3], length: 5});


console.log();

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};


function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}


makeRabbit("happy").speak("I am happy!");


function Rabbit(type) {
  this.type = type;
}


Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

console.log(Object.getPrototypeOf(Rabbit.prototype) === Object.getPrototypeOf({}));


class Rabbitt {
  constructor(type) {
    this.type = type;
  }

  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}


let killerRabbit = new Rabbitt("killer");
let blackRabbit = new Rabbitt("black");
killerRabbit.speak("SWAAKKK");
blackRabbit.speak("Yeet");

Rabbitt.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};

console.log(String(killerRabbit));


class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  [Symbol.iterator]() {
    return new MatrixIterator(this);
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }

  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y === this.matrix.height) return {done: true};

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };

    this.x++;
    if (this.x === this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}

let matrix = new Matrix(3, 3, (x, y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}

console.log();

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};
console.log(varyingSize.size);
console.log(varyingSize.size);

console.log();

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
temp.fahrenheit = 86;
console.log(temp.celsius);


console.log();

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x !== y) super.set(y, x, value);
  }
}

matrix = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
console.log(matrix.get(2, 3));

class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}


class Group {
  constructor(props) {
    this.group = [];
  }

  add(elem) {
    if (!this.group.includes(elem))
      this.group.push(elem);
  }

  delete(elem) {
    const index = this.group.indexOf(elem);
    if (index !== -1)
      this.group.splice(index, 1);
  }

}