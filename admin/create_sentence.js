/**
 * Created by пользователь on 17.02.16.
 */
var create_sentence = {
    HTML:{
        btn_rus_save: lib.$('create_sentence_rus_save'),
        input_rus_save: lib.$('create_sentence_rus')
    },
    _constructor : function(){
        this.HTML.btn_rus_save.onclick = this.onBtnRusSaveClick;
        this.init();
    },
    init: function(){
        this.input = new this.WordInput( {parent: lib.$('create_sentence_eng_container')});
    },
    onBtnRusSaveClick : function(e){
        var _self = create_sentence;
        var params = {
            text_ru: _self.HTML.input_rus_save.value
        };
        if( params.text_ru ){
            lib.ajax('handler.php', 'create_sentence_rus', function(){
                console.log(this);
            }, params);
        }

    },
    WordInput: function(params){
        var _self = this;
        this.parent = params.parent || null;
        this.container = lib.create('DIV', null, {className: 'suggestions_container'});
        this.element = lib.create('INPUT', null, null);
        this.suggestions = lib.create('DIV', null, {className: 'suggestions_div'});

        this.element.onkeyup = function(){
            var len = this.value.length;
            if(!this.is_request && len>3){
                this.is_request = true;
                setTimeout(getWords.bind(this), 100);
            }
        };

        function getWords(){
            var _input = this;
            var params = {
                word: _input.value
            };
            lib.ajax('handler.php', 'get_words', onWordsReceive, params);

            function onWordsReceive(){
                var options = getSuggestions(this.JSON);
                lib.$(_self.suggestions).clear();
                _self.suggestions.appendChild(options);
                _input.is_request = false;
            }
            function getSuggestions(arr){
                var frag = document.createDocumentFragment();
                arr.forEach(function(item){
                    var span = lib.create('SPAN', item.word, {className: 'suggestion', id: item.id});
                    frag.appendChild(span);
                });
                return frag;
            }
        }

        if(this.parent instanceof HTMLElement){
            this.container.appendChild(this.element);
            this.container.appendChild(this.suggestions);
            this.parent.appendChild(this.container);

        }
        return this;
    }
};

create_sentence._constructor();














