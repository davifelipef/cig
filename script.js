window.onload = function(e){ 
    
  // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();

    // Attach an event listener to the input element
    document.getElementById("dum_date").addEventListener("change", dateCalc);

    // Calls the primigesta toggle funcion onload so it works right out of the gate
    primHandler();
 }  

// Global variable that checks the primigesta information button
var prim_state = false;

// Global variable that computes the days added to the DPP
var dpp_sum = 0;

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
  
    // Show the current tab, and add an "active" class to the button that opened the tab
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
    // if dpp value to sum is 0
    if (dpp_sum == 0) {
      // do nothing
    } else {
      // makes its value 0
      dpp_sum = 0;
      // calls the calculation function
      dateCalc();
    }
    // if the toggle is activated
  } else {
    // deactivates it
    prim_state = false;
    // sums 10
    dpp_sum = 10;
    // calls the calculation function
    dateCalc();
  }
}

// Main calculation function
function dateCalc() {
  
  var today = new Date();
  const userInput = document.getElementById("dum_date").value;
  var userDate = new Date(userInput);

  var timeDiff = Math.abs(today.getTime() - userDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  var weeksDiff = Math.floor(diffDays / 7);
  var daysDiff = diffDays % 7;

  var dum_result = '';

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

  // Handles the dpp calculation
  var dpp_result = 280 - diffDays + dpp_sum;
  dpp_result = parseInt(dpp_result);
  console.log("DPP result is :" + dpp_result);

  // Calculate the desired date
  var modified_date = new Date(today);
  modified_date.setDate(modified_date.getDate() + dpp_result);

  // Extract date components
  var day = modified_date.getDate();
  var month = modified_date.getMonth() + 1; // Month starts from index 0, so 1 is added
  var year = modified_date.getFullYear();

  // Format the date as 'dd/mm/aaaa'
  var formatted_dpp = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
  
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
