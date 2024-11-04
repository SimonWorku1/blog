import { db } from "../FirebaseConfig"
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

export async function createArticle({ title, body }) {
  const data = { title, body, date: Timestamp.now().toDate() }
  const docRef = await addDoc(collection(db, "articles"), data)
  return { id: docRef.id, ...data }
}

export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

// Delete an article by ID
export async function deleteArticle(articleId) {
  const articleRef = doc(db, "articles", articleId)
  await deleteDoc(articleRef)
}
