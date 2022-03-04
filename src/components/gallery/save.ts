import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { useCallback, useContext } from 'react';
import { ServerContext } from '#/context/server';
import { Alert } from 'react-native';

export const useSaveImage = () => {
  const { token } = useContext(ServerContext);
  const saveImage = useCallback(
    async (url: string) => {
      try {
        const download = FileSystem.createDownloadResumable(
          url,
          FileSystem.cacheDirectory + 'download.jpeg',
          { headers: { Authorization: `bearer: ${token}`}},
        );
        const result = await download.downloadAsync();
        if (!result) {
          throw new Error('failed');
        }
        MediaLibrary.saveToLibraryAsync(result.uri);
        Alert.alert('Image saved');
      } catch (err) {
        Alert.alert(`Failed: ${err.toString()}`)
      }
    },
    [token]
  );

  return saveImage;
};
