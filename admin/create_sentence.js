/**
 * Created by пользователь on 17.02.16.
 */
var create_sentence = {
    HTML: {
        btn_rus_save: lib.$('create_sentence_rus_save'),
        next_action: lib.$('create_sentence_next_action')
    },
    _constructor: function () {
        this.HTML.btn_rus_save.onclick = this.onBtnRusSaveClick;
        this.HTML.next_action.onclick = this.onNextActionClick.bind(this);
        this.init();
    },
    init: function () {
        this.Parts = [];
        this.Parts.push(
            new this.WordInput({parent: lib.$('create_sentence_eng_container')})
        );
    },
    onBtnRusSaveClick: function (e) {
        var _self = create_sentence;
        var params = {
            text_ru: _self.HTML.input_rus_save.value
        };
        if (params.text_ru) {
            lib.ajax('handler.php', 'create_sentence_rus', function () {
                console.log(this);
            }, params);
        }
    },
    onNextActionClick: function(e){
        var t = e && e.target;
        if (!t || !t.dataset['action']) {
            return;
        }
        switch (t.dataset['action']){
            case 'add' : new this.WordInput({parent: lib.$('create_sentence_eng_container')});break;
            case 'stop' : alert('Заканчиваем?');break;
        }

    },
    WordInput: function (params) {
        var _self = this;
        this.parent = params.parent || null;
        this.complete = false;//TODO: тут возможно он будет сразу загружаться - при редактировании например.
        this.container = lib.create('DIV', null, {className: 'input_container'});
        this.element = lib.create('INPUT', null, null);
        this.suggestions = lib.create('DIV', null, {className: 'suggestions_div'});
        this.save = lib.create('DIV', "ok", {className: 'btn_save'});

        this.suggestions.addEventListener('click', onSuggestionsClick.bind(this), false);
        this.save.addEventListener('click', onSaveClick.bind(this), false);
        this.element.onkeyup = function () {
            var len = this.value.length;
            if (!this.is_request && len >= 3 && this.value != this.last_value) {
                this.is_request = true;
                setTimeout(getWords.bind(this), 100);
            }
        };
        if (this.parent instanceof HTMLElement) {
            this.container.appendChild(this.element);
            this.container.appendChild(this.save);
            this.container.appendChild(this.suggestions);
            this.parent.appendChild(this.container);
        }
        return this;

        //functions
        function getWords() {
            var _input = this;
            var params = {
                word: _input.value
            };
            this.last_value = _input.value;
            lib.ajax('handler.php', 'get_words', onWordsReceive, params);

            function onWordsReceive() {
                var options;
                var suggestions = lib.$(_self.suggestions);

                _self.Words = this.JSON.sort(function (a, b) {
                    return a.word > b.word ? 1 : -1;
                });

                if(!_self.Words.length){
                    suggestions.classList.remove('visible');
                }
                else{
                    suggestions.classList.add('visible');
                }
                options = getSuggestions();
                suggestions.clear().append(options);

                _input.is_request = false;
            }

            function getSuggestions() {
                var frag = document.createDocumentFragment();

                _self.Words.forEach(function (item) {
                    var span = lib.create('SPAN', item.word, {className: 'suggestion', id: item.id, word: item.word});
                    frag.appendChild(span);
                });

                return frag;
            }
        }

        function onSuggestionsClick(e) {
            var t = e && e.target;
            if (!t || !t.classList.contains('suggestion')) {
                return;
            }
            this.element.value = t.dataset['word'];
            this.suggestions.classList.remove('visible');
        }

        function onSaveClick(e) {
            var params = {
                word: this.element.value,
                type_id: 2
            };

            lib.ajax('handler.php', 'save_word', _result, params);
            function _result(){
                if(this.JSON[0].id>0){
                    this.complete = true;
                }

                console.log(this);
            }

        }


    }
};

create_sentence._constructor();














