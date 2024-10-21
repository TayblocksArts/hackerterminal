log("Willkommen liebe Detektive! Erhackt euch den naechsten Code, viel Spass!");
log("Tippe start, um zu beginnen.")

let audio = document.getElementById("voice1");
   
function playAudio() {
  audio.play();
}
 
function pauseAudio() {
  audio.pause();
}
playAudio()
log("Mit Alt+F4, kannst du das Terminal schliessen, wenn du fertig bist.")

update_user_title("C:/Detektiv/");