import React from "react";
import FeatherIcon from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";

import { Home } from "../screens/Home";
import { RegisterLoginData } from "../screens/RegisterLoginData";
import { Platform } from "react-native";
import { Settings } from "../screens/Settings";
import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.primary_light,
        labelPosition: "beside-icon",
        labelStyle: {
          fontFamily: theme.fonts.medium,
          fontSize: RFValue(14),
          // marginLeft: RFValue(14),
          justifyContent: "space-between",
        },
        style: {
          paddingVertical: Platform.select({ ios: 20, android: 0 }),
        },
      }}
    >
      <Screen
        name="Home"
        options={{
          tabBarLabel: "Senhas",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="key" color={color} size={24} />
          ),
        }}
        component={Home}
      />
      <Screen
        name="RegisterLoginData"
        options={{
          tabBarLabel: "Cadastrar",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="edit" color={color} size={24} />
          ),
        }}
        component={RegisterLoginData}
      />
      <Screen
        name="Settings"
        options={{
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="settings" color={color} size={24} />
          ),
        }}
        component={Settings}
      />
    </Navigator>
  );
}
