<div align="center">

# 🏆 SportRecrut

### Platforma do gromadzenia i analizy wyników sportowych w celu rekrutacji do kadry szkolnej

![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Hackathon](https://img.shields.io/badge/ZSEM%20Coding%20Night-🥉%203rd%20Place-FFD700?style=for-the-badge)

**🥉 3. miejsce – ZSEM Coding Night v. 20.2.6, Nowy Sącz**

</div>

---

## 📱 O projekcie

SportRecrut to mobilna aplikacja (Android + iOS) stworzona podczas całonocnego hackathonu ZSEM Coding Night. Rozwiązuje realny problem polskich szkół – nauczyciele WF nie mają żadnego narzędzia do śledzenia postępów uczniów ani rekrutacji talentów do kadry szkolnej. Wszystko dzieje się na kartce papieru.

Nasza aplikacja zamienia wyniki sportowe w dane. Dla ucznia to motywacja i dowód osiągnięć, dla nauczyciela to narzędzie rekrutacji i raportowania.

---

## ✨ Kluczowe funkcje

### 👤 Tryb Ucznia

**🎮 Profil "Karta FIFA"**
Wizualizacja statystyk sportowych w formie radaru z 5 osiami: Szybkość, Siła, Wytrzymałość, Skoczność, Zwinność. Złota odznaka z ogólną oceną 0–100. Wygląda jak karta z FIFA Ultimate Team.

**🔥 Streak Ćwiczeń**
System motywacyjny nagradzający regularność. Maksymalna przerwa między treningami to 3 dni. Za każdy dzień aktywności uczeń zdobywa punkty bonusowe z rosnącym mnożnikiem.
- 🔥 7 dni → „Tygodniowy Wojownik"
- ⚡ 14 dni → „Niezniszczalny"  
- 👑 30 dni → „Legenda Szkoły"

**🚨 Łowca Anomalii**
Jeśli wynik jest o 20%+ lepszy od poprzedniego, aplikacja wyświetla dramatyczny alert z czerwoną świecącą ramką: „WYKRYTO TALENT!". Nagradzamy starania, nie tylko genetykę.

**🎁 Lootbox Gamifikacja**
Animowana skrzynka z nagrodą po każdym zatwierdzonym teście. Losowe nagrody: zniżki, odznaki, punkty bonusowe.

**📄 Paszport Sportowy PDF**
Jednym kliknięciem uczeń generuje profesjonalny PDF ze swoimi statystykami i może wysłać go do klubu sportowego.

**🏅 Underdog System**
Odznaka `+15% 🔥` nagradzająca postęp a nie tylko wyniki absolutne. Bo nie każdy rodzi się z talentem, ale każdy może się starać.

**✅ Anti-Cheat**
System weryfikacji wyników przez zdjęcie. Napis „Zweryfikowano przez Photo-Check" przy każdym wyniku.

### 👨‍🏫 Tryb Nauczyciela

- **Panel klas** – przegląd wszystkich uczniów z filtrami (najlepsi, aktywny streak, brak aktywności)
- **Rekrutacja do kadry** – system sugeruje najlepszych kandydatów automatycznie
- **Raport PDF** – eksport zestawienia całej klasy jednym kliknięciem
- **Moduł Ministerstwo** – integracja z systemem „Sportowe Talenty" (wysyłka danych)
- **Alert nieaktywności** – nauczyciel widzi kto nie trenował od ponad 2 tygodni

---

## 🛠️ Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Framework | Expo SDK 54 (React Native) |
| Język | TypeScript 100% |
| Nawigacja | React Navigation v6 (Stack + Bottom Tabs) |
| Wykresy | Victory Native (Radar Chart) |
| GPS Tracking | expo-location |
| PDF Export | expo-print + expo-sharing |
| Dane lokalne | AsyncStorage |
| Animacje | react-native-reanimated |
| UI | React Native Paper + NativeWind |

---

## 🚀 Instalacja i uruchomienie
```bash
