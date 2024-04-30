import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Core } from 'src/app/game/core';

@Component({
    selector: 'game',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

    // ########################################

    private cellCount = this.core.cellCount;

    // ########################################

    public gridCells: number[] = Array(this.cellCount).fill(0);

    public gridStateCell = this.core.gridStateCell;

    public timeForm = new FormControl<string>('0', {
        nonNullable: true, validators:
            [Validators.required,
                Validators
                    .min(0),
                Validators
                    .pattern('[0-9]')

            ]
    });

    public winner: string = '';

    public showModal: boolean = false;

    public disabled: boolean = false;

    // ########################################

    constructor(private core: Core) {
    }

    // ########################################

    public get timeControlValue(): string {
        return this.timeForm.value;
    }

    public get isDisabled(): boolean {
        return this.timeControlValue ? this.disabled : true;
    }

    public get playerScore(): number {
        return this.core.playerScore;
    }

    public get computerScore(): number {
        return this.core.computerScore;
    }

    // ########################################

    ngOnInit(): void {
        this.core.updateStatusCellCallBeck = ((update: string[]) => {
            this.gridStateCell = update;
        });

        this.core.checkWinnerCallBack = ((isShowModal: boolean, players: string) => {
            this.showModal = isShowModal;
            this.winner = players;
        });

    }

    // ########################################

    public startGame(): void {
        this.core.startGame(this.timeControlValue);
    }

    public onClickCell(cellIndex: number): void {
        this.core.setCell(cellIndex);
    }

    public hideModal(): void {
        this.resetGame();

    }

    public resetGame(): void {
        this.core.resetGame();
        this.showModal = false;
    }

    public onlyNumber(value: string): void {
        const conv = value.replace(/[^\d]/g, '');

        this.timeForm.setValue(conv);
    }


    // ########################################
}