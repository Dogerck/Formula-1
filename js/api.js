var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://ergast.com/api/f1/drivers.json", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));