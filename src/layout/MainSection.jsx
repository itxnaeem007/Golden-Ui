import React from 'react';
import Main from './../view/mint/Main';
import './MainSection.scss'

class MainSection extends React.Component {
    render() {
        return (
            <div className='upper-div'>
                <div className='main-section'>
                    <Main />
                </div>
            </div>
        );
    }
}

export default MainSection;