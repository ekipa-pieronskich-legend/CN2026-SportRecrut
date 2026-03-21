import { EXERCISES, ExerciseDefinition } from '../config/exercises';
import { RANK_MAP, RankEntry, getRankById } from '../config/ranks';

export interface ExerciseRankResult {
  exerciseId: string;
  name: string;
  emoji: string;
  unit: string;
  bestValue: number;
  percent: number;
  rankId: number;
  rank: RankEntry;
}

// Progi procentowe → rankId (0-26)
// Procent obliczany względem średniej danego ćwiczenia
const PERCENT_THRESHOLDS: [number, number][] = [
  [0, 0],       // Drewno 1
  [30, 1],      // Drewno 2
  [45, 2],      // Drewno 3
  [55, 3],      // Drewno 4
  [65, 4],      // Brąz 1
  [72, 5],      // Brąz 2
  [78, 6],      // Brąz 3
  [84, 7],      // Brąz 4
  [90, 8],      // Srebro 1
  [95, 9],      // Srebro 2
  [100, 10],    // Srebro 3
  [105, 11],    // Srebro 4
  [110, 12],    // Złoto 1
  [115, 13],    // Złoto 2
  [120, 14],    // Złoto 3
  [125, 15],    // Złoto 4
  [130, 16],    // Platyna 1
  [135, 17],    // Platyna 2
  [140, 18],    // Platyna 3
  [145, 19],    // Platyna 4
  [150, 20],    // Diament 1
  [160, 21],    // Diament 2
  [170, 22],    // Diament 3
  [185, 23],    // Diament 4
  [200, 24],    // Master
  [225, 25],    // Challenger
  [250, 26],    // Legenda
];

export const percentToRankId = (percent: number): number => {
  let rankId = 0;
  for (const [threshold, id] of PERCENT_THRESHOLDS) {
    if (percent >= threshold) rankId = id;
    else break;
  }
  return rankId;
};

const calcPercent = (value: number, def: ExerciseDefinition): number => {
  if (value <= 0) return 0;
  if (def.scoring === 'lower') {
    return (def.average / value) * 100;
  }
  return (value / def.average) * 100;
};

// Oblicz rangę per ćwiczenie na podstawie najlepszych wyników
// bestResults: Record<exerciseId, bestValue>
export const calculateExerciseRanks = (
  bestResults: Record<string, number>,
): ExerciseRankResult[] => {
  return EXERCISES.map(def => {
    const bestValue = bestResults[def.id] ?? 0;
    const percent = calcPercent(bestValue, def);
    const rankId = percentToRankId(percent);

    return {
      exerciseId: def.id,
      name: def.name,
      emoji: def.emoji,
      unit: def.unit,
      bestValue,
      percent: Math.round(percent),
      rankId,
      rank: getRankById(rankId),
    };
  });
};

// Średnia ranga z ćwiczeń, w których uczeń ma wyniki (> 0)
export const calculateAverageRankId = (exerciseRanks: ExerciseRankResult[]): number => {
  const withResults = exerciseRanks.filter(r => r.bestValue > 0);
  if (withResults.length === 0) return 0;
  const avg = withResults.reduce((sum, r) => sum + r.rankId, 0) / withResults.length;
  return Math.round(avg);
};

export const calculateDynamicStats = (student: any): {
  dynamicOverall: number;
  speed: number;
  strength: number;
  stamina: number;
  jump: number;
  agility: number;
} => {
  const bestResults: Record<string, number> = {};
  if (student?.testResults?.length > 0) {
    student.testResults.forEach((test: any) => {
      // Stary format wstecznie kompatybilny
      if (test.plank) bestResults['plank'] = test.plank;
      if (test.sprint) bestResults['run100'] = test.sprint;
      if (test.longJump) bestResults['jump'] = test.longJump;

      // Nowy format TestForm
      if (test.exercises && Array.isArray(test.exercises)) {
        test.exercises.forEach((ex: any) => {
          if (ex.exerciseId && typeof ex.bestValue === 'number') {
            bestResults[ex.exerciseId] = ex.bestValue;
          }
        });
      }
    });
  }
  
  const exerciseRanks = calculateExerciseRanks(bestResults);

  const getStat = (exerciseIds: string[]) => {
    const ranks = exerciseRanks.filter(r => exerciseIds.includes(r.exerciseId) && r.bestValue > 0);
    if (ranks.length === 0) return 60; // Default
    const avgPercent = ranks.reduce((sum, r) => sum + r.percent, 0) / ranks.length;
    return Math.min(100, Math.round(avgPercent));
  };

  const speed = getStat(['run100']);
  const strength = getStat(['pushups', 'pullups', 'bench', 'squats', 'deadlift']);
  const stamina = getStat(['run1000', 'plank']);
  const jump = getStat(['jump']);
  const agility = getStat(['situps']);

  return {
    speed,
    strength,
    stamina,
    jump,
    agility,
    dynamicOverall: Math.round((speed + strength + stamina + jump + agility) / 5)
  };
};
