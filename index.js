var Words = {
    noun: [
        'cat', 'dog', 'bears', 'chicken', 'nose', 'ear', 'eye'
    ],
    verb1: [
        'has', 'have', 'had', 'can', 'hab', 'hev', 'hes', 'hav'
    ],
    verb2: [
        'got', 'get', 'dot', 'det', 'god', 'gof', 'get', 'gev'
    ],
    pronoun: [
        'I', 'you', 'we', 'they', 'he', 'she', 'it'
    ],
    article: [
        'my', 'his', 'her', 'our', 'its', 'your', 'a', 'an', 'the', ''
    ]
};

var Samples = [
    {
        ru: 'У тебя есть собака?',
        stop: '?',
        eng: [
            {type: 'verb1', word: 'have'},
            {type: 'pronoun', word: 'you'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: 'a'},
            {type: 'noun', word: 'dog'}
        ]
    },
    {
        ru: 'У нас есть кошка?',
        stop: '?',
        eng: [
            {type: 'verb1', word: 'have'},
            {type: 'pronoun', word: 'we'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: 'a'},
            {type: 'noun', word: 'cat'}
        ]
    },
    {
        ru: 'У нее есть глаз?',
        stop: '?',
        eng: [
            {type: 'verb1', word: 'has'},
            {type: 'pronoun', word: 'she'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: 'an'},
            {type: 'noun', word: 'eye'}
        ]
    },
    {
        ru: 'У него есть курица?',
        stop: '?',
        eng: [
            {type: 'verb1', word: 'has'},
            {type: 'pronoun', word: 'he'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: 'a'},
            {type: 'noun', word: 'chicken'}
        ]
    },
    {
        ru: 'У них есть медведи?',
        stop: '?',
        eng: [
            {type: 'verb1', word: 'have'},
            {type: 'pronoun', word: 'they'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: ''},
            {type: 'noun', word: 'bears'}
        ]
    }
];
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
            if (child instanceof HTMLElement) {
                this.appendChild(child);
            }
            else if( typeof child == 'string'){
                span = document.createElement('SPAN');
                span.appendChild(document.createTextNode(child));
                this.appendChild( span );
            }
            return this;
        };

        return el;

    }
};
var training = {
    HTML: {
        answer: lib.$('answer'),
        next: lib.$('next'),
        table: lib.$('options_table'),
        cells: document.querySelectorAll('#options_table td'),
        results: lib.$('results')
    },
    constructor: function (params) {
        params = params || {};
        this.quantity = params.quantity || this.quantity || 1;
        this.HTML.table.onclick = this.onTableClick.bind(this);
        this.HTML.results.onclick = this.onResultsClick.bind(this);
        this.HTML.next.onclick = this.onNextBtnClick.bind(this);
        this.HTML.cells.forEach = [].forEach;
        this.TrainingSet = lib.shuffle([].concat(Samples)).slice(0, this.quantity);
        this.counter = 0;
        this.init();
    },
    stop: function () {
        this.constructor();
    },
    init: function () {

        if (this.counter == this.quantity) {
            this.stop();
            return;
        }

        this.curQuest = this.TrainingSet[this.counter];
        this.HTML.answer.innerHTML = '';
        this.AnswersDivs = [];

        // this.HTML.answer.innerHTML = '';
        for (var i = 0; i <= this.HTML.cells.length; i++) {
            // заполним массив ответов ссылками на блоки в контейнере с ответами
            this.AnswersDivs[i] = this.HTML.answer.appendChild(this.createWordContainer(i));
        }
        this.HTML.answer.className = (this.curQuest.stop == '?') ? 'interrogative' : 'narrative';

        this.HTML.table.style.display = '';
        this.HTML.next.style.display = 'none';
        this.curQuest.cursor = 0;
        document.getElementById('question').innerHTML = this.curQuest.ru;
        this.fillCells();
    },

    fillCells: function () {
        var cur_word = this.curQuest.eng[ this.curQuest.cursor ];
        var possible_answers = this.getPossibleAnswers(cur_word);

        this.HTML.cells.forEach(function (cell, index) {
            cell.innerHTML = possible_answers[index];
            cell.dataset['word'] = possible_answers[index];
        });
    },

    fillAnswer: function (str) {
        var _container = this.AnswersDivs[this.curQuest.cursor];
        if (!this.curQuest.log_answer) {
            this.curQuest.log_answer = [];
        }
        this.curQuest.log_answer[this.curQuest.cursor] = str;
        _container.chosen.dataset['text'] = _container.chosen.innerHTML = str;
    },
    // создаст из набора схожих слов варианты ответа
    getPossibleAnswers: function (obj) {
        var PossibleAnswers = Words[obj.type].filter(function (item) {
            return item != obj.word;
        });
        // подставим вперед правильный ответ
        PossibleAnswers.unshift(obj.word);
        // обрежем до количества ячеек (хотя вообще-то надо добивать, а не обрезать)
        return lib.shuffle(PossibleAnswers.slice(0, this.HTML.cells.length));
        // TODO: добивать словами из текущего набора
    },

    onTableClick: function (e) {
        this.fillAnswer(e.target.dataset['word']);
        if (this.curQuest.eng.length - 1 != this.curQuest.cursor) {
            this.curQuest.cursor++;
            this.fillCells();
        }
        else {
            this.checkAnswer();
        }
    },
    checkAnswer: function () {
        var has_errors = false;
        this.AnswersDivs.forEach(function (item) {
            if (item.chosen.dataset['text'] != item.error.dataset['text']) {
                item.classList.add('has_error');
                has_errors = true;
            }
        });
        this.maintainError(has_errors);

        this.prepareToNext();

    },
    maintainError: function (has_errors) {
        //this.HTML.answer.classList.add('errors_visible');
        this.addBullet(has_errors);
    },
    addBullet: function (is_err) {
        var bullet = document.createElement('DIV');
        bullet.dataset['index'] = this.counter;
        bullet.className = 'bullet';
        if (is_err) {
            bullet.classList.add('fault');
        }
        this.HTML.results.appendChild(bullet);
    },
    onResultsClick: function (e) {
        var t = e && e.target;
        var index;
        if (t && t.classList.contains('bullet')) {
            index = e.target.dataset['index'];
            lib.showHint(this.getResultInfo(this.TrainingSet[ index ]));
        }
    },
    getResultInfo: function (quest) {
        var question = quest.ru;
        var answer = quest.log_answer.join(' ') + quest.stop;
        var r_answer = quest.eng.join(' ') + quest.stop;
        var frag = lib.$(document.createElement('DIV'));
        frag.append(question).append(answer).append(r_answer);
        return frag;
    },
    prepareToNext: function () {
        this.HTML.table.style.display = 'none';
        this.HTML.next.style.display = '';
    },

    createWordContainer: function (cnt) {
        var div = document.createElement('DIV');
        div.chosen = document.createElement('SPAN');
        div.error = document.createElement('SPAN');
        div.chosen.classList.add('chosen');
        div.error.classList.add('error');
        div.appendChild(div.chosen);
        div.appendChild(div.error);
        div.error.dataset['text'] = div.error.innerHTML = this.curQuest.eng[cnt].word;
        div.dataset['position'] = cnt;
        return div;
    },
    onNextBtnClick: function () {
        this.counter++;
        this.init();
    }
};


training.constructor({
    quantity: 2
});











