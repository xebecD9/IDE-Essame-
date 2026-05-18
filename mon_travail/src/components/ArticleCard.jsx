import {useState} from 'react';

function ArticleCard({title,author,content}){
    const [likes,setLikes] = useState(0);

   return (
    <div style ={{border: "1px solid #13c68eff", padding: "15px", margin: "12px",borderRadius:'8px'}}>
       <h2>{title}</h2>
       <p><em>par {author}</em></p>
       <p>{content}</p>
       <button onclick={() => setLikes(likes +1 )}>
         ❤️ J'aime ({likes})
       </button>
    </div>

   );
}
export default ArticleCard;