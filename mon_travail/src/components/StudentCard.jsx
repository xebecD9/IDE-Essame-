import {useState} from 'react';

export default function Studentcard({name,speciality,age,email}){
   const [present,setpresent]=useState(0);

   return(
      <div style={styles.card}>
         <h2>Carte Etudiant</h2>
         <p><strong>Nom:</strong>{name}</p>
         <p>specialite:{speciality}</p>
         <p>age:{age}</p>
         <p>email:{email}</p>
      
         <div style={styles.counterSection}>
            <p>Presence : {present}</p>
            <button onClick={()=>setpresent(present + 1)}  style={styles.button}>
               valider une présence au cours IDE et Framework
            </button>
         </div>
      </div>
   );
}
   const style ={
      card:{
         border:'1px solid #ccc',
         borderRadius:'8px',
         padding:'16px',
         maxWidth:'300px',
         margin:'16px auto',     
         boxShadow:'0 4px 8px rgba(0,0,0,0.1)',
         backgroundColor:'#f9f9f9',
      },
      counterSection:{
         marginTop:'16px',
         borderTop:'1px solid #e2e22a',
         display:'flex',   
         alignItems:'center',
         justifyContent:'space-between',
      },
      button:{
         padding:'8px 16px',
         backgroundColor:'#dc2169',
         color:'#fff',
         border:'none',
         borderRadius:'4px',
         cursor:'pointer',
      },

   }


































