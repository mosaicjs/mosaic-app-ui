import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise';
import { Adaptable } from 'mosaic-adapters';
import LanguageLabels from './LanguageLabels';
import AppScreenView from './AppScreenView';

export default class AppScreen extends Adaptable {

    constructor(options){
        super({adapters: options.app.adapters});
        this.options = this.props = options || {};
        this.app = this.options.app;
    }

    render(params) {
        const that = this;
        if (!this._renderPromise){
            this._renderPromise = new Promise(function(resolve, reject){
                const screen = that.renderScreen();
                ReactDOM.render(screen, that.options.container, function(err){
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
        return this._renderPromise;
    }

    activate(params){
// console.log('* activate', params);
        this._checkAppState();
        return this.render(params);
    }
    update(params, oldParams){
// console.log('* update', params);
        this._checkAppState();
        return this.render(params);
    }
    deactivate(params){
// console.log('* deactivate', params);
        const that = this;
        let result = this._renderPromise;
        delete this._renderPromise;
        if (result) {
            result = result.then(new Promise(function(resolve, reject){
                setTimeout(function(){
                    try {
                        ReactDOM.unmountComponentAtNode(that.options.container);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }, 1);
            }));
        } else {
            result = Promise.resolve();
        }
        return result;
    }

    renderScreen(){
        const ScreenView = this.options.ScreenView || AppScreenView;
        return <ScreenView {...this.options} app={this.app} />
    }

    _checkAppState(){
        const messages = this.app.getMessages('LanguageLabels', LanguageLabels);
        const locale = this.app.locale || '';
        const languages = Object.keys(messages.languages);
        if (languages.indexOf(locale) < 0 && locale !== messages.defaultLanguage) {
            this.app.setState({ locale : messages.defaultLanguage });
        }
    }
}
