import { Image } from 'react-native';

Image.getSizeWithHeaders = (uri, headers, success, failed) => {
  success(100, 100);
};
console.log('foo', Image);

import App from './src/App';

export default App;
