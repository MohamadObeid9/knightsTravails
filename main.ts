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
const isValid = (x: number, y: number) => {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7; // Keep moves inside the board
};
const knightMoves = (start: number[], target: number[]) => {
  //if both start and target are valid continue;
  if (isValid(start[0], start[1]) && isValid(target[0], target[1])) {
    const queue = [start];
    const map = new Map();
    const visited = new Set(); //we add each node we pass by , so we don't pass by same the node two times
    visited.add(start.toString()); // Store visited positions as strings
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
    while (queue.length > 0) {
      const shifted = queue.shift();
      if (!shifted) return;
      let stop = false;
      const [x, y] = shifted;
      const set = new Array(); //array to hold the possible positions for each move

      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        const newPos = [newX, newY];
        if (target[0] === newPos[0] && target[1] === newPos[1]) {
          stop = true;
        }
        if (isValid(newX, newY) && !visited.has(newPos.toString())) {
          queue.push(newPos);
          set.push(newPos);
          visited.add(newPos.toString()); //enusre that we don't visit the same node two times
        }
      }
      if (set.length > 0) map.set(shifted, set);
      if (stop) break;
    }
    console.log(map);
    return findShortestPath(map, start, target);
  }
  return "Your move is unvalid"; //if both of start and target or one of them is invalid , return undefined
};
const findShortestPath = (
  map: Map<any, any>,
  start: number[],
  target: number[]
) => {
  const queue = [[start]];
  const visited = new Set();
  visited.add(start.toString());
  while (queue.length > 0) {
    const path = queue.shift();
    if (!path) return;
    const current = path[path.length - 1];
    if (current[0] === target[0] && current[1] === target[1]) {
      console.log(`You made it in ${path.length - 1} moves. Here's your path:`);
      console.log(path.map((pos) => `[${pos}]`).join(" -> "));
      return;
    }
    const positions: number[][] = map.get(current);
    if (!positions) {
      continue;
    }
    for (const position of positions) {
      if (!visited.has(position.toString())) {
        visited.add(position.toString());
        queue.push([...path, position]);
      }
    }
  }
  console.log("No path found.");
};
knightMoves([4, 3], [0, 7]);
/**
 * You made it in 4 moves. Here's your path:
 * [4,3] -> [6,4] -> [4,5] -> [2,6] -> [0,7]
 */
