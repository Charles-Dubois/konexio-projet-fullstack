// const latitude,
//     longitude;

// //                    Fonction pour donner les caractéristiques au a map

// let endPoint = ""; //                 Vérifictation de endpoint de l'API
// if ($("#LookingForCountry").is(":checked")) {
//     endPoint = "https://restcountries.com/v3.1/name/";
// } else if ($("#LookingForCapital").is(":checked")) {
//     endPoint = "https://restcountries.com/v3.1/capital/";
// } else if ($("#LookingForSubRegion").is(":checked")) {
//     console.log("Cette fonctionnalité n'affiche qu'une carte à la fois");
// } else {
//     console.log("il faut choisir");
// }
// if (endPoint === "https://restcountries.com/v3.1/name/") {
//     console.log("OKeys")
// }

// $.ajax({
//     // Importation de l'API rescountries
//     url: endPoint + $("#countryForm").val(),
//     success: function(countries) {
//         countries.forEach(country => {

//             latitude = country.latlng[0];
//             longitude = country.latlng[1];
//             console.log(country.latlng[0]);
//         });
//     },
// })