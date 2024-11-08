import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { fetchArticles, createArticle, deleteArticle } from "../services/articleService"
import "./App.css"
import { deleteArticle as deleteArticleService } from "../services/articleService"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
    }
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }
  function deleteArticle(articleId) {
    deleteArticleService(articleId).then(() => {
      setArticles(articles.filter((a) => a.id !== articleId))
      setArticle(null)
    })
  }
  

  return (
    <div className="App">
      <header>
  <div className="title">Blogtopia</div>

  <div className="header-right">
    {user && <button className="button" onClick={() => setWriting(true)}>New Article</button>}
    {!user ? <SignIn /> : <SignOut />}
  </div>
</header>

      {!user ? "" : <Nav articles={articles} setArticle={setArticle} />}

      {!user ? (
        ""
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article article={article} deleteArticle={deleteArticle} />
      )}
    </div>
  )
}