let baseURL = "http://ergast.com/api/f1/2023/drivers/.json";
const cardContent = document.querySelector(".container-cards");

// const nome = document.getElementById("nome");
// const birth = document.getElementById("niver");
// const nacio = document.getElementById("nac");
// const number = document.getElementById("num");
let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

async function getCards() {
  const response = await fetch(baseURL, requestOptions);
  const data = await response.json()
  
    boys = data.MRData.DriverTable.Drivers;
    console.log(boys);
    console.log(response);
  
  

    boys.map((drivers) => {

    const card = document.createElement("div");
    card.classList.add("card");

    const imgCard = document.createElement("div");
    imgCard.classList.add("img-card");

    const img = document.createElement("img");
    img.setAttribute("src", `img/lec.png`);

    const txtCtt = document.createElement("div");
    txtCtt.classList.add("text-content");

    const title = document.createElement("h3");
    const linkwiki = document.createElement("a");
    linkwiki.setAttribute("href", `${drivers.url}`);
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
    num.innerHTML = "<b>Car Number:</b> " + drivers.permanentNumber


  })
}
getCards()

  
  
    
  
    
    
    
    
    // nome.innerHTML = result.MRData.DriverTable.Drivers[8].givenName + " " + result.MRData.DriverTable.Drivers[8].familyName;
    // birth.innerHTML = "Date of Birth: " + result.MRData.DriverTable.Drivers[8].dateOfBirth;
    // nacio.innerHTML = "Nacionality: " + result.MRData.DriverTable.Drivers[8].nationality;
    // number.innerHTML = "Pilot Number: " + result.MRData.DriverTable.Drivers[8].permanentNumber;