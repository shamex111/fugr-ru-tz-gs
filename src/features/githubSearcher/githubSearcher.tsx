'use client';

import { ThunkDispatch } from '@reduxjs/toolkit';
import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';

import { useDebounce } from '@/shared/hooks/useDebounce';
import { Input } from '@/shared/ui/common';
import Heading from '@/shared/ui/elements/heading';

import { repositoriesActions } from '@/entities/repositories/store';

import { RootState } from '@/app/(config)/store';

const GithubSearcher: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

  const [debouncedValue, debouncedCallback] = useDebounce<string>(
    (value: string) => {
      if (value.trim()) {
        dispatch(repositoriesActions.getRepositories(value));
      }
    },
    500,
    ''
  );

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debouncedCallback(newValue);
  };

  return (
    <div className="mx-auto w-fit mt-10">
      <Heading>Поиск репозиториев пользователей с GitHub</Heading>
      <Input
        className="w-[400px] mx-auto mt-10 text-white"
        value={debouncedValue}
        onChange={handleChangeName}
        placeholder="Введите имя пользователя..."
      />
    </div>
  );
};

export default GithubSearcher;
