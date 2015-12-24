import { EntitySearchCriteria } from 'mosaic-dataset-facets';

export default class TagSearchCriteria extends EntitySearchCriteria {
    
    static get indexKey(){ return 'tags'; }
    static get indexFields(){
        return {
            "properties.tags" : {
                "boost" : 15,
                "filter" : "prefix",
                "suggest" : true // Use tags to suggestion
            },
        };
    }
    get icon(){ return 'glyphicon glyphicon-tag'; }
}