const toggleModal = () =>{
    document.querySelector("#create")
    .classList.toggle("modal_mine--hidden")
}

const toggleModals = () =>{
    document.querySelector("#delete")
    .classList.toggle("modal_mineD--hidden")
}

document.querySelector("#show-modal-create")
    .addEventListener('click', toggleModal)

document.querySelector("#show-modal-update")
    .addEventListener('click', toggleModals)

document.querySelector("#reg-form")
.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModal();
  });

document.querySelector("#del-form")
  .addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModals();
});

document.querySelector(".modal_mine_close-bar span")
    .addEventListener('click',toggleModal)

document.querySelector(".modal_mine_close-barD span")
    .addEventListener('click',toggleModals)

function reload(){
    location.reload();
    
   //this line is to watch the result in console , you can remove it later	
}

//CRUD OPERATIONS LETS GOO
const createUser = () => {
    console.log("HI CREATE");
    var name = document.getElementById("userCreate").value;
    var email = document.getElementById("emailCreate").value;
    var pass = document.getElementById("pwCreate").value;
    var role = document.getElementById("roleCreate").value;
    fetch("https://reporting.jkoh.site/user/register",{
        method: 'POST',
        body: JSON.stringify({
            username: name,
            password: pass,
            email: email,
            role: role
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).then(function (data) {
        //console.log(data);
        reload()
      }).catch(function (error) {
        console.warn('Something went wrong.', error);
      });

}

const deleteUser = async () => {
    let confirmation = confirm("Are you sure you want to DELETE this user?")
    if(confirmation){
      console.log("HI CREATE");
      var id = document.getElementById("idU_D").value;
      fetch("https://reporting.jkoh.site/user/" + id,{
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        }).then(function (data) {
          //console.log(data);
          reload()
        }).catch(function (error) {
          console.warn('Something went wrong.', error);
        });
        reload()
    }
    else{
      alert("Deletion Canceled")
    }
    
}

const updateUser = () => {
    console.log("HI UPDATE");
    var name = null;
    var email = null;
    var pass = null;
    var role = null;
    var id = document.getElementById("idU_D").value;
    var names = document.getElementById("userU_D").value;
    var emails = document.getElementById("emailU_D").value;
    var passs = document.getElementById("pwU_D").value;
    var roles = document.getElementById("roleU_D").value;
    if(names != "") {name = names}
    if(emails != "") {email = emails}
    if(passs != "") {pass = passs}
    if(roles != "") {role = roles}

    fetch("https://reporting.jkoh.site/user/" + id,{
        method: 'PUT',
        body: JSON.stringify({
            username: name,
            password: pass,
            email: email,
            role: role
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      }).then(function (data) {
        //console.log(data);
        reload()
      }).catch(function (error) {
        console.warn('Something went wrong.', error);
      });
      reload()
}


document.querySelector("#createUser")
    .addEventListener('click', createUser)

document.querySelector("#deleteUser")
    .addEventListener('click', deleteUser)

document.querySelector("#updateUser")
    .addEventListener('click', updateUser)