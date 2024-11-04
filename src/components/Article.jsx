export default function Article({ article, deleteArticle }) {
  if (!article) {
    return <p>No article selected</p>
  }

  // Convert Firestore Timestamp to readable date only if needed
  const formattedDate = article.date instanceof Date
    ? article.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : article.date?.toDate?.().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

  return (
    <article>
      <section>
        <h2>{article.title}</h2>
        <p className="date">{formattedDate}</p>
        <div className="body">{article.body}</div>
        
        <button className="button delete" onClick={() => deleteArticle(article.id)}>
          Delete Article
        </button>
      </section>
    </article>
  )
}