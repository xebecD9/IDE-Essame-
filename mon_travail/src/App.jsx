
import ArticleCard from "./components/ArticleCard";


function App() {
return <div>
  <h1> Bienvenue sur monBlog React </h1>
  <ArticleCard 
    title="Introduction a React"
    author="Mamadou Ba"
    content="React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Il a été développé par Facebook et est devenu l'un des outils les plus utilisés dans le développement web moderne."
  />
  <ArticleCard
    title ="Git en 5 minutes"
    author = "Archange"
    content="Git est un outil de versioning indispensable"
  />
  <ArticleCard
    title="pourquoi Node.js"
    author = "Ambani"
    content="Node.js permet d'ecrire du JavaScript cote serveur ."
  />
</div>;
}
export default App;
