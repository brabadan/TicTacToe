import React, {Component} from 'react';
import './StartPage.css';

/**
 * Стартовая страница, показываем при открытии Игры
 */
class StartPage extends Component {
    render () {
        return (
            <div className="start-page"

            >
                <span>
                    Крестики-нолики – классическая игра,<br></br>
                    в которую сражались на переменке<br></br>
                    в школе дети многих поколений.<br></br>
                    <br></br>
                    Правила игры классические:<br></br>
                    Задача – поставить 3 фигуры в клетки <br></br>
                    так, чтобы по диагонали, вертикали <br></br>
                    или горизонтали получилась линия.<br></br>
                    <br></br>
                    Вы играете крестиками, а компьютер ноликами.
                    Ваш ход первый.
                    <br></br>
                    <b>Кликните мышкой по экрану, для начала ИГРЫ</b>
                </span>
            </div>
        )
    }
}

export default StartPage;