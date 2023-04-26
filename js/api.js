let baseURL = "http://ergast.com/api/f1/2022/drivers/.json";
const nome = document.getElementById("nome");
const birth = document.getElementById("niver");
const nacio = document.getElementById("nac");
const number = document.getElementById("num");

let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(baseURL, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      nome.innerHTML = result.MRData.DriverTable.Drivers[8].givenName + " " + result.MRData.DriverTable.Drivers[8].familyName;
      birth.innerHTML = "Date of Birth: " + result.MRData.DriverTable.Drivers[8].dateOfBirth;
      nacio.innerHTML = "Nacionality: " + result.MRData.DriverTable.Drivers[8].nationality;
      number.innerHTML = "Pilot Number: " + result.MRData.DriverTable.Drivers[8].permanentNumber;
    })
    .catch(error => console.log('error', error));