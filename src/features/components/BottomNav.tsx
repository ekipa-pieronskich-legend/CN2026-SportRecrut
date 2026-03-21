import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import {
  Home,
  ClipboardList,
  User,
  Trophy,
  Map,
  Users,
  Award,
  FileText,
} from 'lucide-react-native';
import { Colors, Spacing } from '../../styles/theme';
import type { RootStackParamList, StudentTabParamList } from '../routes';

interface NavItem {
  Icon: typeof Home;
  label: string;
  path: string;
}

type BottomNavProps =
  | (MaterialTopTabBarProps & { type: 'student' })
  | { type: 'teacher' };

const studentNavItems: NavItem[] = [
  { Icon: Home, label: 'Dom', path: 'StudentDashboard' },
  { Icon: ClipboardList, label: 'Testy', path: 'TestForm' },
  { Icon: User, label: 'Profil', path: 'StudentProfile' },
  { Icon: Trophy, label: 'Ranking', path: 'RankingScreen' },
  { Icon: Map, label: 'Mapa', path: 'HeatMapScreen' },
];

const teacherNavItems: NavItem[] = [
  { Icon: Home, label: 'Dom', path: 'TeacherDashboard' },
  { Icon: Users, label: 'Uczniowie', path: 'StudentList' },
  { Icon: Award, label: 'Kadra', path: 'TeamRecruitment' },
  { Icon: FileText, label: 'Raporty', path: 'ReportExport' },
];

export function BottomNav(props: BottomNavProps) {
  if (props.type === 'student') {
    const { state, navigation } = props;

    if (!state || !state.routes) {
      return null;
    }

    return (
      <View style={styles.container}>
        {studentNavItems.map((item, index) => {
          const isActive = state.index === index;
          const IconComponent = item.Icon;

          return (
            <TouchableOpacity
              key={item.path}
              onPress={() => {
                const route = state.routes[index];
                if (!route) return;
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={[styles.navItem, isActive && styles.navItemActive]}
              activeOpacity={0.7}
            >
              <IconComponent
                size={20}
                color={isActive ? Colors.neonGreen : Colors.gray}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.navLabel,
                  { color: isActive ? Colors.neonGreen : Colors.gray },
                  isActive && styles.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // Teacher mode – standalone component using hooks
  return <TeacherBottomNav />;
}

function TeacherBottomNav() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {teacherNavItems.map((item) => {
        const isActive = route.name === item.path;
        const IconComponent = item.Icon;

        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => navigation.navigate(item.path as any)}
            style={[styles.navItem, isActive && styles.navItemActive]}
            activeOpacity={0.7}
          >
            <IconComponent
              size={20}
              color={isActive ? Colors.neonGreen : Colors.gray}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? Colors.neonGreen : Colors.gray },
                isActive && styles.navLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 230, 118, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  navLabelActive: {
    fontWeight: '600',
  },
});
