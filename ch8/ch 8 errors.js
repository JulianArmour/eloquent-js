"use strict";

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}

let p1 = new Person("potato");
p1.say();

let say = p1.say.bind(p1);
say();
