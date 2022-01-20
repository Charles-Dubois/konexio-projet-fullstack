$(() => {
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
        reset()
    })


    //                     Déclaration de la fonction qui selectionne les pays

    function getAllCountries() {
        $("li").remove()
        showMySpinner()
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
                    console.log(country.latlng[0])
                });
            },
        }).then(() => {
            hideMySpinner()
        })

    };




    // appel ma fonction d'affichage du pays a chaque click
    $("#btnShowData").click(() => {
        getAllCountries()
    })
})