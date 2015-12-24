export default class StateToUrlMapper {
    _trim(str){
        if (!str)
            return '';
        return str.replace(/^\s+|\s+$/gim, '');
    }
    parse(str){ return this.split(str); }
    split(str){
        str = str || '';
        let segments = str.split(/[\\\/]/);
        let result = {};
        let trim = this._trim.bind(this);
        segments.forEach(function(segment, pos) {
            let key = segment;
            let values;
            let idx = segment.indexOf('=');
            if (idx >= 0) {
                key = segment.substring(0, idx);
                let array = segment.substring(idx+1).split(/[,;]/gim);
                values = array.map(trim).map(decodeURIComponent);
            }
            key = trim(key);
            if (!key)
                return ;
//            if (values && values.length === 1) {
//                values = values[0];
//            }
            result[key] = values;
        });
        return result;
    }
    serialize(obj){
        obj = obj || {};
        let result = [];
        const keys = this._getKeys(obj);
        keys.forEach(function(key){
            if (!obj.hasOwnProperty(key))
                return ;
            let values = obj[key];
            if (!values){
                values = [];
            } else if (!Array.isArray(values)) {
                values = [values];
            }
            let segment = [];
            segment.push(key);
            values = values.map(encodeURIComponent);
            let str = values.join(',');
            if (str) {
                segment.push(str);
            }
            result.push(segment.join('='));
        });
        return result.join('/');
    }
    _getKeys(obj){
        return obj ? Object.keys(obj).sort() : [];
    }
}
