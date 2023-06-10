import React from 'react';
import Presale from './../view/whitelist/index';
import './MainSection.scss'

class PreSaleSection extends React.Component {
    render() {
        return (
            <div className='upper-div'>
                <div className='main-section'>
                    <Presale />
                </div>
            </div>
        );
    }
}

export default PreSaleSection;