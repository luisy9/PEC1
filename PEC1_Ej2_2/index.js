const currency_one = document.getElementById('currency-one');
const amount_one = document.getElementById('amount-one');

const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

const currency_two = document.getElementById('currency-two');
const amount_two = document.getElementById('amount-two');

const container = document.getElementById('container');
const loading = document.getElementById('loading');

function calculate() {
  const currency_one_calulate = currency_one.value;
  const currency_two_calulate = currency_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/a68c1f88285612f28dc13443/latest/${currency_one_calulate}`
  )
    .then((res) => res.json())
    .then((data) => {
      loading.style.display = 'block';
      
      setTimeout(() => {
        loading.style.display = 'display';
      }, 700)

      const rate_calc = data.conversion_rates[currency_two_calulate];
      rate.innerText = `1 ${currency_one_calulate} = ${rate_calc} ${currency_one_calulate}`;

      amount_two.value = (amount_one.value * rate_calc).toFixed(2);
    })
    .catch((err) => {
      console.log(err);
      const containerError = document.createElement('div');
      const closeImgae = document.createElement('img');
      const container_close = document.createElement('div');
      const container_close2 = document.createElement('div');
      container_close2.classList.add('container_close2');
      container_close.classList.add('container_close');
      containerError.classList.add('containerError');
      closeImgae.setAttribute('src', './assets/cerrar.png');
      closeImgae.classList.add('img_close');
      containerError.innerHTML = '<h1>Luis</h1>';
      container.append(containerError);
      containerError.append(container_close);
      container_close.append(container_close2);
      container_close2.append(closeImgae);

      closeImgae.addEventListener('click', () => {
        containerError.remove();
      });
    });
}

currency_one.addEventListener('change', calculate);

amount_one.addEventListener('input', () => {
  if (amount_one.value < 0) {
    amount_one.value = 0;
  }
  calculate();
});

currency_two.addEventListener('change', calculate);
amount_two.addEventListener('input', () => {
  if (amount_two.value < 0) {
    amount_two.value = 0;
  }
  calculate();
});

swap.addEventListener('click', () => {
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;

  calculate();
});

calculate();
