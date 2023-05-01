let baseURL = "http://ergast.com/api/f1/2023/drivers.json";

let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

async function getCards() {
  await fetch(baseURL, requestOptions)
    .then(response => response.json())
    .then(data => {

      const cardContent = document.querySelector(".container-cards");
      data = data.MRData.DriverTable.Drivers;
  
      data.map((drivers) => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", drivers.driverId);
    
        const imgCard = document.createElement("div");
        imgCard.classList.add("img-card");
    
        const img = document.createElement("img");
        img.setAttribute("src", `assets/drivers/${drivers.driverId}.png`);
    
        const txtCtt = document.createElement("div");
        txtCtt.classList.add("text-content");
    
        const title = document.createElement("h3");
        const linkwiki = document.createElement("a");
        linkwiki.setAttribute("href", drivers.url);
        linkwiki.setAttribute("target", `_blank`);
        const niver = document.createElement("p");
        const nac = document.createElement("p");
        const num = document.createElement("p");
        
    
        cardContent.appendChild(card);
        card.appendChild(imgCard);  
        imgCard.appendChild(img);
        card.appendChild(txtCtt);
        txtCtt.appendChild(title);
        title.appendChild(linkwiki);
        txtCtt.appendChild(niver);
        txtCtt.appendChild(nac);
        txtCtt.appendChild(num);
    
    
        linkwiki.innerText = drivers.givenName + " " + drivers.familyName;
        niver.innerHTML = "<b>Birthday:</b> " + drivers.dateOfBirth;
        nac.innerHTML = "<b>Nationality:</b> " + drivers.nationality;
        num.innerHTML = "<b>Car Number:</b> " + drivers.permanentNumber;
      })

    })
    .catch(error => console.log('error', error))

    let img = 
    console.log(img);
}
getCards();

  
  
    
  
    
    
    
    
    // nome.innerHTML = result.MRData.DriverTable.Drivers[8].givenName + " " + result.MRData.DriverTable.Drivers[8].familyName;
    // birth.innerHTML = "Date of Birth: " + result.MRData.DriverTable.Drivers[8].dateOfBirth;
    // nacio.innerHTML = "Nacionality: " + result.MRData.DriverTable.Drivers[8].nationality;
    // number.innerHTML = "Pilot Number: " + result.MRData.DriverTable.Drivers[8].permanentNumber;