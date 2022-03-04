import { ProfileContext } from '#/context/profile';
import { useCallback, useContext } from 'react';
import { useSetProfileAvatarMutation } from './graphql';
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
  const context = useContext(ProfileContext);
  return context;
};
