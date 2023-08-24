window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
var id=0;
//fetch mock data
const btn=document.querySelector('#tstBtn');
btn.addEventListener('click',toDo);
const btnSchedule=document.querySelector('#schedule');
//btnSchedule.addEventListener('click',fillWithEssential);
btnSchedule.addEventListener('click',getMultipleOrSingle);
//const url='www.restcountries/v3/all'
const countryCardsContainer = document.getElementById('accordionExample');
let countryArray;

function fillWithEssential(){
    for(var i=0;i<courses.length;i++){
        let header=courses[i].id;
        let day='';
        let timeS='';
        let timeE='';

        for(var j=0;j<courses[i].Section.length;j++){
            day=courses[i].Section[j].Day;
            timeS=courses[i].Section[j].TimeS;
            timeE=courses[i].Section[j].TimeE;
            fillWithData(day,timeS,timeE,header);
        }
        
    }
}
function toDo(){
    
    for(var i=0;i<courses.length;i++){
        const card = createCountryCard(courses[i]);
        countryCardsContainer.appendChild(card);
    }
    
}

function createCountryCard(courses) {
    const card = document.createElement('div');
    card.classList.add('accordion');
    const cardBody = document.createElement('div');
    cardBody.classList.add('accordion-item');

    const courseCode = courses.id;
    const courseName = courses.Description;
    const courseLecturer = courses.Lecturer;
    const sections=courses.Section;
    console.log(sections);

    id++;
    var arda='div'+id;
    cardBody.innerHTML = `
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${arda}" aria-expanded="true" aria-controls=${arda} style="font-size:0.8rem" style="margin-top:5px">
            ${courseCode} : ${courseName}
            </button>
        </h2>
        <div id=${arda} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#${arda}">
            <div class="accordion-body">
                <strong>Course Code : ${courseCode} <br>
                Lecturer : ${courseLecturer}
                </strong>
                <div class="container-fluid>
                    <div class="form-check form-check-inline">
                    <strong> Sections : </strong>
                ${
                    (() => {
                        let alertContent = '';
                        for (var i=0;i<sections.length;i++) {
                            alertContent += `
                                <input class="form-check-input" type="checkbox" id="${courses.id}" value="${sections[i].id}">
                                <label class="form-check-label" for="${courses.id}">${sections[i].id}</label>
                            `;
                        }
                        return alertContent;
                    })()
                }
                    </div>
                </div>
                <div class="alert alert-light" role="alert" style="margin-top:2px">
                ${
                    (() => {
                        let alertContent = '';
                        for (var i=0;i<sections.length;i++) {
                          for(var j=0;j<sections[i].Schedule.length;j++){
                            alertContent += `       
                              ${sections[i].Schedule[j].Classroom} : ${sections[i].Schedule[j].TimeS} - ${sections[i].Schedule[j].TimeE} : ${sections[i].Schedule[j].Day}: Section : ${sections[i].id} <br>             
                            `;
                          } 
                        }
                        return alertContent;
                    })()
                }
                </div>
            </div>
        </div>
    `;
    card.appendChild(cardBody);
    return card;
}
const btnFill=document.querySelector('#addFromOutside');
btnFill.addEventListener('click',fill);

function fill(){

    //getting start and end part
    var day = document.getElementById("daySelect");
    var hours = document.getElementById("hour1");
    var hour1 = document.getElementById("hour2");
    var text=document.getElementById("textSelect");
    var valueDay = day.value;
    var valueHour = hours.value;
    var valueHour1 = hour1.value;
    var text=text.value;

    //defining start and end point
    var column=getCellCol(valueDay);
    var startRow=getCellRow(valueHour);
    var endRow=getCellRow(valueHour1);

    
    for(var i=startRow+1;i<=endRow+1;i++){
        let Cell= document.getElementById("table1").rows[i].cells;
        var custButton = document.createElement("button");
            custButton.textContent = text;
            custButton.className = "button-89";
            custButton.id=id;
        Cell[column].appendChild(custButton);
        id++; 
    }
    
}
function fillWithData(valueDay,valueHour,valueHour1,text,table_id){

    //defining start and end point
    var column=getCellCol(valueDay);
    var startRow=getCellRow(valueHour);
    var endRow=getCellRow(valueHour1);
    //console.log(table_id,"fromFillWithData");
    
    for(var i=startRow+1;i<=endRow+1;i++){
        let Cell= document.getElementById(table_id).rows[i].cells;
        var custButton = document.createElement("button");
            custButton.textContent = text;
            custButton.className = "button-89";
            custButton.id=id;
        Cell[column].appendChild(custButton);
        id++;
    }
    
}

function getCellCol(cellId) {
    const cell = document.getElementById(cellId);
    const row = cell.parentNode;
    const column = Array.from(row.children).indexOf(cell)   ;
    return column;
}
function getCellRow(cellId) {
    const cell = document.getElementById(cellId);
    const row = cell.parentNode;
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    return rowIndex;
}

document.body.addEventListener( 'click', function ( event ) {
    if(event.target.className=="button-89"){
        var buttonFilled = document.getElementById(event.target.id);  
        buttonFilled.parentNode.removeChild(buttonFilled);
    }
});

//generating different tables for combinations
function generateDifferentPagingForCombinations(id,check){
  if(check){
    var x=` <div class="carousel-item active">   
        ${generateTable(id)}    
      </div>  
    `
    return x;
  }
  else{
    var x=` <div class="carousel-item">   
        ${generateTable(id)}    
      </div>  
    `
    return x;
  }
      
}

function getMultipleOrSingle(){
  generateSectionCombinations(courses);
  test();
}

const courses = [
  {
    "id": "CSE 241",
    "Description": "Object Oriented Programming",
    "Lecturer": "Gökhan Kaya",
    "Section": [
      {
        "id": "1",
        "Schedule": [
          { "Day": "MONDAY", "TimeS": "8:30", "TimeE": "10:30", "Classroom": "CENG-140" },
          { "Day": "WEDNESDAY", "TimeS": "8:30", "TimeE": "10:30", "Classroom": "CENG-140" }
        ]
      },
      {
        "id": "2",
        "Schedule": [
          { "Day": "TUESDAY", "TimeS": "12:30", "TimeE": "14:30", "Classroom": "CENG-140" }
        ]
      }
    ]
  },
  {
    "id": "MATH 101",
    "Description": "Calculus I",
    "Lecturer": "Dr. Sarah Smith",
    "Section": [
      {
        "id": "1",
        "Schedule": [
          { "Day": "THURSDAY", "TimeS": "10:30", "TimeE": "12:30", "Classroom": "CENG-150" },
          { "Day": "WEDNESDAY", "TimeS": "11:30", "TimeE": "12:30", "Classroom": "CENG-150" }
        ]
      },
      {
        "id": "2",
        "Schedule": [
          { "Day": "FRIDAY", "TimeS": "13:30", "TimeE": "14:30", "Classroom": "CENG-152" }
        ]
      }
    ]
  },
  {
    "id": "PHYS 201",
    "Description": "Introduction to Physics",
    "Lecturer": "Prof. John Miller",
    "Section": [
      {
        "id": "1",
        "Schedule": [
          { "Day": "WEDNESDAY", "TimeS": "8:30", "TimeE": "10:30", "Classroom": "CENG-160" }
        ]
      }
    ]
  },
  {
    "id": "CHEM 111",
    "Description": "General Chemistry",
    "Lecturer": "Dr. Lisa Anderson",
    "Section": [
      {
        "id": "1",
        "Schedule": [
          { "Day": "FRIDAY", "TimeS": "15:30", "TimeE": "16:30", "Classroom": "CENG-172" }
        ]
      }
    ]
  },
  {
    "id": "HIST 210",
    "Description": "World History: Ancient Civilizations",
    "Lecturer": "Prof. Maria Rodriguez",
    "Section": [
      {
        "id": "2",
        "Schedule": [
          { "Day": "TUESDAY", "TimeS": "15:30", "TimeE": "16:30", "Classroom": "CENG-191" }
        ]
      }
    ]
  }
];
const combinationArray = []; 

function generateSectionCombinations(courseSections, currentIndex = 0, currentCombination = []) {
  if (currentIndex === courseSections.length) {
    //const combinationInfo = currentCombination.map(section => `${section.Classroom} ${section.TimeS}-${section.TimeE}`).join(', ');
    //const courseIDs = currentCombination.map(course => course.id).join(', ');
    //console.log(currentCombination);
    combinationArray.push([...currentCombination]);
    return;
  }

  const currentCourseSections = courseSections[currentIndex].Section;
  for (const section of currentCourseSections) {
    const newCombination = [...currentCombination, { ...section, id: courseSections[currentIndex].id }];
    generateSectionCombinations(courseSections, currentIndex + 1, newCombination);
  }
}




function test(){
  //console.log("bumbum");
  //console.log(combinationArray);
  const tableDiv=document.getElementById("tableCont");
  const table_id_Array =[];
    tableDiv.innerHTML=`
      <div id="exampleCarousel" class="carousel slide mt-3">
        <div class="carousel-inner">
        ${
          (() => {
            let innerContent = ''
            for (let i = 0; i <combinationArray.length; i++) {
              var table_id = 'table' + i;
              table_id_Array.push(table_id);
              if (i != 0) {
                innerContent += generateDifferentPagingForCombinations(table_id, false);
              } else {
                innerContent += generateDifferentPagingForCombinations(table_id, true);
              }
            }
            return innerContent;
          })()
        }
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#exampleCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#exampleCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
    `  
    for(var i=0;i<table_id_Array.length;i++){
      for(var j=0;j<combinationArray[i].length;j++){
        for(var k=0;k<combinationArray[i][j].Schedule.length;k++){
          fillWithData(combinationArray[i][j].Schedule[k].Day,combinationArray[i][j].Schedule[k].TimeS,combinationArray[i][j].Schedule[k].TimeE,combinationArray[i][j].id,table_id_Array[i]);
        }
      }
    }
    
}

function generateTable(id){
  var tableHtml= `
  <table class="table table-bordered mt-3 table-condensed text-center table-sm" id="${id}">
  <thead>
    <tr>
      <th></th>
      <th id="MONDAY">Monday</th>
      <th id="TUESDAY">Tuesday</th>
      <th id="WEDNESDAY">Wednesday</th>
      <th id="THURSDAY">Thursday</th>
      <th id="FRIDAY">Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td id="8:30">08:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="9:30">09:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="10:30">10:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="11:30">11:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="12:30">12:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="13:30">13:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="14:30">14:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="15:30">15:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td id="16:30">16:30</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
`;
return tableHtml;
}