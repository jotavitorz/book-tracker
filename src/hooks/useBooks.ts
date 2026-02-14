import { useState, useEffect} from "react";
import type { BookStatus, BooksProps} from "../types/book";
import toast from "react-hot-toast";

export function useBooks(){
    const [bookList, setBookList] = useState<BooksProps[]>(() => {
        const storage = localStorage.getItem("@bookList");
        return storage ? JSON.parse(storage) : [];
    }); 

    const [filter, setFilter] = useState<BookStatus>("all");

    const filteredBooks = bookList.filter(book => {
        if(filter === "all"){
            return true;
        }
        return book.status === filter;
    }); 

    useEffect(() => {
        localStorage.setItem("@bookList", JSON.stringify(bookList))
    }, [bookList])

    function registerBook(formData: any) {

        const book = formData.get("book");
        const page = Number(formData.get("page"));

        if(isNaN(page) || page <= 0) {
           toast.error("Digite o número de páginas corretamente!", {
            style: {
               backgroundColor: "#b63d1e",
               color:  "#FFF"
            }
           });
           return;
        }

        const newBook: BooksProps = {
            id: crypto.randomUUID(),
            title: book,
            totalPages: page,
            currentPage: 0,
            status: "wishlist",
        }
        toast.success("livro cadastrado com Sucesso!", {
            style: {
               backgroundColor: "#E8E2DB",
               color:  "#547792"
            }            
        });
        setBookList([newBook, ...bookList])
    }

    function updateProgress(id: string, page: number) {
        setBookList(prev => prev.map(book => {
            if(book.id !== id){
            return book;
            }

            const newPage = Math.min(page, book.totalPages);

            return {
            ...book,
            currentPage: newPage,
            status: newPage === book.totalPages ? "completed" : newPage > 0 ? "reading" : "wishlist",
            }
        }))
    }

    function changeFilter(value: BookStatus) {
        setFilter(value)
    }

    function deleteBook(book: BooksProps) {
        let newlist = bookList;

        let filterDelete = newlist.filter((item) => {
            return item.id !== book.id;
        });
        toast.success("Livro removido com sucesso.", {
            style: {
                backgroundColor: "#547792",
                color: "#FAB95B"
            }
        })  
        setBookList(filterDelete);
    }

    return {
        bookList,
        filteredBooks,
        filter,
        registerBook,
        updateProgress,
        changeFilter,
        deleteBook,
    }
}