module.exports = function solveSudoku(matrix) {
  try {
    solved(matrix);
  } catch (tmpmatr) {
    return tmpmatr;
  }
};

function solved(matrix) {
  let i = 0,
    j = 0,
    possibleArray = {};
  let flag = false;
  let tmpMatr = matrix;
  if (isFull(tmpMatr)) throw tmpMatr;
  else {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (!tmpMatr[x][y]) {
          i = x;
          j = y;
          flag = true;
          break;
        }
        if (flag) break;
      }
    }
    possibleArray = PossibleEntries(tmpMatr, i, j);
    for (let x = 1; x < 10; x++)
      if (possibleArray[x]) {
        tmpMatr[i][j] = possibleArray[x];
        solved(tmpMatr);
      }
    matrix[i][j] = 0;
  }
}

function isFull(matrix) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!matrix[i][j]) return false;
    }
  }
  return true;
}

function PossibleEntries(matrix, i, j) {
  possibleArray = {};
  for (let x = 1; x < 10; x++) possibleArray[x] = 0;

  for (let y = 0; y < 9; y++) {
    if (matrix[i][y]) {
      possibleArray[matrix[i][y]] = 1;
    }
  }

  for (let x = 0; x < 9; x++) {
    if (matrix[x][j]) {
      possibleArray[matrix[x][j]] = 1;
    }
  }
  let firstOfBlockX = 0,
    firstOfBlockY = 0;

  if (i >= 0 && i <= 2) firstOfBlockX = 0;
  else if (i >= 3 && i <= 5) firstOfBlockX = 3;
  else firstOfBlockX = 6;
  if (j >= 0 && j <= 2) firstOfBlockY = 0;
  else if (j >= 3 && j <= 5) firstOfBlockY = 3;
  else firstOfBlockY = 6;

  for (let x = firstOfBlockX; x < firstOfBlockX + 3; x++) {
    for (let y = firstOfBlockY; y < firstOfBlockY + 3; y++) {
      if (matrix[x][y]) {
        possibleArray[matrix[x][y]] = 1;
      }
    }
  }
  for (let x = 1; x < 10; x++) {
    if (!possibleArray[x]) {
      possibleArray[x] = x;
    } else possibleArray[x] = 0;
  }
  return possibleArray;
}
