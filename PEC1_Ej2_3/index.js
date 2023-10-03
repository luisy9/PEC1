const selectMoneda = document.getElementById('tipo-moneda');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .sitio:not(.ocupado)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectPelicula = document.getElementById('pelicula');

let rate_calc = 0;
returnData();

function addTipoMoneda(change = null) {
  const tipo_modena = selectMoneda.value;
  localStorage.setItem('moneda', selectMoneda.selectMoneda);
  fetch(
    `https://v6.exchangerate-api.com/v6/a68c1f88285612f28dc13443/latest/${tipo_modena}`
  )
  .then((res) => res.json())
  .then((data) => {
    //0.1983 USD
   rate_calc = data.conversion_rates['USD'];
   calcPrice();
  })
}
addTipoMoneda();
selectMoneda.addEventListener('change', addTipoMoneda);

let ticketPrice = selectPelicula.value;

function calcPrice() {
  ticketPrice = (ticketPrice / rate_calc).toFixed(2);
  updateTicketSelect();
}

function returnData() {
  const selectedSeats = JSON.parse(localStorage.getItem('seats'));
  const modena = localStorage.getItem('moneda');
  const movieSelectedIndex = localStorage.getItem('movie');
  if(modena === null) return;
  selectMoneda.selectedIndex = modena;

  if(movieSelectedIndex === null) return;
  selectPelicula.selectedIndex = movieSelectedIndex;

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
  localStorage.setItem('movie', e.target.selectedIndex);
  localStorage.setItem('ticketPrice', ticketPrice);
  calcPrice();
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
