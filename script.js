window.onload = function(e){ 
    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
 }  

// Attach an event listener to the input element
document.getElementById("dum_date").addEventListener("change", dateCalc);

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
} 

function dateCalc() {
  var today = new Date();
  const userInput = document.getElementById("dum_date").value;
  var userDate = new Date(userInput);

  var timeDiff = Math.abs(today.getTime() - userDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  var monthsDiff = Math.floor(diffDays / 30);
  var weeksDiff = Math.floor((diffDays % 30) / 7);
  var daysDiff = diffDays % 7;

  var dum_result = '';
  if (monthsDiff !== 0) {
    dum_result += `${monthsDiff} ${monthsDiff !== 1 ? 'meses' : 'mês'}`;
  }
  if (weeksDiff !== 0) {
    if (dum_result !== '') {
      dum_result += weeksDiff !== 0 && daysDiff !== 0 ? ', ' : ' e ';
    }
    dum_result += `${weeksDiff} ${weeksDiff !== 1 ? 'semanas' : 'semana'}`;
  }
  if (daysDiff !== 0) {
    if (dum_result !== '') {
      dum_result += ' e ';
    }
    dum_result += `${daysDiff} ${daysDiff !== 1 ? 'dias' : 'dia'}`;
  }

  console.log(dum_result); //Log used during development

  if (dum_result.includes("NaN")) {
    document.getElementById("dum_result").innerHTML = "Não calculada.";
  } else {
    document.getElementById("dum_result").innerHTML = dum_result;
  }
  
}
