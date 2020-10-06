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
    });
    // --------------BATTLE SECTION-----------------------
    //select html for first character dropdown in battle section
    var battleDropdowns = d3.select('#selDataset2');

    //add names to first character dropdown in battle section
    names.forEach((name) => {
        battleDropdowns.append('option').text(name).property('value', name);
    });


    //select html for second character dropdown in battle section
    var battleDropdowns = d3.select('#selDataset3');

    //add names second character dropdown in battle section
    names.forEach((name) => {
        battleDropdowns.append('option').text(name).property('value', name);
    });

    // -----------END BATTLE SECTION-------------------------

    //function to call initial display on html
    genderPie(); //to display gender pie chart on init
    characterChange(names[0]); //to display first character in array on init
    battleChange(names[0]);
    battleChange2(names[0]);
};


//========================Dashboard section============================
function genderPie() {
    //Gender Data Query from app.py logic into dictionary and build Pie Chart
    d3.request("http://127.0.0.1:5000/gender").get(gender => {
        var gender_data = JSON.parse(gender.response)
        // console.log(gender_data) 
        gender_plot = Object.values(gender_data[0])
        // console.log(gender_plot)
        //capture labels for gender pie
        gender_keys = Object.keys(gender_data[0])

        //plotly code for gender pie chart
        var trace1 = {
            labels: gender_keys,
            values: gender_plot,
            type: 'pie'
        };
        var data = [trace1];
        var layout = {
            title: "Gender",
            showlegend: true,
            legend: { "orientation": "h" }
        };
        Plotly.newPlot("plot", data, layout);
    })

    //Hair Color Query from app.py logic into dictionary and build Pie Chart  
    d3.request("http://127.0.0.1:5000/hairColor").get(hairColor => {
        var hair_data = JSON.parse(hairColor.response)
        //sort descending
        hair_data.sort((firstNum, secondNum) => secondNum - firstNum);
        //console.log(hair_data)
        hair_plot = Object.values(hair_data[0])
        var top_10_hair = hair_plot.slice(0, 10)
        //take the first 15 results
        console.log(top_10_hair)
        //capture labels for pie chart
        hair_keys = Object.keys(hair_data[0])
        console.log(hair_keys)

        //plotly code - Hair Color Comparison
        var trace2 = {
            labels: hair_keys,
            values: top_10_hair,
            type: 'pie'
        };
        var data = [trace2];
        var layout = {
            title: "Top 10 Most Common Hero Hair Color",
            showlegend: true,
            legend: { "orientation": "h" }
        };
        Plotly.newPlot("plot2", data, layout);
    })
    //Eye Color Query from app.py logic into dictionary and build Pie Chart  
    d3.request("http://127.0.0.1:5000/eyeColor").get(eyeColor => {
        var eye_data = JSON.parse(eyeColor.response)
        //sort descending
        eye_data.sort((firstNum, secondNum) => secondNum - firstNum);
        console.log(eye_data)
        eye_plot = Object.values(eye_data[0])
        var top_10_eyes = eye_plot.slice(0, 10)
        console.log(top_10_eyes)
        //eye color keys for plot
        eye_keys = Object.keys(eye_data[0])
        console.log(eye_keys)

        //plotly code - Eye Color Comparison
        var trace3 = {
            labels: eye_keys,
            values: top_10_eyes,
            type: 'pie'
        };
        var data = [trace3];
        var layout = {
            title: "Top 10 Most Common Hero Eye Color",
            showlegend: true,
            legend: { "orientation": "h" }
        };
        Plotly.newPlot("plot3", data, layout);
    })
}

function alignmentPie() {

    console.log(superheroes)

    var combat_count = 0;
    var durability_count = 0;
    var intelligence_count = 0;
    var power_count = 0;
    var speed_count = 0;
    var strength_count = 0;

    var combat_list = [];
    var durability_list = [];
    var intelligence_list = [];
    var power_list = [];
    var speed_list = [];
    var strength_list = [];

    var combat_pics = [];
    var durability_pics = [];
    var intelligence_pics = [];
    var power_pics = [];
    var speed_pics = [];
    var strength_pics = [];

    var good_count = 0;
    var bad_count = 0;

    superheroes.forEach(hero => {

        stats = Object.values(hero.powerstats);
        image = Object.values(hero.images)
        alignment = Object.values(hero.biography.alignment[0])
        alignment_value = alignment[0]
        combat = stats[0]
        console.log(combat)
        durability = stats[1]
        console.log(durability)
        intelligence = stats[2]
        console.log(intelligence)
        power = stats[3]
        console.log(power)
        speed = stats[4]
        console.log(speed)
        strength = stats[5]
        console.log(strength)

        if (combat >= durability && combat >= intelligence &&
            combat >= power && combat >= speed && combat >= strength) {

            combat_count++;
            combat_list.push(hero.name)
            combat_pics.push(image[0])

        } else if (durability >= combat && durability >= intelligence &&
            durability >= power && durability >= speed && durability >= strength) {

            durability_count++;
            durability_list.push(hero.name)
            durability_pics.push(image[0])


        } else if (intelligence >= combat && intelligence >= durability &&
            intelligence >= power && intelligence >= speed && intelligence >= strength) {

            intelligence_count++;
            intelligence_list.push(hero.name)
            intelligence_pics.push(image[0])

        } else if (power >= combat && power >= durability &&
            power >= intelligence && power >= speed && power >= strength) {

            power_count++;
            power_list.push(hero.name)
            power_pics.push(image[0])

        } else if (speed >= combat && speed >= durability &&
            speed >= intelligence && speed >= power && speed >= strength) {

            speed_count++;
            speed_list.push(hero.name)
            speed_pics.push(image[0])

        } else {

            strength_count++;
            strength_list.push(hero.name)
            strength_pics.push(image[0])

        }
        //console.log(stats)
        //console.log(combat)
        //console.log(alignment_value)

        //fill alignment values for pie chart
        if (alignment == "g") {

            good_count++;

        } else {
            bad_count++;
        }
        //console logs for primary stat data
        // console.log(combat_count + "," + durability_count + "," + intelligence_count + "," +
        //     power_count + "," + speed_count + "," + strength_count)
        console.log(combat_list)
        console.log(durability_list)
        console.log(intelligence_list)
        console.log(power_list)
        console.log(speed_list)
        console.log(strength_list)
        // console.log(combat_pics)
        // console.log(strength_pics)
        // console.log(good_count + "," + bad_count)

    });
    //pie chart for primary stats
    var trace1 = {
        labels: ["Combat", "Durability", "Intelligence", "Power",
            "Speed", "Strength"],
        values: [combat_count, durability_count, intelligence_count, power_count, speed_count, strength_count],
        type: 'pie'
    };
    //plot for primary stat
    var data = [trace1];
    var layout = {
        title: "Primary Statistic",
    };
    Plotly.newPlot("plot", data, layout);

    //plotly code for alignment pie chart
    var trace1 = {
        labels: ['Hero', 'Villian'],
        values: [good_count, bad_count],
        type: 'pie'
    };

    var data = [trace1];
    var layout = {
        title: "Alignment Chart",
    };

    Plotly.newPlot("plot2", data, layout);

    //Publisher/Universe Query from app.py logic into dictionary and build Pie Chart
    d3.request("http://127.0.0.1:5000/universe").get(universe => {
        var universe_data = JSON.parse(universe.response)
        
        console.log(universe_data)
        //sort descending

        sorted_data = universe_data.sort((a, b) => b - a);
        console.log(sorted_data)
        universe_plot = Object.values(sorted_data[0])

        var top_10_universe = universe_plot.slice(0, 10)
        console.log(top_10_universe)
        //eye color keys for plot
        universe_keys = Object.keys(universe_data[0])
        console.log(universe_keys)

        //plotly code for gender pie chart
        var trace1 = {
            labels: universe_keys,
            values: top_10_universe,
            type: 'pie'
        };
        var data = [trace1];
        var layout = {
            title: "Universe",
            showlegend: true,
            legend: { "orientation": "h" }
        };
        Plotly.newPlot("plot3", data, layout);
    })

    
    const alignmentsuperStats = superheroes[0].powerstats;
    powerstat_labels = Object.keys(alignmentsuperStats);

    console.log(powerstat_labels)
    

    //code to dynamically create primary stat dropdown
    var select = document.createElement("select");
    select.name = "Primary Stat";
    select.id = "primarystat"

    for (const val of powerstat_labels) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choose Primary Stat: "
    label.htmlFor = "primarystat";

    document.getElementById("primarystatpanel").appendChild(label).appendChild(select);

   

    var uselect = document.createElement("select");
    uselect.name = "Universe";
    uselect.id = "universe"

    // for (const val of universe_keys) {
    //     var option = document.createElement("option");
    //     option.value = val;
    //     option.text = val.charAt(0).toUpperCase() + val.slice(1);
    //     uselect.appendChild(option);
    // }

    var ulabel = document.createElement("label");
    ulabel.innerHTML = "Choose Universe: "
    ulabel.htmlFor = "universe";

    document.getElementById("universepanel").appendChild(ulabel).appendChild(uselect);

    mypanelDiv = document.getElementById("primarystatpanel");
    console.log(mypanelDiv)
    var panel = document.createElement("div");

    panel.innerHTML = '<div class="panel panel-primary">' +
        '<div class="panel-heading">' +
        '<h3 class="panel-title">Heroes/Villains</h3>' +
        '</div>' +
        '<div id="primarystatlist" class="panel-body">' +
        + '</div>' + '</div>'

    mypanelDiv.appendChild(panel);

    //select html for panel body
    var appHTML = d3.select("#primarystatlist");

    //to only show current data called
    appHTML.html("")

    //add combat heroes by default on initial load
    //appends each combat hero name to the panel
    combat_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));

    mypanelDiv.appendChild(panel);

    //code to grab when a primary stat is selected from the dropdown
    document.addEventListener('input', function (event) {

        // Only run on our select menu
        if (event.target.id !== 'primarystat') return;

        // The selected value
        selected_value = event.target.value
        console.log(selected_value);


        //var myTableDiv = document.getElementById("speedlist");

        //to only show current data called
        appHTML.html("")


        //switch statement to populate superheroes based on primary stat selected
        switch (selected_value) {
            case "combat":

                console.log(combat_list)
                //appends each key and value in the metaData to the html
                combat_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            case "durability":

                console.log(durability_list)
                //appends each key and value in the metaData to the html
                durability_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            case "intelligence":

                console.log(intelligence_list)
                //appends each key and value in the metaData to the html
                intelligence_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            case "power":

                console.log(power_list)
                //appends each key and value in the metaData to the html
                power_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            case "speed":

                console.log(speed_list)
                //appends each key and value in the metaData to the html
                speed_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            case "strength":

                console.log(strength_list)
                //appends each key and value in the metaData to the html
                strength_list.map((item) => appHTML.append("h6").html(`<strong>${item}`));
                break;

            default:
                console.log('no stat selected');
        }

    }, false);

}

//speed_pics.map((item) =>

//var myTableDiv = document.getElementById("myDynamicTable");

//console.log(myTableDiv)

// var table = document.createElement('TABLE');
// table.border = '1';

// var tableBody = document.createElement('TBODY');
// table.appendChild(tableBody);

// // Use `Object.values` and `forEach` to iterate through values
// Object.values(speed_list).forEach(value => {

//     console.log(value);

//     var tr = document.createElement('TR');
//     tableBody.appendChild(tr);

//     //hero name field
//     var td = document.createElement('TD');
//     td.width = '200';
//     td.appendChild(document.createTextNode(value))
//     tr.appendChild(td);

// });

// // Use `Object.values` and `forEach` to iterate through values
// Object.values(speed_pics).forEach(value => {

//     console.log(value);
//     //hero image field
//     var td = document.createElement('TD');
//     td.width = '200';
//     td.appendChild(document.createTextNode(value))
//     tr.appendChild(td);

//     for (var j = 0; j < 4; j++) {
//         var td = document.createElement('TD');
//         td.width = '75';
//         td.appendChild(document.createTextNode("Cell " + i + "," + j));
//         tr.appendChild(td);
//     }
//});

//myTableDiv.appendChild(table);


//display graphs
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

    //console.log(superhero)
    dashboardPowerStats(superhero);
    dashboardCharImage(superhero);
    dashboardApp(superhero);
    biography(superhero);
    work(superhero);
};

function battleChange(superhero) {
    battleImages1(superhero);
};
function battleChange2(superhero) {
    battleImages2(superhero);
};

//PowerStats function
function dashboardPowerStats(superhero) {
    const superStats = superheroes.filter(x => x.name === superhero)[0].powerstats;
    //console.log(superStats)
    // d3.request("http://127.0.0.1:5000//powerStats/" + superhero).get(powerStats => {
    //     var powerStats_data = powerStats.response
    //     console.log(powerStats_data)
    stats_keys = Object.keys(superStats)
    console.log(stats_keys)
    stats_values = Object.values(superStats)
    console.log(stats_values)


    // markerColor = '';
    // if(stats_values > 75){
    //     markerColor = 'Red';   
    // } else {
    //     markerColor = "Orange";
    // }


    var trace1 = {
        //labels: '',
        type: 'bar',
        x: stats_values,
        y: stats_keys,
        orientation: 'h',
        // marker: {
        //     color: markerColor,
        // }
    };
    var data = [trace1];



    var layout = {
        title: "PowerStats",
        xaxis: {
            range: [1, 100],
        }
    };
    Plotly.newPlot("powerStats", data, layout);
}
//image creation
function dashboardCharImage(superhero) {
    const charImages = superheroes.filter(x => x.name === superhero)[0].images
    //console.log(charImages);

    image = Object.values(charImages);
    //console.log(image[0]);

    d3.select(".charImage>img").attr("src", image[2]);
}

function dashboardApp(superhero) {

    const superApp = superheroes.filter(x => x.name === superhero)[0].appearance;

    //select html
    var appHTML = d3.select("#superApp");

    //to only show current data called
    appHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(superApp).forEach(([key, value]) => appHTML.append("h6").html(`<strong>${key}:</strong> ${value}`));

}

function biography(superhero) {

    const biography = superheroes.filter(x => x.name === superhero)[0].biography;

    //select html
    var bioHTML = d3.select("#biography");

    //to only show current data called
    bioHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(biography).forEach(([key, value]) => bioHTML.append("h6").html(`<strong>${key}:</strong> ${value}`));

}

function work(superhero) {

    const work = superheroes.filter(x => x.name === superhero)[0].work;

    //select html
    var workHTML = d3.select("#work");

    //to only show current data called
    workHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(work).forEach(([key, value]) => workHTML.append("h6").html(`<strong>${key}:</strong> ${value}`));

}

function battleImages1(superhero) {

    //battle section characters

    const battleImages = superheroes.filter(x => x.name === superhero)[0].images;


    battleImage1 = Object.values(battleImages);
    d3.select(".image1>img").attr("src", battleImage1[1]);
    console.log(battleImage1)
    //battle section characters

}

function battleImages2(superhero) {
    var battleImages2 = superheroes.filter(x => x.name === superhero)[0].images;

    battleImage2 = Object.values(battleImages2);
    d3.select(".image2>img").attr("src", battleImage2[1]);
    console.log(battleImage2)

}