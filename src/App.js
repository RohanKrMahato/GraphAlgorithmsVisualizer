import './App.css';
import Navbar from './components/navbar/Navbar'
import Guidebar from './components/guidebar/Guidebar'
import Gridbox from './components/gridbox/Gridbox'
import generateMaze from './components/algorithms/mazegeneration';
import renderBFS from './components/algorithms/BFS';

function renderBoard(cellwidth=22) {
  const board = document.getElementById('board');
  board.innerHTML="";
  const root=document.documentElement;// note this step, this is for changing the css
  root.style.setProperty('--cell-width',`${cellwidth}px`)
  let row = Math.floor(board.clientHeight / cellwidth);
  let col = Math.floor(board.clientWidth / cellwidth);
  let cells = [];
  let Matrix=[];
  for (let i = 0; i < row; i++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');
      rowElement.setAttribute('id', `${i}`);
      let rowmat=[]
      for (let j = 0; j < col; j++) {
          const colElement = document.createElement('div');
          colElement.classList.add('col');
          colElement.setAttribute('id', `${i}-${j}`);
          cells.push(colElement);
          rowmat.push(colElement);
          rowElement.appendChild(colElement);
      };
      Matrix.push(rowmat);
      board.appendChild(rowElement);
  };

  // adding board interaction
  function isValid(x,y){
    return(x>=0 && y>=0 && x<row && y<col);
  }
function set(classname, x=-1, y=-1){
  if(isValid(x,y)){
    Matrix[x][y].classList.add(classname);
  }else{
    x=Math.floor(Math.random()*row);
    y=Math.floor(Math.random()*col);
    Matrix[x][y].classList.add(classname);
  }
  return {x,y};
}
  
  let sourcecoordinate=set('source');
  let targetcoordinate=set('target');

  
  let Dragpoint=null;
  let isDrawing=false;
  let isDragging=false;

  cells.forEach(cell=>{
     // dragging the sourece and the destination
    const pointerdown=(e)=>{
      if(e.target.classList.contains('source')){isDragging=true;
        Dragpoint='source';
      }
      else if(e.target.classList.contains('target')){
        isDragging=true;
        Dragpoint='target';
      }
      else {isDrawing=true;
        if(e.target.classList.contains('wall'))e.target.classList.remove('wall');
        else{
          e.target.classList.add('wall');
        }
      }
    }
    const pointermove=(e)=>{
      if(isDrawing){
        if(!e.target.classList.contains(`source`) && !e.target.classList.contains(`target`)){

          e.target.classList.add('wall');
        
      }
      }
      else if(isDragging){
        cells.forEach(cell=>{
          cell.classList.remove(`${Dragpoint}`);
        });

        e.target.classList.remove('wall');
        e.target.classList.add(`${Dragpoint}`);

        if(Dragpoint==='source'){sourcecoordinate.x=+e.target.id.split('-')[0];
        sourcecoordinate.y=+e.target.id.split('-')[1];}
        else {targetcoordinate.x=+e.target.id.split('-')[0];
        targetcoordinate.y=+e.target.id.split('-')[1];
      }
      }
    }
    const pointerup=(e)=>{
  
      isDragging=false;
      isDrawing=false;
      Dragpoint=null;
    }

    cell.addEventListener('pointerdown',pointerdown);
    cell.addEventListener('pointermove',pointermove);
    cell.addEventListener('pointerup',pointerup);

  });

  const clearPathBoardGeneratemaze=document.querySelectorAll('.nav-menu>li>a');
  
  clearPathBoardGeneratemaze.forEach(a=>{
   console.log(a.innerText);
   let Text=a.innerText;
   let li=a.parentElement;
   if(Text==='Clear Path' || Text==='Clear Board' || Text==='Generate Maze')li.addEventListener('click',()=>{
    if(Text==='Clear Path'){
      for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            Matrix[i][j].classList.remove('path');
            Matrix[i][j].classList.remove('visited');
        }
    }
    }
    if(Text==='Clear Board'){
      renderBoard();
    }
    if(Text==='Generate Maze'){
      let remWal=document.querySelectorAll('.wall');
      remWal.forEach(x=>{
        x.classList.remove('wall');
      })

      generateMaze(false,0, row - 1, 0, col - 1, Matrix,row,col,(row<col)?'vertical':'horizontal');

      console.log("appjs ka function");
    }
   });
   
  })

  const visualizeBtn=document.querySelector('.btn');
  
  visualizeBtn.addEventListener('click',()=>{renderBFS(row,col,Matrix,sourcecoordinate,targetcoordinate);})
};


function App() {
  return (
    <div className="template">
      <div>
      <Navbar renderBoard={renderBoard}/>
      <Guidebar/>
      </div>
      <Gridbox renderBoard={renderBoard}/>
    </div>
  );
}

export default App;
