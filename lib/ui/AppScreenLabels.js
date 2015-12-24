import React from 'react';
export default {
    selectOptions : {
        placeholder: 'Type something...',
        searchPromptText: 'Enter a text',
        noResultsText: 'Nothing was found'
    },
    resultsTitle : function(size) {
        return (
            size ? <span>Results ({size})</span> : <span>No results</span>
        );
    }
}