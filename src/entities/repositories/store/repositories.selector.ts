import { RootState } from '@/app/(config)/store';

export const repositoriesSelector = (state: RootState) =>
  state.repositoriesReducer;
