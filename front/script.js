$(() => {




    //                     Déclaration de la fonction qui selectionne les pays
    function getAllCountries() {
        //                       Défini le endpoint selon le choix du user : pays ou capital
        let endPoint = "";
        if ($("#LookingForCountry").is(":checked")) {
            console.log("okkk")
            endPoint = "https://restcountries.com/v3.1/name/"
        } else if ($("#LookingForCapital").is(":checked")) {
            endPoint = "https://restcountries.com/v3.1/capital/"
        } else { console.log("il faut choisir") }


        $.ajax({
            // Importation de l'API rescountries
            url: endPoint + $("#countryForm").val(),
            success: function(countries) {
                countries.forEach(country => {

                    // Créer des élément de liste avec 3 clés nom du pays, capital, continent
                    $(".countries-list").append(
                        `<li><p>Name : ${country.name.common}<br />Capital : ${country.capital} <br />Continent : ${country.region}</p></li>`
                    )
                });

            },
        })
    };

    // appel ma fonction d'affichage du pays a chaque click
    $("#btnShowData").click(() => {
        getAllCountries()
    })
})