import { RootState } from '@/shared/store';

export const repositoriesSelector = (state: RootState) =>
  state.repositoriesReducer;
