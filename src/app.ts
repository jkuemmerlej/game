import { getRandomInt } from './utils';

let squares: NodeListOf<HTMLDivElement>;
let attempts = 0;
let message: HTMLElement;

export function runApp() {
    squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;
    message = document.getElementById('message');
    const secret = getSecretNumber();

    squares.forEach((sq, index) => {
        if (index === secret) {
            sq.dataset.secret = 'true';
        }
        sq.addEventListener('click', handleClick);
    });
}

function handleClick() {
    const clickedSq = this as HTMLDivElement;
    if (clickedSq.dataset.secret === 'true') {
        clickedSq.classList.add('winner');
        squares.forEach(sq => {
            if (sq !== clickedSq) {
                sq.classList.add('loser');
            }
            sq.removeEventListener('click', handleClick);
        });
        message.innerText = 'Congrats! You win!';
    } else {
        clickedSq.classList.add('loser');
        attempts++;

        if (attempts >= 5) {
            message.innerText = 'Wow, you lose.';

            squares.forEach(sq => {
                sq.removeEventListener('click', handleClick);
            });
        }
    }
}

function getSecretNumber() {
    return getRandomInt(0, 5);
}
