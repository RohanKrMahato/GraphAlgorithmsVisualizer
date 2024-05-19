import './App.css';
import { useEffect} from 'react';
import Navbar from './components/navbar/Navbar';
import Guidebar from './components/guidebar/Guidebar';
import Gridbox from './components/gridbox/Gridbox';
import generateMaze from './components/algorithms/mazegeneration';
import renderBFS from './components/algorithms/BFS';

var row;
var col;
var cells;
var Matrix;
var sourcecoordinate;
var targetcoordinate;
var delay = 15;
var renderState = { isrendered: false, visualizebtnactive:true }; // Wrap isrendered in an object
var isbuttonactive=true;

function renderBoard(cellwidth = 22) {
  renderState.isrendered=false;
  const board = document.getElementById('board');
  board.innerHTML = "";
  const root = document.documentElement; // note this step, this is for changing the css
  root.style.setProperty('--cell-width', `${cellwidth}px`);
  row = Math.floor(board.clientHeight / cellwidth);
  col = Math.floor(board.clientWidth / cellwidth);
  cells = [];
  Matrix = [];
  for (let i = 0; i < row; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    rowElement.setAttribute('id', `${i}`);
    let rowmat = [];
    for (let j = 0; j < col; j++) {
      const colElement = document.createElement('div');
      colElement.classList.add('col');
      colElement.setAttribute('id', `${i}-${j}`);
      cells.push(colElement);
      rowmat.push(colElement);
      rowElement.appendChild(colElement);
    }
    Matrix.push(rowmat);
    board.appendChild(rowElement);
  }

  // adding board interaction
  function isValid(x, y) {
    return (x >= 0 && y >= 0 && x < row && y < col);
  }

  function set(classname, x = -1, y = -1) {
    if (isValid(x, y)) {
      Matrix[x][y].classList.add(classname);
    } else {
      x = Math.floor(Math.random() * row);
      y = Math.floor(Math.random() * col);
      Matrix[x][y].classList.add(classname);
    }
    return { x, y };
  }

  sourcecoordinate = set('source');
  targetcoordinate = set('target');

  let Dragpoint = null;
  let isDrawing = false;
  let isDragging = false;
  let rightclick=false;
  let prevSource={...sourcecoordinate};
  let prevtarget={...targetcoordinate};

  cells.forEach(cell => {
    
    // dragging the source and the destination
    const pointerdown = (e) => {
      if(e.button===2){
        rightclick=true;
      }
      if (e.target.classList.contains('source')) {
        isDragging = true;
        Dragpoint = 'source';
      } else if (e.target.classList.contains('target')) {
        isDragging = true;
        Dragpoint = 'target';
      } else {
        isDrawing = true;
        if (e.target.classList.contains('wall')) e.target.classList.remove('wall');
        else {
          e.target.classList.add('wall');
        }
      }
    }
    // i want that when i right click and move, wall will erase, chat gpt please help me
    const pointermove = (e) => {
      if (isDrawing) {

        if(rightclick===true){
          if (!e.target.classList.contains(`source`) && !e.target.classList.contains(`target`)) {
            e.target.classList.remove('wall');
          }
        }
        else if (!e.target.classList.contains(`source`) && !e.target.classList.contains(`target`)) {
          e.target.classList.add('wall');
        }

      } else if (isDragging) {
        cells.forEach(cell => {
          cell.classList.remove(`${Dragpoint}`);
        });

        e.target.classList.add(`${Dragpoint}`);

        if (Dragpoint === 'source') {
          sourcecoordinate.x = +e.target.id.split('-')[0];
          sourcecoordinate.y = +e.target.id.split('-')[1];
        } else {
          targetcoordinate.x = +e.target.id.split('-')[0];
          targetcoordinate.y = +e.target.id.split('-')[1];
        }
      }
    }
    const pointerup = (e) => {

      if(((e.target.classList.contains('target')||e.target.classList.contains('source')) && e.target.classList.contains('wall'))||(e.target.classList.contains('target')&&e.target.classList.contains('source'))){
        
        alert("(1).Target/Source can't be placed on wall\n(2).Source and Target can't be placed on the same cell");
////////////////
        Matrix[sourcecoordinate.x][sourcecoordinate.y].classList.remove('source');
        Matrix[targetcoordinate.x][targetcoordinate.y].classList.remove('target');
        Matrix[prevSource.x][prevSource.y].classList.add('source');
        Matrix[prevtarget.x][prevtarget.y].classList.add('target');
/////////////////////////////////

        console.log(sourcecoordinate);
        console.log(targetcoordinate);
        console.log(prevSource);
        console.log(prevtarget);
        sourcecoordinate={...prevSource};
        targetcoordinate={...prevtarget};
      }
      if (renderState.isrendered === true && (e.target.classList.contains('source') || e.target.classList.contains('target'))) {
        renderBFS({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState });
      }
      prevSource={...sourcecoordinate};
      prevtarget={...targetcoordinate};

      isDragging = false;
      isDrawing = false;
      Dragpoint = null;
      rightclick=false;
    }

    cell.addEventListener('pointerdown', pointerdown);
    cell.addEventListener('pointermove', pointermove);
    cell.addEventListener('pointerup', pointerup);
  });
};

function restofthing() {
  console.log(Matrix);
  const clearPathBoardGeneratemaze = document.querySelectorAll('.nav-menu>li>a');

  clearPathBoardGeneratemaze.forEach(a => {
    console.log(a.innerText);
    let Text = a.innerText;
    let li = a.parentElement;
    if (Text === 'Clear Path' || Text === 'Clear Board' || Text === 'Generate Maze') li.addEventListener('click', () => {
      if (Text === 'Clear Path') {
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            Matrix[i][j].classList.remove('path');
            Matrix[i][j].classList.remove('visited');
            Matrix[i][j].classList.remove('renderedpath');
            Matrix[i][j].classList.remove('renderedvisited');
          }
        }
        renderState.isrendered=false;
      }
      if (Text === 'Clear Board') {

        if(isbuttonactive===true){

          renderBoard();      
          isbuttonactive=false;
          setTimeout(()=>{
            isbuttonactive=true;
          },1000);
      };
      renderState.isrendered=false;

      }

      if (Text === 'Generate Maze') {


        if(isbuttonactive===true){

          
        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            Matrix[i][j].classList.remove('path');
            Matrix[i][j].classList.remove('visited');
            Matrix[i][j].classList.remove('renderedpath');
            Matrix[i][j].classList.remove('renderedvisited');
          }
        }

        let remWal = document.querySelectorAll('.wall');
        remWal.forEach(x => {
          x.classList.remove('wall');
        })
        
        generateMaze(false, 0, row - 1, 0, col - 1, Matrix, row, col, (row < col) ? 'vertical' : 'horizontal');
        renderState.isrendered=false;

        console.log("appjs ka function");
          
            isbuttonactive=false;
            setTimeout(()=>{
              isbuttonactive=true;
            },1000);
          };


      }
    });

  })

  const speedcontrol = document.querySelectorAll('.drop-menu>li>a');

  speedcontrol.forEach(x => {
    let li = x.parentElement;
    let text = x.innerText;
    if (text === 'Slow') {
      li.addEventListener('click', () => {
        delay = 15;
        console.log(delay);
      });
    }
    if (text === 'Fast') {
      li.addEventListener('click', () => {
        delay = 2;
        console.log(delay);
      });
    }
    if (text === 'Normal') {
      li.addEventListener('click', () => {
        delay = 5;
        console.log(delay);
      });
    }
  });

  const visualizeBtn = document.querySelector('.btn');

visualizeBtn.addEventListener('click', () => {

// if(isbuttonactive===true){

if(renderState.isrendered===false && renderState.visualizebtnactive===true){

  console.log(renderState.isrendered);
  renderState.visualizebtnactive=false;
  renderBFS({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState });

  console.log(renderState.isrendered);

}

//     isbuttonactive=false;
//     setTimeout(()=>{
//       isbuttonactive=true;
//     },1000);
// };
    
  });

}

function App() {
  useEffect(() => {
    restofthing();
  }, []);

  return (
    <div className="template">
      <div>
        <Navbar renderBoard={renderBoard} />
        <Guidebar />
      </div>
      <Gridbox renderBoard={renderBoard} />
    </div>
  );
}

export default App;