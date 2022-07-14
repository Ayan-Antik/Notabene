(() => {
    const highlights = document.getElementsByClassName('highlighted');

    highlightTexts = [];
    Array.from(highlights).forEach(highlight => {
        highlightTexts.push(highlight.textContent);
    });

    return highlightTexts;
})();
