// src/features/utils/seedSupabase.ts
import { supabase } from '../config/supabase';
import { MOCK_STUDENTS } from '../data/MockStudents';

// Autentyczne szkoły z Nowego Sącza
const NOWY_SACZ_SCHOOLS = [
  { id: 'sp2_ns', name: 'Szkoła Podstawowa nr 2 w Nowym Sączu', address: 'ul. Jagiellońska 32, Nowy Sącz' },
  { id: 'sp3_ns', name: 'Szkoła Podstawowa nr 3 w Nowym Sączu', address: 'ul. Szkolna 7, Nowy Sącz' },
  { id: '1lo_ns', name: 'I Liceum Ogólnokształcące w Nowym Sączu', address: 'ul. Jana Długosza 5, Nowy Sącz' },
  { id: 'zsem_ns', name: 'Zespół Szkół Elektryczno-Mechanicznych', address: 'ul. Bolesława Limanowskiego 4, Nowy Sącz' },
  { id: 'sp21_ns', name: 'Szkoła Podstawowa nr 21 w Nowym Sączu', address: 'ul. Rokitniańczyków 26, Nowy Sącz' }
];

export async function seedSupabase(): Promise<void> {
  try {
    console.log('⏳ Rozpoczynam tworzenie bazy danych dla Nowego Sącza...');

    // 1. ZAPISUJEMY SZKOŁY W BAZIE
    for (const school of NOWY_SACZ_SCHOOLS) {
      const { error } = await supabase.from('schools').upsert({
        name: school.name,
        address: school.address,
        createdAt: new Date().toISOString()
      }, { onConflict: 'name' });
      if (error) console.error("Error upserting school", error);
    }
    console.log(`✅ Zapisano ${NOWY_SACZ_SCHOOLS.length} sądeckich szkół do tabeli 'schools'.`);

    // 2. ZAPISUJEMY UCZNIÓW I PRZYPISUJEMY IM SZKOŁY
    const getRandomSchool = () => NOWY_SACZ_SCHOOLS[Math.floor(Math.random() * NOWY_SACZ_SCHOOLS.length)].name;

    for (let i = 0; i < MOCK_STUDENTS.length; i++) {
      const student = MOCK_STUDENTS[i];
      const assignedSchool = i < 5 ? NOWY_SACZ_SCHOOLS[0].name : getRandomSchool();

      const { error } = await supabase.from('students').upsert({
        id: student.id,
        name: student.name,
        class: student.class || '6A',
        age: student.age || 12,
        avatar: student.avatar || '',
        stats: student.stats || {},
        testResults: student.testResults || [],
        currentStreak: student.currentStreak || 0,
        longestStreak: student.longestStreak || 0,
        overall: student.overall || 0,
        bonusPoints: student.bonusPoints || 0,
        lastWorkoutDate: student.lastWorkoutDate || new Date().toISOString(),
        inSquad: student.inSquad || false,
        school: assignedSchool,
      }, { onConflict: 'id' });
      
      if (error) console.error("Error upserting student", error);
    }

    console.log(`✅ Seed zakończony: ${MOCK_STUDENTS.length} uczniów zasilonych w Supabase.`);
    alert("Baza danych Supabase została zaktualizowana!");
  } catch (error) {
    console.error('❌ Błąd przy seedowaniu Supabase:', error);
    alert("Błąd seedowania bazy!");
  }
}
