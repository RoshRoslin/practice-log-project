const subject = document.getElementById('practice-subject-input');
const date = document.getElementById('date-input');
const tempo = document.getElementById('tempo-input');
const notes = document.getElementById('notes-input');
const practiceLog = document.getElementById('practice-log');
const form = document.getElementById('practice-log-form');
const tableBody = document.getElementById('table-body');
const logAlert = document.getElementById('submitted--log--alert');
const logFail = document.getElementById('empty--log--alert');



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
  let formattedDate = `${splitDate[1]}/${splitDate[2]}`

  // mm//yy/date
  // let formattedDate = `${splitDate[1]}/${splitDate[2]}/${sliceYear}`

  return formattedDate;
}


//load UI & event Listeners
loadEventListeners();
checkTableEmpty();

//load UI & event Listeners and values
function loadEventListeners(){
form.addEventListener('submit', addToLog);
tableBody.addEventListener('click', removeTask);
// getLog();

}


//add to practice log
function addToLog(e){


  const subjectData = subject.value;
  const dateData = formatDate(date.value);
  const tempoData = tempo.value;
  const notesData = notes.value;

  if(subjectData === '' || notesData === ''){
    showRemove();
    e.preventDefault();
  } else {
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
    // storeLogInLocalStorage(logStorage);

    //check if table is empty
    checkTableEmpty();

    //log alert to UI for 3 seconds
    showRemove();
    //resets form after submit
    resetForm();
    //prevents reload on submits
    e.preventDefault();
  }


}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
    // removeFromLocalStorage(e.target.parentElement.parentElement);
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
  console.log(tableLength);
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

// //store in local storage
//
// function storeLogInLocalStorage(log){
//   let submittedLog;
//   let jsonObject = JSON.stringify(log);
//
//   if(localStorage.getItem('log') === null){
//     submittedLog = [];
//
//   } else {
//     submittedLog = JSON.parse(localStorage.getItem('log'));
//   }
//
//   submittedLog.push(log);
//   localStorage.setItem('log', JSON.stringify(submittedLog));
// }

//submit log success alert
function showRemove(){
  if(subject.value === '' || notes.value === ''){
    logFail.style.display = 'inline-block';
    //remove alert after 3 seconds
    setTimeout(() => {
      return logFail.style.display = 'none';
    }, 3000);
  } else {
    logAlert.style.display = 'inline-block';
    //remove alert after 3 seconds
    setTimeout(() => {
      return logAlert.style.display = 'none';
    }, 3000);
  }

}




//get log from localStorage
//
// function getLog(){
//   let log;
//   if(localStorage.getItem('log') === null){
//     log = [];
//   } else {
//     log = JSON.parse(localStorage.getItem('log'))
//   }
//
//   for(let i = 0; i < log.length; i++){
//     const subjectData = log[i].subjectData;
//     const dateData = log[i].dateData;
//     const tempoData = log[i].tempoData;
//     const notesData = log[i].notesData;
//
//     //create tr element
//     const tableRow = document.createElement('tr');
//     tableBody.appendChild(tableRow);
//
//     //create td elemnt
//     const tdSubject = document.createElement('td');
//     const tdDate = document.createElement('td');
//     const tdTempo = document.createElement('td');
//     const tdNotes = document.createElement('td');
//
//     // Create text node and append to li
//
//     tdSubject.appendChild(document.createTextNode(subjectData));
//     tdDate.appendChild(document.createTextNode(dateData));
//     tdTempo.appendChild(document.createTextNode(tempoData));
//     tdNotes.appendChild(document.createTextNode(notesData));
//
//     // // Create new link element
//     const link = document.createElement('td');
//     // Add class
//     link.className = 'delete-item secondary-content';
//     // // Add icon html
//     link.innerHTML = '<i class="fa fa-remove"></i>';
//
//      // Append li to ul
//     tableRow.appendChild(tdDate);
//     tableRow.appendChild(tdSubject);
//     tableRow.appendChild(tdTempo);
//     tableRow.appendChild(tdNotes);
//     // // Append the link to li
//     tableRow.appendChild(link);
//
//   }
//
// }

// //remove from local storage
// function removeFromLocalStorage(logItem){
//   let log;
//   if(localStorage.getItem('log') === null){
//     log = [];
//   } else {
//     log = JSON.parse(localStorage.getItem('log'))
//   }
//
//   let retrievedLog;
//
//   for (i = 0; i < log.length; i++){
//     retrievedLog = `${log[i].dateData}${log[i].subjectData}${log[i].tempoData}${log[i].notesData}`;
//       if (logItem.textContent === retrievedLog){
//
//         log.splice(i ,1);
//       }
//
//
//   }
//
//   localStorage.setItem('log', JSON.stringify(log));
// }
