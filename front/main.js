function mapLoad() {
    const position = "lat 97, lng 2";

    let endPoint = "";
    if ($("#LookingForCountry").is(":checked")) {
        endPoint = "https://restcountries.com/v3.1/name/";
    } else if ($("#LookingForCapital").is(":checked")) {
        endPoint = "https://restcountries.com/v3.1/capital/";
    } else if ($("#LookingForSubRegion").is(":checked")) {
        console.log("Cette fonctionnalité n'affiche qu'une carte à la fois");
    } else {
        console.log("il faut choisir");
    }
    if (endPoint === "https://restcountries.com/v3.1/name/") {
        console.log("OKeys")
    }

    $.ajax({
        // Importation de l'API rescountries
        url: endPoint + $("#countryForm").val(),
        success: function(countries) {
            countries.forEach(country => {
                //                                 Retire tous les pays afficher pour affih=cher uniquement ceux recherchés

                // Créer des élément de liste avec 3 clés nom du pays, capital, continent
                $(".countries-list").append(
                    `<li class="list-group-item"><p>Name : ${country.name.common}<br />Capital : ${country.capital} <br />Continent : ${country.region}</p></li>`
                )
                console.log(country.latlng[0])
            });
        },
    })
}













const zoomLevel = 4;

const map = L.map("map").setView([position.lat, position.lng], zoomLevel);

const mainLayer = L.tileLayer(L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoiY2hhcmxlcy1kdWJvaXMiLCJhIjoiY2t5bXdibHZhMzJ1ZzJ2cWhzc3dld2kyNyJ9.f9PyCPxnFfG4CFyImm-qww"
}).addTo(map));

mainLayer.addTo(map)


// const longitude = country.latlng[1];
// const latitude = country.latlng[0];