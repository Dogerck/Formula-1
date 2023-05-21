let baseURL = "http://ergast.com/api/f1";

const standings = baseURL + '/current/driverStandings.json';
const allRaces = baseURL + '/current.json';

const url = window.location.href;
const nomeURL = url.substring(url.lastIndexOf('/') + 1);

const anoAtual = new Date().getFullYear()
const timezone = new Date().getTimezoneOffset() / -60;

let requestOptions = {
  method: 'GET',
  redirect: 'follow'
}

function convertToBrazilianTime(date, time, timezone) {
  const [yr, mon, day] = date.split('-');
  const [hrs, min] = time.split(':');

  const newTime = new Date(+yr, +mon - 1, +day, +hrs + timezone, +min);
  const hours = newTime.getHours();
  const minutes = newTime.getMinutes();

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

async function getNextRace() {
  await fetch(allRaces, requestOptions)
    .then(response => response.json())
    .then(data => {

      const races = data.MRData.RaceTable.Races;
      console.log(races);
      const nextRace = races.find(race => new Date(race.date) > new Date());
      console.log(nextRace);
      const weekdays = ['NULL', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT','SUN'];

      const nR = document.getElementById("nR");
      nR.innerText = nextRace.raceName;
      const cirBg = document.querySelector(".circuitBg");
      const timeCt = document.querySelector(".timeContent");
      const imgCircuit = document.createElement("img");
      imgCircuit.setAttribute("src", `./assets/circuits/${nextRace.Circuit.circuitId}.png`);
      cirBg.appendChild(imgCircuit);

      const p1 = document.createElement("div");
      p1.classList.add("session-item");
      timeCt.appendChild(p1)
      const p2 = document.createElement("div");
      p2.classList.add("session-item");
      timeCt.appendChild(p2)
      const p3 = document.createElement("div");
      p3.classList.add("session-item");
      timeCt.appendChild(p3)
      const hr = document.createElement("hr");
      timeCt.appendChild(hr)
      const Qua = document.createElement("div");
      Qua.classList.add("session-item");
      timeCt.appendChild(Qua)
      const Ra = document.createElement("div");
      Ra.classList.add("session-item");
      timeCt.appendChild(Ra)
      const ctdn = document.createElement("div");
      ctdn.classList.add("session-item");
      timeCt.appendChild(ctdn)

      const pr1 = document.createElement("p");
      pr1.textContent = "PRACTICE 1";
      p1.appendChild(pr1);

      const pr1Day = document.createElement("p");
      const wkday1 = new Date(nextRace.FirstPractice.date).getDay()+1
      const weekdayName1 = weekdays[wkday1];
      pr1Day.textContent = weekdayName1
      p1.appendChild(pr1Day);
      
      const pr1Time = document.createElement("div");
      const firstPracticeTime = convertToBrazilianTime(nextRace.FirstPractice.date, nextRace.FirstPractice.time, timezone);
      pr1Time.textContent = firstPracticeTime
      p1.appendChild(pr1Time)


      const pr2 = document.createElement("p");
      pr2.textContent = "PRACTICE 2";
      p2.appendChild(pr2);

      const pr2Day = document.createElement("p");
      const wkday2 = new Date(nextRace.SecondPractice.date).getDay()+1
      const weekdayName2 = weekdays[wkday2];
      pr2Day.textContent = weekdayName2
      p2.appendChild(pr2Day);

      const pr2Time = document.createElement("div");
      const secondPracticeTime = convertToBrazilianTime(nextRace.SecondPractice.date, nextRace.SecondPractice.time, timezone);
      pr2Time.textContent = secondPracticeTime;
      p2.appendChild(pr2Time);

      if (nextRace.ThirdPractice) {
        const pr3 = document.createElement("p");
        pr3.textContent = "PRACTICE 3";
        p3.appendChild(pr3);

        const pr3Day = document.createElement("p");
        const wkday3 = new Date(nextRace.ThirdPractice.date).getDay()+1
        const weekdayName3 = weekdays[wkday3];
        pr3Day.textContent = weekdayName3
        p3.appendChild(pr3Day);

        const pr3Time = document.createElement("div");
        const thirdPracticeTime = convertToBrazilianTime(nextRace.ThirdPractice.date, nextRace.ThirdPractice.time, timezone);
        pr3Time.textContent = thirdPracticeTime;
        p3.appendChild(pr3Time);

      } else if (nextRace.Sprint) {

          const pr4 = document.createElement("p");
          pr4.textContent = "SPRINT";
          p3.appendChild(pr4);

          const pr4Day = document.createElement("p");
          const wkday4 = new Date(nextRace.Sprint.date).getDay()+1
          const weekdayName4 = weekdays[wkday4];
          pr4Day.textContent = weekdayName4
          p3.appendChild(pr4Day);

          const pr4Time = document.createElement("div");
          const sprintTime = convertToBrazilianTime(nextRace.Sprint.date, nextRace.Sprint.time, timezone);
          pr4Time.textContent = sprintTime;
          p3.appendChild(pr4Time);
      }

      const quali = document.createElement("p");
      quali.textContent = "QUALIFYING";
      Qua.appendChild(quali);

      const quaDay = document.createElement("p");
      const wkday5 = new Date(nextRace.Qualifying.date).getDay()+1
      const weekdayName5 = weekdays[wkday5];
      quaDay.textContent = weekdayName5
      Qua.appendChild(quaDay);

      const quaTime = document.createElement("div");
      const qualifyingTime = convertToBrazilianTime(nextRace.Qualifying.date, nextRace.Qualifying.time, timezone);
      quaTime.textContent = qualifyingTime;
      Qua.appendChild(quaTime);


      const rce = document.createElement("p");
      rce.textContent = "RACE";
      Ra.appendChild(rce);

      const raDay = document.createElement("p");
      const wkday6 = new Date(nextRace.date).getDay()+1
      const weekdayName6 = weekdays[wkday6];
      console.log(weekdayName6);
      raDay.textContent = weekdayName6
      Ra.appendChild(raDay);

      const raTime = document.createElement("div");
      const raceTime = convertToBrazilianTime(nextRace.date, nextRace.time, timezone);
      raTime.textContent = raceTime;
      Ra.appendChild(raTime);

      const updateCountdown = (nextRace, startTime) => {
        
        const now = new Date().getTime();
        const timeRemaining = startTime - now;
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        
        // atualiza o elemento da página que exibe o tempo restante
        ctdn.innerText = countdown
      }


      setInterval(() => {
        const nextRace = races.find(race => new Date(race.date) > new Date());
        const startTime = new Date(`${nextRace.date} ${nextRace.time}`).getTime();
        updateCountdown(nextRace, startTime);
      }, 1000);
    })
}

async function getCurrentDrivers(param) {

  await fetch(baseURL + param, requestOptions)
    .then(response => response.json())
    .then(data => {

      const cardContent = document.querySelector(".container-cards");
      data = data.MRData.DriverTable.Drivers;

      data.map((drivers) => {

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

      const table = document.getElementById("bodyTable");
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

async function getSchedule() {
  await fetch(allRaces, requestOptions)
    .then(response => response.json())
    .then(data => {
      const races = data.MRData.RaceTable.Races;
      const circ = document.querySelector(".container-circuits");

      races.map((circuits) => {

        const cardI = document.createElement("div");
        cardI.classList.add("card");

        circ.appendChild(cardI);
        cardI.innerText = circuits.raceName;
      })

    })
}

switch (nomeURL) {

  case "drivers.html":

    getCurrentDrivers(`/${anoAtual}/drivers.json`);

    break;

  case "index.html":

    getStandings()

    getNextRace()

    break;

  case "schedule.html":

    getSchedule()

    break;

  default:
    break;

}


