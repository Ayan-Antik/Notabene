import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const Files = ({user, folderid}) => {

  const [file, setFile] = useState([{}]);
//   console.log(folderid);
  useEffect(()=>{
    {folderid && axios.get(`http://127.0.0.1:8000/documents/list/?owner__username=${user.username}&id=&folder__id=${folderid}`).then( (response) => {
    // console.log(response.data);
    response.data.forEach((dat) => {

        if(dat.title.length > 25){
            let titles = dat.title.split(" ");
            dat.title = titles[0] + " " + titles[1] + " "+ titles[2];

        }
        // dat.title = dat.title.substr(0, 16);
        dat.url = dat.url.toString().split("/")[2];
    })
    setFile(response.data);


    });}
  }, [])  
  return (
    
            <div>

                {file.map(function(data, i){
                                       
                        return (
                        
                            <div key={i}>
                            {/* <Link to={`../notes/${data.id}`} style={{textDecoration:'none', color:'black'}}> */}
                            <ListItemButton sx={{ pl: 4 }} onClick={()=>{
                               window.location.replace(`http://localhost:3000/notes/${data.id}`);
                            }}>
                                {true && <img src={`https://icon.horse/icon/${data.url}`} width='20px' style={{marginRight:8}}></img>}
                            
                                 <ListItemText primary={data.title} sx={{}}/>
                       
                             </ListItemButton>
                             {/* </Link> */}
                            </div>
                        
                        )
                    }
    
                )}
            </div>

        )
    
}

export default Files