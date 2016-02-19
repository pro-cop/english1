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
        eng: [
            {type: 'verb1', word: 'have'},
            {type: 'pronoun', word: 'they'},
            {type: 'verb2', word: 'got'},
            {type: 'article', word: ''},
            {type: 'noun', word: 'bears'}
        ]
    }
];