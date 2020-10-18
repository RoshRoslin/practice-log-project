const subject = document.getElementById('practice-subject-input');
const date = document.getElementById('date-input');
const tempo = document.getElementById('tempo-input');
const notes = document.getElementById('notes-input');
const practiceLog = document.getElementById('practice-log');
const form = document.getElementById('practice-log-form');
const tableBody = document.getElementById('table-body');
const logAlert = document.getElementById('submitted--log--alert');



//Get date object
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
// set default date to UI
date.value = new Date().toDateInputValue();


// format date
function formatDate(date){
  const splitDate = date.split('-');
  const sliceYear = splitDate[0].slice(2)
  let formattedDate = `${splitDate[1]}/${splitDate[2]}/${sliceYear}`

  return formattedDate;
}


//load UI & event Listeners
loadEventListeners();
checkTableEmpty();

//load UI & event Listeners and values
function loadEventListeners(){
form.addEventListener('submit', addToLog);
tableBody.addEventListener('click', removeTask);


}


//add to practice log
function addToLog(e){


  const subjectData = subject.value;
  const dateData = formatDate(date.value);
  const tempoData = tempo.value;
  const notesData = notes.value;

  //create tr element
  const tableRow = document.createElement('tr');
  tableBody.appendChild(tableRow);

  //create td elemnt
  const tdSubject = document.createElement('td');
  const tdDate = document.createElement('td');
  const tdTempo = document.createElement('td');
  const tdNotes = document.createElement('td');

  // Create text node and append to li

  tdSubject.appendChild(document.createTextNode(subjectData));
  tdDate.appendChild(document.createTextNode(dateData));
  tdTempo.appendChild(document.createTextNode(tempoData));
  tdNotes.appendChild(document.createTextNode(notesData));

  // // Create new link element
  const link = document.createElement('td');
  // Add class
  link.className = 'delete-item secondary-content';
  // // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

   // Append li to ul
  tableRow.appendChild(tdDate);
  tableRow.appendChild(tdSubject);
  tableRow.appendChild(tdTempo);
  tableRow.appendChild(tdNotes);
  // // Append the link to li
  tableRow.appendChild(link);



  //convert data to object
  let logStorage = new convertDataToObject(subjectData,tempoData, dateData, notesData);

  //store in local storage
  storeLogInLocalStorage(logStorage);

  //check if table is empty
  checkTableEmpty();

  //log alert to UI for 3 seconds
  showRemove();
  //resets form after submit
  resetForm();
  //prevents reload on submits
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }
  checkTableEmpty();
}

//reset form but keep date function
function resetForm(){
  form.reset();
  date.value = new Date().toDateInputValue();
}

//check if Table is empty
function checkTableEmpty(){
  let tableLength = document.getElementById('table-body').rows.length;

  if (tableLength === 0){
    //show DOM Table
    practiceLog.style.display ='none';
  } else {
    practiceLog.style.display ='block';

  }
}

//convert data to object
function convertDataToObject(subjectData, tempoData, dateData, notesData){

  this.subjectData = subjectData;
  this.tempoData = tempoData;
  this.dateData = dateData;
  this.notesData = notesData;
}

//store in local storage

function storeLogInLocalStorage(log){
  let submittedLog;
  console.log(log);
  let jsonObject = JSON.stringify(log);

  if(localStorage.getItem('log') === null){
    submittedLog = [];

  } else {
    submittedLog = JSON.parse(localStorage.getItem('log'));

  }

  submittedLog.push(log);
  console.log(submittedLog);

  localStorage.setItem('log', JSON.stringify(submittedLog));
}

//submit log alert
function showRemove(){
  logAlert.style.display = 'inline-block';
  //remove alert after 3 seconds
  setTimeout(() => {
    return logAlert.style.display = 'none';
  }, 3000);
}


//get log from localStorage

//check local storage

//Retrieve log from Local Storage
