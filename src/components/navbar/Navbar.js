import React, { useEffect } from 'react';
import './Navbar.css';

function App(props) {
    useEffect(() => {

        let curpixel=22;
        let curspeed=1;
        let curAlgorithm=0;
        const visualizebtn=document.querySelector('.btn');
        const navOptions = document.querySelectorAll('.nav-menu > li > a');
        // navOptions is a object contains lots of <a>
        navOptions.forEach(navOption => {
            // adding event listener to <a>
            navOption.addEventListener('click', () => {const li=navOption.parentElement;
                if(li.classList.contains('active')){
                    li.classList.remove('active');
                }
                else{
                    togglenavOptions(); 
                    li.classList.add('active');
                }
            });

        function togglenavOptions(){
            const togglenavoptions=document.querySelectorAll('.nav-menu > li');
            togglenavoptions.forEach(togglenavoption=>{
                togglenavoption.classList.remove('active');
            })
        }
        });
/////////////////////////////////////////
        function dropOptionstoggle(){
            const dropOptions=document.querySelectorAll('.drop-menu > li > a');
        dropOptions.forEach(dropOption=>{
            const li=dropOption.parentElement;
            li.classList.remove('active');
        });
        };

        const dropOptions=document.querySelectorAll('.drop-menu > li > a');
        dropOptions.forEach(dropOption=>{
            const li=dropOption.parentElement;
 
            dropOption.addEventListener('click',()=>{
                dropOptionstoggle();

                li.classList.add('active');

                const dropOption_pEpEpE=dropOption.parentElement.parentElement.parentElement;
                
                const navOptionText=dropOption_pEpEpE.firstChild.innerText;

                if(navOptionText==='Pixel')
                    // render the board here
                    {curpixel=integerconverter(li.innerText); props.renderBoard(curpixel);}

                if(navOptionText==='Speed')curspeed=integerconverter(li.innerText);
                if(navOptionText==='Algorithms'){curAlgorithm=integerconverter(li.innerText);
                    visualizebtn.innerText=li.innerText;
                }

                li.parentElement.parentElement.classList.remove('active');

                addactiveclasstoActive();
            });
        });

function addactiveclasstoActive(){
    dropOptions.forEach(dropOption=>{
        const li=dropOption.parentElement;
        const val=integerconverter(li.innerText);
        const dropOption_pEpEpE=dropOption.parentElement.parentElement.parentElement;
        const navOptionText=dropOption_pEpEpE.firstChild.innerText;
        if(navOptionText==='Pixel' && val===curpixel){li.classList.add('active');}
        if(navOptionText==='Speed' && val===curspeed){
            li.classList.add('active');
        }
        if(navOptionText==='Algorithms' && val===curAlgorithm){
            li.classList.add('active');
        }
    });
}
        function integerconverter(liinnertext){
            if(liinnertext==='14px')return 14;
            if(liinnertext==='16px')return 16;
            if(liinnertext==='18px')return 18;
            if(liinnertext==='20px')return 20;
            if(liinnertext==='22px')return 22;
            if(liinnertext==='24px')return 24;
            if(liinnertext==='26px')return 26;
            if(liinnertext==='Fast')return 3;
            if(liinnertext==='Medium')return 2;
            if(liinnertext==='Slow')return 1;
            if(liinnertext==='BFS')return 1;
            if(liinnertext===`Dijkstra's algorithm`)return 2;
            if(liinnertext==='Greedy BFS')return 3;
            if(liinnertext==='A* Algorithm')return 4;
        }
//////////////////////////////////////////////////

document.addEventListener('click', (e) => {
    const navOptionParents = document.querySelectorAll('.nav-menu > li');
    if (e.target.tagName !== 'A') {
        navOptionParents.forEach(navOptionparent => {
            navOptionparent.classList.remove('active');
        });
    }
});


    }, []);

    return (
        <>
            <nav>
                <div className='logobtnalign'>
                <a href='./index.html' className='logo'><div>Graph Algorithms</div> <div>Visualizer</div></a>
                <div className='btn' id='visualize'>Visualize</div>
                </div>
                
                <div>
                <ul className='nav-menu'>
                    <li><a href='#'>Clear Path</a></li>
                    <li><a href='#'>Clear Board</a></li>
                    <li><a href='#'>Generate Maze</a></li>
                    <li className='drop-box'>
                        <a href='#'>Pixel <span className='caret'></span></a>
                        <ul className='drop-menu'>
                            <li><a href='#'>14px</a></li>
                            <li><a href='#'>16px</a></li>
                            <li><a href='#'>18px</a></li>
                            <li><a href='#'>20px</a></li>
                            <li><a href='#'>22px</a></li>
                            <li><a href='#'>24px</a></li>
                            <li><a href='#'>26px</a></li>
                        </ul>
                    </li>
                    <li className='drop-box'>
                        <a href='#'>Speed <span className='caret'></span></a>
                        <ul className='drop-menu'>
                            <li><a href='#'>Slow</a></li>
                            <li><a href='#'>Normal</a></li>
                            <li><a href='#'>Fast</a></li>
                        </ul>
                    </li>
                    <li className='drop-box'>
                        <a href='#'>Algorithms <span className='caret'></span></a>
                        <ul className='drop-menu'>
                            <li><a href='#'>BFS</a></li>
                            <li><a href='#'>Dijkstra's algorithm</a></li>
                            <li><a href='#'>Greedy BFS</a></li>
                            <li><a href='#'>A* Algorithm</a></li>
                        </ul>
                    </li>
                </ul>
                </div>
                
            </nav>
        </>
    );
}

export default App;
