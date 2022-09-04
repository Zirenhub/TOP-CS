class Knight {
  constructor(start, goal) {
    this.start = start;
    this.goal = goal;
    this.checked = [];
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

  checkWin(possibleMove, goal, pos) {
    if (possibleMove === goal) {
      console.log(`MATCH! ${pos} goes to ${possibleMove}`);
      return true;
    }
  }

  move(pos = this.start, goal = this.goal) {
    this.play((pos = this.start), (goal = this.goal));
    let moveToTest = possibleMoves;
    moveToTest.some((m) => {
      this.move(m);
    });
  }

  play(pos, goal) {
    let x = convertABC(pos.charAt(0));
    let y = Number(pos.charAt(1));
    let row;
    let column;
    let possibleMove;
    let possibleMoves = [];

    for (let m of this.moves) {
      row = convertNum(x + m.x);
      column = y + m.y;
      possibleMove = row + '' + column;

      let validCell = false;
      let skipCell = false;

      this.checked.some((cell) => {
        if (cell === possibleMove) {
          skipCell = true;
          return true;
        }
      });

      board.some((cell) => {
        if (cell === possibleMove) {
          validCell = true;
          return true;
        }
      });

      if (validCell === false || skipCell === true) {
        continue;
      }

      this.checked.push(possibleMove);

      // let temp = `${pos} goes to ${possibleMove}`;
      console.log(`${pos} goes to ${possibleMove}`);

      if (this.checkWin(possibleMove, goal, pos)) {
        return true;
      }

      possibleMoves.push(possibleMove);
    }
    // this.play(possibleMoves);
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

knightMoves('h1', 'a8');
