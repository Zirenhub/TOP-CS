const gameBoard = () => {
  let board = [];
  for (let x = 1; x <= 8; x++) {
    let row = [];
    for (let y = 1; y <= 8; y++) {
      let cell = {};
      cell = convertNum(y) + x;
      row.push(cell);
    }
    board.push(row);
  }
  board.forEach((item) => {
    console.log(item);
  });
};

const knight = (start) => {
  let pos = start;

  let x = convertABC(pos.charAt(0));
  let y = Number(pos.charAt(1));

  let possibleMoves = [];

  let moves = [
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
  ];

  for (let m of moves) {
    let row = convertNum(x + m.x);
    let column = y + m.y;

    if (column > 8 || row === undefined || column === undefined) {
      console.log('invalid move');
    } else {
      possibleMoves.push(row + '' + column);
    }
  }
  console.log('Possible Coordinates:', possibleMoves);
};

const knightMoves = (start, goal) => {
  knight(start);
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

knightMoves('a8', 'b2');
