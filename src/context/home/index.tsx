import { usePostsQuery } from '#/hooks/graphql';
import { createContext, useMemo, useState } from 'react';

type BaseType = ReturnType<typeof usePostsQuery>;

type HomeContextValue = BaseType & {
  posts: Exclude<BaseType['data'], undefined>['posts'];
  feeds: string[];
  setFeeds: React.Dispatch<React.SetStateAction<string[]>>;
}

const HomeContext = createContext<HomeContextValue>(undefined as any);

const HomeProvider: React.FC = ({ children }) => {
  const [feeds, setFeeds] = useState<string[]>([]);
  const { data, ...props } = usePostsQuery({
    variables: {
      filter: {
        feeds: feeds.length > 0 ? feeds : undefined,
      },
    },
  });

  const posts = useMemo(() => data?.posts || [], [data]);

  const context = useMemo(
    () => ({
      ...props,
      data,
      feeds,
      posts,
      setFeeds,
    }),
    [props, data, feeds, setFeeds],
  )

  return (
    <HomeContext.Provider value={context}>
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext, HomeProvider };
