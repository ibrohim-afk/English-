import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuizScore,
  evaluatePerformance,
  verifyEventSequence,
  classifyVerb,
  formatResearchLogCSV,
} from './logic';

test('calculateQuizScore computes accurate percentages', () => {
  assert.equal(calculateQuizScore(5, 5), 100);
  assert.equal(calculateQuizScore(4, 5), 80);
  assert.equal(calculateQuizScore(0, 10), 0);
  assert.equal(calculateQuizScore(7, 10), 70);
  assert.equal(calculateQuizScore(0, 0), 0);
});

test('evaluatePerformance classifies scores with Grade 8 KKM standards', () => {
  const resultA = evaluatePerformance(95);
  assert.equal(resultA.grade, 'A');
  assert.equal(resultA.passed, true);

  const resultB = evaluatePerformance(75);
  assert.equal(resultB.grade, 'B');
  assert.equal(resultB.passed, true);

  const resultC = evaluatePerformance(65);
  assert.equal(resultC.grade, 'C');
  assert.equal(resultC.passed, false);

  const resultD = evaluatePerformance(40);
  assert.equal(resultD.grade, 'D');
  assert.equal(resultD.passed, false);
});

test('verifyEventSequence accurately tests chronological ordering', () => {
  const correctEvents = [
    { id: 1, text: 'We woke up early', order: 1 },
    { id: 2, text: 'We boarded the bus', order: 2 },
    { id: 3, text: 'We arrived at destination', order: 3 },
  ];
  const verified = verifyEventSequence(correctEvents);
  assert.equal(verified.isCorrect, true);
  assert.equal(verified.correctPositionsCount, 3);

  const jumbledEvents = [
    { id: 2, text: 'We boarded the bus', order: 2 },
    { id: 1, text: 'We woke up early', order: 1 },
    { id: 3, text: 'We arrived at destination', order: 3 },
  ];
  const jumbledCheck = verifyEventSequence(jumbledEvents);
  assert.equal(jumbledCheck.isCorrect, false);
  assert.equal(jumbledCheck.correctPositionsCount, 1); // only order 3 is in index 2 (1-based: 3)
});

test('classifyVerb distinguishes regular and irregular past verbs', () => {
  assert.equal(classifyVerb('visit', 'visited'), 'regular');
  assert.equal(classifyVerb('play', 'played'), 'regular');
  assert.equal(classifyVerb('arrive', 'arrived'), 'regular');
  assert.equal(classifyVerb('go', 'went'), 'irregular');
  assert.equal(classifyVerb('buy', 'bought'), 'irregular');
  assert.equal(classifyVerb('eat', 'ate'), 'irregular');
});

test('formatResearchLogCSV outputs valid CSV lines', () => {
  const sampleData = [
    {
      studentName: 'Aisyah Putri',
      studentClass: '8-A',
      school: 'SMP Negeri 1',
      moduleName: 'Post-Test Recount Text',
      score: 90,
      completedAt: '2026-10-23 10:00',
    },
  ];
  const csv = formatResearchLogCSV(sampleData);
  assert.match(csv, /No,Nama Siswa,Kelas,Sekolah,Modul \/ Tes/);
  assert.match(csv, /"Aisyah Putri","8-A","SMP Negeri 1","Post-Test Recount Text",90/);
});
