import React from 'react';
export default {
    defaultState : {
        locale : 'en',
        mode : 'desktop',
        ecosystem : 'all',
        community : 'all'
    },
    loading : {
        title: (
            <h4 style={{textAlign:'center', textTransform: 'uppercase'}}>
              App Title
            </h4>
        )
    },
    screenModes : {
        mobileWidth : 768,
// tabletWidth : 992,
        tabletWidth : 1200
    }
}
