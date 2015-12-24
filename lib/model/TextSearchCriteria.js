import { EntitySearchCriteria } from 'mosaic-dataset-facets';

export default class TextSearchCriteria extends EntitySearchCriteria {
    
    static get indexKey(){ return 'q'; }
    static get indexFields(){
        return {
            "properties.name" : {
                "boost" : 10,
                "suggest" : true // Use names to suggest values
            },
            "properties.description" : {
                "boost" : 5
            },
            "properties.tags" : {
                "boost" : 15,
                "filter" : true
            },
            "properties.address" : {
                "boost" : 1
            },
            "properties.postcode" : {
                "boost" : 1,
                "filter" : "prefix"
            },
            "properties.city" : {
                "boost" : 2
            },
            "properties.url" : {
                "boost" : 0.5
            }
        }
    }
    get icon(){ return 'glyphicon glyphicon-search'; }
}