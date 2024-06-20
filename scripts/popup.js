document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex';
});

document.getElementById('openPopupBtn2').addEventListener('click', function() {
    document.getElementById('overlay2').style.display = 'flex';
});

document.getElementById('openPopupBtn3').addEventListener('click', function() {
    document.getElementById('overlay3').style.display = 'flex';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('overlay2').style.display = 'none';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('overlay3').style.display = 'none';
});

// Close the overlay when clicking outside of the popup
document.getElementById('overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

document.getElementById('overlay2').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});

document.getElementById('overlay3').addEventListener('click', function(event) {
    if (event.target === this) {
        this.style.display = 'none';
    }
});