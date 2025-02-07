export interface IRepositoriesSlice {
  repositories: IRepository[] | null;
  isLoading: boolean;
  error: string;
  name:string;
  isEnd:boolean
}

export interface IRepository {
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  updated_at: Date;
}
