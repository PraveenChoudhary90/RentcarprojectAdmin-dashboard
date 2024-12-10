// async function fet(){
//     let res = await fetch("http://localhost:4000/Booking");
//     let data = await res.json();
//     console.log(data);

//     let result = data.map((t)=> `
//    <tr> 
//   <td>${t.id}</td>
//   <td>${t.start}</td>
//   <td>${t.end}</td>
//   <td>${t.startdate}</td>
//   <td>${t.enddate}</td>
//   <td>${t.time}</td>
//   <td>${t.car}</td>

//    </tr>
//    `).join(" ")

//     document.querySelector("#showdata").innerHTML = result;

// }





async function Book() {
    let car = document.querySelector("#trip1").value;
    let car1 = document.querySelector("#trip2").value;
    let car2 = document.querySelector("#trip3").value;
    let car3 = document.querySelector("#trip4").value;
    let car4 = document.querySelector("#trip5").value;
    let car5 = document.querySelector("#trip6").value;

    let api = "http://localhost:4000/Booking";

    let data = {
        "start": car,
        "end": car1,
        "startdate": car2,
        "enddate": car3,
        "time": car4,
        "car": car5
    }

    const response = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    alert("booking is confirmed")

    // localStorage.setItem("data", JSON.stringify(data));

    // let storedData = localStorage.getItem("data");
    // console.log(storedData);

    document.querySelector("#booking").innerHTML = `
        <h1>Thanks for booking your ticket!</h1>
         <h1>Your details are:</h1>
        
        <p>${start} <br/> ${car1} <br/> ${car2} <br/> ${car3} <br/> ${car4} <br/> ${car5}</p>
        `;
    


    // const bookingDiv = document.getElementById("booking");
    // bookingDiv.style.opacity = 1; 
    // bookingDiv.style.position = absolute;
    // bookingDiv.style.top = 0; 
    // bookingDiv.style.left = 0; 
    // bookingDiv.style.zIndex = 200; 





    // setTimeout(() => {
    //     bookingDiv.style.opacity = 1;
    //     setTimeout(() => {
    //         bookingDiv.innerHTML = `
    //         <h1>Thanks for booking your ticket!</h1>
    //         <h1>Your details are:</h1>
    //         <p>${start} <br/> ${car1} <br/> ${car2} <br/> ${car3} <br/> ${car4} <br/> ${car5}</p>
    // `; 
    //     }, 500);
    // }, 30000); 



    
}