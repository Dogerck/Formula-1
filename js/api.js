
let baseURL = "http://ergast.com/api/f1";

const drivers2023 = baseURL + '/2023/drivers.json';
const standings = baseURL + '/current/driverStandings.json';
const allRaces = baseURL + '/current.json';

let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

async function getRaces() {
  await fetch(allRaces, requestOptions)
  .then(response => response.json())
  .then(data => {
    
    const races = data.MRData.RaceTable.Races;
    console.log(races);
    const circ = document.querySelector(".container-circuits");
    
    // races.map((circuits) => {
      
    //   const cardI = document.createElement("div");
    //   cardI.classList.add("card");

    //   circ.appendChild(cardI);
    //   cardI.innerText = circuits.raceName;
    // })



    const nextRace = races.find(race => new Date(race.date) > new Date());
    new Date(nextRace.time)
    console.log(nextRace.time);
    const cirBg = document.querySelector(".circuitBg");
    const imgCircuit = document.createElement("img");
    imgCircuit.setAttribute("src", `./assets/circuits/${nextRace.Circuit.circuitId}.png`);
    cirBg.appendChild(imgCircuit);


    const updateCountdown = (nextRace, startTime) => {
      
      const now = new Date().getTime();
      const timeRemaining = startTime - now;
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // atualiza o elemento da página que exibe o tempo restante
      document.getElementById('countdown').innerHTML = 'Countdown:'+ ' ' + countdown;
    }

      document.getElementById('nR').innerHTML = nextRace.raceName;
      document.getElementById('fp1').innerHTML = 'PRACTICE 1:' + ' '+ nextRace.FirstPractice.time;
      document.getElementById('fp2').innerHTML = 'PACTICE 2:' + ' '+ nextRace.SecondPractice.time;
      document.getElementById('fp3').innerHTML = 'PRACTICE 3:' + ' '+ nextRace.ThirdPractice.time;
      document.getElementById('Q').innerHTML = 'QUALIFYING:' + ' '+ nextRace.Qualifying.time;
      document.getElementById('R').innerHTML = 'RACE:' + ' '+ nextRace.time;;
    
      setInterval(() => {
      const nextRace = races.find(race => new Date(race.date) > new Date());
      const startTime = new Date(`${nextRace.date} ${nextRace.time}`).getTime();
      updateCountdown(nextRace, startTime);
    }, 1000);

    const race = new Date(`${nextRace.date} ${nextRace.time}`);
    const qualifying = new Date(` ${nextRace.date} ${nextRace.Qualifying.time}`);
    console.log(qualifying);
  })
}

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

        // const ske = document.createElement('div');
        // ske.classList.add("skeleton");
        // ske.classList.add("skeleton-text");

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
        // tr.appendChild(ske);
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

        // t = document.querySelector(".skeleton");
        
      })
    })
    .catch(error => console.log('error', error))
    

}
  
  getStandings()
  getCards('/2023/drivers.json')
  getRaces()