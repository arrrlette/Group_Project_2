
let superheroes;  //let lets us change the value. used for the character selection section

//hit home route first, then run all heroes
//allheroes was responding before the database was populated, 
// so put allheroes route after the home route that transfers the data 
// into db. so allheroes wont run until the home route fully runs
d3.request("http://127.0.0.1:5000/").get(response => {
    d3.request("http://127.0.0.1:5000/allheroes").get(response => {
        const names = JSON.parse(response.response).map(x => x.name)
        console.log(JSON.parse(response.response));
        console.log(names);
        superheroes = JSON.parse(response.response) //for building out the superhero, will let us now have to do a d3 request each time
        init(names);
    })
})



function init(names) {
    //select html for character dropdown
    var dropDown = d3.select('#selDataset');

    // console.log(jsonData);

    //add names to character selection drop down
    names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name);
    })

    //function to call initial display on html
    genderPie(); //to display gender pie chart on init
    characterChange(names[0]) //to display first character in array on init
};


//========================Dashboard section============================
function genderPie() {
    d3.request("http://127.0.0.1:5000/gender").get(gender => {
        // console.log(JSON.parse(gender.response));
        var gender_data = JSON.parse(gender.response)
        // console.log(gender_data) 
        gender_plot = Object.values(gender_data[0])
        // console.log(gender_plot)

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace1 = {
            //labels: '',
            values: gender_plot,
            type: 'pie'
        };

        var data = [trace1];

        var layout = {
            title: "Gender Chart",
        };

        Plotly.newPlot("plot", data, layout);
    })

    d3.request("http://127.0.0.1:5000/hairColor").get(hairColor => {
    // console.log(JSON.parse(gender.response));
        var hair_data = JSON.parse(hairColor.response)
        console.log(hair_data)
        hair_plot = Object.values(hair_data[0])
        console.log(hair_plot)

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace1 = {
            //labels: '',
            values: hair_plot,
            type: 'pie'
        };

        var data = [trace1];

        var layout = {
            title: "Hair Chart",
        };

        Plotly.newPlot("plot", data, layout);
    })


    

    
}

function alignmentPie() {
    d3.request("http://127.0.0.1:5000/gender").get(gender => {
        // console.log(JSON.parse(gender.response));
        var gender_data = JSON.parse(gender.response)
        // console.log(gender_data)
        gender_plot = Object.values(gender_data[0])
        // console.log(gender_plot)

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace1 = {
            //labels: '',
            values: gender_plot,
            type: 'pie'
        };

        var data = [trace1];

        var layout = {
            title: "Alignment",
        };

        Plotly.newPlot("plot", data, layout);
    })
}



function displayGraphs(graph) {

    if (graph === "gender") {
        genderPie();
    }

    else if (graph === "alignment") {
        alignmentPie();
    }
}
//========================End Dashboard section=========================



//=========================Character section============================
function characterChange(superhero) {

    console.log(superhero)
    dashboardPowerStats(superhero)
    //add rest of functions for each section here
};

function dashboardPowerStats(superhero) {
    const hero = superheroes.filter(x => x.name === superhero)[0].powerstats;
    console.log(hero)

    d3.request("http://127.0.0.1:5000/gender").get(powerStats => {
        // console.log(JSON.parse(gender.response));
        var powerStats_data = JSON.parse(powerStats.response)
        console.log(powerStats_data)
        powerStats_plot = Object.values(powerStats_data[0])
        // console.log(gender_plot)

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace1 = {
            //labels: '',
            values: gender_plot,
            type: 'pie'
        };

        var data = [trace1];

        var layout = {
            title: "Alignment",
        };

        Plotly.newPlot("characterName", data, layout);
    })
}

//=======================End Character section==========================







// graphs
// ----dashboard section----
//     group 1 (xan)
//     gender
//     hair color
//     eye color

//     group 2 (anthony)
//     alignment
//     publisher
//     primary stat




// character selection section (arlette)
//     image and name
//     appearance
//     biography
//     work
//     h bar graph for powerStats


// battle (arlette/nathan)