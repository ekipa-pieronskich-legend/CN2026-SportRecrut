import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

interface NeonIconProps {
  Icon: LucideIcon;
  size?: number;
  color?: string;
  glow?: boolean;
  animate?: boolean;
}

export function NeonIcon({ Icon, size = 24, color = '#00E676', glow = true, animate = false }: NeonIconProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [animate]);

  return (
    <Animated.View
      style={[
        styles.container,
        glow && {
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 8,
          elevation: 6,
        },
        animate && { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Icon size={size} color={color} strokeWidth={2.5} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
