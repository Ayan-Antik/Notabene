ROOT_URL = 'http://127.0.0.1:8000/';

function store(selection, container, callback) {
    chrome.storage.local.get(['username', 'owner_name'], data => {
        if (data.username && data.owner_name) {
            fetch(ROOT_URL + 'highlight/create/', {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    owner_name: data.owner_name,
                    url: window.location.href,
                    title: document.title,
                    text: text,
                    container: getQuery(container),
                    anchorNode: getQuery(selection.anchorNode),
                    anchorOffset: selection.anchorOffset,
                    focusNode: getQuery(selection.focusNode),
                    focusOffset: selection.focusOffset,
                }),
                headers: {"Content-type": "application/json"},
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.changeOwner) {
                    chrome.storage.local.set({owner_name: data.username}, () => {
                        callback(response.id);
                    });
                }
            })
            .catch(error => console.log(error));
        }
    });
}

function loadAll(url) {
    chrome.storage.local.get(['owner_name'], data => {
        if (data.owner_name) {
            fetch(ROOT_URL + 'highlight/list/?document__owner__username=' + data.owner_name + '&document__url=' + url)
            .then(response => response.json())
            .then(highlights => highlights.forEach(highlight => {
                load(highlight);
            }))
            .catch(error => console.log(error));
        }
    });
}

function load(highlight) {
    const selection = {
        anchorNode: elementFromQuery(highlight.anchorNode),
        anchorOffset: highlight.anchorOffset,
        focusNode: elementFromQuery(highlight.focusNode),
        focusOffset: highlight.focusOffset,
    };
    const text = highlight.text;
    const container = elementFromQuery(highlight.container);
    executeHighlight(text, container, selection, highlight.id);
}

// From an DOM element, get a query to that DOM element
function getQuery(element) {
    if (element.id) return `#${escapeCSSString(element.id)}`;
    if (element.localName === 'html') return 'html';

    const parent = element.parentNode;

    let index = null;
    const parentSelector = getQuery(parent);
    // The element is a text node
    if (!element.localName) {
        // Find the index of the text node:
        index = Array.prototype.indexOf.call(parent.childNodes, element);
        return `${parentSelector}>textNode:nth-of-type(${index})`;
    } else {
        const jEl = $(element);
        index = jEl.parent().find(`>${element.localName}`).index(jEl) + 1;
        return `${parentSelector}>${element.localName}:nth-of-type(${index})`;
    }
}

function elementFromQuery(storedQuery) {
    const re = />textNode:nth-of-type\(([0-9]+)\)$/ui;
    const result = re.exec(storedQuery);
    if (result) { // For text nodes, nth-of-type needs to be handled differently (not a valid CSS selector)
        const textNodeIndex = parseInt(result[1], 10);
        storedQuery = storedQuery.replace(re, "");
        const parent = $(storedQuery)[0];

        if (!parent) return undefined;

        return parent.childNodes[textNodeIndex];
    }
    return $(storedQuery)[0];
}

// Colons and spaces are accepted in IDs in HTML but not in CSS syntax
// Similar (but much more simplified) to the CSS.escape() working draft
function escapeCSSString(cssString) {
    return cssString.replace(/(:)/ug, "\\$1");
}