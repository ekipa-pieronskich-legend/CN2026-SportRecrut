import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { Camera, Send, ArrowRight, CheckCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NeonCard } from '../components/NeonCard';
import { NeonIcon } from '../components/NeonIcon';
import { BottomNav } from '../components/BottomNav';
import { AnomalyModal } from '../components/AnomalyModal';
import { Colors, Spacing, FontSize, BorderRadius } from '../../styles/theme';
import type { RootStackParamList } from '../routes';

function ProgressBar({ progress }: { progress: number }) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressBarBg}>
      <Animated.View
        style={[
          styles.progressBarFill,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

export default function TestForm() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [plank, setPlank] = useState('');
  const [sprint, setSprint] = useState('');
  const [jump, setJump] = useState('');
  const [photoAdded, setPhotoAdded] = useState(false);
  const [showAnomalyModal, setShowAnomalyModal] = useState(false);

  const handleSubmit = () => {
    if (!plank || !sprint || !jump) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola!');
      return;
    }

    const sprintValue = parseFloat(sprint);
    if (sprintValue < 14) {
      setShowAnomalyModal(true);
    } else {
      Alert.alert('Sukces', 'Wyniki zatwierdzone! 🎉', [
        { text: 'OK', onPress: () => navigation.navigate('StudentProfile') },
      ]);
    }
  };

  const averages = { plank: 90, sprint: 15.2, jump: 165 };

  const getProgress = (value: string, type: 'plank' | 'sprint' | 'jump') => {
    if (!value) return 0;
    const num = parseFloat(value);
    const avg = averages[type];
    if (type === 'sprint') {
      return Math.max(0, Math.min(100, ((avg - num) / avg) * 100 + 50));
    }
    return Math.max(0, Math.min(100, (num / avg) * 100));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerPadding}>
          <Text style={styles.screenTitle}>Nowy Test Sportowy</Text>

          {/* Plank */}
          <View style={styles.fieldSpacing}>
            <NeonCard>
              <View style={styles.fieldContent}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldEmoji}>🧘</Text>
                  <View style={styles.fieldInputContainer}>
                    <Text style={styles.fieldLabel}>Plank</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        value={plank}
                        onChangeText={setPlank}
                        placeholder="np. 120"
                        placeholderTextColor="rgba(136, 153, 170, 0.5)"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputUnit}>sekund</Text>
                    </View>
                  </View>
                </View>
                <ProgressBar progress={getProgress(plank, 'plank')} />
                <Text style={styles.fieldHint}>Średnia szkoły: 90s</Text>
              </View>
            </NeonCard>
          </View>

          {/* Sprint */}
          <View style={styles.fieldSpacing}>
            <NeonCard>
              <View style={styles.fieldContent}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldEmoji}>🏃</Text>
                  <View style={styles.fieldInputContainer}>
                    <Text style={styles.fieldLabel}>Bieg 100m</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        value={sprint}
                        onChangeText={setSprint}
                        placeholder="np. 13.4"
                        placeholderTextColor="rgba(136, 153, 170, 0.5)"
                        keyboardType="decimal-pad"
                      />
                      <Text style={styles.inputUnit}>sekund</Text>
                    </View>
                  </View>
                </View>
                <ProgressBar progress={getProgress(sprint, 'sprint')} />
                <Text style={styles.fieldHint}>Średnia szkoły: 15.2s</Text>
              </View>
            </NeonCard>
          </View>

          {/* Jump */}
          <View style={styles.fieldSpacing}>
            <NeonCard>
              <View style={styles.fieldContent}>
                <View style={styles.fieldHeader}>
                  <Text style={styles.fieldEmoji}>📏</Text>
                  <View style={styles.fieldInputContainer}>
                    <Text style={styles.fieldLabel}>Skok w dal</Text>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        value={jump}
                        onChangeText={setJump}
                        placeholder="np. 175"
                        placeholderTextColor="rgba(136, 153, 170, 0.5)"
                        keyboardType="numeric"
                      />
                      <Text style={styles.inputUnit}>cm</Text>
                    </View>
                  </View>
                </View>
                <ProgressBar progress={getProgress(jump, 'jump')} />
                <Text style={styles.fieldHint}>Średnia szkoły: 165cm</Text>
              </View>
            </NeonCard>
          </View>

          {/* Photo Verification */}
          <View style={styles.fieldSpacing}>
            <NeonCard>
              <View style={styles.fieldContent}>
                <View style={styles.photoHeader}>
                  <NeonIcon Icon={Camera} size={20} color={Colors.neonGreen} />
                  <Text style={styles.photoHeaderText}>Anti-Cheat</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.photoButton,
                    photoAdded && styles.photoButtonAdded,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setPhotoAdded(true)}
                >
                  {photoAdded ? (
                    <>
                      <CheckCircle size={32} color={Colors.neonGreen} />
                      <Text style={styles.photoAddedText}>Zdjęcie dodane</Text>
                    </>
                  ) : (
                    <>
                      <Camera size={32} color={Colors.gray} />
                      <Text style={styles.photoPlaceholderText}>Dodaj zdjęcie weryfikacyjne</Text>
                    </>
                  )}
                </TouchableOpacity>
                {photoAdded && (
                  <View style={styles.photoVerifiedRow}>
                    <CheckCircle size={16} color={Colors.neonGreen} />
                    <Text style={styles.photoVerifiedText}>✅ Zweryfikowano przez Photo-Check</Text>
                  </View>
                )}
              </View>
            </NeonCard>
          </View>

          {/* Submit Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>ZATWIERDŹ WYNIKI</Text>
              <ArrowRight size={20} color={Colors.bgDeep} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendMinistryButton} activeOpacity={0.8}>
              <Send size={16} color={Colors.gray} />
              <Text style={styles.sendMinistryText}>Wyślij do Ministerstwa Sportu ↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomNav type="student" />
      <AnomalyModal
        isOpen={showAnomalyModal}
        onClose={() => setShowAnomalyModal(false)}
        onConfirm={() => {
          Alert.alert('Sukces', 'Wyniki zatwierdzone! 🎉');
        }}
      />
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
  screenTitle: {
    color: Colors.white,
    fontSize: FontSize['2xl'],
    fontWeight: '800',
    marginBottom: Spacing.xl,
  },
  fieldSpacing: {
    marginBottom: Spacing.lg,
  },
  fieldContent: {
    gap: Spacing.md,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  fieldEmoji: {
    fontSize: 30,
  },
  fieldInputContainer: {
    flex: 1,
  },
  fieldLabel: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  inputRow: {
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: Colors.bgDeep,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: '700',
  },
  inputUnit: {
    position: 'absolute',
    right: Spacing.lg,
    top: '50%',
    transform: [{ translateY: -8 }],
    color: Colors.gray,
    fontSize: FontSize.base,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.bgDeep,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.neonGreen,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  fieldHint: {
    color: Colors.gray,
    fontSize: FontSize.xs,
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  photoHeaderText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: FontSize.base,
  },
  photoButton: {
    width: '100%',
    paddingVertical: Spacing.xxl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 230, 118, 0.3)',
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  photoButtonAdded: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
  },
  photoAddedText: {
    color: Colors.neonGreen,
    fontWeight: '600',
    fontSize: FontSize.base,
  },
  photoPlaceholderText: {
    color: Colors.gray,
    fontSize: FontSize.base,
  },
  photoVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  photoVerifiedText: {
    color: Colors.neonGreen,
    fontSize: FontSize.sm,
  },
  buttonsContainer: {
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.neonGreen,
    shadowColor: Colors.neonGreen,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  submitButtonText: {
    color: Colors.bgDeep,
    fontWeight: '700',
    fontSize: FontSize.base,
  },
  sendMinistryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    width: '100%',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.2)',
  },
  sendMinistryText: {
    color: Colors.gray,
    fontSize: FontSize.base,
  },
});
