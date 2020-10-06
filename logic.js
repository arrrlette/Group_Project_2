let superheroes;  //let lets us change the value. used for the character selection section

//hit home route first, then run all heroes
//allheroes was responding before the database was populated, 
// so put allheroes route after the home route that transfers the data 
// into db. so allheroes wont run until the home route fully runs
d3.request("http://127.0.0.1:5000/").get(response => {
    d3.request("http://127.0.0.1:5000/allheroes").get(response => {
        const names = JSON.parse(response.response).map(x => x.name)
        // console.log(JSON.parse(response.response));
        // console.log(names);
        superheroes = JSON.parse(response.response) //for building out the superhero, will let us now have to do a d3 request each time
        init(names);
    })
})



function init(names) {

    //---------------------- CHARACTER INIT SECTION--------------------
    //select html for character dropdown
    var dropDown = d3.select('#selDataset');

    // console.log(jsonData);

    //add names to character selection drop down
    names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name);    
<<<<<<< HEAD
    })

    //---------------------- END CHARACTER INIT SECTION--------------------



    // -----------------------BATTLE INIT SECTION--------------------------
=======
    });
    // --------------BATTLE SECTION-----------------------
>>>>>>> 11e2ba49bb5b9799ad5b16c32f35550301e12a21
    //select html for first character dropdown in battle section
    var battleDropdowns = d3.select('#selDataset2');

    //add names to first character dropdown in battle section
    names.forEach((name) => {
        battleDropdowns.append('option').text(name).property('value', name);    
    })


    //select html for second character dropdown in battle section
    var battleDropdowns = d3.select('#selDataset3');

    //add names second character dropdown in battle section
    names.forEach((name) => {
        battleDropdowns.append('option').text(name).property('value', name);    
    })

    // --------------------END BATTLE INIT SECTION-------------------------

    //function to call initial display on html
    genderPie(); //to display gender pie chart on init
<<<<<<< HEAD
    characterChange(names[0]) //to display first character in array on init
    battleChange1(names[0])
    battleChange2(names[0])

=======
    characterChange(names[0]); //to display first character in array on init
    battleChange(names[0]);
    battleChange2(names[0]);
>>>>>>> 11e2ba49bb5b9799ad5b16c32f35550301e12a21
};



//========================Battle section============================


function battleChange1(superhero){

    battleImages1(superhero);
};

function battleChange2(superhero){

    battleImages2(superhero);
};



function battleImages1(superhero){

    const battleImages1 = superheroes.filter(x => x.name === superhero)[0].images

    image1 = Object.values(battleImages1);
    d3.select(".image1>img").attr("src", image1[1]);
    // console.log(image1[1])

}




function battleImages2(superhero){

    const battleImages2 = superheroes.filter(x => x.name === superhero)[0].images

    image2 = Object.values(battleImages2);
    d3.select(".image2>img").attr("src", image2[1]);
    // console.log(image2[1])
}

// JavaScript popup window function
function popup(url) {
    popupWindow = window.open(url,'popUpWindow','height=800,width=1000,left=50,top=50,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        }


//========================End Battle section============================

//========================Dashboard section============================
function genderPie() {
    d3.request("http://127.0.0.1:5000/gender").get(gender => {
        // console.log(JSON.parse(gender.response));
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
        };

        Plotly.newPlot("plot", data, layout);
    })


    d3.request("http://127.0.0.1:5000/hairColor").get(hairColor => {
    //console.log(JSON.parse(hairColor.response));

        var hair_data = JSON.parse(hairColor.response)
        //console.log(hair_data)
        hair_plot = Object.values(hair_data[0])
        //console.log(hair_plot)
        //capture labels for pie chart
        hair_keys = Object.keys(hair_data[0])

        console.log(hair_keys)

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace2 = {
            labels: hair_keys,
            values: hair_plot,
            type: 'pie'
        };

        var data = [trace2];

        var layout = {
            title: "Hair Color",
            showlegend: true,
            legend: {"orientation": "h"}
        };

        Plotly.newPlot("plot2", data, layout);

    })   
    d3.request("http://127.0.0.1:5000/eyeColor").get(eyeColor => {
    //console.log(JSON.parse(eyeColor.response));

        var eye_data = JSON.parse(eyeColor.response)
        //console.log(eye_data)
        eye_plot = Object.values(eye_data[0])
        //console.log(eye_plot)
        //eye color keys for plot
        eye_keys = Object.keys(eye_data[0])

        //plotly code
        // // Part 5 - Working Pie Chart
        var trace3 = {
            labels: eye_keys,
            values: eye_plot,
            type: 'pie'
        };

        var data = [trace3];

        var layout = {
            title: "Eye Color",
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
        // console.log(combat_list)
        // console.log(durability_list)
        // console.log(intelligence_list)
        // console.log(power_list)
        // console.log(speed_list)
        // console.log(strength_list)
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

}
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
        text:stats_values.map(String),
        textposition: 'auto'
        // marker: {
        //     color: markerColor,
        // }
    };
    var data = [trace1];



    var layout = {
        title: "PowerStats",
        xaxis:{
            range: [1,100],
        }
    };
    Plotly.newPlot("powerStats", data, layout);
}


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

<<<<<<< HEAD
=======
}
  
function battleImages1(superhero){

    //battle section characters

    const battleImages = superheroes.filter(x => x.name === superhero)[0].images;
    

    battleImage1 = Object.values(battleImages);
    d3.select(".image1>img").attr("src", battleImage1[1]);
    console.log(battleImage1)
    //battle section characters
    
}

function battleImages2(superhero){
    var battleImages2 = superheroes.filter(x => x.name === superhero)[0].images;

    battleImage2 = Object.values(battleImages2);
    d3.select(".image2>img").attr("src", battleImage2[1]);
    console.log(battleImage2)

>>>>>>> 11e2ba49bb5b9799ad5b16c32f35550301e12a21
}