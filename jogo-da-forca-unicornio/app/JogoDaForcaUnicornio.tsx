import React, { useState } from 'react';

// Remova estas importações se você não tiver estes componentes
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WordHint {
  word: string;
  hint: string;
}

interface DifficultySettings {
  attempts: number;
  label: string;
}

const JogoDaForcaUnicornio: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState<'initial' | 'playing' | 'won' | 'lost'>('initial');
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [difficulty, setDifficulty] = useState<'facil' | 'medio' | 'dificil'>('medio');

  const words: Record<'facil' | 'medio' | 'dificil', WordHint[]> = {
    facil: [
      { word: 'UNICORNIO', hint: 'Animal mágico com um chifre' },
      { word: 'ARCOIRIS', hint: 'Fenômeno colorido no céu' },
      { word: 'ESTRELA', hint: 'Brilha no céu à noite' },
      { word: 'MAGICA', hint: 'Poder misterioso e encantador' }
    ],
    medio: [
      { word: 'GALAXIA', hint: 'Conjunto de estrelas e planetas' },
      { word: 'FANTASIA', hint: 'Mundo imaginário' },
      { word: 'SEREIA', hint: 'Criatura mítica do mar' },
      { word: 'DRAGAO', hint: 'Criatura lendária que cospe fogo' }
    ],
    dificil: [
      { word: 'CONSTELACAO', hint: 'Grupo de estrelas que formam uma figura' },
      { word: 'MITOLOGIA', hint: 'Estudo de lendas e mitos' },
      { word: 'ENCANTAMENTO', hint: 'Feitiço mágico' },
      { word: 'METAMORFOSE', hint: 'Transformação mágica' }
    ]
  };

  const difficultySettings: Record<'facil' | 'medio' | 'dificil', DifficultySettings> = {
    facil: { attempts: 8, label: 'Fácil' },
    medio: { attempts: 6, label: 'Médio' },
    dificil: { attempts: 4, label: 'Difícil' }
  };

  const startGame = () => {
    if (playerName.trim() === '') {
      alert('Por favor, digite seu nome antes de começar!');
      return;
    }
    const randomWord = words[difficulty][Math.floor(Math.random() * words[difficulty].length)];
    setWord(randomWord.word);
    setHint(randomWord.hint);
    setGuessedLetters([]);
    setWrongLetters([]);
    setAttempts(difficultySettings[difficulty].attempts);
    setGameState('playing');
  };

  const handleGuess = () => {
    if (guess && !guessedLetters.includes(guess.toUpperCase())) {
      const upperGuess = guess.toUpperCase();
      setGuessedLetters([...guessedLetters, upperGuess]);
      if (!word.includes(upperGuess)) {
        setWrongLetters([...wrongLetters, upperGuess]);
        setAttempts(attempts - 1);
      }
    }
    setGuess('');
    
    if (attempts === 1 && !word.includes(guess.toUpperCase())) {
      setGameState('lost');
    } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
      setGameState('won');
    }
  };

  const maskWord = word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="w-full max-w-4xl h-[80vh] bg-white shadow-xl overflow-hidden">
        <h1 className="text-center text-5xl font-bold text-purple-700 mb-8">
          Jogo da Forca Unicórnio
        </h1>
        <div className="flex flex-col items-center justify-center h-full">
          {gameState === 'initial' && (
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              <input 
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Digite seu nome"
                className="border-purple-300 w-full text-xl py-3"
              />
              <select 
                onChange={(e) => setDifficulty(e.target.value as 'facil' | 'medio' | 'dificil')} 
                defaultValue="medio"
                className="w-full"
              >
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
              <button onClick={startGame} className="bg-purple-500 hover:bg-purple-600 text-2xl py-6 px-12">
                Iniciar Jogo
              </button>
            </div>
          )}
          {gameState === 'playing' && (
            <>
              <div className="flex justify-between w-full mb-8">
                <div className="w-1/3">
                  {/* Aqui você pode adicionar o desenho da forca */}
                </div>
                <div className="w-2/3 text-center">
                  <p className="text-2xl mb-4">Jogador: {playerName}</p>
                  <p className="text-xl mb-2">Nível: {difficultySettings[difficulty].label}</p>
                  <p className="text-5xl font-mono mb-6">{maskWord}</p>
                  <p className="text-2xl mb-4 text-purple-600">Dica: {hint}</p>
                  <p className="text-xl">Tentativas restantes: {attempts}</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center mb-6">
                <input 
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  maxLength={1}
                  className="border-purple-300 w-20 text-2xl"
                />
                <button onClick={handleGuess} className="bg-purple-500 hover:bg-purple-600 text-xl py-4 px-8">
                  Adivinhar
                </button>
              </div>
              <div className="text-center">
                <p className="text-xl mb-2">Letras erradas:</p>
                <p className="text-2xl">{wrongLetters.join(' ')}</p>
              </div>
            </>
          )}
          {gameState === 'won' && (
            <div className="text-center bg-green-200 p-8 rounded-lg w-full">
              <p className="text-4xl text-green-700 mb-6">Parabéns, {playerName}!</p>
              <p className="text-3xl text-green-600 mb-6">Você venceu no nível {difficultySettings[difficulty].label}! A palavra era: {word}</p>
              <button onClick={() => setGameState('initial')} className="bg-green-500 hover:bg-green-600 text-xl py-4 px-8">
                Jogar Novamente
              </button>
            </div>
          )}
          {gameState === 'lost' && (
            <div className="text-center bg-red-200 p-8 rounded-lg w-full">
              <p className="text-4xl text-red-700 mb-6">Que pena, {playerName}!</p>
              <p className="text-3xl text-red-600 mb-6">Você perdeu no nível {difficultySettings[difficulty].label}. A palavra era: {word}</p>
              <button onClick={() => setGameState('initial')} className="bg-red-500 hover:bg-red-600 text-xl py-4 px-8">
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JogoDaForcaUnicornio;