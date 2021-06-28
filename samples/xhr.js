export const showCountries = () => {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://restcountries.eu/rest/v2/all', true)

    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log('success');
            let countries = JSON.parse(this.response)
            console.log(countries);
            let countriesList = document.createDocumentFragment()
            countries.forEach(country => {
                const countryCard = document.createElement('div')
                countryCard.classList.add('card')
                countryCard.innerHTML = 
                    `
                        <img src="${country.flag}" alt="${country.name}">
                        <h3>${country.name}</h3>
                    `
                countriesList.appendChild(countryCard)
            });
            const feed = document.querySelector('.feed')
            feed.appendChild(countriesList)
            console.log(feed);
        }
    }
    xhr.send()
}