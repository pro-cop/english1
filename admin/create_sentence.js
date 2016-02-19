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
        this.element = document.createElement('INPUT');
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
            lib.ajax('handler.php', 'get_words', function(){
                console.log(params.word + ' '+ _input.value);
                _input.is_request = false;
            }, params);
        }
        if(this.parent instanceof HTMLElement){
            this.parent.appendChild(this.element);
        }
        return this;
    }
};

create_sentence._constructor();














