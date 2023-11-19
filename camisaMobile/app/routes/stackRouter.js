import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Inicio } from "../screens/inicio";
import { Cadastro } from "../screens/cadastro";
import { Login } from "../screens/login";
import { Home } from "../screens/home";
//import { NavigationContainer } from "@react-navigation/native";



const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}>
      </Stack.Screen>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}>
      </Stack.Screen>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}>
      </Stack.Screen>
     
    </Stack.Navigator>
    
  );
}



