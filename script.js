const convertButton = document.querySelector('.convert-button')
const selectCurrency = document.querySelector('.select-currency')
const textoCurrency = document.querySelector('.currency')
const currencyValueConverted = document.querySelector('.currency-value')

function convertCurrency(showAlert = true) {
    const inputCurrencyValue = document.querySelector('.input-currency').value
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert')
    

    const dolarToday = 5.18;
    const euroToday = 6.21;

    if (!inputCurrencyValue) {
        if (showAlert) {
            alert('Por favor, insira um valor para converter.')
        }
        return
    }
    if (selectCurrency.value === 'dolar') {
        currencyValueConverted.textContent = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday)
    }

    if (selectCurrency.value === 'euro') {
        currencyValueConverted.textContent = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday)
    }

    currencyValueToConvert.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue)
}

function chanceCurrency() {
    if (selectCurrency.value === 'dolar') {
        textoCurrency.textContent = "Dólar Americano"
        document.querySelector('.logo-eua').src = 'assets/estados-unidos (1) 1.png'
    }
    if (selectCurrency.value === 'euro') {
        textoCurrency.textContent = "Euro"
        currencyValueConverted.textContent = '€ 0,00'
        document.querySelector('.logo-eua').src = 'assets/euro.png'

    }

    convertCurrency(false)
}



selectCurrency.addEventListener('change', chanceCurrency)
convertButton.addEventListener('click', convertCurrency) 
