export type BookStatus = "all" | "reading" | "completed" | "wishlist";

export interface BooksProps {
  id: string;
  title: string;
  totalPages: number;
  currentPage: number;
  status: "reading" | "completed" | "wishlist";
}