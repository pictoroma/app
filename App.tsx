import { Image } from 'react-native';

if (!Image.getSizeWithHeaders) {
  Image.getSizeWithHeaders = (uri, headers, success, failed) => {
    success(100, 100);
  };
}

import App from './src/App';

export default App;
