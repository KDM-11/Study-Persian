// ============================================================
//  CONTENT  (to add a sentence, copy one { ... } block, paste it
//  before the closing ], and change the three lines)
//
//  RULES for the "persian" line:
//   - put the words in the CORRECT order
//   - separate words with ONE normal space (the page scrambles them)
//   - punctuation like ؟ or ، stays stuck to the word before it
// ============================================================

// EASY: short, simple sentences
var easy = [
    {
        english: "I want water.",
        persian: "من آب می‌خواهم.",
        pron: "Man āb mi-khāham."
    },
    {
        english: "This is a book.",
        persian: "این یک کتاب است.",
        pron: "In yek ketāb ast."
    },
    {
        english: "He is a student.",
        persian: "او دانشجو است.",
        pron: "U dāneshju ast."
    },
    {
        english: "I am learning Persian.",
        persian: "من فارسی یاد می‌گیرم.",
        pron: "Man fārsi yād mi-gīram."
    },
    {
        english: "The weather is good.",
        persian: "هوا خوب است.",
        pron: "Havā khub ast."
    },
    {
        english: "My name is Keyan.",
        persian: "اسم من کیان است.",
        pron: "Esm-e man Keyān ast."
    },
    {
        english: "We are going home.",
        persian: "ما به خانه می‌رویم.",
        pron: "Mā be khāne mi-ravim."
    },
    {
        english: "She drinks tea.",
        persian: "او چای می‌نوشد.",
        pron: "U chāy mi-nushad."
    }
];

// MEDIUM: more descriptive, useful in daily conversation
var medium = [
    {
        english: "I drink tea every morning.",
        persian: "من هر روز صبح چای می‌خورم.",
        pron: "Man har ruz sobh chāy mi-khoram."
    },
    {
        english: "Where are you from?",
        persian: "شما اهل کجا هستید؟",
        pron: "Shomā ahl-e kojā hastid?"
    },
    {
        english: "I am going to the bazaar today.",
        persian: "من امروز به بازار می‌روم.",
        pron: "Man emruz be bāzār mi-ravam."
    },
    {
        english: "Please give me a glass of water.",
        persian: "لطفاً یک لیوان آب به من بدهید.",
        pron: "Lotfan yek livān āb be man bedahid."
    },
    {
        english: "What time is it?",
        persian: "ساعت چند است؟",
        pron: "Sā'at chand ast?"
    },
    {
        english: "I like this book.",
        persian: "من این کتاب را دوست دارم.",
        pron: "Man in ketāb rā dust dāram."
    },
    {
        english: "I watched a good movie yesterday.",
        persian: "من دیروز فیلم خوبی دیدم.",
        pron: "Man diruz film-e khubi didam."
    },
    {
        english: "Tomorrow we are going to the park with our friends.",
        persian: "ما فردا با دوستانمان به پارک می‌رویم.",
        pron: "Mā fardā bā dustānemān be pārk mi-ravim."
    }
];

// HARD: lots of nouns and verbs, harder to know where things go
var hard = [
    {
        english: "After work I go home and cook dinner.",
        persian: "بعد از کار من به خانه می‌روم و شام درست می‌کنم.",
        pron: "Ba'd az kār man be khāne mi-ravam va shām dorost mi-konam."
    },
    {
        english: "Yesterday my brother bought a new book from the big bookstore.",
        persian: "برادرم دیروز یک کتاب جدید از کتاب‌فروشی بزرگ خرید.",
        pron: "Barādaram diruz yek ketāb-e jadid az ketāb-forushi-ye bozorg kharid."
    },
    {
        english: "The teacher gave the students a lot of homework.",
        persian: "معلم به دانش‌آموزان تکلیف زیادی داد.",
        pron: "Mo'allem be dāneshāmuzān taklif-e ziyādi dād."
    },
    {
        english: "My mother cooks rice and chicken in the kitchen.",
        persian: "مادرم در آشپزخانه برنج و مرغ می‌پزد.",
        pron: "Mādaram dar āshpazkhāne berenj o morgh mi-pazad."
    },
    {
        english: "If you study every day, you will learn Persian.",
        persian: "اگر هر روز درس بخوانید، فارسی را یاد می‌گیرید.",
        pron: "Agar har ruz dars bekhānid, fārsi rā yād mi-gīrid."
    },
    {
        english: "Last night my sister called me and we talked for an hour.",
        persian: "دیشب خواهرم به من زنگ زد و ما یک ساعت صحبت کردیم.",
        pron: "Dishab khāharam be man zang zad va mā yek sā'at sohbat kardim."
    }
];


// ============================================================
//  CODE  (you shouldn't need to change anything below)
// ============================================================

var allLevels = { easy: easy, medium: medium, hard: hard };
var titles = { easy: "Easy", medium: "Medium", hard: "Hard" };

var items = [];       // the list of sentences for the chosen level
var index = 0;        // which sentence you are on (0 = the first)
var score = 0;        // sentences you got right on the first check
var total = 0;        // sentences you have checked
var counted = false;  // has this sentence been scored yet?

var answer = [];      // words you have placed, in order
var bank = [];        // words still waiting in the word bank

var dragFrom = "";    // while dragging: "answer" or "bank"
var dragIndex = 0;    // while dragging: position of the word


// Runs when you click Easy / Medium / Hard
function startLevel(chosen) {
    items = allLevels[chosen];
    index = 0;
    score = 0;
    total = 0;

    document.getElementById("level-title").textContent = titles[chosen];
    document.getElementById("intro").hidden = true;
    document.getElementById("practice").hidden = false;

    loadSentence();
}

// Runs when you click "Change level"
function goBack() {
    document.getElementById("practice").hidden = true;
    document.getElementById("intro").hidden = false;
}

// Sets up the current sentence: English on top, scrambled words in the bank
function loadSentence() {
    var item = items[index];
    var words = item.persian.split(" ");

    answer = [];
    bank = shuffle(words);
    while (bank.join(" ") == item.persian) {
        bank = shuffle(words);   // reshuffle if it landed in the right order
    }
    counted = false;

    document.getElementById("prompt").textContent = item.english;
    document.getElementById("message").textContent = "";
    document.getElementById("hint").hidden = true;
    document.getElementById("hint").textContent = item.pron;

    updateStatus();
    drawWords();
}

// Returns a shuffled copy of a list
function shuffle(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}

// Shows "Sentence 1 of 8 · Score 0/0"
function updateStatus() {
    document.getElementById("status").textContent =
        "Sentence " + (index + 1) + " of " + items.length +
        "  ·  Score " + score + "/" + total;
}


// ---------- the word boxes ----------

// Redraws both boxes from the answer and bank lists
function drawWords() {
    var answerBox = document.getElementById("answer");
    var bankBox = document.getElementById("bank");
    answerBox.innerHTML = "";
    bankBox.innerHTML = "";

    for (var i = 0; i < answer.length; i++) {
        answerBox.appendChild(makeWord(answer[i], "answer", i));
    }
    for (var j = 0; j < bank.length; j++) {
        bankBox.appendChild(makeWord(bank[j], "bank", j));
    }
}

// Makes one clickable, draggable word
function makeWord(text, box, position) {
    var word = document.createElement("span");
    word.className = "word";
    word.textContent = text;
    word.draggable = true;

    // click: send it to the other box
    word.onclick = function () {
        tapWord(box, position);
    };

    // drag: remember which word is being dragged
    word.ondragstart = function () {
        dragFrom = box;
        dragIndex = position;
    };

    // drop another word on this one: it goes in front of this word
    word.ondragover = function (event) {
        event.preventDefault();
    };
    word.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
        moveWord(box, position);
    };

    return word;
}

// Click a word: bank -> answer, or answer -> bank
function tapWord(box, position) {
    if (box == "bank") {
        answer.push(bank.splice(position, 1)[0]);
    } else {
        bank.push(answer.splice(position, 1)[0]);
    }
    document.getElementById("message").textContent = "";
    drawWords();
}

// Drop: move the dragged word into a box, at a position
function moveWord(toBox, toPosition) {
    var fromList = (dragFrom == "answer") ? answer : bank;
    var toList = (toBox == "answer") ? answer : bank;

    var word = fromList.splice(dragIndex, 1)[0];

    // taking a word out shifts the ones after it, so adjust
    if (fromList == toList && dragIndex < toPosition) {
        toPosition = toPosition - 1;
    }

    toList.splice(toPosition, 0, word);
    document.getElementById("message").textContent = "";
    drawWords();
}

// Dropping on the empty part of a box puts the word at the end
function allowDrop(event) {
    event.preventDefault();
}
document.getElementById("answer").ondragover = allowDrop;
document.getElementById("answer").ondrop = function (event) {
    event.preventDefault();
    moveWord("answer", answer.length);
};
document.getElementById("bank").ondragover = allowDrop;
document.getElementById("bank").ondrop = function (event) {
    event.preventDefault();
    moveWord("bank", bank.length);
};


// ---------- the buttons ----------

// Check button
function checkAnswer() {
    var item = items[index];
    var message = document.getElementById("message");

    if (bank.length > 0) {
        message.className = "message bad";
        message.textContent = "Place all the words first.";
        return;
    }

    var isRight = (answer.join(" ") == item.persian);

    // only the first check of each sentence counts toward the score
    if (!counted) {
        counted = true;
        total = total + 1;
        if (isRight) {
            score = score + 1;
        }
        updateStatus();
    }

    if (isRight) {
        message.className = "message good";
        message.textContent = "Correct! Well done.";
        showHint();
    } else {
        message.className = "message bad";
        message.textContent = "Not quite. Move the words around and try again.";
    }
}

// Hint button: shows the pronunciation of the full sentence
function showHint() {
    document.getElementById("hint").hidden = false;
}

// Next button
function nextSentence() {
    index = (index + 1) % items.length;   // after the last one, go back to the first
    loadSentence();
}
