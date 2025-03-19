const mat = Array.from({ length: 8 }, () => Array(8).fill(0));
const displayMatrix = (mat: number[][]) => {
  for (const row of mat) {
    console.log(row.join(" "));
  }
};
mat[4][3] = 1;
/**
 * mat[2][2]
 * mat[2][4]
 * mat[6][2]
 * mat[6][4]
 * mat[3][1]
 * mat[3][5]
 * mat[5][1]
 * mat[5][5]
 */
/**
 * mat[3][1]
 * mat[2][3]
 * mat[1][5]
 * mat[0][7]
 */
/**
 * mat[2][4]
 * mat[0][5]
 * mat[6][2]
 * mat[0][7]
 */
mat[0][7] = 1;
displayMatrix(mat);

function knightShortestPath(start, target) {
  if (start[0] === target[0] && start[1] === target[1]) {
    return 0; // Already at the destination
  }

  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const queue: number[][] = [[...start, 0]]; // (x, y, moves)
  const visited = new Set();
  visited.add(start.toString()); // Store visited positions as strings

  while (queue.length > 0) {
    const [x, y, moves] = queue.shift();

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newPos = [newX, newY];

      if (newX === target[0] && newY === target[1]) {
        return moves + 1; // Found the shortest path
      }

      if (isValid(newX, newY) && !visited.has(newPos.toString())) {
        queue.push([newX, newY, moves + 1]);
        visited.add(newPos.toString());
      }
    }
  }

  return -1; // This should never happen on a finite board
}

function isValid(x: number, y: number) {
  return x >= 1 && x <= 8 && y >= 1 && y <= 8; // Keep moves inside the board
}

// Example usage:
const start = [4, 3]; // (a1) in chess notation
const target = [0, 7]; // (h8) in chess notation
console.log("you made it in " + knightShortestPath(start, target) + " steps");
