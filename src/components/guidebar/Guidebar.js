import React from 'react'
import './Guidebar.css'
function app(){
    return (
       <>
        <div className='guide-bar'>
            <div className='guidenav'>
                <div className='source' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Start Node</div>
            </div>
            <div className='guidenav'>
                <div className='target' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Target Node</div>
            </div>
            <div className='guidenav'>
                <div className='unvisited' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Start Node</div>
            </div>
            <div className='guidenav'>
                <div className='visited' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Start Node</div>
            </div>
            <div className='guidenav'>
                <div className='wall' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Start Node</div>
            </div>
            <div className='guidenav'>
                <div className='path' style={{width:'25px',height:'25px',"margin-right":'5px'}}></div>
                <div>Start Node</div>
            </div>
        </div>
       </>
    );
}
export default app;