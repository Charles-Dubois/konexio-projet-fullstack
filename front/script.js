$(() => {
    let latitude;
    let longitude;
    let zoomLevel;
    //                          affiche un spinner     placer en début de fonction appelé lors d'un click
    function showMySpinner() {
        $(".countries-list").append(`<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`)
    }
    //                        Supprime le spinner   placer en fin de fonction appelé lors d'un click
    function hideMySpinner() {
        $(".spinner-border").remove()
    }
    //                  Affichage de tous les pays
    function reset() {
        $("li").remove()
        showMySpinner()
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            success: function(countries) {
                countries.forEach(country => {
                    $(".countries-list").append(
                        `<li class="list-group-item"><p>Name : ${country.name.common}<br />Capital : ${country.capital}
                     <br />Continent : ${country.region}</p></li>`
                    )
                });
            }
        }).then(() => {
            hideMySpinner()
        })
    }
    //                    Lance la fonction d'affichage à l'ouverture de la page
    reset()
        //                     Boutton de réinitialisation de l'affichage
    $("#btnReset").click(() => {
        $("#map").remove()
        reset()
    })




    //                   Partie lefleat

    function mapLoad() {


        const map = L.map("map").setView([latitude, longitude], zoomLevel);

        const mainLayer = L.tileLayer(L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2hhcmxlcy1kdWJvaXMiLCJhIjoiY2t5bXdibHZhMzJ1ZzJ2cWhzc3dld2kyNyJ9.f9PyCPxnFfG4CFyImm-qww"
        }).addTo(map));

        mainLayer.addTo(map);
    }






    //                     Déclaration de la fonction qui selectionne les pays

    function getAllCountries() {
        $("#map").remove() // Réinitialise la map
        $("li").remove() //   Réinitialise la liste
        showMySpinner() // Spinner de chargement
            //                       Défini le endpoint selon le choix du user : pays // capital // subregion
        let endPoint = "";
        if ($("#LookingForCountry").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/name/"
        } else if ($("#LookingForCapital").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/capital/"
        } else if ($("#LookingForSubRegion").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/subregion/"
        } else { console.log("il faut choisir") }

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
                        // récupère les coordonées du pays
                    latitude = country.latlng[0]
                    longitude = country.latlng[1]
                });
            },
        }).then(() => {
            hideMySpinner()
        }).then(() => {
            if (endPoint === "https://restcountries.com/v3.1/name/" || "https://restcountries.com/v3.1/capital/") {
                zoomLevel = 5;
            } else if ("https://restcountries.com/v3.1/subregion/" === endPoint) {
                zoomLevel = 1;
            }
            $(".mapPosition").append(
                `<div id="map"></div>`
            )
            mapLoad()
        })


    };






    // appel ma fonction d'affichage du pays a chaque click
    $("#btnShowData").click(() => {
        getAllCountries()
    })




})