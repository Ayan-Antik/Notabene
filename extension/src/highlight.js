HIGHLIGHT_CLASS = 'highlighted';
HIGHLIGHT_COLOR = 'yellow';

function executeHighlight(text, container, selection, highlightId) {
    const highlightInfo = {
        highlightId: highlightId,
        text: text,
        container: $(container),
        anchorNode: $(selection.anchorNode),
        anchorOffset: selection.anchorOffset,
        focusNode: $(selection.focusNode),
        focusOffset: selection.focusOffset,
    };
    recursiveWrapper(highlightInfo, false, 0);
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