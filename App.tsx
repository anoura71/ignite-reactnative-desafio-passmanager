import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";

import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";
import { StorageProvider } from "./src/hooks/storage";
import { ThemeProvider } from "styled-components/native";
import { StatusBar } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />

      <NavigationContainer>
        <StorageProvider>
          <AppRoutes />
        </StorageProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
