(() => {
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
        store(selection, container, (highlightId) => {
            executeHighlight(text, container, selection, highlightId);
        });
    }
})();