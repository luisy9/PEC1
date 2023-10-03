const selectMoneda = document.getElementById('tipo-moneda');
selectMoneda.addEventListener('change', addTipoMoneda);
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .sitio:not(.ocupado)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectPelicula = document.getElementById('pelicula');

let ticketPrice = selectPelicula.value;

returnData();

function returnData() {
  const selectedSeats = JSON.parse(localStorage.getItem('seats'));
  if (
    selectedSeats.length <= 0 ||
    selectedSeats === null ||
    selectedSeats === undefined
  )
    return;
  seats.forEach((seat, index) => {
    if (selectedSeats.indexOf(index) > -1) {
      seat.classList.toggle('selected');
    }
  });
}

function addTipoMoneda() {
  const tipo_modena = selectMoneda.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/a68c1f88285612f28dc13443/latest/${tipo_modena}`
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data);  
  })
}

function updateTicketSelect() {
  const selectedSeats = document.querySelectorAll('.row .sitio.selected');

  //analizarlo
  const sitiosIndex = [...selectedSeats].map((sitio) =>
    [...seats].indexOf(sitio)
  );

  localStorage.setItem('seats', JSON.stringify(sitiosIndex));
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

selectPelicula.addEventListener('change', (e) => {
  ticketPrice = e.target.value;
  localStorage.setItem('movie', e.target.selectedIndex);
  localStorage.setItem('ticketPrice', ticketPrice);
  updateTicketSelect();
});

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('sitio') &&
    !e.target.classList.contains('ocupado')
  ) {
    e.target.classList.toggle('selected');
    updateTicketSelect();
  }
});
