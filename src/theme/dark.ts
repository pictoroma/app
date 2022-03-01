import Theme from './Theme';
import light from './light';

const darkTheme: Theme = {
  ...light,
  colors: {
    ...light.colors,
    primary: '#e67e22',
    input: '#333',
    icon: '#e67e22',
    background: '#151515',
    shadow: '#000',
    secondary: 'blue',
    shade: '#000',
    text: '#fff',
    textShade: '#666',
  }
};

export default darkTheme;
