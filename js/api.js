
let baseURL = "http://ergast.com/api/f1";

const drivers2023 = baseURL + '/2023/drivers.json';
const standings = baseURL + '/current/driverStandings.json';
let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


async function getCards(param) {

  await fetch(baseURL+param, requestOptions)
    .then(response => response.json())
    .then(data => {

      const cardContent = document.querySelector(".container-cards");
      data = data.MRData.DriverTable.Drivers;

      data.map((drivers) => {

        // let birthDate = drivers.dateOfBirth.split('-').reverse().join('/')

        let birthDate = new Date(drivers.dateOfBirth).toLocaleDateString('pt-BR');

        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", drivers.driverId);

        const imgCard = document.createElement("div");
        imgCard.classList.add("img-card");

        const img = document.createElement("img");
        img.setAttribute("src", `./assets/drivers/${drivers.driverId}.png`);
        img.setAttribute("alt", drivers.givenName);

        const numPilot = document.createElement("img");
        numPilot.setAttribute("src", `./assets/pilot-number/${drivers.driverId}.png`);
        numPilot.classList.add("pilot-number");
        numPilot.setAttribute("alt", "Number: " + drivers.permanentNumber);

        const txtCtt = document.createElement("div");
        txtCtt.classList.add("text-content");

        const firstName = document.createElement("h3");
        firstName.classList.add("firstName");
        const secondName = document.createElement("h3");
        secondName.classList.add("secondName");
        const linkwiki = document.createElement("a");
        linkwiki.setAttribute("href", drivers.url);
        linkwiki.setAttribute("target", `_blank`);
        const birth = document.createElement("p");
        const nac = document.createElement("p");


        cardContent.appendChild(card);
        card.appendChild(imgCard);
        imgCard.appendChild(numPilot);
        imgCard.appendChild(img);
        card.appendChild(txtCtt);
        imgCard.appendChild(firstName);
        imgCard.appendChild(secondName);
        secondName.appendChild(linkwiki);
        txtCtt.appendChild(birth);
        txtCtt.appendChild(nac);


        firstName.innerText = drivers.givenName;
        linkwiki.innerText = drivers.familyName;
        birth.innerHTML = "<b>Birthday:</b> " + birthDate;
        nac.innerHTML = "<b>Nationality:</b> " + drivers.nationality;
      })

    })
    .catch(error => console.log('error', error))
}

async function getStandings() {
  await fetch(standings, requestOptions)
    .then(response => response.json())
    .then(data => {

      const table =  document.getElementById("bodyTable");
      data = data.MRData.StandingsTable.StandingsLists[0].DriverStandings
      
      data.map((standings) => {
      
        const tr = document.createElement('tr');

        const pos = document.createElement('td');

        const dr = document.createElement('td');

        const nat = document.createElement('td');

        const divFlag = document.createElement('div');
        divFlag.classList.add("country-flag");

        const flag = document.createElement('img');
        flag.setAttribute("src", `./assets/pilot-nat/${standings.Driver.driverId}.png`);
        flag.setAttribute("alt", standings.Driver.nationality);

        const car = document.createElement('td');

        const pts = document.createElement('td');

        table.appendChild(tr);
        tr.appendChild(pos);
        tr.appendChild(dr);
        tr.appendChild(nat);
        nat.appendChild(divFlag)
        divFlag.appendChild(flag);
        tr.appendChild(car);
        tr.appendChild(pts);

        pos.innerText = standings.position
        dr.innerText = standings.Driver.familyName;
      
        car.innerText = standings.Constructors[0].name;
        pts.innerText = standings.points;
      })
    })
    .catch(error => console.log('error', error))
    

  }
  
  getStandings()
  getCards('/2023/drivers.json')