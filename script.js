async function information() {

    let firstname = document.querySelector("#name").value;
    let lastname = document.querySelector("#name1").value;
    let email = document.querySelector("#email").value;
    let psw = document.querySelector("#psw").value;
    let psw1 = document.querySelector("#psw1").value;

    if (!validateInputs(firstname, lastname, email, psw, psw1)) {
        return; 
    }

    let api = "http://localhost:4000/Admin";

    const data = {
        "firstname": firstname,
        "lastname": lastname, 
        "email": email,
        "password": psw
    };


        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        localStorage.setItem("data", JSON.stringify(data));

        let storedData = localStorage.getItem("data");
        console.log(storedData);

}




function validateInputs(firstname, lastname, email, psw, psw1) {
    if (firstname === "") {
        alert("First name cannot be empty");
        return false;
    }
    if (lastname === "") {
        alert("Last name cannot be empty");
        return false;
    }
    if (email === "") {
        alert("Email cannot be empty");
        return false;
    }
    if (psw === "") {
        alert("Password cannot be empty");
        return false;
    }
    if (psw !== psw1) {
        alert(" RE-Passwords do not match");
        return false;
    }
    return true; 
}





async function login(){
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let api = "http://localhost:4000/Admin";
  
    
    const response = await fetch(api);
        
        const user = await response.json();
        console.log(user);
     let loginUser =   await user.filter((key)=>{
            if(key.email == email && key.password == password){
              return key
             }
           
        })



        if(loginUser.length!=0){
          document.location.href="./user.html";
        localStorage.setItem("userCheck",true)
        localStorage.setItem("username",loginUser[0].firstname)
       


        }
        else{
          console.log("either password or email is incorrect");
          window.alert("please login frist");
        }

        return false;

}



function checkUser(){
 
  if(flag=="true"){
    alert("Welcome "+name)
  }
  else{
    document.location.href="./login.html"
    alert("please login first")

  }
}

function logout(){
  localStorage.setItem("userCheck",false);
  localStorage.setItem("username","")

  document.location.href="./login.html"
}

async function stats(){
    let api = "http://localhost:4000/Cars";

   const response =await fetch(api)
   const data =await response.json()
   console.log(data)
    let totalprice = 0;
    let totalProduct =0;
   data.map((key)=>{
        totalprice+=Number(key.price);
        totalProduct++;
   })
   setTimeout(totalprice,2000)

   document.querySelector("#Stat1").innerHTML+=totalprice
   document.querySelector("#Stat2").innerHTML+=totalProduct

  
}
stats();


function showForm(){
  document.getElementById("addForm").style.display= "block"
}

function hideForm(){
  document.getElementById("addForm").style.display= "none"

}



// async function fet_data()
// {
//     let res = await fetch("http://localhost:4000/students");
//     let data = await res.json();
//     console.log(data);
    
// }
// fet_data();


async function crud(){
    let res = await fetch("http://localhost:4000/Cars");
    let data = await res.json();
    console.log(data);

    let result = data.map((t)=> `
   <tr> 
  <td>${t.id}</td>
  <td><img width="100px" src = ${t.imageurl}></td>
  <td>${t.carname}</td>
  <td>${t.brandname}</td>
  <td>${t.price}</td>
  <td><button onclick ="deletedata('${t.id}')">Delete</button></td>
  <td><button onclick ="updatedata('${t.id}')">Update</button></td>
   </tr>
   `).join(" ")

    document.querySelector("#showdata").innerHTML = result;

}
crud();
function deletedata(id){
 fetch(`http://localhost:4000/Cars/${id}`,{
    method:'DELETE'
 })
 .then(res=>window.alert("data delete suceesfully.!!!!!!!!!!!!!!!!!"))
}






async function updatedata(id){
   let mydata = await  fetch(`http://localhost:4000/Cars/${id}`);
   let redata = await mydata.json();
   let sendata = `
  
    
  <form  style="position: absolute; top: 100px; left: 700px; z-index: 10; background-color: pink;display: block; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <label for="image" style="display: block; margin-bottom: 5px; font-weight: bold;">Enter Image Url</label>
    <input type="text" placeholder="enter image url here" value="${redata.imageurl}" id="imageurl1" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;">
    
    <label for="product" style="display: block; margin-bottom: 5px; font-weight: bold;">Product Name</label>
    <input type="text" placeholder="Enter product name" value="${redata.carname}" id="pname1" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;">
    
    <label for="brand" style="display: block; margin-bottom: 5px; font-weight: bold;">Brand Name</label>
    <input type="text" placeholder="Enter Brand name" value="${redata.brandname}" id="bname1" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;">
    
    <label for="price" style="display: block; margin-bottom: 5px; font-weight: bold;">Product Price</label>
    <input type="text" placeholder="Enter the product price"value="${redata.price}" id="pprice1" style="width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px;">
    
    <button onclick = "finalupdate('${redata.id}')" style="background-color: #28a745; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">update data</button>
    <button onclick="hideForm();" style="background-color: white; color:red; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Close</button>
</form>


   `
  document.querySelector("#updatetabel").innerHTML = sendata
}

function finalupdate(id){
     let udata = {
        imageurl:document.querySelector("#imageurl1").value,
        carname:document.querySelector("#pname1").value,
        brandname:document.querySelector("#bname1").value,
        price:document.querySelector("#pprice1").value,
     }



    fetch(`http://localhost:4000/Cars/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(udata)
    })
    .then(res=>window.alert("update date sucessfully.....!!!!!!"))
}


function Addingdata()
{
    let object={
        imageurl:document.querySelector("#image").value,
        carname:document.querySelector("#car").value,
        brandname:document.querySelector("#brand").value,
        price:document.querySelector("#price").value
    }

    fetch(`http://localhost:4000/Cars`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(object)
    })
    .then(res=>window.alert("Adding data suceesfully..!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"))
}
