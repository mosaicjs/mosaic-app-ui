export default {
    languages : {
        'fr' : 'fr',
        'en' : 'en',
    },
    defaultLanguage : 'fr',
    
    getLangLabel : function(lang){
        const labels = this.languages || {};
        return labels[lang] || lang;
    },
    getLanguageKeys: function(){
        return Object.keys(this.languages || {});
    }
}
