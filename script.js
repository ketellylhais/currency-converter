const convertButton = document.querySelector('.convert-button')
const selectCurrency = document.querySelector('.select-currency')
const textCurrency = document.querySelector('.currency')
const currencyValueConverted = document.querySelector('.currency-value')
const currencyValueToConvert = document.querySelector('.currency-value-to-convert')
const inputCurrencyValue = document.querySelector('.input-currency')



async function getCurrencyRate(targetCurrency) {

    const url = `https://api.frankfurter.dev/v1/latest?from=BRL&to=${targetCurrency}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na rede: ${response.statusText}`)
        }
        const data = await response.json()

        const rate = data.rates[targetCurrency]
        return rate
    } catch (error) {
        console.error("Erro ao buscar a cotação da API:", error)
        alert("Não foi possível carregar a cotação atual. Tente novamente mais tarde.")
        return null
    }
}

async function convertCurrency(showAlert = true) {
    const inputValue = inputCurrencyValue.value
    const targetCurrencyCode = selectCurrency.value

    if (!inputValue || inputValue <= 0) {
        if (showAlert) {
            alert('Por favor, insira um valor para converter.')
        }
        return
    }

    const rate = await getCurrencyRate(targetCurrencyCode)

    if (rate === null) {
        return
    }

    const convertedValue = inputValue * rate

    currencyValueToConvert.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputValue)

    currencyValueConverted.textContent = new Intl.NumberFormat(
        targetCurrencyCode === 'EUR' ? "de-DE" : "en-US",
        {
            style: "currency",
            currency: targetCurrencyCode
        }
    ).format(convertedValue)
}

function chanceCurrency() {
    if (selectCurrency.value === 'USD') {
        textCurrency.textContent = "Dólar Americano"
        document.querySelector('.logo-eua').src = 'assets/estados-unidos (1) 1.png'
    } else if (selectCurrency.value === 'EUR') {
        textCurrency.textContent = "Euro"
        document.querySelector('.logo-eua').src = 'assets/euro.png'
    }

    convertCurrency(false)
}



selectCurrency.addEventListener('change', chanceCurrency)
convertButton.addEventListener('click', () => convertCurrency(true)) 
