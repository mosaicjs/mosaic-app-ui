import React from 'react';
import { SelectionView } from 'mosaic-ui-autocomplete';

export default class SearchCriteriaSelectionView extends SelectionView {
    renderView(){
        const iconClass = this.item.icon;
        const key = this.item.indexKey + ':' + this.item.id;
        let icon;
        if (iconClass){
            icon = <i className={iconClass}></i>
        }
        return <span key={key}>{icon} {this.item.label}</span>;
    }
}