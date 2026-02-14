import { Header } from "./components/Header";
import { BookCard } from "./components/BookCard";
import { useBooks } from "./hooks/useBooks";
import "./App.css";

function App() {

  const {
    filteredBooks,
    registerBook,
    updateProgress,
    changeFilter,
    deleteBook,
  } = useBooks();

  return (
    <div>
    
    <Header />
    
    <main className="main">

      <section className="form-section">
        <form className="form" action={registerBook}>

          <label className="label">Nome do Livro:</label>
          <input type="text" className="input" name="book" placeholder="livro" required/>
          <label className="label">Total de Páginas:</label>
          <input type="text" className="input" name="page" placeholder="páginas" required/>

          <button className="button" type="submit">Cadastrar Livro</button>

        </form>        
      </section>

      <select className="filter" defaultValue="all" name="filter" onChange={(e) => changeFilter(e.target.value as any)}>
        <option disabled value="">Selecione</option>
        <option value="all">Todos</option>
        <option value="wishlist">Ler</option>
        <option value="reading">Lendo</option>
        <option value="completed">Concluido</option>
      </select>

      <section className="section">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onUpdateProgress={updateProgress}
            onDeleteBook={deleteBook}
          />
        ))}
      </section>

    </main>

    </div>
  )
}

export default App;
