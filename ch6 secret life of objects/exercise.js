class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(elem) {
    const index = this.members.indexOf(elem);
    if (index !== -1)
      this.members.splice(index, 1);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(iterable) {
    const group = new Group();
    iterable.forEach(group.add, group);
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.members = group.members;
    this.index = 0;
  }

  next() {
    if (this.index === this.members.length)
      return {done: true};
    return {value: this.members[this.index++], done: false};
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
