// import React from 'react'
// import './Folder.css'
// import da from './da.png'
// import ra from './ra.png'


// const Folder = () => {


//     // var hierarchy = document.getElementById("hierarchy");
//     // hierarchy.addEventListener("click", function(event){
//     //     var elem = event.target;
//     //     if(elem.tagName.toLowerCase() == "span" && elem !== event.currentTarget)
//     //     {
//     //         var type = elem.classList.contains("folder") ? "folder" : "file";
//     //         if(type=="file")
//     //         {
//     //             alert("File accessed");
//     //         }
//     //         if(type=="folder")
//     //         {
//     //             var isexpanded = elem.dataset.isexpanded=="true";
//     //             if(isexpanded)
//     //             {
//     //                 elem.classList.remove("fa-folder-o");
//     //                 elem.classList.add("fa-folder");
//     //             }
//     //             else
//     //             {
//     //                 elem.classList.remove("fa-folder");
//     //                 elem.classList.add("fa-folder-o");
//     //             }
//     //             elem.dataset.isexpanded = !isexpanded;

//     //             var toggleelems = [].slice.call(elem.parentElement.children);
//     //             var classnames = "file,foldercontainer,noitems".split(",");

//     //             toggleelems.forEach(function(element){
//     //                 if(classnames.some(function(val){return element.classList.contains(val);}))
//     //                 element.style.display = isexpanded ? "none":"block";
//     //             });
//     //         }
//     //     }
//     // });

//     function clickEvent(e){
//         console.log("click event", e.target)
//         let elem = e.target;
//         let foldericon = e.target.children[0];
        
//         console.log(foldericon)
//         if(elem.tagName.toLowerCase() == "span"){
//             console.log("Span elem")
//             let type = elem.classList.contains("folder") ? "folder" : "file";
//             console.log(type)

//             if(type === "folder"){
//                 console.log("Is folder")
//                 var isexpanded = elem.dataset.isexpanded=="true";
//                 console.log(isexpanded)
//                 if(isexpanded)
//                 {
//                     elem.classList.remove("fa-folder-o");
//                     elem.classList.add("fa-folder");
//                     foldericon.src = ra;
//                     foldericon.id = "RA"
//                 }
//                 else
//                 {   

//                     elem.classList.remove("fa-folder");
//                     elem.classList.add("fa-folder-o");
//                     foldericon.src = da;
//                     foldericon.id = "DA"
                    
//                 }
//                 elem.dataset.isexpanded = !isexpanded;
//                 console.log(elem.dataset.isexpanded)
//                 var toggleelems = [].slice.call(elem.parentElement.children);
//                 var classnames = "file,foldercontainer".split(",");

//                 toggleelems.forEach(function(element){
//                     if(classnames.some(function(val){return element.classList.contains(val);}))
//                     element.style.display = isexpanded ? "none":"block";
//                 });
//             }
//         }
//     }

    
//   return (

//     // <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
//     <div id='hierarchy' onClick={clickEvent}>
//     <div className="foldercontainer">
//         <span className="folder fa-folder-o" data-isexpanded="true"><img src={ da } id='DA'></img>Folder 1</span>
//         <span className="file fa-file-excel-o">File 11</span>
//         <span className="file fa-file-code-o">File 12</span>
//         <span className="file fa-file-pdf-o">File 13</span>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder-o" data-isexpanded="true"><img src={ da } id='DA'></img>Folder 1-1</span>
//             <span className="file fa-file-excel-o">File 1-11</span>
//             <span className="file fa-file-code-o">File 1-12</span>
//             <span className="file fa-file-pdf-o">File 1-13</span>
//         </div>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-2</span>
//             <span className='noitems'>No Items</span>
//         </div>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-3</span>
//             <span className='noitems'>No Items</span>
//         </div>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder"><img src={ ra } id='RA'></img>Folder 1-4</span>
//             <span className='noitems'>No Items</span>
//         </div>
//     </div>
    
//     <div className="foldercontainer">
//         <span className="folder fa-folder-o" data-isexpanded="true">Folder 2</span>
//         <span className="file fa-file-excel-o">File 21</span>
//         <span className="file fa-file-code-o">File 22</span>
//         <span className="file fa-file-pdf-o">File 23</span>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder-o" data-isexpanded="true">Folder 2-1</span>
//             <span className="file fa-file-excel-o">File 2-11</span>
//             <span className="file fa-file-code-o">File 2-12</span>
//             <span className="file fa-file-pdf-o">File 2-13</span>
    
//             <div className="foldercontainer">
//                 <span className="folder fa-folder">Folder 2-1-1</span>
//                 <span className='noitems'>No Items</span>
//             </div>
//         </div>
//     </div>
    
//     <div className="foldercontainer">
//         <span className="folder fa-folder-o" data-isexpanded="true">Folder 3</span>
//         <span className="file fa-file-excel-o">File 31</span>
//         <span className="file fa-file-code-o">File 32</span>
//         <span className="file fa-file-pdf-o">File 33</span>
    
//         <div className="foldercontainer">
//             <span className="folder fa-folder">Folder 3-1</span>
//             <span className='noitems'>No Items</span>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Folder

import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import Files from './Files';

export default function Folder({user}) {
  const [open, setOpen] = React.useState([]);

  const handleClick = (idx) => {
 
    let newArr = [...open];
    newArr[idx] = !newArr[idx];
    setOpen(newArr);
    console.log(open);

  };

  const [dir, setDir] = React.useState([{}]);

  React.useEffect(() => {
	  
	  axios.get(`http://127.0.0.1:8000/documents/listdir/?owner__username=${user.username}`).then( (response) => {
    
      setDir(response.data);
    });
    
    
  }, []);
  

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      {dir.map(function(d, index){
       

              return(
              <div key={index}>
                <ListItemButton key={index} onClick={() => handleClick(d.id-1)}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={d.name}/>
                  {open[d.id-1] ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open[d.id-1]} timeout="auto" unmountOnExit>
              
                  <Files user = {user} folderid={d.id}/>
              
                  </Collapse>
              

              </div>)
      
      })}

      {/* <ListItemButton onClick={handleClick} >
        <ListItemIcon>
        <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
       
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Nested 2" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            {true && <img src={`https://icon.horse/icon/en.wikipedia.org`} width='20px' style={{marginRight:8}}></img>}
            
            <ListItemText primary="Lizard"/>
           
          </ListItemButton>
       
      </Collapse> */}
      
    </List>
  );
}

//*Two folders under one folder : Two Collapse back2back