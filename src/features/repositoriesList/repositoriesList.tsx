'use client';

import { ThunkDispatch } from '@reduxjs/toolkit';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { parseDate } from '@/shared/lib';
import { RootState } from '@/shared/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shared/ui/common/card';
import { SkeletonCard } from '@/shared/ui/elements';
import Heading from '@/shared/ui/elements/heading';

import {
  repositoriesActions,
  repositoriesSelector
} from '@/entities/repositories/store';

const RepositoriesList: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();
  const { isLoading, error, repositories, name, isEnd } =
    useSelector(repositoriesSelector);
  const page = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRepoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    page.current = 1;
  }, [name]);

  useEffect(() => {
    if (!repositories?.length) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && !isLoading && !isEnd) {
          page.current++;
          dispatch(
            repositoriesActions.getMoreRepositories({
              name,
              page: page.current
            })
          );
        }
      },
      { threshold: 0.5 }
    );

    if (lastRepoRef.current) {
      observerRef.current.observe(lastRepoRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [repositories, isLoading, dispatch]);

  return (
    <div className="w-fit mx-auto">
      {error && <div className="text-red-700 my-3 font-semibold">{error}</div>}
      <Heading>{name}</Heading>
      {repositories?.length === 0 && (
        <div className="text-white my-3">
          У пользователя нет репозиториев :(
        </div>
      )}
      <div className="flex flex-col space-y-4 my-4">
        {repositories?.map((r, index) => (
          <article
            key={r.name}
            ref={index === repositories.length - 1 ? lastRepoRef : null}
          >
            <div className="text-white mx-auto w-fit font-[600] text-xl my-2">
              {index}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
                <CardDescription>{r?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <article className=" flex flex-col space-y-2">
                  <section className="flex space-x-4">
                    <div>url:</div>
                    <a href={r.html_url}>{r.html_url}</a>
                  </section>
                  <section className="flex space-x-4">
                    <div>quantity stars:</div>
                    <div>{r.stargazers_count}</div>
                  </section>
                </article>
              </CardContent>
              <CardFooter>
                <section className="flex space-x-4">
                  <div>last update:</div>
                  <div>{parseDate(r.updated_at)}</div>
                </section>
              </CardFooter>
            </Card>
          </article>
        ))}
      </div>
      {isLoading && <SkeletonCard />}
      {isEnd && (
        <div className="text-white mx-auto w-fit">
          У пользователя больше нет репозиториев
        </div>
      )}
    </div>
  );
};

export default RepositoriesList;
