import { executeInCurrentTab } from './src/utils.js';

const ROOT_URL = 'http://127.0.0.1:8000/';

chrome.contextMenus.create({title: "Highlight", id: 'highlight', contexts: ["selection"]});

chrome.contextMenus.onClicked.addListener(({ menuItemId, _ }) => {
    if (menuItemId === 'highlight') {
        createHighlight();
    }
});

function createHighlight() {
    executeInCurrentTab({ file: 'src/createHighlight.js' });
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
                chrome.storage.local.set({username: request.username, owner_name: request.username}, () => {
                    sendResponse({isLoggedIn: true});
                });
            }
            else {
                sendResponse({isLoggedIn: false});
            }
        })
        .catch(error => {sendResponse({isLoggedIn: false});});
    } else if (request.action == "get") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
            console.log(tabs[0].url);
            fetch(ROOT_URL + 'highlight/list/?document__owner__username=' + request.username + '&document__url=' + tabs[0].url)
            .then(response => response.json())
            .then(highlights => sendResponse(highlights))
            .catch(error => console.log(error));
        });
    } else if (request.action == 'delete') {
        console.log(request.action);
        fetch(ROOT_URL + 'highlight/' + request.highlightId + '/delete/', {method: 'DELETE',})
            .then(response => sendResponse(response.status));
    } else if (request.action == "updateNote") {
        console.log(request.note);
        fetch(ROOT_URL + 'highlight/' + request.highlightId + '/update/', {
            method: 'PATCH',
            body: JSON.stringify({note: request.note,}),
            headers: {'Content-type': 'application/json'},
        })
        .then(response => sendResponse(response.status));
    } else if (request.action == "shared") {
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
            console.log(tabs[0].url);
            fetch(ROOT_URL +  'documents/list/?editors__username=' + request.username + '&url=' + tabs[0].url)
            .then(response => response.json())
            .then(docs => sendResponse(docs))
            .catch(error => console.log(error));
        });
    }
    return true; // added this line because sendResponse is being called asynchronously
});