const ROOT_URL = 'http://127.0.0.1:8000/';

chrome.contextMenus.create({title: "Highlight", onclick: createHighlight, contexts: ["selection"]});

function createHighlight() {
    chrome.tabs.executeScript({file: 'src/createHighlight.js'});
}

