import React from 'react'
import './Folder.css'
import da from './da.png'
import ra from './ra.png'


const Folder = () => {


    // var hierarchy = document.getElementById("hierarchy");
    // hierarchy.addEventListener("click", function(event){
    //     var elem = event.target;
    //     if(elem.tagName.toLowerCase() == "span" && elem !== event.currentTarget)
    //     {
    //         var type = elem.classList.contains("folder") ? "folder" : "file";
    //         if(type=="file")
    //         {
    //             alert("File accessed");
    //         }
    //         if(type=="folder")
    //         {
    //             var isexpanded = elem.dataset.isexpanded=="true";
    //             if(isexpanded)
    //             {
    //                 elem.classList.remove("fa-folder-o");
    //                 elem.classList.add("fa-folder");
    //             }
    //             else
    //             {
    //                 elem.classList.remove("fa-folder");
    //                 elem.classList.add("fa-folder-o");
    //             }
    //             elem.dataset.isexpanded = !isexpanded;

    //             var toggleelems = [].slice.call(elem.parentElement.children);
    //             var classnames = "file,foldercontainer,noitems".split(",");

    //             toggleelems.forEach(function(element){
    //                 if(classnames.some(function(val){return element.classList.contains(val);}))
    //                 element.style.display = isexpanded ? "none":"block";
    //             });
    //         }
    //     }
    // });

    function clickEvent(e){
        console.log("click event", e.target)
        let elem = e.target;
        let foldericon = e.target.children[0];
        
        console.log(foldericon)
        if(elem.tagName.toLowerCase() == "span"){
            console.log("Span elem")
            let type = elem.classList.contains("folder") ? "folder" : "file";
            console.log(type)

            if(type === "folder"){
                console.log("Is folder")
                var isexpanded = elem.dataset.isexpanded=="true";
                console.log(isexpanded)
                if(isexpanded)
                {
                    elem.classList.remove("fa-folder-o");
                    elem.classList.add("fa-folder");
                    foldericon.src = ra;
                    foldericon.id = "RA"
                }
                else
                {   

                    elem.classList.remove("fa-folder");
                    elem.classList.add("fa-folder-o");
                    foldericon.src = da;
                    foldericon.id = "DA"
                    
                }
                elem.dataset.isexpanded = !isexpanded;
                console.log(elem.dataset.isexpanded)
                var toggleelems = [].slice.call(elem.parentElement.children);
                var classnames = "file,foldercontainer".split(",");

                toggleelems.forEach(function(element){
                    if(classnames.some(function(val){return element.classList.contains(val);}))
                    element.style.display = isexpanded ? "none":"block";
                });
            }
        }
    }

    
  return (

    // <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <div id='hierarchy' onClick={clickEvent}>
    <div className="foldercontainer">
        <span className="folder fa-folder-o" data-isexpanded="true"><img src={ da } id='DA'></img>Folder 1</span>
        <span className="file fa-file-excel-o">File 11</span>
        <span className="file fa-file-code-o">File 12</span>
        <span className="file fa-file-pdf-o">File 13</span>
    
        <div className="foldercontainer">
            <span className="folder fa-folder-o" data-isexpanded="true"><img src={ da } id='DA'></img>Folder 1-1</span>
            <span className="file fa-file-excel-o">File 1-11</span>
            <span className="file fa-file-code-o">File 1-12</span>
            <span className="file fa-file-pdf-o">File 1-13</span>
        </div>
    
        <div className="foldercontainer">
            <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-2</span>
            <span className='noitems'>No Items</span>
        </div>
    
        <div className="foldercontainer">
            <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-3</span>
            <span className='noitems'>No Items</span>
        </div>
    
        <div className="foldercontainer">
            <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-4</span>
            <span className='noitems'>No Items</span>
        </div>
    </div>
    
    <div className="foldercontainer">
        <span className="folder fa-folder-o" data-isexpanded="true">Folder 2</span>
        <span className="file fa-file-excel-o">File 21</span>
        <span className="file fa-file-code-o">File 22</span>
        <span className="file fa-file-pdf-o">File 23</span>
    
        <div className="foldercontainer">
            <span className="folder fa-folder-o" data-isexpanded="true">Folder 2-1</span>
            <span className="file fa-file-excel-o">File 2-11</span>
            <span className="file fa-file-code-o">File 2-12</span>
            <span className="file fa-file-pdf-o">File 2-13</span>
    
            <div className="foldercontainer">
                <span className="folder fa-folder">Folder 2-1-1</span>
                <span className='noitems'>No Items</span>
            </div>
        </div>
    </div>
    
    <div className="foldercontainer">
        <span className="folder fa-folder-o" data-isexpanded="true">Folder 3</span>
        <span className="file fa-file-excel-o">File 31</span>
        <span className="file fa-file-code-o">File 32</span>
        <span className="file fa-file-pdf-o">File 33</span>
    
        <div className="foldercontainer">
            <span className="folder fa-folder">Folder 3-1</span>
            <span className='noitems'>No Items</span>
        </div>
    </div>
    </div>
  )
}

export default Folder