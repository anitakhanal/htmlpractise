let hourHand = document.querySelector(".hand.hour");
let minuteHand =document.querySelector(".hand.minute");
let secondHand =document.querySelector(".hand.second");

function clock(){
    let date = new Date();
    let hour = date.getHours() % 12;
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let hourDegree =(hour * 30) + (0.5 * minute);
    let minuteDegree = (minute * 6) + (0.1 * second);
    let secondDgree = second * 6;

    hourHand.style.transform = "rotate(" +hourDegree + "deg)";
    minuteHand.style.transform = "rotate(" +minuteDegree + "deg)";
    secondHand.style.transform = "rotate(" +secondDgree + "deg)";
    setInterval(clock,1000);


}

clock();