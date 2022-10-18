import { Ionicons } from '@expo/vector-icons';
import TestComponent from 'components/TestComponent';
import nativeBaseThemeConfig from 'config/nativeBaseThemeConfig';
import constants from 'constants/constants';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'intl';
import 'intl/locale-data/jsonp/hu-HU';
import { Box, extendTheme, NativeBaseProvider } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const loadFonts = () => {
  return Font.loadAsync({
    Roboto: require('./assets/fonts/Roboto.ttf'),
    Roboto_medium: require('./assets/fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
}

const theme = extendTheme({
  ...nativeBaseThemeConfig,
  fontConfig: {
    Roboto: {
      400: {
        normal: 'Roboto'
      },
      500: {
        normal: 'Roboto_medium'
      }
    }
  },
  fonts: {
    heading: 'Roboto_medium',
    body: 'Roboto',
    mono: 'Roboto',
  },
  components: {
    Button: {
      variants: {
        primary: {
          colorScheme: 'primary',
          bg: 'primary.300',
          _text: {
            color: 'primary.100'
          },
          _pressed: {
            bg: 'primary.300:alpha.90'
          }
        },
        full: {
          w: '100%',
          borderRadius: 0,
          bg: 'primary.300',
          _text: {
            color: 'white',
            lineHeight: constants.ScreenHeight * 1 / 15
          },
        }
      },
    },
    Pressable: {
      defaultProps: {
        _pressed: { opacity: 0.5 }
      },
    },
    Heading: {
      baseStyle: {
        color: 'primary.300',
        textAlign: 'center'
      },
      variants: {
        textHeading: {
          color: 'primary.300',
          fontWeight: 400,
          textAlign: 'left',
          mt: 3,
          mb: 1,
          borderBottomWidth: 2,
          borderBottomColor: 'primary.300'
        }
      },
    }
  },
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <View onLayout={onLayoutRootView} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center" py={3}>
          <Text>Babel module-resolver test application</Text>
          <TestComponent />
        </Box>
      </View>
      <StatusBar style="light" />
    </NativeBaseProvider >
  );
}