
// for mobile phones
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.mynavbar__menu')

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


// // to check if the user filled form or not
// const form = document.querySelector('form');

// function checkInputs(){
//   const items = document.querySelectorAll(".item");

//   for (const item of items) {
//     if ( item.value == ""){
//       item.classList.add("error");
//       item.parentElement.classList.add("error");
//     }

//     item.addEventListener ("keyup", () =>{
//       if (item.value != ""){
//         item.classList.remove("error");
//         item.parentElement.classList.remove("error");
//       }
//       else {
//         item.classList.add("error");
//         item.parentElement.classList.add("error");
//       }
//     }
//     )
//   }
// }

// form.addEventListener ("submit", (e) =>{
//   e.preventDefault();
//   checkInputs();
// })


//The following submit event handler is ONE way of handling form submissions. There are many ways of doing it but this is 
//how I like to handle it.

//The caveat here is that we're not doing this in a function but instead applying a submit event handler to the form. 
//You could do this with a function if you preferred

//When the informationsForm form is submitted
$("#informations").on("submit", function(event) {
    event.preventDefault()

    alert("Submitted")
  
    //We initialise a blank javascript object to populate with the form values
    var informations = {
      id : null,
      name : null,
      mail : null,
      phone : null,
      subject : null,
      message : null
    }
  
    //For each of the form input fields
    $(this).find("input, textarea").each(function(){
  
      //What we are doing here is checking if the current form input is called "code".
      //If it is called "code", we assign the value of informations object's code as the value in the form field
      if ($(this).prop("name") == "id") {
        informations.id = $(this).val();
      }
  
      //Do the same for the other values
      if ($(this).prop("name") == "name") {
        informations.name = $(this).val();
      }
  
      if ($(this).prop("name") == "mail") {
        informations.mail = $(this).val();
      }
  
      if ($(this).prop("name") == "phone") {
        informations.phone = $(this).val();
      }
  
      if ($(this).prop("name") == "subject") {
        informations.subject = $(this).val();
      }
      
      if ($(this).prop("name") == "message") {
        informations.message = $(this).val();
      }
    })
  
    //Now, we turn the completed object into a JSON object for use with ajax call to the server
    var JSONFormData = JSON.stringify(informations)
  
    console.log("Testing database");

    console.log(JSONFormData)
  
    $.ajax({
        type: "POST",
        url: "/informations",
        contentType: "application/json; charset=utf-8",
        data: {
            JSONFormData: JSONFormData
        },
        success: function (data) {
            alert("Success")
        },
        error: function (data) {
            alert(JSON.stringify(data))
            alert("Error while adding new module");
        }
    })
  })