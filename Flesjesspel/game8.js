
        let score = 0;
        let timeLeft = 0;
        let bottlesClicked = 0;
        let correctAnswer = 0;
        let correctAnswers = 0; // Nieuwe variabele om het aantal goede antwoorden bij te houden
        let bottleDetails = {}; // Om kleuren en aantal flesjes op te slaan
        let timerInterval;
        let currentTime = 0;

        function startGame() {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('game-over').style.display = 'none';
            generateBottles();
            timeLeft = 0; // Timer op 0 zetten.
            currentTime = 0;
            clearInterval(timerInterval);
            startTimer();
        }

        function generateBottles() {
            const imagePaths = ['flesje1.png', 'flesje2.png', 'flesje3.png']; // Voeg hier de paden naar je afbeeldingen toe
            const bottlesContainer = document.getElementById('bottles');
            bottlesContainer.innerHTML = '';
            const bottleCount = Math.floor(Math.random() * 5) + 3; // Willekeurig aantal tussen 3 en 7

            // Reset het object bij het genereren van nieuwe flesjes
            bottleDetails = {};

            // Verdeel de flesjes over de container
            for (let i = 0; i < bottleCount; i++) {
                const imagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)]; // Kies willekeurig een afbeelding
                const bottle = document.createElement('div');
                bottle.className = 'bottle';
                bottle.style.backgroundImage = `url(${imagePath})`; // Stel de achtergrondafbeelding in
                bottle.dataset.clicked = 'false';
                bottle.onclick = () => bottleClicked(bottle);
                // Willekeurige positie instellen
                bottle.style.left = Math.floor(Math.random() * (window.innerWidth - 50)) + 'px';
                bottle.style.top = Math.floor(Math.random() * (window.innerHeight - 100)) + 'px';
                bottlesContainer.appendChild(bottle);

                // Tel het aantal flesjes van elk type op
                if (bottleDetails[imagePath]) {
                    bottleDetails[imagePath]++;
                } else {
                    bottleDetails[imagePath] = 1;
                }
            }

            correctAnswer = bottleCount;
            document.getElementById('sumQuestion').textContent = `How many bottles? ${generateSumQuestion()}`;
        }

        function generateSumQuestion() {
            let sumArray = [];
            Object.keys(bottleDetails).forEach(imagePath => {
                sumArray.push(bottleDetails[imagePath]);
            });
            let sumQuestion = sumArray.join(' + ');
            return `${sumQuestion} =`;
        }

        let allBottlesClicked = false;

        function bottleClicked(bottle) {
            if (bottle.dataset.clicked === 'true') return;
            bottle.dataset.clicked = 'true';
            bottlesClicked++;
            bottle.style.display = 'none'; // Flesje laten verdwijnen
            if (bottlesClicked === correctAnswer) {
                showQuestion(); // Roep showQuestion aan nadat alle flesjes zijn geklikt
            }
        }

        function showQuestion() {
            document.getElementById('bottles').style.display = 'none';
            document.getElementById('overlay').style.display = 'flex';
            document.getElementById('sumQuestion').textContent = `How many bottles? ${generateSumQuestion()}`;
        }
        function checkAnswer() {
            const answer = parseInt(document.getElementById('answer').value, 10);
            if (answer === correctAnswer) {
                score++;
                document.getElementById('score').textContent = 'Score: ' + score;
                correctAnswers++; // Het aantal goede antwoorden verhogen
                if (score >= 1) { // Als de score 8 bereikt is, stop de timer en het spel
                    clearInterval(timerInterval);
                    redirectToEndPage();
                } else {
                    resetGame();
                }
            }
        }

        function resetGame() {
            bottlesClicked = 0;
            document.getElementById('answer').value = '';
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('bottles').style.display = 'block';
            generateBottles();
        }

        function startTimer() {
            timerInterval = setInterval(() => {
                currentTime++; // Timer laten oplopen
                document.getElementById('timer').textContent = 'Time: ' + currentTime;
            }, 1000);
        }

        function endGame() {
            document.getElementById('bottles').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('final-score').textContent = `Well done! Your time was: ${currentTime} seconds`;
        }
        function redirectToEndPage() {
            const url = `/Homescreens/homescreen3.html?time=${currentTime}`;
            window.location.href = url;
        }

        window.onload = startGame;
