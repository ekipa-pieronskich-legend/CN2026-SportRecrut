import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Download, Flame, CheckCircle } from 'lucide-react-native';
import { NeonCard } from '../components/NeonCard';
import { NeonIcon } from '../components/NeonIcon';
import { BottomNav } from '../components/BottomNav';
import { Colors, Spacing, FontSize, BorderRadius } from '../../styles/theme';
import Svg, { Polygon, Circle as SvgCircle, Text as SvgText, Line } from 'react-native-svg';

/**
 * Custom Radar Chart built with react-native-svg
 * Replaces recharts RadarChart which is web-only
 */
function RadarChart({ data, size = 250 }: { data: { attribute: string; value: number }[]; size?: number }) {
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / data.length;
  const levels = 5;

  const getPoint = (value: number, index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = data.map((d, i) => getPoint(d.value, i));
  const polygonPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <Svg width={size} height={size}>
      {/* Grid circles */}
      {Array.from({ length: levels }, (_, level) => {
        const r = (radius / levels) * (level + 1);
        const points = data
          .map((_, i) => {
            const angle = angleStep * i - Math.PI / 2;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          })
          .join(' ');
        return <Polygon key={level} points={points} fill="none" stroke={Colors.gray} strokeWidth={0.5} opacity={0.3} />;
      })}

      {/* Axes */}
      {data.map((_, i) => {
        const endPoint = getPoint(100, i);
        return (
          <Line
            key={`axis-${i}`}
            x1={center}
            y1={center}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke={Colors.gray}
            strokeWidth={0.5}
            opacity={0.3}
          />
        );
      })}

      {/* Data polygon */}
      <Polygon
        points={polygonPoints}
        fill={Colors.neonGreen}
        fillOpacity={0.4}
        stroke={Colors.neonGreen}
        strokeWidth={3}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <SvgCircle key={`dot-${i}`} cx={p.x} cy={p.y} r={4} fill={Colors.neonGreen} />
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const labelPoint = getPoint(130, i);
        return (
          <SvgText
            key={`label-${i}`}
            x={labelPoint.x}
            y={labelPoint.y}
            fill={Colors.white}
            fontSize={11}
            fontWeight="600"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {d.attribute}
          </SvgText>
        );
      })}
    </Svg>
  );
}

export default function StudentProfile() {
  const ratingScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(ratingScale, {
      toValue: 1,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const radarData = [
    { attribute: 'Szybkość', value: 92 },
    { attribute: 'Siła', value: 78 },
    { attribute: 'Wytrzymałość', value: 85 },
    { attribute: 'Skoczność', value: 88 },
    { attribute: 'Zwinność', value: 90 },
  ];

  const stats = [
    { label: 'Szybk.', value: 92 },
    { label: 'Siła', value: 78 },
    { label: 'Wytrzym.', value: 85 },
    { label: 'Skok', value: 88 },
    { label: 'Zwinność', value: 90 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerPadding}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarLargeText}>👤</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerName}>Jakub Kowalski</Text>
              <Text style={styles.headerSub}>14 lat • Klasa 6A</Text>
            </View>
            <View style={styles.schoolBadge}>
              <Text style={{ fontSize: 20 }}>🏫</Text>
            </View>
          </View>

          {/* Overall Rating */}
          <Animated.View style={[styles.ratingContainer, { transform: [{ scale: ratingScale }] }]}>
            <View style={styles.ratingCircle}>
              <Text style={styles.ratingText}>87</Text>
            </View>
          </Animated.View>

          {/* Radar Chart */}
          <NeonCard glow>
            <View style={styles.chartContainer}>
              <RadarChart data={radarData} size={250} />
            </View>
          </NeonCard>

          {/* Stats Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsPillsScroll}>
            <View style={styles.statsPillsRow}>
              {stats.map((stat) => (
                <View key={stat.label} style={styles.statPill}>
                  <Text style={styles.statPillLabel}>{stat.label}</Text>
                  <Text style={styles.statPillValue}>{stat.value}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Streak Badge */}
          <View style={styles.sectionSpacing}>
            <NeonCard>
              <View style={styles.streakBadge}>
                <View style={styles.streakBadgeLeft}>
                  <NeonIcon Icon={Flame} size={24} color={Colors.gold} />
                  <Text style={styles.streakBadgeText}>🔥 12 dni z rzędu</Text>
                </View>
                <Text style={styles.streakBadgePoints}>+240 pkt bonus</Text>
              </View>
            </NeonCard>
          </View>

          {/* Badges */}
          <View style={styles.badgesGrid}>
            <View style={styles.badgeItem}>
              <NeonCard>
                <View style={styles.badgeContent}>
                  <NeonIcon Icon={Flame} size={20} color={Colors.orange} />
                  <View>
                    <Text style={styles.badgeTitleOrange}>Underdog +15%</Text>
                    <Text style={styles.badgeSub}>Bonus za rozwój</Text>
                  </View>
                </View>
              </NeonCard>
            </View>
            <View style={styles.badgeItem}>
              <NeonCard>
                <View style={styles.badgeContent}>
                  <NeonIcon Icon={CheckCircle} size={20} color={Colors.neonGreen} />
                  <View>
                    <Text style={styles.badgeTitleGreen}>Photo-Check ✅</Text>
                    <Text style={styles.badgeSub}>Zweryfikowano</Text>
                  </View>
                </View>
              </NeonCard>
            </View>
          </View>

          {/* Download Button */}
          <TouchableOpacity style={styles.downloadButton} activeOpacity={0.8}>
            <Download size={20} color={Colors.bgDeep} />
            <Text style={styles.downloadButtonText}>📄 Pobierz Paszport PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav type="student" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  innerPadding: {
    padding: Spacing.xl,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarLargeText: {
    fontSize: 36,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    color: Colors.white,
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    marginBottom: 4,
  },
  headerSub: {
    color: Colors.gray,
    fontSize: FontSize.base,
  },
  schoolBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.cardBg,
    borderWidth: 2,
    borderColor: Colors.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  ratingCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  ratingText: {
    fontSize: FontSize['5xl'],
    color: Colors.bgDeep,
    fontWeight: '900',
  },
  chartContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  statsPillsScroll: {
    marginTop: Spacing.lg,
  },
  statsPillsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  statPill: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
    alignItems: 'center',
  },
  statPillLabel: {
    color: Colors.gray,
    fontSize: FontSize.xs,
    marginBottom: 4,
  },
  statPillValue: {
    color: Colors.neonGreen,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  sectionSpacing: {
    marginTop: Spacing.xl,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.orange,
  },
  streakBadgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  streakBadgeText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSize.base,
  },
  streakBadgePoints: {
    color: Colors.gold,
    fontWeight: '700',
    fontSize: FontSize.base,
  },
  badgesGrid: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  badgeItem: {
    flex: 1,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  badgeTitleOrange: {
    color: Colors.orange,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  badgeTitleGreen: {
    color: Colors.neonGreen,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  badgeSub: {
    color: Colors.gray,
    fontSize: FontSize.xs,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    marginTop: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  downloadButtonText: {
    color: Colors.bgDeep,
    fontWeight: '700',
    fontSize: FontSize.base,
  },
});
