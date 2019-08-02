import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import React, { Component } from 'react';


export default  class Spinner extends Component{

    render() {
        return (
            <OverlayLoader
                color={'red'} // default is white
                loader="ScaleLoader" // check below for more loaders
                text="Loading... Please wait!"
                active={false}
                backgroundColor={'black'} // default is black
                opacity=".4" // default is .9  
                // zIndex='999999999'
            >
            </OverlayLoader>
        )
    }
}