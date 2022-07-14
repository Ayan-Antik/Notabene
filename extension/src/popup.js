chrome.tabs.executeScript({file: 'src/listHighlight.js'}, results => {
    highlightTexts = results[0];
    highlightTexts.forEach(highlightText => {
        newListItem = document.createElement('li');
        newListItem.className = "list-group-item";
        newListItem.textContent = highlightText;
        document.getElementById("highlightList").appendChild(newListItem);
    });
});