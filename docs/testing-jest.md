# This section describes how to mock the Giphy dependency in Jest.

1. Add `jest.config.js` in the root folder:

```
module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@giphy/react-native-sdk$': '<rootDir>/__mocks__/giphy-react-native-sdk.js',
  },
};
```

2. Alternatively, you can add this directly to the `package.json` right after `devDependencies` section:
```
"jest": {
  "preset": "react-native",    
  "moduleNameMapper": {
    "^@giphy/react-native-sdk$": "<rootDir>/__mocks__/giphy-react-native-sdk.js"
  }
}
```
Then
`__mocks__/react-native-giphy-sdk.js`:
```
const GiphyDialog = {
  show: jest.fn(),
};  

const GiphySDK = {
  configure: jest.fn(),
};

export { GiphyDialog, GiphySDK };
```

`App.tsx`:
```typescript
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  useColorScheme,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { GiphyContent, GiphyDialog, GiphySDK } from '@giphy/react-native-sdk';

GiphySDK.configure({ apiKey: '******************' })

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
    </SafeAreaView>
  );
}

export default App;
```

`__tests__/App.test.tsx`:
```typescript
import 'react-native';
import React from 'react';
import App from '../App';
import { it, expect, jest } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';

it('shows Giphy dialog on button press', () => {
  const { getByText } = render(<App />);
  const button = getByText('Show Giphy Dialog');

  fireEvent.press(button);

  const { GiphyDialog } = require('@giphy/react-native-sdk');
  expect(GiphyDialog.show).toHaveBeenCalledTimes(1);
});
```