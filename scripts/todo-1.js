/* STORAGE */ 

var TaskList = JSON.parse(localStorage.getItem("bookList")) || [];

TaskList.forEach((Book,i) => {
    CreateTask(Book.INPUT ,Book.PRIORITY , Book.TSTATUS , i )
});

/* DATE */
const dateElement = document.getElementById("current-date");

const options = { weekday: 'long', day: 'numeric' , month: 'long'};
const today = new Date().toLocaleDateString('en-US', options);

dateElement.textContent = today.toUpperCase();

/* MODAL  error handling starts */

$('#staticBackdrop').on('hide.bs.modal', function () {


    if (
      document.activeElement &&
      document.activeElement.closest('#staticBackdrop')
    ) {
      document.activeElement.blur();
    }
});

/* MODAL  error handling ends */



/* TASK CARD CREATION STARTS */

function CreateTask(input,priority,status,index){

    if(status === "DONE"){
        var html_status = 'id="DONE"'
        var html_checked = "checked"
    }
    else if(status === "NOT-DONE"){
        var html_status = 'id=""'
        var html_checked = ""
    }

    var html = `
                    <div class="ToDo-Task" id="Task-${index}" >
                        <div class="task-input-checkbox">
                            <input class="form-check-input task-input-${priority} Task-input" type="checkbox" name="radioNoLabel" id="radioNoLabel1" value="" aria-label="..." data-index="${index}" ${html_checked}/>
                        </div>
                        <div class="TODO-task-text" >
                            <p class="TODO-task-text-${priority} Task-input-p-${index}" ${html_status}>${input}</p>
                        </div>
                        <div class="task-input-delete">
                            <button class="btn btn-custom-delete" data-index="${index}">🗑️</button>
                        </div>
                    </div>
    `
    $(".TASK-All").append(html);
}



/* TASK CARD CREATION ENDS */






/* modal values start */

$(".btn-custom-add").on("click" ,function(){

    var input = $(".modal-input-custom").val()
    {
        if($(".c-P-LOW").prop("checked")){
            var priority = "LOW"
        }
        else if($(".c-P-MEDIUM").prop("checked")){
            var priority = "MEDIUM"
        }
        else if($(".c-P-HIGH").prop("checked")){
            var priority = "HIGH"
        }
    }

    if(input === "" ){
        alert("ENTER THE TASK")
    }
    else{

        TaskList.push({
            INPUT: input,
            PRIORITY: priority,
            TSTATUS: "NOT-DONE"
        })
        localStorage.setItem("bookList",JSON.stringify(TaskList));
        CreateTask(input,priority,"NOT-DONE",(TaskList.length-1));
        $(".modal-input-custom").val('');
    }
})

/* modal values ends */


/* checked starts */


$(document).on("click",".Task-input",function(){
    var ind = $(this).data("index");

    if($(this).prop("checked") === true){
        $(".Task-input-p-"+ind).attr("id","DONE")
        TaskList[ind].TSTATUS = "DONE"
    }
    else if($(this).prop("checked") === false){
        $(".Task-input-p-"+ind).removeAttr("id")
        TaskList[ind].TSTATUS = "NOT-DONE"
    }

    localStorage.setItem("bookList",JSON.stringify(TaskList));
});     


/* checked ends */


/* delete button starts */

$(document).on("click",".btn-custom-delete",function(){
    var inde = $(this).data("index");
    
    TaskList.splice(inde , 1);
    localStorage.setItem("bookList",JSON.stringify(TaskList));

    $(".TASK-All").empty();
    TaskList.forEach((Book,i)=>{
        CreateTask(Book.INPUT,Book.PRIORITY,Book.TSTATUS,i);
    });
})


/* delete button ends */





/* BACKGROUND THEME STARTS */


var theme = localStorage.getItem("theme") || "LIGHT";

function setTheme(theme){
    if(theme == "LIGHT"){

        $('#light-theme').prop('disabled', false);
        $('#dark-theme').prop('disabled', true);
        $('#retro-tint').prop('disabled', true);
        $('#LIGHT').prop('checked', true);
    }
    else if(theme == "DARK"){
        $('#light-theme').prop('disabled', true);
        $('#dark-theme').prop('disabled', false);
        $('#retro-tint').prop('disabled', true);
        $('#DARK').prop('checked', true);
    }
    else if(theme == "RETRO-TINT"){
        $('#light-theme').prop('disabled', true);
        $('#dark-theme').prop('disabled', true);
        $('#retro-tint').prop('disabled', false);
        $('#RETRO-TINT').prop('checked', true);
    } 
}

$(document).ready(function(){
    setTheme(theme);
});


$(document).on("click",".web-theme",function(){
    var theme = $(this).attr("id");
    localStorage.setItem("theme",theme);
    setTheme(theme);

});






/* BACKGROUND THEME ENDS */