import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className = 'pt1'>
            <div className='black f4'>
                {`Welcome ${name}, your current entry count is...# ${entries}`}
            </div>
        </div>
    )
}

export default Rank;