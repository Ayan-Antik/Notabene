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

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
            chrome.runtime.sendMessage({username: data.username, url: tabs[0].url}, (highlights) => {
                console.log(highlights);
                highlights.forEach(highlight => {
                    listItem = document.createElement('li');
                    listItem.className = "list-group-item";
                    listItem.style.margin = "5px";
                    listItem.id = "li-" + highlight.id;

                    listItem.innerHTML =`<div class="d-flex w-100 justify-content-between">
                    <p><span class="bar">|</span> `+ highlight.text +`</p>
                    <button id="btn-`+ highlight.id +`" type="button" class="btn">
                        <img src="`+chrome.extension.getURL('images/bin.png')+`" width="20px" height="20px"></button>
                    </div>
                    <div>
                    <span><small><i>`+ (highlight.note ? highlight.note : '') +`</i></small></span>`+
                    (highlight.note ? `<span><button id="note-del-btn-`+ highlight.id +`" type="button" class="btn">
                    <img src="`+chrome.extension.getURL('images/bin.png')+`" width="15px" height="15px"></button></span>` : '')
                    +`</div>
                    <input type="text" class="no-outline" placeholder="` + (highlight.note ? 'Edit' : 'Add') + ` Note ..."
                        id="note-`+ highlight.id +`" required>
                    <button id="note-edit-btn-`+ highlight.id +`" type="button" class="btn">
                    <img src="`+chrome.extension.getURL('images/check.png')+`" width="20px" height="20px"></button>`
                    document.getElementById("highlightList").appendChild(listItem);
                
                    // delete highlight
                    document.getElementById('btn-' + String(highlight.id)).addEventListener("click", (e) => {
                        e.preventDefault();
                        chrome.runtime.sendMessage({highlightId: highlight.id, action: 'delete'}, (response) => {
                            location.reload();
                        });
                    });

                    // add/edit note
                    document.getElementById('note-edit-btn-' + String(highlight.id)).addEventListener("click", (e) => {
                        e.preventDefault();
                        chrome.runtime.sendMessage({highlightId: highlight.id,
                            note: document.getElementById('note-' + String(highlight.id)).value}, (response) => {
                                location.reload();
                        });
                    });
                    
                    // delete note
                    const note_del_btn = document.getElementById('note-del-btn-' + String(highlight.id));
                    if (note_del_btn) {
                        note_del_btn.addEventListener("click", (e) => {
                            e.preventDefault();
                            chrome.runtime.sendMessage({highlightId: highlight.id, note: " "}, (response) => {
                                location.reload();
                            });
                        });
                    }
                });
                document.body.innerHTML += "</ul>";

                // add tags
                if (highlights.length > 0) {
                    docId = highlights[0].document;
                    chrome.runtime.sendMessage({ docId: docId }, (doc) => {
                        console.log(doc);
                        // document.body.innerHTML += `<div style="margin-left: 15px">`;
                        doc.tag_names.forEach(tag_name => {
                            document.body.innerHTML += `
                            <span style="
                                margin:10px 0px 0px 15px;
                                padding: 6px;
                                background-color: grey;
                                border-radius: 5% / 15%;
                                color: white;">#`+tag_name+`</span>`;
                        });
                        // document.body.innerHTML += `</div>`;

                        // document.body.innerHTML += `<div>
                        //     <input type="text" class="no-outline" placeholder="` + `Add Tags ..." id="tag" required>
                        //     <button id="tag-btn` +`" type="button" class="btn"></button></div>`;
                    });
                }
                

            });
        });
        
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