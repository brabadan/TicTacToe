import React, {Component} from "react";
import './Scoreboard.css';

/**
 * Игровое табло
 * @props.scorePlayer - счет Игрока
 * @props.scoreComputer - счет компьютера
 */
class ScoreBoard extends Component{
    render() {
        return (
            <div className="scoreboard">
                <div>
                    <h4>Счет:</h4>
                    <table className="scoreboard-table">
                        <thead>
                        <tr>
                            <td> Человек:</td>
                            <td>Компьютер</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                {this.props.scorePlayer}
                            </td>
                            <td>
                                {this.props.scoreComputer}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ScoreBoard;