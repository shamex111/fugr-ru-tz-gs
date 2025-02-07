import { IRepository } from '../store';

class RepositoriesService {
  private BASE_URL = 'https://api.github.com';

  public async getRepositoriesByName(
    name: string,
    page: number = 1
  ): Promise<IRepository[]> {
    const response = await fetch(
      `${this.BASE_URL}/users/${name}/repos?per_page=20&page=${page}&sort=pushed`
    );

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  }
}

export const repositoriesService = new RepositoriesService();
