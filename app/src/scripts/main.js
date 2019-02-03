const final = document.getElementById('final-score');

function endGame() {
  if (lives < 0) {
    console.log('game over');
    canvas.style.display = 'none';
    modal.style.display = 'block';
    final.innerText = scoreVal.innerText;
  }
}

function newGame() {
  lives = 2;
  score = 0;
  scoreVal.innerText = 0;
  modal.style.display = 'none';
  canvas.style.display = 'initial';
  //loops back over the hearts list to add the original class name
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].classList.remove('far');
    hearts[i].classList.add('fas');
  }
}
