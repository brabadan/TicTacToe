import React, {Component} from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe';
import StartPage from './components/StartPage';

class App extends Component {
    state = {
        showStartPage: true // Условие показа стартовой страницы
    };

    // Функция - Закрывает стартовую страницу
    closeStartPage() {
        this.setState({showStartPage: false});
    }

    render() {
        // Если надо - показываем стартовую страницу
        if (this.state.showStartPage) {
            return (
                <div className="App-start-page"
                     onClick={this.closeStartPage.bind(this)}
                >
                    <StartPage/>
                </div>
            )
        } else // Иначе показываем основную страницу
            return (
                <div className="App">
                    {/*шапка*/}
                    <header className="App-header">
                        <h6>TIC-TAC-TOE === КРЕСТИКИ-НОЛИКИ</h6>
                    </header>
                    {/*ИГРА*/}
                    <TicTacToe cellSize="60"/>
                </div>
            );
    }
}

export default App;
