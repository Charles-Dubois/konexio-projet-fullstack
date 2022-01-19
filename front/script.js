$(() => {

    console.log($("#countryForm").val())
    console.log($("#test").val())

    //                     Déclaration de la fonction qui selectionne les pays
    function getAllCountries() {

        $.ajax({
            // Importation de l'API rescountries
            url: "https://restcountries.com/v3.1/all",
            success: function(countries) {
                countries.forEach(country => {

                    // Créer des élément de liste avec 3 clés nom du pays, capital, continent
                    $(".countries-list").append(
                        `<li><p>Name : ${country.name.common}<br />Capital : ${country.capital} <br />Continent : ${country.region}}</p></li>`
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