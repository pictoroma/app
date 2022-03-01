import { useCallback, useMemo } from 'react';
import { useProfileQuery, useSetProfileAvatarMutation } from './graphql';
import { useCreateMedia } from './media';
import { UploadFile } from './posts';

export const useSetAvatar = () => {
  const createMedia = useCreateMedia();
  const [setAvatarMutation] = useSetProfileAvatarMutation();

  const setAvatar = useCallback(async (media?: UploadFile) => {
    const [id] = media ? await createMedia([media]) : [];
    await setAvatarMutation({
      variables: {
        mediaId: id,
      },
    });
  }, []);

  return setAvatar;
};

export const useProfile = () => {
  const { data, refetch, loading, error } = useProfileQuery();
  const feeds = useMemo(() => data?.profile?.feeds || [], [data]);
  const profile = useMemo(() => data?.profile, [data]);

  return {
    profile,
    feeds,
    refetch,
    loading,
    error,
  };
};
