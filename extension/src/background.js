const ROOT_URL = 'http://127.0.0.1:8000/';

chrome.contextMenus.create({title: "Highlight", onclick: createHighlight, contexts: ["selection"]});

function createHighlight() {
    chrome.tabs.executeScript({file: 'src/createHighlight.js'});
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.username && request.password) {
        fetch(ROOT_URL + "user/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: request.username, password: request.password})
          })
        .then(response => {
            if (response.status == 200) {
                chrome.storage.local.set({username: request.username}, () => {
                    sendResponse({isLoggedIn: true});
                });
            }
            else {
                sendResponse({isLoggedIn: false});
            }
        })
        .catch(error => {sendResponse({isLoggedIn: false});});
    }
    return true; // added this line because sendResponse is being called asynchronously
});