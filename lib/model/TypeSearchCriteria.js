import { EntitySearchCriteria } from 'mosaic-dataset-facets';

export default class TypeSearchCriteria extends EntitySearchCriteria {

    static get indexKey(){ return 'types'; }
    static get indexFields(){
        return {
            "properties.type" : {
                "boost" : 15,
                "filter" : true
            }
        };
    }
    static get suggestionFields(){
        return {
            'label' : { boost: 2 },
            'tags' : { boost : 1 },
        };
    }
    get icon(){ return 'glyphicon glyphicon-star'; }
    runQuery(indexes, resultSet){
        const that = this;
        return super.runQuery(indexes, resultSet)
        .then(function(results){
// console.log('Type search results ', that.data, results);
            return results;
        });
    }

}
