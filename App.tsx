import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { RootStackParamList, StudentTabParamList } from './src/features/routes';
import { BottomNav } from './src/features/components/BottomNav';

import LoginScreen from './src/features/screens/LoginScreen';
import StudentDashboard from './src/features/screens/StudentDashboard';
import StudentProfile from './src/features/screens/StudentProfile';
import TestForm from './src/features/screens/TestForm';
import StreakScreen from './src/features/screens/StreakScreen';
import RankingScreen from './src/features/screens/RankingScreen';
import TeacherDashboard from './src/features/screens/TeacherDashboard';
import StudentList from './src/features/screens/StudentList';
import TeamRecruitment from './src/features/screens/TeamRecruitment';
import ReportExport from './src/features/screens/ReportExport';
import HeatMapScreen from './src/features/screens/HeatMapScreen';

/**
 * SportRecrut - Aplikacja do rekrutacji sportowej
 *
 * Startuje na ekranie logowania (LoginScreen)
 * - Wybierz "Jestem Nauczycielem" -> Teacher Dashboard
 * - Wybierz "Jestem Uczniem" -> Student Dashboard
 *
 * Tryb Ucznia: Dashboard -> Profile (wykres radarowy) -> Test -> Streak -> Ranking
 * Tryb Nauczyciela: Dashboard -> Students -> Team -> Reports
 */

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator<StudentTabParamList>();

function StudentTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="StudentDashboard"
      tabBarPosition="bottom"
      tabBar={(props) => <BottomNav {...props} type="student" />}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
      }}
    >
      <Tab.Screen name="StudentDashboard" component={StudentDashboard} />
      <Tab.Screen name="TestForm" component={TestForm} />
      <Tab.Screen name="StudentProfile" component={StudentProfile} />
      <Tab.Screen name="RankingScreen" component={RankingScreen} />
      <Tab.Screen name="HeatMapScreen" component={HeatMapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0E1A' },
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentTabs" component={StudentTabNavigator} />
        <Stack.Screen name="StreakScreen" component={StreakScreen} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="StudentList" component={StudentList} />
        <Stack.Screen name="TeamRecruitment" component={TeamRecruitment} />
        <Stack.Screen name="ReportExport" component={ReportExport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
