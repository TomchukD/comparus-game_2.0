import { Component } from '@angular/core';
import { GameComponent } from 'src/app/game/game.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [GameComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
}
