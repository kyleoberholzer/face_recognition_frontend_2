import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='br3'>
            <p className = 'f5'>
                {'Detect faces in your photos with the click of a button'} {/* Heading*/}
            </p>
            <div className='form center pa4 br3 shadow-5 bg-transparent'> {/* DIV for inpout and button*/} 
                <input 
                    className='f4 pa2 w-60 center bg-transparent bw1'
                    type='text'
                    placeholder ='Image URL'
                    onChange={onInputChange }
                />
                <button 
                    className='grow w-30 link f5 ph3 pv2 dib bg-transparent'
                    onClick={onButtonSubmit }
                    >
                        Process
                </button>
            </div> {/* end DIV for inpout and button*/} 
        </div>
    );
}

export default ImageLinkForm; 