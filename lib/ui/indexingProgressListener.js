import React from 'react';
import { ProgressBar, PopupPanel }  from 'mosaic-ui';

export default function(options) {
    return function(intent){
        const id = PopupPanel.instance.openPopup({
            body: ( 
                <div>
                    {options.title}
                    <ProgressBar events={intent} />
                </div>
            ),
            // footer : 'footer'
        });
        function close(){
            setTimeout(function(){
                PopupPanel.instance.closePopup({id});
            }, 500);
        }
        intent.then(close, close);
    };
} 
