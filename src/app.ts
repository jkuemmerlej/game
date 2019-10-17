let squares: NodeListOf<HTMLDivElement>;

export function runApp() {
    squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;
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
        });
    } else {
        clickedSq.classList.add('loser');
    }
}

function getSecretNumber() {
    return getRandomInt(0, 5);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
