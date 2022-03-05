import { Image } from 'react-native';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://a13b4a62799a4225bf9072bedc4f41fa@o165705.ingest.sentry.io/6244307',
  enableInExpoDevelopment: true,
  debug: false,
});

if (!Image.getSizeWithHeaders) {
  Image.getSizeWithHeaders = (uri, headers, success, failed) => {
    success(100, 100);
  };
}

import App from './src/App';

export default App;
