
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



function init(names_list) {
    //select html for character dropdown
    var dropDown = d3.select('#selDataset');

    //console.log(jsonData);

    //add names to character selection drop down
    names_list.forEach((x) => {
        dropDown.append('option').text(x).property('value', x);
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
            title: "Gender Chart",
        };

        Plotly.newPlot("plot", data, layout);
    })
}

function alignmentPie() {
    d3.request("http://127.0.0.1:5000/gender").get(gender => {
        // console.log(JSON.parse(gender.response));
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
}

//=======================End Character section==========================