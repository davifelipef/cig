window.onload = function(e){ 
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
  // Attach an event listener to the input element
  document.getElementById("dum_date").addEventListener("change", dateCalc);
  /* Calls the primigesta toggle funcion onload so it works right 
  out of the gate */
  primHandler();
 }  

// Global variable that checks the primigesta information button
var prim_state = false;
// Global variable that computes the days added to the DPP
var dpp_sum = 7;

// Function that handles the tab menu
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    /* Show the current tab, and add an "active" class to the 
    button that opened the tab */
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    document.getElementById("dum_date").value = "";
    document.getElementById("dum_result").innerHTML = "Não calculada";
    document.getElementById("dpp_result").innerHTML = "Não calculada";
} 

// Function that handles the primigesta information toggle button
function primHandler () {
  // if the toggle was not activated
  if (prim_state==false) {
    // activates it
    prim_state = true;
    // if dpp value to sum is 8
    if (dpp_sum == 8) {
      // do nothing
    } else {
      // makes its value 8
      dpp_sum = 8;
      // calls the calculation function
      dateCalc();
    }
    // if the toggle is activated
  } else {
    // deactivates it
    prim_state = false;
    // sums 10, 3 more
    dpp_sum = 11;
    // calls the calculation function
    dateCalc();
  }
}

// Main calculation function
function dateCalc() {
  // gets the current date
  var today = new Date();
  // gets the date informed by the user
  const userInput = document.getElementById("dum_date").value;
  // transforms the date informed by the user in a date object
  var userDate = new Date(userInput);
  /* gets the days of diference between the current date and the date
  informed by the user */
  var timeDiff = Math.abs(today.getTime() - userDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // divides the result by 7 to get the number of weeks
  var weeksDiff = Math.floor(diffDays / 7);
  /* gets the remainder of the division as the number of days
  and then makes it minus 1, since only the complete days counts */
  var daysDiff = diffDays % 7;
  daysDiff -= 1;
  // creates the dum result variable
  var dum_result = '';
  // formats the texts to be displayed in the screen as weeks and days
  if (weeksDiff !== 0) {
    dum_result += `${weeksDiff} ${weeksDiff !== 1 ? 'semanas' : 'semana'}`;
  }
  if (daysDiff !== 0) {
    if (dum_result !== '') {
      dum_result += ' e ';
    }
    dum_result += `${daysDiff} ${daysDiff !== 1 ? 'dias' : 'dia'}`;
  }
  // Updates the screen text fields
  if (dum_result.includes("NaN")) {
    //do nothing
    document.getElementById("dum_result").innerHTML = "Não calculada";
  } else {
    // Updates the screen DUM result
    document.getElementById("dum_result").innerHTML = dum_result;
  }
  // This is the part where the DPP is calculated
  // first a new date object is created
  var calcDate = new Date(userDate.getTime());
  calcDate.setDate(calcDate.getDate() + dpp_sum);
  console.log("DUM + primigesta = " + calcDate);
  // Extract the month component to use in the next calculations
  var dum_month = calcDate.getMonth() + 1;
  // Checks what month it is
  switch(dum_month) {
    // when the month is bigger than march
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      // Subtract 3 months from the date and add a full year to it
      calcDate.setMonth(calcDate.getMonth() - 3)
      calcDate.setFullYear(calcDate.getFullYear() + 1);
      break;
      // when the month is march, february or january
    case 1:
    case 2:
    case 3:
      // Adds 9 months to the date
      calcDate.setMonth(calcDate.getMonth() + 9);
      break;
  }
  // Extract date  and year components
  var dum_day = calcDate.getDate();
  var dum_year = calcDate.getFullYear();
  // updates the month after the calculations are complete
  dum_month = calcDate.getMonth() + 1;
  // formats the date as 'dd/mm/aaaa'
  var formatted_dpp = (dum_day < 10 ? '0' : '') + dum_day + '/' + (dum_month < 10 ? '0' : '') + dum_month + '/' + dum_year;
  // 
  if (formatted_dpp.includes("NaN")) {
    //do nothing
    document.getElementById("dpp_result").innerHTML = "Não calculada";
  } else {
    if (formatted_dpp === "00/00/0000") {
      //do nothing
      document.getElementById("dpp_result").innerHTML = "Não calculada";
    } else {
      // Updates the screen DPP result
      document.getElementById("dpp_result").innerHTML = formatted_dpp;
    }
  }
}
