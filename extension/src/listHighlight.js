(() => {
    const highlights = document.getElementsByClassName('highlighter--highlighted');
    const textToCopy = new Map(); // Use a Map instead of an object since it retains order of insertion

    Array.from(highlights).forEach((highlight) => {
        const dataHighlightId = highlight.getAttribute('data-highlight-id');
        if (textToCopy.has(dataHighlightId)) {
            textToCopy.set(dataHighlightId, textToCopy.get(dataHighlightId).concat(highlight.textContent));
        } else {
            textToCopy.set(dataHighlightId, [highlight.textContent]);
        }
    });

    // Join all strings corresponding to the same highlight together
    // Also, return an array instead of a Map since for some reason Maps don't get returned properly (serialization issue?)
    // Note that we could return a dict instead, but that we would lose ordering
    const highlightTexts = [];
    textToCopy.forEach((value, key) => {
        const highlightText = value.map((text) => text.replace(/\s+/ugm, ' ')).join(''); // clean up whitespace
        highlightTexts.push(parseInt(key, 10));
        highlightTexts.push(highlightText);
    });
    return highlightTexts;
})();
