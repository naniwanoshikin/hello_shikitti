'use strict'; {

  const num = 4;
  const winner = Math.floor(Math.random() * num); // 0-4

  for (let i = 0; i < num; i++) {
    const div = document.createElement('div');
    document.getElementById('round').appendChild(div);
    div.classList.add('box');
    div.textContent = i;
    div.addEventListener('click', () => {
      div.classList.toggle('circle');
      if (i === winner) {
        div.textContent = 'WIN!';
        div.classList.add('win');
      } else {
        div.textContent = 'LOSE';
        div.classList.add('lose');
      }
    });
  }

}
