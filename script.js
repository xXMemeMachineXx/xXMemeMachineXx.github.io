  var current_state = 0;
  var teller = 0;
  var check = 0;
  
  var farge = {};

  var timerVar;

  //ModeChangerVariables
  var modeNumber = 0;
  var NumberOfModes = 3; //antall moduser -1
  const modusNavnListe = ["Original", "Disco Mode", "Custom Color", "Bondesjakk", "Clicker Game(work in progress, blinks may be reset)"]
  var modusNavn;

  //TicTacToeVariables
  var playerActive = 1;
  const TicTacToe = document.getElementById("TicTacToe");
  const ActivePlayerText = document.getElementById("PlayerActiveText");
  const ResetButton = document.getElementById("ResetButton");
  TicTacToeTeller = 0;
  
  var A1=0;
  var A2=0;
  var A3=0;

  var B1=0;
  var B2=0;
  var B3=0;

  var C1=0;
  var C2=0;
  var C3=0;
  
  //CustomColorVariable
  var red=1;
  var blue=1;
  var green=1;

  var customColor;

  var RedSlider = document.getElementById("RedSlider");
  var RedOutput = document.getElementById("redNumber");
  RedOutput.innerHTML = RedSlider.value;

  var GreenSlider = document.getElementById("GreenSlider");
  var GreenOutput = document.getElementById("greenNumber");
  GreenOutput.innerHTML = GreenSlider.value;

  var BlueSlider = document.getElementById("BlueSlider");
  var BlueOutput = document.getElementById("blueNumber");
  BlueOutput.innerHTML = BlueSlider.value;

  var ColorPicker = document.getElementById("ColorPicker");

  const lys = document.getElementById("LightOff")
  const StartButton = document.getElementById("Hastighetknapp")

 

  //Clicker variables ClickingPowerText
  const ClickerGame = document.getElementById("ClickerGame")
  const lysClickable = document.getElementById("ClickerLight")
  const ClickAmount = document.getElementById("Clicks")
  const ClickPowerText = document.getElementById("ClickingPowerText")
  const ClickingPowerPriceText = document.getElementById("ClickingPowerPriceText")
  

  let clicks;
  let priceForClickPowerUpgrade;
  var autoClickerAmount;
  var autoClickerStrength;
  
  
  function start(){
  farge.randomColor = Math.floor(Math.random()*16777215).toString(16);
      if(modeNumber == 0){
        check = 1;
        timer()
      } else if(modeNumber == 1){
        check = 2;
        timerDisco();
      } else if(modeNumber == 2){
        check = 3;
        timer();
      } else if(modeNumber == 3){
        check = 4;
        ActivePlayerText = "Player 1's turn";
      } else if(modeNumber == 4){
        check = 5;
        clickerGameLoad();
      }
  }

  function BlinkeLys() {
    if(check == 1 || check == 3){
    if (current_state == 0) {
      
      lys.style.backgroundColor = "white";
      current_state = 1;
    } else {
      if(check == 3){
        lys.style.backgroundColor = customColor ;
      }else{
        lys.style.backgroundColor = "#" + farge.randomColor;
      }
     
      current_state = 0;
      teller = teller+1
      document.title = `Blinkendelys.no blink: ${teller}`
    }
  }
  }

  function BlinkeLysDisco() {
    if(check == 2){
    
    farge.randomColor = Math.floor(Math.random()*16777215).toString(16);
    lys.style.backgroundColor = "#" + farge.randomColor;
  
      lys.style.backgroundColor = "#" + farge.randomColor;
      current_state = 0;
      teller = teller+1
      document.title = `Blinkendelys.no blink: ${teller}`
    }
  }
  
  RedSlider.oninput = function() {
    RedOutput.innerHTML = this.value;
    red=this.value;
    fargeLys();
  }

  GreenSlider.oninput = function() {
    GreenOutput.innerHTML = this.value;
    green=this.value;
    fargeLys();
  }

  BlueSlider.oninput = function() {
    BlueOutput.innerHTML = this.value;
    blue=this.value;
    fargeLys();
  }

  function fargeLys(){
    customColor = "rgba("+red+","+ green+ "," + blue + ")";
    lys.style.backgroundColor= customColor;
    console.log(customColor);
  }

  function timer() {
    if(check == 1 || check == 3){
      timerVar=setInterval(BlinkeLys, 100);
    }
  }

  function timerDisco() {
    if(check == 2){
      timerVar=setInterval(BlinkeLysDisco, 75);
    }
  }

  function sideButton(info){
    if(modeNumber==NumberOfModes && info == 1){   
      modeNumber=0;
    } else if(modeNumber==0 && info == -1){
      modeNumber=NumberOfModes;
    }else{
      modeNumber=modeNumber+info;
    }
    checkForStuff()
    if(modeNumber ==2 || modeNumber ==4){
      start()
    }
    clearInterval(timerVar);
    lys.style.backgroundColor = "white";
    ModeName.innerText = modusNavnListe[modeNumber].toLocaleString('en-US')

  }

  function checkForStuff(){
    //makes sure all the visible is visible and vice versa
    ColorPicker.style.display = "none";
    lys.style.display = "none";
    StartButton.style.display = "none";
    TicTacToe.style.display="none";
    ActivePlayerText.style.display="none";
    ResetButton.style.display="none";
    ClickerGame.style.display="none";

    if(modeNumber == 0){
      lys.style.display = "block";
      StartButton.style.display = "block";
    } else if(modeNumber == 1){
      lys.style.display = "block";
      StartButton.style.display = "block";
    } else if(modeNumber == 2){
      lys.style.display = "block";
      StartButton.style.display = "block";
      ColorPicker.style.display = "block";
    } else if(modeNumber == 3){
      TicTacToe.style.display="block";
      ActivePlayerText.style.display="block";
      ResetButton.style.display="block";
    }else if(modeNumber == 4){
      ClickerGame.style.display="block";
    }
    
  }

  function TicTacToeFunc(placement){
    var place = placement;
    if(TicTacToeTeller < 9){
    if(playerActive == 1){
      checkForTicTacPlacement(1, place);
      checkForTicTacVictory();
    } else if(playerActive ==2){
      checkForTicTacPlacement(2, place)
      checkForTicTacVictory()
    }
    
    }
  }

  function TicTacToeCheck2(s, placement){
    //Check who is placing the next square
    var place = placement;
    var placeToLight = document.getElementById(place);
    var PlayerCheck = s;

    if(PlayerCheck == 1){
      placeToLight.style.backgroundColor="blue";
      playerActive = 2;
      ActivePlayerText.innerHTML = "Player 2's turn";
      TicTacToeTeller++;
    } else if(PlayerCheck == 2){
      placeToLight.style.backgroundColor="red";
      playerActive = 1;
      ActivePlayerText.innerHTML = "Player 1's turn";
      TicTacToeTeller++;
    }
  }

  function checkForTicTacPlacement(s, p){
    //Checks if the square is available and assigns the variable a value depending on who takes it
    var place = p;
    var PlayerCheck = s;
    if(place == "A1" && A1 == 0){
      A1 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    } else if(place == "A2"  && A2 == 0){
      A2 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    } else if(place == "A3"  && A3 == 0){
      A3 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "B1"  && B1 == 0){
      B1 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "B2"  && B2 == 0){
      B2 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "B3"  && B3 == 0){
      B3 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "C1"  && C1 == 0){
      C1 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "C2"  && C2 == 0){
      C2 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }else if(place == "C3"  && C3 == 0){
      C3 = PlayerCheck;
      TicTacToeCheck2(PlayerCheck, place );
    }

    
  }

  function checkForTicTacVictory(){
    //checks if someone has won
    if(A1 == 1 && A2 == 1 && A3 ==1){
      victoryTicTacToe(1)
    } else if(B1 == 1 && B2 == 1 && B3 ==1){
      victoryTicTacToe(1)
    } else if(C1 == 1 && C2 == 1 && C3 ==1){
      victoryTicTacToe(1)
    } else if(A1 == 1 && B1 == 1 && C1 ==1){
      victoryTicTacToe(1)
    } else if(A2 == 1 && B2 == 1 && C2 ==1){
      victoryTicTacToe(1)
    } else if(A3 == 1 && B3 == 1 && C3 ==1){
      victoryTicTacToe(1)
    } else if(A1 == 1 && B2 == 1 && C3 ==1){
      victoryTicTacToe(1)
    } else if(A3 == 1 && B2 == 1 && C1 ==1){
      victoryTicTacToe(1)
    } else if(A1 == 2 && A2 ==2 && A3 == 2){
      victoryTicTacToe(2)
    } else if(B1 == 2 && B2 == 2 && B3 ==2){
      victoryTicTacToe(2)
    } else if(C1 == 2 && C2 == 2 && C3 ==2){
      victoryTicTacToe(2)
    } else if(A1 == 2 && B1 == 2 && C1 ==2){
      victoryTicTacToe(2)
    } else if(A2 == 2 && B2 == 2 && C2 ==2){
      victoryTicTacToe(2)
    } else if(A3 == 2 && B3 == 2 && C3 ==2){
      victoryTicTacToe(2)
    } else if(A1 == 2 && B2 == 2 && C3 ==2){
      victoryTicTacToe(2)
    } else if(A3 == 2 && B2 == 2 && C1 ==2){
      victoryTicTacToe(2)
    } else if(TicTacToeTeller == 9){
      ActivePlayerText.innerHTML = "DRAW!";
    }
  }

  function victoryTicTacToe(vinner){
    var Victor = vinner;
    ActivePlayerText.innerHTML = "Player " +  Victor + " won";
  }

  function reset(){
    console.log("reset");

    //resets variables and things like that

    A1 = 0;
    A2 = 0;
    A3 = 0;
    B1 = 0;
    B2 = 0;
    B3 = 0;
    C1 = 0;
    C2 = 0;
    C3 = 0;

    document.getElementById("A1").style.backgroundColor="white";
    document.getElementById("A2").style.backgroundColor="white";
    document.getElementById("A3").style.backgroundColor="white";

    document.getElementById("B1").style.backgroundColor="white";
    document.getElementById("B2").style.backgroundColor="white";
    document.getElementById("B3").style.backgroundColor="white";

    document.getElementById("C1").style.backgroundColor="white";
    document.getElementById("C2").style.backgroundColor="white";
    document.getElementById("C3").style.backgroundColor="white";

    playerActive = 1;
    ActivePlayerText.innerHTML = "Player 1's turn";
    TicTacToeTeller = 0;

    if(modeNumber == 4){
      localStorage.TotalClicks=0;
      localStorage.ClickPower=1;
      localStorage.ClickPowerUpPrice=10;
      updateText()
    }
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }


  //Clicker game features

  function clickerGameClick(){
    if(localStorage.TotalClicks){ //blink + legger til antall blink
      localStorage.TotalClicks = (Number(localStorage.TotalClicks) + Number(localStorage.ClickPower)).toFixed(2);
      lysClickable.style.backgroundColor = "yellow";
      delay(100).then(() => lysClickable.style.backgroundColor = "white");
    }else{ //hvis spilleren ikke har spillt før
      localStorage.setItem("TotalClicks", 0);
      ClickAmount.innerHTML= localStorage.TotalClicks;
    }
    updateText();
  }

  function UpgradeClickPower(){ //oppgradere click poweren
    if (localStorage.ClickPowerUpPrice) {
      if(Number(localStorage.ClickPowerUpPrice)<= Number(localStorage.TotalClicks)){ //sjekker at spilleren har råd til upgrade
        localStorage.TotalClicks=(Number(localStorage.TotalClicks)-Number(localStorage.ClickPowerUpPrice)).toFixed(2) //fjerner "blinks fra baneken"
        localStorage.ClickPower = (Number(localStorage.ClickPower)*1.2).toFixed(2)//øker clickpower //ikke ferdig
        localStorage.ClickPowerUpPrice=(Number(localStorage.ClickPowerUpPrice)*1.3).toFixed(2); //øker prisen
        ClickPowerText.innerHTML = "Blinks per click: " + localStorage.ClickPower; //opdater text 
        ClickingPowerPriceText.innerHTML = "Price: " + localStorage.ClickPowerUpPrice;
        updateText()
      }
    }else{ //hvis spilleren ikke har spillt før
      localStorage.setItem("ClickPowerUpPrice", 10);
      ClickAmount.innerHTML= localStorage.TotalClicks;
    }
    
  }

  function clickerGameLoad(){ //start when open the clicker game
    updateText();
    ClickPowerText.innerHTML = "Blinks per click: " + localStorage.ClickPower;
    ClickingPowerPriceText.innerHTML = "Price: " + localStorage.ClickPowerUpPrice;
    if (typeof(Storage) !== "undefined") {

    } else {
      window.alert("No clicker for you! 😂");
      start();
      modeNumber = 1;
    } 
    if (!localStorage.ClickPowerUpPrice) {localStorage.ClickPowerUpPrice=10;}
    if (!localStorage.TotalClicks) {localStorage.TotalClicks=0;}
    if (!localStorage.ClickPower) {localStorage.ClickPower=1;}
    updateText()
  }

  function updateText(){
    ClickAmount.innerHTML= localStorage.TotalClicks + " Blinks";
    ClickPowerText.innerHTML = "Blinks per click: " + localStorage.ClickPower;
    ClickingPowerPriceText.innerHTML = "Price: " + localStorage.ClickPowerUpPrice;

    if(localStorage.TotalClicks < Math.pow(10,6)){
      ClickAmount.innerHTML= localStorage.TotalClicks + " Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,6) && localStorage.TotalClicks < Math.pow(10,9)){ 
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,6)).toFixed(2) + " Million Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,9) && localStorage.TotalClicks < Math.pow(10,12)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,9)).toFixed(2) + " Billion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,12) && localStorage.TotalClicks < Math.pow(10,15)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,12)).toFixed(2) + " Trillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,15) && localStorage.TotalClicks < Math.pow(10,18)){ 
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,15)).toFixed(2) + " Quadrillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,18) && localStorage.TotalClicks < Math.pow(10,21)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,18)).toFixed(2) + " Quintillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,21) && localStorage.TotalClicks < Math.pow(10,24)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,21)).toFixed(2) + " Sextillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,24) && localStorage.TotalClicks < Math.pow(10,27)){ 
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,24)).toFixed(2) + " Septillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,27) && localStorage.TotalClicks < Math.pow(10,30)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,27)).toFixed(2) + " Octillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,30) && localStorage.TotalClicks < Math.pow(10,33)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,30)).toFixed(2) + " nonillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,33) && localStorage.TotalClicks < Math.pow(10,36)){ 
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,33)).toFixed(2) + " Decilillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,36) && localStorage.TotalClicks < Math.pow(10,39)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,36)).toFixed(2) + " Undecilillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,39) && localStorage.TotalClicks < Math.pow(10,42)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,39)).toFixed(2) + " Duodecilillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,42) && localStorage.TotalClicks < Math.pow(10,45)){ 
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,42)).toFixed(2) + " Tredecilillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,45) && localStorage.TotalClicks < Math.pow(10,48)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,45)).toFixed(2) + " Quattuordecilillion Blinks";
    }else if(localStorage.TotalClicks > Math.pow(10,48) && localStorage.TotalClicks < Math.pow(10,51)){
      ClickAmount.innerHTML= (localStorage.TotalClicks/Math.pow(10,48)).toFixed(2) + " Quindecilillion Blinks";
    }
  }