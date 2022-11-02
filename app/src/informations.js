import React from "react";


export class Informations extends React.Component{



    render(){
        const energyBarStyle = {
            width: this.props.energy + '%',
        }
        return (
            <div className="informations">
                <img className='energyLogo' src='./energy.png' alt='energy'/>
                <div className="energy">
                    <div className="energyValue" style={energyBarStyle} >

                    </div>
                </div>
            </div>
        );
    }
}