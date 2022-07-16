ROOT_URL = 'http://127.0.0.1:8000/';

$(document).ready(() => {
    fetch(ROOT_URL + 'highlight/list/')
    .then(response => response.json())
    .then(highlights => highlights.forEach(highlight => {
        const selection = {
            anchorNode: elementFromQuery(highlight.anchorNode),
            anchorOffset: highlight.anchorOffset,
            focusNode: elementFromQuery(highlight.focusNode),
            focusOffset: highlight.focusOffset,
        };
        const text = highlight.text;
        const container = elementFromQuery(highlight.container);
        executeHighlight(text, container, selection, 0);  // HIGHLIGHT ID CHANGE
    }))
    .catch(error => console.log(error));
});

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