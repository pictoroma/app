
import { useProfileQuery } from '#/hooks/graphql';
import { createContext, useMemo, useState } from 'react';

type BaseType = ReturnType<typeof useProfileQuery>;

type ProfileContextValue = BaseType & {
  profile: Exclude<BaseType['data'], undefined>['profile'];
  feeds: Exclude<Exclude<BaseType['data'], undefined>['profile'], null | undefined>['feeds'];
}

const ProfileContext = createContext<ProfileContextValue>(undefined as any);

const ProfileProvider: React.FC = ({ children }) => {
  const { data, ...props } = useProfileQuery({
    variables: {
    },
  });

  const feeds = useMemo(() => data?.profile?.feeds || [], [data]);
  const profile = useMemo(() => data?.profile, [data]);

  const context = useMemo(
    () => ({
      ...props,
      data,
      feeds,
      profile,
    }),
    [props, data, feeds],
  )

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileContext, ProfileProvider };
