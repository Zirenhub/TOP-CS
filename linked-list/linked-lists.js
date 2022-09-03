class Node {
  constructor(value) {
    this.value = value;
  }
}

class LinkedList {
  constructor(head) {
    this.HEAD = head;
    this.HEAD.nextNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    let temp = this.HEAD;

    while (temp.nextNode != null) {
      temp = temp.nextNode;
    }

    temp.nextNode = newNode;
  }

  prepend(value) {
    const newHead = new Node(value);

    newHead.nextNode = this.HEAD;
    this.HEAD = newHead;
  }

  size() {
    let temp = this.HEAD;
    let counter = 1;

    while (temp.nextNode != null) {
      counter++;
      temp = temp.nextNode;
    }

    return counter;
  }

  head() {
    return this.HEAD;
  }

  tail() {
    let temp = this.HEAD;

    while (temp.nextNode != null) {
      temp = temp.nextNode;
    }

    return temp;
  }

  at(index) {
    let temp = this.HEAD;
    let counter = 0;

    while (temp.nextNode != null) {
      counter++;
      if (counter === index) {
        return temp;
      }
      temp = temp.nextNode;
    }

    return temp;
  }

  pop() {
    let temp = this.HEAD;
    let prev = temp;

    while (temp.nextNode != null) {
      prev = temp;
      temp = temp.nextNode;
    }

    temp = prev;
    temp.nextNode = null;

    return temp;
  }

  contains(value) {
    let temp = this.HEAD;
    if (temp.value === value) return true;

    while (temp.nextNode != null) {
      temp = temp.nextNode;
      if (temp.value === value) return true;
    }

    return false;
  }

  find(value) {
    let temp = this.HEAD;
    let index = 1;
    if (temp.value === value) return index;

    while (temp.nextNode != null) {
      index++;
      temp = temp.nextNode;
      if (temp.value === value) return index;
    }

    return null;
  }

  insertAt(value, index) {
    if (index < 1 || index > this.size()) return false;
    if (index === this.size()) return this.append(value);
    if (index === 1) return this.prepend(value);

    let newNode = new Node(value);

    let prev = this.at(index - 1);
    let prevNext = prev.nextNode;
    prev.nextNode = newNode;
    newNode.nextNode = prevNext;
    return true;
  }

  removeAt(index) {
    if (index < 1 || index >= this.size()) return undefined;
    if (index === this.size() - 1) return this.pop();
    if (index === 1) {
      let temp = this.HEAD;
      this.HEAD = temp.nextNode;

      return temp;
    }

    let prev = this.at(index - 1);
    let removed = prev.nextNode;
    prev.nextNode = removed.nextNode;
    return removed;
  }

  toString() {
    let temp = this.HEAD;
    let oneLine = `(${temp.value}) -> `;

    while (temp.nextNode != null) {
      temp = temp.nextNode;
      oneLine += `(${temp.value}) -> `;
    }

    console.log(oneLine);
  }
}

let HEAD = new Node('Head');
const newList = new LinkedList(HEAD);

newList.append('1');
newList.append('2');
newList.append('3');
newList.append('4');
newList.append('5');

// // newList.prepend('prepended head');
// // newList.pop();

// console.log('-------------------------------');

// // console.log(newList.size());
// // console.log(newList.head());
// // console.log(newList.tail());
// // console.log(newList.at(4));
// // console.log(newList.contains('2'));
// // console.log(newList.find('3'));

// // console.log(newList.size());
// console.log(newList.toString());
// console.log(newList.insertAt('inserted', 3));

// console.log('-------------------------------');

// console.log(newList.toString());

// console.log('-------------------------------');
// console.log(newList.removeAt(1));
// console.log(newList.toString());
