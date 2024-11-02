const Search = document.getElementById("search");
const container = document.getElementById("container");
const button = document.getElementById("btn");


button.addEventListener("click", ()=>{
    if(document.body.classList.contains("onn")){
        document.body.classList.remove("onn");
    }else{
        document.body.classList.add("onn");
    }
})
const URL = "https://restcountries.com/v3.1/all";
let countryData = []; // Declare a variable to hold the country data

// Fetch the data and store it in countryData, then render the countries
fetch(URL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        countryData = data; // Assign the data to the global variable
        renderCountries(countryData); // Render the data once it's available
    })
    .catch((error) => {
        console.error("Error fetching country data:", error);
    });

function renderCountries(countries) {
    container.innerHTML = "";

    countries.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("country");
        div.innerHTML = `
        <h2>${element.name.common}</h2>
        <img src="${element.flags.png}">
            <p>Population: ${element.population}</p>
            <p>Region: ${element.region}</p>
            <p>Capital: ${element.capital}</p>
        `;
        container.appendChild(div);
    });
}

// Add event listener for the search input
Search.addEventListener("input", (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filterData = countryData.filter((country) => {
        return country.name.common.toLowerCase().includes(searchValue);
    });
    console.log(filterData);

    renderCountries(filterData);
});


