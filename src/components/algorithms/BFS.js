var visitedCell=[];
var pathtoanimate=[];

function BFS(row, col, matrix, source_cordinate, target_cordinate) {
    const queue = [];
    const visited = new Set();
    const childparent = new Map();
    pathtoanimate = [];
    visitedCell = [];
    queue.push(source_cordinate);
    visited.add(`${source_cordinate.x}-${source_cordinate.y}`);

    while (queue.length > 0) {
        const current = queue.shift();
        visitedCell.push(matrix[current.x][current.y]);
        // finding the target
        if (current.x === target_cordinate.x && current.y === target_cordinate.y) {
            getPath(childparent, target_cordinate, matrix);
            return;
        }

        const neighbours = [
            { x: current.x + 1, y: current.y },
            { x: current.x - 1, y: current.y },
            { x: current.x, y: current.y + 1 },
            { x: current.x, y: current.y - 1 }
        ];

        for (const neighbour of neighbours) {
            const key = `${neighbour.x}-${neighbour.y}`;
            const nx = neighbour.x;
            const ny = neighbour.y;
            if (isValid(nx, ny) && !visited.has(key) && !matrix[nx][ny].classList.contains('wall')) {
                queue.push(neighbour);
                visited.add(key);
                childparent.set(key, current);
            }
        }
    }

    function isValid(nx, ny) {
        return (nx >= 0 && nx < row && ny >= 0 && ny < col);
    };

}

function getPath(childparent, target, matrix) {
    if (!target) return;
    pathtoanimate.push(matrix[target.x][target.y]);
    const parent = childparent.get(`${target.x}-${target.y}`);
    getPath(childparent, parent, matrix);
}

function animate(elements, className,delay) {
    for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
            elements[i].classList.remove('visited');
            elements[i].classList.add(className);
            if (i === elements.length - 1 && className === 'visited') {
                // animate(pathtoanimate,'path');
                delay=25;
                for(let j=pathtoanimate.length-1; j>=0; j--){
                    setTimeout(()=>{
                        pathtoanimate[j].classList.remove('visited');
                        pathtoanimate[j].classList.add('path');
                    },(pathtoanimate.length-1-j)*delay);
                }
            }
        }, delay * i);
    }
};

function renderBFS(row, col, matrix, sc, tc, delay) {
    visitedCell = [];
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrix[i][j].classList.remove('path');
            matrix[i][j].classList.remove('visited');
        }
    }
    BFS(row, col, matrix, sc, tc);
    animate(visitedCell, 'visited',delay);
}

export default renderBFS;




// learn more about call back and setTime out