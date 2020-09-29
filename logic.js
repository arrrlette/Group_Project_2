d3.request("http://127.0.0.1:5000/allheroes").get(response => {
    console.log(JSON.parse(response.response));

})

d3.request("http://127.0.0.1:5000/gender").get(gender => {
    console.log(JSON.parse(gender.response));
    var gender_data = gender.response
    //plotly code

})