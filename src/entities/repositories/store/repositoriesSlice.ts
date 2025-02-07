import { repositoriesService } from '../api';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import { IRepositoriesSlice } from './repositories.types';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator }
});

const initialState: IRepositoriesSlice = {
  repositories: null,
  isLoading: false,
  error: '',
  name: '',
  isEnd: false
};

const repositoriesSlice = createSliceWithThunks({
  name: 'repositories',
  initialState,
  reducers: create => ({
    getRepositories: create.asyncThunk(
      async (name: string, { rejectWithValue }) => {
        try {
          return {
            name,
            data: await repositoriesService.getRepositoriesByName(name)
          };
        } catch (e) {
          return rejectWithValue(
            e instanceof Error ? e.message : 'Что-то пошло не так'
          );
        }
      },
      {
        pending: state => {
          state.isLoading = true;
          state.error = '';
          state.repositories = null;
          state.name = ''
          state.isEnd = false;
        },
        fulfilled: (state, { payload }) => {
          state.name = payload.name;
          state.repositories = payload.data;
          state.isLoading = false;
        },
        rejected: (state, { payload }) => {
          state.error =
            typeof payload === 'string'
              ? payload
              : 'Ошибка получения данных о репозиториях.';
          state.isLoading = false;
        }
      }
    ),
    getMoreRepositories: create.asyncThunk(
      async (
        { name, page }: { name: string; page: number },
        { rejectWithValue }
      ) => {
        try {
          return repositoriesService.getRepositoriesByName(name, page);
        } catch (e) {
          return rejectWithValue(
            e instanceof Error ? e.message : 'Что-то пошло не так'
          );
        }
      },
      {
        pending: state => {
          state.isLoading = true;
          state.error = '';
        },
        fulfilled: (state, { payload }) => {
          if (payload?.length === 0) {
            state.isEnd = true;
          }
          state.repositories = [...(state.repositories ?? []), ...payload];
          state.isLoading = false;
        },
        rejected: (state, { payload }) => {
          state.error =
            typeof payload === 'string'
              ? payload
              : 'Ошибка получения данных о репозиториях.';
          state.isLoading = false;
        }
      }
    )
  })
});

export const repositoriesActions = repositoriesSlice.actions;
export const repositoriesReducer = repositoriesSlice.reducer;
