d3.request("http://127.0.0.1:5000/").get(response => {
    

})


d3.request("http://127.0.0.1:5000/allheroes").get(response => {
    console.log(JSON.parse(response.response));

})



d3.request("http://127.0.0.1:5000/gender").get(gender => {
    console.log(JSON.parse(gender.response));
    var gender_data = JSON.parse(gender.response)
    console.log(gender_data)
    gender_plot = Object.values(gender_data[0])
    console.log(gender_plot)

    //plotly code
    // // Part 5 - Working Pie Chart
    var trace1 = {
        //labels: '',
        values: gender_plot,
        type: 'pie'
    };

    var data = [trace1];

    var layout = {
        title: "'Pie' Chart",
    };

    Plotly.newPlot("plot", data, layout);
})