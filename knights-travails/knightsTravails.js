class Knight {
  constructor(start, goal) {
    this.start = start;
    this.goal = goal;
    this.possibleMoves = [];
    this.temp = [];
    this.found = false;
    this.moves = [
      { x: 2, y: -1 },
      { x: 2, y: 1 },
      { x: 1, y: -2 },
      { x: 1, y: 2 },
      { x: -2, y: -1 },
      { x: -2, y: 1 },
      { x: -1, y: -2 },
      { x: -1, y: 2 },
    ];
  }

  move(pos = this.start, goal = this.goal) {
    let x = convertABC(pos.charAt(0));
    let y = Number(pos.charAt(1));

    for (let m of this.moves) {
      if (this.found === true) {
        return;
      }
      let row = convertNum(x + m.x);
      let column = y + m.y;
      let possibleMove = row + '' + column;
      if (possibleMove === goal) {
        console.log(`${this.temp}`);
        console.log(`MATCH! ${pos} goes to ${possibleMove}`);
        this.found = true;
        return true;
      }

      let findCell = false;

      board.some((cell) => {
        if (possibleMove === cell) {
          findCell = true;
        }
      });

      if (!findCell) {
        continue;
      } else {
        const find = this.possibleMoves.find(
          (item) => item === possibleMove
        );
        if (find) {
          findCell = false;
        } else {
          findCell = false;
          this.possibleMoves.push(possibleMove);
          this.possibleMoves.some((move) => {
            let temp = `${pos} goes to ${move}`;
            this.temp.push(temp);
            return this.move(move);
          });
        }
      }
    }
  }
}

let board = [];
const gameBoard = () => {
  for (let x = 1; x <= 8; x++) {
    // let row = [];
    for (let y = 1; y <= 8; y++) {
      let cell = {};
      cell = convertNum(y) + x;
      board.push(cell);
    }
    // board.push(row);
  }
  //   board.forEach((item) => {
  //     console.log(item);
  //   });
  console.log(board);
};

const knightMoves = (start, goal) => {
  let newKnight = new Knight(start, goal);
  newKnight.move(start, goal);
};

const convertNum = (x) => {
  if (x === 1) {
    return 'a';
  }
  if (x === 2) {
    return 'b';
  }
  if (x === 3) {
    return 'c';
  }
  if (x === 4) {
    return 'd';
  }
  if (x === 5) {
    return 'e';
  }
  if (x === 6) {
    return 'f';
  }
  if (x === 7) {
    return 'g';
  }
  if (x === 8) {
    return 'h';
  }
};

const convertABC = (v) => {
  if (v === 'a') {
    return 1;
  }
  if (v === 'b') {
    return 2;
  }
  if (v === 'c') {
    return 3;
  }
  if (v === 'd') {
    return 4;
  }
  if (v === 'e') {
    return 5;
  }
  if (v === 'f') {
    return 6;
  }
  if (v === 'g') {
    return 7;
  }
  if (v === 'h') {
    return 8;
  }
};

gameBoard();

knightMoves('a1', 'd4');
