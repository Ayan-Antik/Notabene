ROOT_URL = 'http://127.0.0.1:8000/';

chrome.storage.local.get(['username', 'owner_name'], data => {
    if (data.username && data.owner_name) {
        document.body.innerHTML += `
        <div style="padding: 10px;">
        <span> <img src="`+chrome.runtime.getURL('images/user.png')+`" height=35 width=35> </span>
        <span style="color: white;"> <b style="font-size:larger;">`+ data.username +`</b></span>
        <span style="float: right;">
        
        <button id="owner" type="button" class="btn">
        <img src="`+chrome.runtime.getURL('images/owner.png')+`" height=25 width=25">
        </button>
        <button id="logoutBtn" type="button" class="btn">
        <img src="`+chrome.runtime.getURL('images/logout.png')+`" height=20 width=20 style="float: right;">
        </button></span>
        </div>
        <h4 id="header" style="text-align: center; color: white;  padding: 10px;">Highlights</h4>
        <ul class="list-group" id="highlightList" style="padding: 0px 10px 10px 10px">`;

        chrome.runtime.sendMessage({action: "get", username: data.owner_name}, (highlights) => {
            console.log(highlights);
            highlights.forEach(highlight => {
                listItem = document.createElement('li');
                listItem.className = "list-group-item";
                listItem.style.margin = "5px";
                listItem.id = "li-" + highlight.id;

                listItem.innerHTML =`<div class="d-flex w-100 justify-content-between">
                <p style="border-left:3px solid yellow; padding-left:8px; font-weight:500;"> `+ highlight.text +`</p>
                <button id="btn-`+ highlight.id +`" type="button" class="btn">
                    <img src="`+chrome.runtime.getURL('images/bin.png')+`" width="20px" height="20px"></button>
                </div>
                <div>
                <span><small>`+ (highlight.note? MarkdownToHtml.parse(highlight.note): '') +`</small></span>`+
                (highlight.note ? `<span><button id="note-del-btn-`+ highlight.id +`" type="button" class="btn">
                <img src="`+chrome.runtime.getURL('images/bin.png')+`" width="15px" height="15px"></button></span>` : '')
                +`</div>
                <input type="text" class="no-outline" placeholder="` + (highlight.note ? 'Edit' : 'Add') + ` Note ..."
                    id="note-`+ highlight.id +`" required>
                <button id="note-edit-btn-`+ highlight.id +`" type="button" class="btn">
                <img src="`+chrome.runtime.getURL('images/check.png')+`" width="20px" height="20px"></button>`
                document.getElementById("highlightList").appendChild(listItem);

                // delete highlight
                document.getElementById('btn-' + String(highlight.id)).addEventListener("click", (e) => {
                    e.preventDefault();
                    chrome.runtime.sendMessage({action: 'delete', highlightId: highlight.id}, (response) => {
                        location.reload();
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.reload(tabs[0].id);
                        });
                    });
                });

                // add/edit note
                document.getElementById('note-edit-btn-' + String(highlight.id)).addEventListener("click", (e) => {
                    e.preventDefault();
                    chrome.runtime.sendMessage({action: 'updateNote', highlightId: highlight.id,
                        note: document.getElementById('note-' + String(highlight.id)).value}, (response) => {
                            location.reload();
                    });
                });
                
                // delete note
                const note_del_btn = document.getElementById('note-del-btn-' + String(highlight.id));
                if (note_del_btn) {
                    note_del_btn.addEventListener("click", (e) => {
                        e.preventDefault();
                        chrome.runtime.sendMessage({action: 'updateNote',
                            highlightId: highlight.id, note: " "}, (response) => {
                            location.reload();
                        });
                    });
                }
            });
        });
        document.body.innerHTML += "</ul>";
        document.getElementById("logoutBtn").addEventListener("click", (e) => {
            e.preventDefault();
            chrome.storage.local.clear();
            location.reload();
        });

        document.getElementById("owner").addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("header").remove();
            document.getElementById("highlightList").remove();
            document.getElementById("owner").remove();
            document.body.innerHTML += `
            <h4 id="ownerHeader" style="text-align: center; color: white;  padding: 10px;">Owner List</h4>`;
            chrome.runtime.sendMessage({action: 'shared', username: data.username}, (docs) => {
                console.log(docs);
                owner_names = [data.username];
                docs.forEach(doc => {
                    owner_names.push(doc.owner_name);
                });
                owner_names.forEach(owner_name => {
                    document.body.innerHTML += `<ul class="list-group" id="ownerList" style="padding: 0px 10px 10px 10px">
                        <li id="`+ owner_name +`" class="list-group-item" type="button">` + owner_name
                        + (owner_name === data.username ? " (You)" : "") + `</li></ul>`;
                        if (owner_name === data.owner_name) {
                            document.getElementById(owner_name).classList.add("active");
                        }
                });
                owner_names.forEach(owner_name => {
                    document.getElementById(owner_name).addEventListener("click", (e) => {
                        e.preventDefault();
                        console.log(owner_name);
                        chrome.storage.local.set({owner_name: owner_name}, () => {
                            location.reload();
                            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                chrome.tabs.reload(tabs[0].id);
                            });
                        });
                    });
                });
            });
        });
    } else {
        document.body.innerHTML += `<h4 style="text-align: center; color: white;  padding: 10px;">Login</h4>
        <form style="padding: 0px 10px 10px 10px;">
            <div class="form-group" >
                <input type="text" class="form-control" id="username" placeholder="username" style="margin-bottom: 16px;">
            
                <input type="password" class="form-control" id="password" placeholder="password">
            </div>
            <button id="submitBtn" class="btn btn-primary mt-3" style="width:100%;">Login</button>
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