const alphabetDiv = document.getElementById('alphabet')
const wpm = document.getElementById('wpm')
const time = document.getElementById('time')
const shortcutTip = document.getElementById('restart')
const textDiv = document.getElementById('text')

shortcutTip.addEventListener('mouseover', function() {
    shortcutTip.innerText = 'ALT+R'

    setTimeout( () => {
        shortcutTip.innerText = 'Restart'
    },1000)
})



const restart = () => {
    textDiv.classList.remove('finish-signal')
    alphabetDiv.innerHTML = '';
    wpm.innerHTML = '';
    time.innerHTML = '';

    const text = 'abcdefghijklmnopqrstuvwxyz'
  
    const characters = text.split('').map(char => {
        spanChar = document.createElement('span');
        spanChar.classList.add('spanChar');
        spanChar.innerText = char;
        alphabetDiv.appendChild(spanChar);
        return spanChar;
    });

    characters[0].classList.add('currentChar')

    let currentIndex = 0;
    let currentCharacter = characters[currentIndex];  
    let timer = 0;
  
    const keydown = ({ key }) => {
      if (!timer) {
        timer = new Date();
      }
  
      if (key === currentCharacter.innerText) {
        currentCharacter.classList.remove('currentChar');
        currentCharacter.classList.add('correct');
        currentCharacter = characters[++currentIndex];

        if (currentIndex != text.length) {
            currentCharacter.classList.add('currentChar');
        }
      }
  
      if (currentIndex >= characters.length) {
        // Finished typing
        const endTime = new Date();
        const delta = endTime - timer;
        const seconds = delta / 1000;
        const wpm = text.split('').length / seconds * 60 / 4.7;
        document.getElementById('wpm').innerText = `${parseInt(wpm)}`;
        document.getElementById('time').innerText = `${seconds}`;
        textDiv.classList.add('finish-signal')
        document.removeEventListener("keydown", keydown);

        characters.forEach(char => {
            char.classList.add('finished')
            
        })
        }
  
    };
  
    document.addEventListener("keydown", keydown);
  };

restart()
