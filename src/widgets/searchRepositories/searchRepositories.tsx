import { FC } from 'react';

import GithubSearcher from '@/features/githubSearcher/githubSearcher';
import RepositoriesList from '@/features/repositoriesList/repositoriesList';

const SearchRepositories: FC = () => {
  return (
    <div className='flex flex-col'>
        <GithubSearcher />
        <RepositoriesList/>
    </div>
  );
};

export default SearchRepositories;
