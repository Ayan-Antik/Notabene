ROOT_URL = 'http://127.0.0.1:8000/';

selection = window.getSelection();
text = selection.toString();
if (text) {
    let container = selection.getRangeAt(0).commonAncestorContainer;
        // Sometimes the element will only be text. Get the parent in that case
        // TODO: Is this really necessary?
    while (!container.innerHTML) {
        container = container.parentNode;
    }

    fetch(ROOT_URL + 'highlight/create/', {
        method: "POST",
        body: JSON.stringify({
            text: text,
            container: getQuery(container),
            anchorNode: getQuery(selection.anchorNode),
            anchorOffset: selection.anchorOffset,
            focusNode: getQuery(selection.focusNode),
            focusOffset: selection.focusOffset,
        }),
        headers: {"Content-type": "application/json"}
    })
	.then(response => console.log(response))
	.catch(error => console.log(error));

    executeHighlight(text, container, selection, 0);
    selection.removeAllRanges();
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

// Colons and spaces are accepted in IDs in HTML but not in CSS syntax
// Similar (but much more simplified) to the CSS.escape() working draft
function escapeCSSString(cssString) {
    return cssString.replace(/(:)/ug, "\\$1");
}