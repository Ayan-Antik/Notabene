ROOT_URL = 'http://127.0.0.1:8000/';

chrome.storage.local.get(['username'], data => {
    if (data.username) {
        document.body.innerHTML += `
        <div style="padding: 10px;">
        <span> <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png" height=20 width=20> </span>
        <span style="color: white;"> `+ data.username +`</span>
        <span style="float: right;"><button id="logoutBtn" type="button" class="btn btn-danger">Logout</button></span>
        </div>
        <h4 style="text-align: center; color: white;  padding: 10px;">Highlights</h4>
        <ul class="list-group" id="highlightList" style="padding: 0px 10px 10px 10px">`;
        chrome.tabs.executeScript({file: 'src/listHighlight.js'}, results => {
            if (!results || !Array.isArray(results) || results.length == 0) return;
            if (results[0].length == 0) {
                // copyBtn.disabled = true;
                // removeHighlightsBtn.disabled = true;
                return;
            }

            const highlights = results[0];
            // Clear previous list elements, but only if there is at least one otherwise leave the "empty" message
            //highlightsListEl.innerHTML = '';

            // Populate with new elements
            for (let i = 0; i < highlights.length; i += 2) {
                const newListItem = document.createElement('li');
                newListItem.className = "list-group-item";
                newListItem.innerText = highlights[i + 1];
                const highlightId = highlights[i];
                // newEl.addEventListener('click', () => {
                //     backgroundPage.showHighlight(highlightId);
                // });
                document.getElementById("highlightList").appendChild(newListItem);
            }


            // highlightTexts = results[0];
            // highlightTexts.forEach(highlightText => {
            //     newListItem = document.createElement('li');
            //     newListItem.className = "list-group-item";
            //     newListItem.textContent = highlightText;
            //     document.getElementById("highlightList").appendChild(newListItem);
            // });
        });
        document.body.innerHTML += "</ul>";
        document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault();
            chrome.storage.local.clear();
            location.reload();
        });
    } else {
        document.body.innerHTML += `<h4 style="text-align: center; color: white;  padding: 10px;">Login</h4>
        <form style="padding: 0px 10px 10px 10px;">
            <div class="form-group">
                <label for="username" style="color:white;">Username</label>
                <input type="text" class="form-control" id="username">
            </div>
            <div class="form-group">
                <label for="password" style="color:white;">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
            <button id="submitBtn" class="btn btn-primary mt-3">Login</button>
        </form>`;
        document.getElementById("submitBtn").addEventListener("click", (e) => {
            e.preventDefault();
            chrome.runtime.sendMessage({ username: document.getElementById("username").value,
                password: document.getElementById("password").value }, (response) => {
                    if (response.isLoggedIn) {
                        location.reload();
                    }
                   else {
                        document.body.innerHTML += `<div class="alert alert-danger" role="alert">
                        Invalid username or password!</div>`;
                   }
                });
        });
    }
  });