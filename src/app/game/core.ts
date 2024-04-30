import { Injectable } from '@angular/core';
import { CellState, Players } from 'src/app/game/game.enum';

@Injectable({ providedIn: 'root' })
export class Core {
    // ########################################

    private selectedCell: number = -1;

    // ########################################

    public readonly upperScore = 10;

    public readonly cellCount = 100;

    public playerScore: number = 0;

    public computerScore: number = 0;

    public timerID: number | null = null;

    public gridStateCell: string[] = Array(this.cellCount).fill(CellState.IDLE);

    public time: number = 0;

    public updateStatusCellCallBeck: any;

    public checkWinnerCallBack: any;

    // ########################################

    public updateCellState(data: string[]): void {
        if (this.updateStatusCellCallBeck) {
            this.updateStatusCellCallBeck(data);
        }
    }

    public updateCheckWinner(data: boolean, players: string): void {
        if (this.checkWinnerCallBack) {
            this.checkWinnerCallBack(data, players);
        }
    }


    public startGame(time: string): void {
        this.resetGame();
        this.generateRandomCell();
        this.time = Number(time);
        this.startTimer();
    }

    public setCell(cellIndex: number): void {
        if (this.gridStateCell[cellIndex] === CellState.PENDING) {
            this.playerScore++;
            this.gridStateCell[cellIndex] = CellState.SUCCESS;
            this.checkWinner();
            clearInterval(this.timerID!);
            this.startTimer();
        }
    }

    public resetGame(): void {
        clearInterval(this.timerID!);
        this.timerID = null;
        this.gridStateCell = Array(this.cellCount).fill(CellState.IDLE);
        this.updateCellState(this.gridStateCell);
        this.playerScore = this.computerScore = 0;
    }


    public startTimer(): void {
        this.timerID = setInterval(() => {
            if (this.gridStateCell[this.selectedCell] === CellState.PENDING) {
                this.gridStateCell[this.selectedCell] = CellState.FAIL;
                this.computerScore++;
            }
            this.selectedCell = -1;
            this.checkWinner();
            this.updateCellState(this.gridStateCell);

        }, this.time);
    }


    // ########################################

    private checkWinner(): void {
        if (this.playerScore === this.upperScore || this.computerScore === this.upperScore) {
            clearInterval(this.timerID!);
            const players = this.playerScore === this.upperScore ? Players.playerOne : Players.playerTwo;
            this.updateCheckWinner(true, players);
            return;
        }
        this.generateRandomCell();

    }

    private generateRandomCell(): void {
        do {
            this.selectedCell = Math.floor(Math.random() * this.cellCount);
        }
        while (this.gridStateCell[this.selectedCell] !== CellState.IDLE);
        {
            this.gridStateCell[this.selectedCell] = CellState.PENDING;
        }
    }


    // ########################################
}