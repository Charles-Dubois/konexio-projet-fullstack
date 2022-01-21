$(() => {
    let latitude; // trois variables pour alimenter leaflet
    let longitude;
    let zoomLevel;
    let checkForm = true; // Deux variables pour vérifier que les formulaire sont bien rempli avant d'appeler une fonction
    let checkRadio = false;
    ;
    

        //                       fonction pour afficher un spinner 


    function showMySpinner() {

        $(".countries-list").append(`<div class="spinner-border text-danger" role="status">
<span class="visually-hidden">Loading...</span>
</div>`);
    }

    function hideMySpinner() {
        $(".spinner-border").remove();
    }
    //                        Supprime le spinner


    //                  Affichage de tous les pays 
    function reset() {
        $("li").remove(); //          Supprime les pays rcherché précedement
        showMySpinner(); //           Appelle la fonction pour afficher un spinner
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            success: function(countries) {
                countries.forEach(country => {
                    $(".countries-list").append(
                        `<li class="list-group-item d-flex justify-content-between"><div class = "infoCountry"><p>Name : ${country.name.common}<br />Capital : ${country.capital} <br />Continent : ${country.region}</p></div><div class ="flags"><img src="${country.flags.svg}" alt="flag of ${country.name.common}" width="150px" height="100px"></div></li>`
                    )
                }); //              Importe tous les pays de l'API restcountries et les places dans les listes
            }
        }).then(() => {
            hideMySpinner(); //      Appelle la fonction qui supprime mon spinner
        })
    }
    //                    Lance la fontion qui affiche tous les pays une fois en chargment de page
    reset()
        //                     Boutton de réinitialisation de l'affichage, on obtient la même chose qu'au moment d'arriver sur la page
    $("#btnReset").click(() => {
        $("#map").remove();
        reset();
    })


    //                   Partie lefleat

    function mapLoad() {


        const map = L.map("map").setView([latitude, longitude], zoomLevel);

        const mainLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2hhcmxlcy1kdWJvaXMiLCJhIjoiY2t5bXdibHZhMzJ1ZzJ2cWhzc3dld2kyNyJ9.f9PyCPxnFfG4CFyImm-qww"
        }).addTo(map);

        mainLayer.addTo(map);
    }

    //                           Fin de partie leaflet




    //                     Déclaration de la fonction qui selectionne les pays

    function getAllCountries() {
        $("#map").remove(); // Efface une map précedement affichée
        $("li").remove(); //   Supprime la liste précedment affiché
        showMySpinner(); //    Affiche le spinner de chargement


        let countryForm;
        //                       Défini le endpoint selon le choix du user : pays // capital // subregion
        let endPoint = "";
        if ($("#LookingForCountry").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/name/";
            countryForm = $("#countryForm").val();
        } else if ($("#LookingForCapital").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/capital/";
            countryForm = $("#countryForm").val();
        } else if ($("#LookingForSubRegion").is(":checked")) {
            endPoint = "https://restcountries.com/v2/regionalbloc/";
            countryForm = $(".selectSubregion").val();
        } else { console.log("il faut choisir") }

        
        $.ajax({
            // Importation de l'API rescountries
            url: `${endPoint}${countryForm}`,
            success: function(countries) {
                countries.forEach(country => {

                    // Créer des élément de liste avec 3 clés nom du pays, capital, continent
                    $(".countries-list").append(
                        `<li class="list-group-item d-flex justify-content-between"><div class = "infoCountry"><p>Name : ${country.name.common}<br />Capital : ${country.capital} <br />Continent : ${country.region}</p></div><div class ="flags"><img src="${country.flags.svg}" alt="flag of ${country.name.common}" width="150px" height="100px"></div></li>`
                    )

                    // récupère les coordonées du pays
                    latitude = country.latlng[0];
                    longitude = country.latlng[1];
                });
            },
        }).then(() => {
            hideMySpinner() //       Efface le spinner de chargement une fois l'interaction avec l'API terminée
        }).then(() => {
            if (endPoint === "https://restcountries.com/v3.1/name/" || "https://restcountries.com/v3.1/capital/") {
                zoomLevel = 5; //              Gros zoom si l'utilisateur cherche un pays
            } else if ("https://restcountries.com/v3.1/subregion/" === endPoint) {
                zoomLevel = 0; //             Petit zoom si l'utilisateur recherche une subregion
            }
            $(".mapPosition").append( //          insère la map dans la page 
                `<div id="map"></div>`
            )
            mapLoad() //          charge la map
        })

    };
    //                           fonction pour vérifier que le formulaire est rempli
    function checkInput() {
        if ($("#countryForm").val().length < 1) {
            checkForm = false;
        } else if ($("#countryForm").val().length > 1) {
            checkForm = true;
        }

        if ($("#LookingForCountry").is(":checked")) {
            checkRadio = true;
        } else if ($("#LookingForCountry").is(":checked")) {
            checkRadio = true;
        } else if ($("#LookingForSubRegion").is(":checked")) {
            checkRadio = true;
            checkForm = true;   //             Si l'utilisateur utlise la drop list : pas besoin de renseigner le input text
        }
    }


    // appel ma fonction d'affichage du pays et de la map à chaque click ur show data
    $("#btnShowData").click(() => {

        checkInput() //               vérification du formutaire
        if (checkForm && checkRadio === true) { // vérifie que les champs soit remplis avant d'appler une fonction
            getAllCountries();
            
        }
    })
})