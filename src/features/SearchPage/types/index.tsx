export type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string,
    Poster: string
};
  
export type MoviesData = {
    Search: Movie[];
    Response: string;
    totalResults?: string;
    Error?: string;
};