HIGHLIGHT_CLASS = 'highlighted';
HIGHLIGHT_COLOR = 'yellow';

selection = window.getSelection();
text = selection.toString();
if (text) {
    let container = selection.getRangeAt(0).commonAncestorContainer;
        // Sometimes the element will only be text. Get the parent in that case
        // TODO: Is this really necessary?
    while (!container.innerHTML) {
        container = container.parentNode;
    }
    const highlightInfo = {
        highlightId: 0, // NEED TO CHANGE HIGHLIGHT ID
        text: text,
        container: $(container),
        anchorNode: $(selection.anchorNode),
        anchorOffset: selection.anchorOffset,
        focusNode: $(selection.focusNode),
        focusOffset: selection.focusOffset,
    };

    highlight(highlightInfo);
    
    // return true; // No errors. 'undefined' is returned by default if any error occurs during this method's execution, like if 'content.replace' fails by 'content' being 'undefined'
    chrome.runtime.sendMessage(JSON.stringify({
        text: text,
        container: getQuery(container),
        anchorNode: getQuery(selection.anchorNode),
        anchorOffset: selection.anchorOffset,
        focusNode: getQuery(selection.focusNode),
        focusOffset: selection.focusOffset,
    }), (response) => {
        console.log(response);
    });

    // Deselect text
    selection.removeAllRanges();
}

function highlight(highlightInfo) {
    // Use the offset of the anchor/focus to find the start of the selected text in the anchor/focus element
    // Use the first of the anchor of the focus elements to appear
    recursiveWrapper(highlightInfo, false, 0); // Initialize the values of 'startFound' and 'charsHighlighted'
    // Attach mouse hover event listeners to display tools when hovering a highlight
        // const parent = highlightInfo.container.parent();
        // parent.find(`.${HIGHLIGHT_CLASS}`).each((i, el) => {
        //     el.addEventListener('mouseenter', onHighlightMouseEnterOrClick);
        //     el.addEventListener('click', onHighlightMouseEnterOrClick);
        //     el.addEventListener('mouseleave', onHighlightMouseLeave);
        // });
}

function recursiveWrapper(highlightInfo, startFound, charsHighlighted) {
    const { highlightId, text, container, anchorNode, anchorOffset, focusNode, focusOffset } = highlightInfo;

    container.contents().each((idx, element) => {
        if (charsHighlighted >= text.length) return; // Stop early if we are done highlighting

        if (element.nodeType === Node.TEXT_NODE) {
            let startIndex = 0;

            // The first element to appear could be the anchor or the focus node,
            // since you can highlight from left to right or right to left
            if (!startFound) {
                if (anchorNode.is(element)) {
                    startFound = true;
                    startIndex = anchorOffset;
                }
                if (focusNode.is(element)) {
                    if (startFound) { // If the anchor and the focus elements are the same, use the smallest index
                        startIndex = Math.min(anchorOffset, focusOffset);
                    } else {
                        startFound = true;
                        startIndex = focusOffset;
                    }
                }
            }

            // Step 2:
            if (startFound && charsHighlighted < text.length) {
                const nodeValue = element.nodeValue;
                const nodeValueLength = element.nodeValue.length;
                const parentElement = element.parentElement;

                let firstSplitTextEl = null;
                let firstSplitIndex = -1;
                let secondSplitTextEl = null;

                // Go over all characters to see if they match the selection.
                // This is done because the selection text and node text contents differ.
                for (let i = 0; i < nodeValueLength; i++) {
                    if (i === startIndex) {
                        firstSplitTextEl = element.splitText(i);
                        firstSplitIndex = i;
                    }
                    if (charsHighlighted === text.length) {
                        secondSplitTextEl = firstSplitTextEl.splitText(i - firstSplitIndex);
                        break;
                    }

                    if (i >= startIndex && charsHighlighted < text.length) {
                        // Skip whitespaces as they often cause trouble (differences between selection and actual text)
                        while (charsHighlighted < text.length && text[charsHighlighted].match(/\s/u)) {
                            charsHighlighted++;
                        }
                        if (text[charsHighlighted] === nodeValue[i]) {
                            charsHighlighted++;
                        }
                    }
                }

                // If textElement is wrapped in a .highlighted span, do not add this highlight
                if (parentElement.classList.contains(HIGHLIGHT_CLASS)) {
                    parentElement.normalize(); // Undo any 'splitText' operations
                    return;
                }

                if (firstSplitTextEl) {
                    const highlightNode = document.createElement('span');
                    highlightNode.classList.add(HIGHLIGHT_CLASS); // NO DELETED CLASS
                    highlightNode.setAttribute('style', `background-color: ${HIGHLIGHT_COLOR};`);
                    highlightNode.setAttribute('highlight-id', highlightId);
                    highlightNode.textContent = firstSplitTextEl.nodeValue;

                    firstSplitTextEl.remove();
                    const insertBeforeElement = secondSplitTextEl || element.nextSibling;
                    parentElement.insertBefore(highlightNode, insertBeforeElement);
                }
            }
        } else {
            highlightInfo.container = $(element);
            [startFound, charsHighlighted] = recursiveWrapper(highlightInfo, startFound, charsHighlighted);
        }

    });
    return [startFound, charsHighlighted];
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