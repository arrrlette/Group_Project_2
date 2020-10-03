
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

        //plotly code for gender pie chart

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


    // d3.request("http://127.0.0.1:5000/hairColor").get(hairColor => {
    //     // console.log(JSON.parse(gender.response));
    //     var hair_data = JSON.parse(hairColor.response)
    //     console.log(hair_data)
    //     hair_plot = Object.values(hair_data[0])
    //     console.log(hair_plot)

    //     //plotly code
    //     // // Part 5 - Working Pie Chart
    //     var trace1 = {
    //         //labels: '',
    //         values: hair_plot,
    //         type: 'pie'
    //     };

    //     var data = [trace1];

    //     var layout = {
    //         title: "Hair Chart",
    //     };

    //     Plotly.newPlot("plot", data, layout);
    // })





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


        console.log(stats)
        //console.log(combat)
        console.log(alignment_value)

        //fill alignment values for pie chart
        if (alignment == "g") {

            good_count++;

        } else {

}



function displayGraphs(graph) {

    if (graph === "gender") {
        genderPie();
    }

    else if (graph === "alignment") {
        alignmentPie();
    }
}


            bad_count++;

        }

    });

    //console logs for primary stat data
    console.log(combat_count + "," + durability_count + "," + intelligence_count + "," +
        power_count + "," + speed_count + "," + strength_count)
    console.log(combat_list)
    console.log(durability_list)
    console.log(intelligence_list)
    console.log(power_list)
    console.log(speed_list)
    console.log(strength_list)
    console.log(combat_pics)
    console.log(strength_pics)
    console.log(good_count + "," + bad_count)

    //pie chart for primary stats
    var trace1 = {
        labels: ["Combat", "Durability", "Intelligence", "Power",
            "Speed", "Strength"],
        values: [combat_count, durability_count, intelligence_count, power_count, speed_count, strength_count],
        type: 'pie'
    };


//=========================Character section============================
function characterChange(superhero) {


    console.log(superhero)
    dashboardPowerStats(superhero)
    //add rest of functions for each section here
};


    var layout = {
        title: "Primary Statistic",
    };

    Plotly.newPlot("plot", data, layout);

    //code for alignment pie chart
    // d3.request("http://127.0.0.1:5000/alignment").get(alignment => {
    //     //console.log(JSON.parse(alignment.response));
    //     var alignment_data = JSON.parse(alignment.response)
    //     console.log(gender_data)
    //     alignment_plot = Object.values(alignment_data[0])
    //     console.log(gender_plot)



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





};


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
=======
function dashboardPowerStats(superhero) {
    const hero = superheroes.filter(x => x.name === superhero)[0].powerstats;
    console.log(hero)
}

//=======================End Character section==========================

