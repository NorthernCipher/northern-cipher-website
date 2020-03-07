window.onload = function () {
    this.output();
}

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

var titleIndex = Math.round(1000 * Math.random());
var title = "NORTHERNCIPHER";
var insertTitle = false;
var hasInsertedTitle = false;
var outputDone = false;
var text = "";
var fullHeight = undefined;

async function output() {
    let i = 0;
    while(!isScreenFull()) {
        if (i == titleIndex) {
            insertTitle = true;
        } else if (insertTitle) {
            await addTitle();
        } else {
            await addDigit();;
        }
        i += 1;
    }
    outputDone = true;
    setInterval(alterText, 14);
}

async function addTitle() {
    await timer(64);
    if (title.length > 1) {
        let titleCharacter = title.substring(0, 1);
        text = text + titleCharacter;
        title = title.substring(1, title.length);
    } else {
        text = text + title;
        insertTitle = false;
    }
    updateText();
}

async function addDigit() {
    await timer(1);
    let value = Math.random();
    if (value > 0.5) {
        text = text + "0";
    } else {
        text = text + "1";
    }
    if (text.length > 10) {
        alterText();
    }
    updateText();
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function addCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index + 1) + chr + str.substr(index + 1);
}

async function alterText() {
    let alterIndex = Math.round(text.length * Math.random());
    let current = text[alterIndex];
    if (current == '0') {
        text = setCharAt(text, alterIndex, '1');
    } else if (current == '1') {
        text = setCharAt(text, alterIndex, '0');
    } else if (outputDone) {
        if (current == 'E') {
            text = setCharAt(text, alterIndex, '3');
        } else if (current == 'N') {
            text = setCharAt(text, alterIndex, 'Ñ');
        } else if (current == 'O') {
            text = setCharAt(text, alterIndex, 'Ø');
        } else if (current == 'R') {
            text = setCharAt(text, alterIndex, 'r');
        } else if (current == 'T') {
            text = setCharAt(text, alterIndex, '7');
        } else if (current == 'H') {
            text = setCharAt(text, alterIndex, 'h');
        } else if (current == 'C') {
            text = setCharAt(text, alterIndex, '(');
        } else if (current == 'I') {
            text = setCharAt(text, alterIndex, '!');
        } else if (current == 'P') {
            text = setCharAt(text, alterIndex, 'f');
            text = setCharAt(text, alterIndex + 1, '');
            text = addCharAt(text, alterIndex + 3, '0');
        }
    }
    updateText();
}

function isScreenFull() {
    // There are two options for div height:
    //   clientHeight includes padding.
    //   offsetHeight includes padding, scrollBar and borders.
    let clientHeight = document.getElementById("digital").clientHeight;
    // Fill till we meet the window height
    if (clientHeight <= window.innerHeight) {
        return false;
    // Capture current height and continue filling.
    } else if (fullHeight == undefined) {
        fullHeight = clientHeight;
        return false;
    // Fill one line past the window height.
    } else if(clientHeight <= fullHeight) {
        return false;
    }
    // All done.
    return true;
}

function updateText() {
    document.getElementById('digital').textContent = text;
}