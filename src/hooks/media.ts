import { ServerContext } from '#/context/server';
import { useCallback, useContext } from 'react';
import { UploadFile } from './posts';

export const useCreateMedia = () => {
  const { domain, token } = useContext(ServerContext);
  const createMedia = useCallback(
    async (media: UploadFile[]) => {
      const ids: string[] = [];
      for (let file of media) {
        const data = new FormData();
        data.append('media', file as any);
        const response = await fetch(`${domain}/api/media`, {
          method: 'POST',
          body: data,
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(await response.text());
          throw new Error('Could not upload image');
        }
        const json = await response.json();
        ids.push(json.ids[0]);
      }
      return ids;
    },
    [token, domain]
  );
  return createMedia;
};
