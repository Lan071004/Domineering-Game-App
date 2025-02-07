import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const gridSize = 10;

const App = () => {
  const createEmptyBoard = () => {
    return Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
  };

  const [board, setBoard] = useState<(string | null)[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'V' | 'H'>('V');
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col] !== null) return;
    const newBoard = board.map((rowArr) => [...rowArr]);

    if (currentPlayer === 'V') {
      if (row < gridSize - 1 && newBoard[row][col] === null && newBoard[row + 1][col] === null) {
        newBoard[row][col] = 'V';
        newBoard[row + 1][col] = 'V';
        setBoard(newBoard);
        setCurrentPlayer('H');
      }
    } else if (currentPlayer === 'H') {
      if (col < gridSize - 1 && newBoard[row][col] === null && newBoard[row][col + 1] === null) {
        newBoard[row][col] = 'H';
        newBoard[row][col + 1] = 'H';
        setBoard(newBoard);
        setCurrentPlayer('V');
      }
    }
    checkGameOver(newBoard);
  };

  const checkGameOver = (newBoard: (string | null)[][]) => {
    let validMoveFound = false;
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (currentPlayer === 'V') {
          if (row < gridSize - 1 && newBoard[row][col] === null && newBoard[row + 1][col] === null) {
            validMoveFound = true;
            break;
          }
        } else if (currentPlayer === 'H') {
          if (col < gridSize - 1 && newBoard[row][col] === null && newBoard[row][col + 1] === null) {
            validMoveFound = true;
            break;
          }
        }
      }
    } 
    if (!validMoveFound){
      setGameOver(true);
    }
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.boardRow}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.cell,
              cell === 'V' ? styles.cellV : cell === 'H' ? styles.cellH : {},
            ]}
            onPress={() => handleCellClick(rowIndex, colIndex)}
          />
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Domineering Game</Text>
      <Text style={styles.subtitle}>Current Player: {currentPlayer}</Text>
      {renderBoard()}
      {gameOver && (
        <Text style={styles.subtitle}>
          Game over! Player {currentPlayer === 'V' ? 'H' : 'V'} wins!
        </Text>
      )}
    </View>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  boardRow: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',

  },
  cellV: {
    backgroundColor: '#ffd700', // Vertical dominoes
  },
  cellH: {
    backgroundColor: '#ef007f', // Horizontal dominoes
  },
  title: {
    fontSize: 24,
    color: 'rgb(20, 209, 243)',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgb(20, 243, 150)',
    marginBottom: 10,
  },
});

export default App;