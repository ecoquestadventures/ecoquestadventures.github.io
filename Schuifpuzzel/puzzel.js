document.addEventListener("DOMContentLoaded", () => {
    const puzzleBoard = document.getElementById("puzzle-board");
    const piecesBoard = document.getElementById("pieces-board");
    const completionMessage = document.getElementById("completion-message");
    const titelEnUitleg = document.querySelector('.titelenuitleg');

    // Timer (placement nog maken)
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'timer';
    timerDisplay.textContent = "Time elapsed: 0:00";
    document.body.appendChild(timerDisplay);

    const puzzleImageSrc = "img/jungle.jpg"; // Plaatje
    const pieces = 16; // Hoeveel puzzelstukjes
    let elapsedTime = 0; 
    let puzzleCompleted = false;
    const timeLimit = 120; // Tijdslimiet in seconden
    let remainingTime = 0; // Opslaan van overige tijd
    let activePiece = null; // Welk stukje we verplaatsen, bijhouden zodat we later functionaliteit configureren

    // Board randomizen
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Slepen beginnen
    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.id);
        activePiece = event.target;
        setTimeout(() => {
            event.target.classList.add('dragging');
        }, 0);
    }

    // Slepen eindigen
    function dragEnd(event) {
        activePiece = null;
        event.target.classList.remove('dragging');
    }

    // Slepen over stukjes heen dat ie niet de andere pakt
    function dragOver(event) {
        event.preventDefault();
    }

    // Loslaten van stukkie
    function drop(event) {
        event.preventDefault();
        const pieceId = event.dataTransfer.getData("text");
        const piece = document.getElementById(pieceId);
        const slotId = event.target.id;

        if (slotId.startsWith("slot-")) {
            if (event.target.childNodes.length === 0) {
                // Moet exact in een stukkie, weet niet hoe ik t flexibel maak
                event.target.appendChild(piece);
            } else {
                // Wissel stukjes als er al wat zit, werkt niet mokertje hinderlijk kom er echt niet uit
                const existingPiece = event.target.firstChild;
                const pieceSlot = piece.parentNode;
                const existingSlot = existingPiece.parentNode;

                pieceSlot.appendChild(existingPiece);
                existingSlot.appendChild(piece);
            }

            // Einde van puzzel?
            checkPuzzleCompletion();
        }
    }

    // Hopelijk heb je goed gedaan
    function checkPuzzleCompletion() {
        let completed = true;
        for (let i = 0; i < pieces; i++) {
            const slot = document.getElementById(`slot-${i}`);
            if (!slot.hasChildNodes() || slot.firstChild.id !== `piece-${i}`) {
                completed = false;
                break;
            }
        }

        if (completed) {
            puzzleCompleted = true;
            remainingTime = elapsedTime; // Opslaan van overige tijd
            clearInterval(countdownTimer);
            showCompletionMessage();
        }
    }

    // In de functie showCompletionMessage() vervang je de huidige inhoud van de container met de completion message.
    function showCompletionMessage() {
        const minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        completionMessage.innerHTML = `
            <h1>You've completed the puzzle and revealed a beautiful world!</h1>
            <p>Elapsed time: ${minutes}:${seconds}</p>
            <button id="next" onclick="window.location.href = '/Homescreens/homescreen2.html';">NEXT</button>
        `;

        // Verwijder de titel en uitleg en toon de completion message
        titelEnUitleg.classList.add('hidden');
        completionMessage.classList.remove("hidden");
    }

    // Timer update
    function updateTimer() {
        if (elapsedTime >= timeLimit) {
            clearInterval(countdownTimer);
            timerDisplay.textContent = "Time's up!";
            // Voeg hier de code toe om de stukjes onklikbaar te maken
            const pieces = document.querySelectorAll('.puzzle-piece');
            pieces.forEach(piece => piece.draggable = false);
        } else {
            const minutes = Math.floor(elapsedTime / 60);
            let seconds = elapsedTime % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerDisplay.textContent = `Time elapsed: ${minutes}:${seconds}`;
        }
        elapsedTime++; // Verhoog de tijd
    }

    // Laden van pagina
    const shuffledPieces = shuffleArray(Array.from(Array(pieces).keys()));
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${puzzleImageSrc})`;
        piece.style.backgroundSize = "400px 400px";
        piece.style.backgroundPosition = `${-(shuffledPieces[i] % 4) * 100}px ${-Math.floor(shuffledPieces[i] / 4) * 100}px`;
        piece.draggable = true;
        piece.id = `piece-${shuffledPieces[i]}`;
        piecesBoard.appendChild(piece);

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragend", dragEnd);
    }

    // Plekjes maken
    for (let i = 0; i < pieces; i++) {
        const slot = document.createElement("div");
        slot.classList.add("puzzle-piece");
        slot.id = `slot-${i}`;
        puzzleBoard.appendChild(slot);

        slot.addEventListener("dragover", dragOver);
        slot.addEventListener("drop", drop);
    }

    // Timer countdown
    let countdownTimer = setInterval(updateTimer, 1000);
});
