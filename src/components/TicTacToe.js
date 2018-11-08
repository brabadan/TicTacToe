import React, {Component} from 'react';
import './TicTacToe.css';
import ScoreBoard from './ScoreBoard';

const PLAYER_SYMBOL = 'X'; // Символ, которым играет Игрок
const COMPUTER_SYMBOL = 'O'; //  Символ, которым играет Компьютер

/**
 * Компонент - Игра Крестики-Нолики
 * @props.cellSize - размер ячейки в пикселях
 */
class TicTacToe extends Component {
    constructor(props) {
        super(props);

        this.onClickCell = this.onClickCell.bind(this);
        this.state = {
            steps: [], // Записываем номера выбранных клеток
            deckCells: Array(9).join(',').split(','), // Массив клеток (слева-направо, сверху-вниз)
            scorePlayer: 0,
            scoreComputer: 0
        };
    }

    /**
     * Функция проверяет собранна-ли линия(любая, хоть крестики, хоть нолики)
     * @param deckCells - Массив клеток
     * @returns {boolean} - возвращаем true, если собрана
     */
    isSomeoneWin(deckCells) {
        const checkMatrix = [ // Массив вариантов линий
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6]
        ];
        for (let raw of checkMatrix) { // по каждому варианту линии проверяем одинаковость символов
            if (deckCells[raw[0]] && deckCells[raw[0]] === deckCells[raw[1]] && deckCells[raw[0]] === deckCells[raw[2]]) {
                return true; // Есть линия символов вряд
            }
        }
        return false; // Нет линии
    }

    /**
     * Функция счтиает ход для Компьютера
     * @param deckCells - Массив клеток
     * @returns number - возвращаем номер клетки, для хода Компьютера
     */
    computerMove(deckCells) {
        // Ищем победные ходы для Компьютера
        for (let i = 0; i < 9; i++) { // Цикл по всем клеткам
            if (!deckCells[i]) { // Если клетка пустая,
                deckCells[i] = COMPUTER_SYMBOL; // делаем сюда ход Компьютера
                if (this.isSomeoneWin(deckCells)) { // и проверяем, что он победный
                    return i; // если победный ход - возращаем номер клетки
                } else deckCells[i] = ''; // иначе очищаем её обратно
            }
        }
        // Ищем возможные победные ходы Игрока
        for (let i = 0; i < 9; i++) { // Цикл по всем клеткам
            if (!deckCells[i]) { // Если клетка пустая,
                deckCells[i] = PLAYER_SYMBOL; // делаем сюда ход Игрока
                if (this.isSomeoneWin(deckCells)) { // и проверяем, что он победный
                    return i; // если да, то возвращаем номер клетки (перекрываем игроку победный ход)
                } else deckCells[i] = ''; // иначе очищаем её обратно
            }
        }
        // Если нет победных ходов, то выбираем в порядке: центр, угловые, остальные
        const n = deckCells.map((cell, index) => cell ? "" : index); // создаем массив с номерами пустых клеток(а занятые делаем пустыми)
        return n[4] || n[0] || n[2] || n[6] || n[8] || n[1] || n[3] || n[5] || n[7]; // возвращаем номер
    }

    /**
     * Функция при клике на клетку
     * @param e - DOM-элемент на который кликнул Игрок
     */
    onClickCell(e) {
        const playerCellNumber = e.target.dataset.number; // Номер клетки, куда кликнул Игрок
        if (!playerCellNumber || this.state.deckCells[playerCellNumber]) return; // Если клета занята - не реагируем

        const steps = this.state.steps.slice(0); // Массив шагов Игры
        steps.push(playerCellNumber); // Добавляем последний ход
        const deckCells = this.state.deckCells.slice(0); // Массив клеток Игры
        deckCells[playerCellNumber] = PLAYER_SYMBOL; // Заполняем клетку Игрока

        if (this.isSomeoneWin(deckCells)) { // Если Игрок выиграл
            this.setState({deckCells}, // Записываем последний ход и
                () => {
                    setTimeout(() => { // Делаем паузу перед поздравлением, для обновления экрана
                        alert('Поздравляю Вас с победой!!!');
                        const scorePlayer = this.state.scorePlayer + 1; // Счетчик Игрока увеличиваем и
                        this.setState({scorePlayer}); // сохраняем
                        this.initDeck(); // Очищаем игровое поле
                    }, 200)
                });
        } else if (steps.length === 9) { // иначе, если ничья
            this.setState({deckCells}, // Записываем последний ход и
                () => {
                    setTimeout(() => { // Делаем паузу перед поздравлением, для обновления экрана
                        alert('Эта партия сыграна вничью!');
                        const scorePlayer = this.state.scorePlayer + 0.5; // Делим одно очко на двоих :)
                        const scoreComputer = this.state.scoreComputer + 0.5;
                        this.setState({scorePlayer, scoreComputer}); // Обновляем счёт
                        this.initDeck(); // Очищаем игровое поле
                    }, 200)
                }
            );
        } else { // иначе, ходит компьютер
            const computerMove = this.computerMove(deckCells);
            steps.push(computerMove);
            deckCells[computerMove] = COMPUTER_SYMBOL;
            if (this.isSomeoneWin(deckCells)) {
                this.setState({deckCells}, // Записываем последний ход и
                    () => {
                        setTimeout(() => { // Делаем паузу перед сообщением, для обновления экрана
                            alert('Эту партию выиграл компьютер. Попробуйте сыграть ещё раз.');
                            const scoreComputer = this.state.scoreComputer + 1;
                            this.setState({scoreComputer}); // Обновляем счёт
                            this.initDeck(); // Очищаем игровое поле
                        }, 200)
                    }
                );
            } else { // Иначе - это обычный ход и
                this.setState({deckCells, steps}); // сохраняем его
            }
        }
    }

    /**
     * Функция очищает игровое поле и начинает игру заново
     */
    initDeck() {
        const deckCells = Array(9).join(',').split(',');
        const steps = [];
        this.setState({deckCells, steps});
    }

    render() {
        return (
            <div>
                {/*Выводим табло*/}
                <ScoreBoard scorePlayer={this.state.scorePlayer}
                            scoreComputer={this.state.scoreComputer}
                />
                {/*выводим игровое поле*/}
                <div className="deck"
                     style={{
                         width: (3 * this.props.cellSize) + 'px',
                         height: (3 * this.props.cellSize) + 'px',
                     }}
                >
                    {/*выводим кажду клетку*/}
                    {this.state.deckCells.map((cell, index) => {
                        return (
                            <div onClick={this.onClickCell}
                                 data-number={index}
                                 key={index}
                                 className={cell.trim() ? 'cell-busy deck-cell' : 'cell-empty deck-cell'}
                                 style={{
                                     left: (this.props.cellSize * (index % 3) - 1) + 'px',
                                     top: (this.props.cellSize * Math.floor(index / 3) - 1) + `px`,
                                     width: this.props.cellSize + 'px',
                                     height: this.props.cellSize + 'px',
                                     fontSize: (this.props.cellSize * 2 / 3) + 'px'
                                 }}
                            >
                                {cell}
                            </div>
                        )
                    })}
                </div>
                <button onClick={this.initDeck.bind(this)}>Играть сначала</button>
            </div>
        )
    }
}

export default TicTacToe;