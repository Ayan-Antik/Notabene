const ROOT_URL = 'http://127.0.0.1:8000/';

chrome.contextMenus.create({title: "Highlight", onclick: highlight, contexts: ["selection"]});

function highlight() {
    chrome.tabs.executeScript({file: 'src/highlight.js'});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);

	// console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	url = ROOT_URL + 'highlight/';
	console.log(url);
			
	fetch(url, {
        method: "POST",
        body: request,
        headers: {"Content-type": "application/json"}
    })
	.then(response => sendResponse({a:'a'}))
	.catch(error => console.log(error));
	return true;  // Will respond asynchronously.
});

