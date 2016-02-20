var lib = {
    shuffle: function (array) {
        return array.sort(function () {
            return .5 - Math.random();
        });
    },
    showHint: function (txt) {
        console.log(txt);
    },
    $: function (id) {
        var el = (id instanceof HTMLElement) ? id : document.getElementById(id);

        if (!el) {
            console.log('no such element with id=' + id);
            return false;
        }

        el.append = function (child) {
            var span;
            if (child instanceof HTMLElement || child instanceof DocumentFragment) {
                this.appendChild(child);
            }
            else if( typeof child == 'string'){
                span = document.createElement('SPAN');
                span.appendChild(document.createTextNode(child));
                this.appendChild( span );
            }
            return this;
        };
        el.clear = function(){
            while(this.childNodes.length){
                this.removeChild(this.childNodes[0])
            }
            return this;
        };
        el.css = function(params){
            for(var key in params){
                if(params.hasOwnProperty(key)){
                    var camel_case_key = key.replace(/-[(a-z)]/g, function(match){return match.charAt(1).toUpperCase()});
                    el.style[camel_case_key] = params[key];
                }
            }
        };

        return el;
    },
    create: function(tag_name, text, properties){
        var el = document.createElement(tag_name.toUpperCase());
        if(text){
            el.appendChild(document.createTextNode(text));
        }
        if(properties){
            for(var key in properties){
                if(properties.hasOwnProperty(key)){
                    if( el[key] !== undefined ){
                        el[key] = properties[key];
                    }
                    else{
                        el.dataset[key] = properties[key];
                    }
                }
            }
        }
        return el;
    },

    ajax: function( file_name, action, callback, parameters){
            var xhr = new XMLHttpRequest();
            var formData = new FormData();

            xhr.onload = xhr.onerror = function() {
                if(this.status != 200) {
                    console.log('error '+this.responseText);
                    return;
                }
                if(this.responseText){
                    this.JSON = JSON.parse(this.responseText);
                    if(this.JSON[0] && this.JSON[0]['error']){
                        alert('Ошибка номер '+this.JSON[0].error+': '+this.JSON[0].error_text||'' );
                    }

                    if(callback && callback instanceof Function){

                        callback.call(this);
                    }
                }
            };
            if(parameters){
                for(var key in parameters){
                    if(parameters.hasOwnProperty(key)){
                        formData.append(key, parameters[key]);
                    }
                }
            }

            xhr.open("POST", file_name+'?action='+action, true);
            xhr.send(formData);

    }
};
