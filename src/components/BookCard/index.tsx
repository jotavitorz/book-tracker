import type { BooksProps } from "../../types/book";
import { calcProgress } from "../../utils/calcProgress";
import { FaTrash } from "react-icons/fa";

interface Props {
    book: BooksProps;
    onUpdateProgress: (id: string, page: number) => void;
    onDeleteBook: (book: BooksProps) => void;
}

export function BookCard({book, onUpdateProgress, onDeleteBook}: Props) {
    const percent = calcProgress(book.currentPage, book.totalPages);

    return (
        <div className="book-section">
            <p className="book-title">{book.title}</p>

            <div className="percentagem-book">
                <p>Page: {book.currentPage} / {book.totalPages}</p>
                <p>{percent}% Book</p>
            </div>

            <div className="state">
                <input className="change-state" type="number" placeholder="Page 20" value={book.currentPage} min={0} max={book.totalPages} onChange={ (e) => onUpdateProgress(book.id, Number(e.target.value))} />
                <div className="status-trash">
                    <strong className="status-book">{book.status}</strong>
                    <button className="button-trash" onClick={() => onDeleteBook(book)}>
                        <FaTrash size={20} className="trash" />
                    </button>                    
                </div>
            </div>
        </div>             
    )
}

