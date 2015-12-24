import Request from 'superagent';
import Promise from 'promise';
export default class DataLoader {
    load(path){
        return new Promise(function(resolve, reject){
            return Request
                .get(path)
                .set('Accept', 'application/json')
                .end(function(err, res){
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(res.body);
                    }
                });
        });
    }
}
