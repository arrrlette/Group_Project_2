let superheroes;  //let lets us change the value. used for the character selection section
let cardContainer; //container for cards on website

//declare global variable to be able to call anytime for list of universes
var topuniverseKey = []

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


// create the initial function----------
function init(names) {

    //---------------------- CHARACTER INIT SECTION--------------------
    //select html for character dropdown
    var dropDown = d3.select('#selDataset');

    //add names to character selection drop down
    names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name);
    });

//-----battle portion of init
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
        // --------------------END BATTLE INIT SECTION-------------------------
        battleDropdowns.append('option').text(name).property('value', name);
    });

    //function to call initial display on html
    genderPie(); //to display gender pie chart on init
    characterChange(names[0]) //to display first character in array on init
    battleChange1(names[0])
    battleChange2(names[0])

};

//function to sort values for dashboard pie charts
function sortByValue(hair) {
    var hairArray = [];

    for (const [key, value] of Object.entries(hair)) {
        hairArray.push([key, value])
    }

    sortedArray = hairArray.sort((firstNum, secondNum) => secondNum[1] - firstNum[1]);

    return sortedArray;
}

//function that builds tiles for hero title and pic
function build_list(myTableDiv, statherolist, heropics) {

    for (var i = 0; i < statherolist.length; i++) {

        let col = document.createElement('div');
        col.className = "col-md-2";

        let card = document.createElement('div');
        card.className = 'shdbcard class-5';

        var cardinfo = document.createElement('div')
        cardinfo.className = 'shdbcard-info';

        var title = document.createElement('span');
        title.className = 'shdbcard-title';
        title.innerText = statherolist[i];
        title.style = "font-weight: bold;"

        var cardimg = document.createElement('img')
        cardimg.src = heropics[i];

        cardinfo.appendChild(cardimg)
        cardinfo.appendChild(title)
        card.appendChild(cardinfo)
        col.appendChild(card);

        myTableDiv.appendChild(col);

        console.log(myTableDiv)
    };

};

//========================Dashboard section============================
function genderPie() {

    //clear primary stat specific dropdown and panel
    var appHTML = d3.select("#primarystatpanel");
    //to only show current data called
    appHTML.html("")
    //clear universe specific dropdown and panel
    var appHTML = d3.select("#universepanel");
    //to only show current data called
    appHTML.html("")

    d3.request("http://127.0.0.1:5000/gender").get(gender => {

        var gender_data = JSON.parse(gender.response)


        gender_plot = Object.values(gender_data[0])

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
            title: "<b>Gender</b>",
            showlegend: true,
            legend: { "orientation": "h" },
            autosize: false,
            width: 350,
            height: 550,

            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#66CCFF',
            plot_bgcolor: '#66CCFF'
        };


        Plotly.newPlot("plot", data, layout);

    });

    d3.request("http://127.0.0.1:5000/hairColor").get(hairColor => {

        var hair_data = JSON.parse(hairColor.response)


        //call function to sort hair color values
        sortedhair = sortByValue(hair_data[0]);

        var top_10_hair = sortedhair.slice(0, 10)
        var topHairValue = []
        var topHairKey = []
        top_10_hair.forEach(item => {
            topHairValue.push(item[1])
            topHairKey.push(item[0])
        })

        //plotly code for pie chart
        var trace2 = {
            labels: topHairKey,
            values: topHairValue,
            type: 'pie'
        };

        var data = [trace2];

        var layout = {
            title: "<b>Most Common Hero Hair Color</b>",
            showlegend: true,
            legend: { "orientation": "h" },
            autosize: false,
            width: 350,
            height: 550,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#FFFF00',
            plot_bgcolor: '#FFFF00'
        };

        Plotly.newPlot("plot2", data, layout);
    });

    //Eye Color Query from app.py logic into dictionary and build Pie Chart  
    d3.request("http://127.0.0.1:5000/eyeColor").get(eyeColor => {

        //grab data returned from Mongo query
        var eye_data = JSON.parse(eyeColor.response)
        console.log(eye_data);

        //call function to sort hair color values
        sortedeyes = sortByValue(eye_data[0]);
        console.log(sortedeyes)


        var top_10_eyes = sortedeyes.slice(0, 10)
        var topeyeValue = []
        var topeyeKey = []
        top_10_eyes.forEach(item => {
            topeyeValue.push(item[1])
            topeyeKey.push(item[0])
        })


        //plotly code for eye color pie chart
        var trace3 = {
            labels: topeyeKey,
            values: topeyeValue,
            type: 'pie'
        };

        var data = [trace3];

        var layout = {
            title: "<b>Most Common Hero Eye Color</b>",
            showlegend: true,
            legend: { "orientation": "h" },
            autosize: false,
            width: 350,
            height: 550,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#03F200',
            plot_bgcolor: '#03F200'
        };


        Plotly.newPlot("plot3", data, layout);

    });

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

        durability = stats[1]

        intelligence = stats[2]

        power = stats[3]

        speed = stats[4]

        strength = stats[5]

        if (combat == 100 || combat >= durability && combat >= intelligence &&
            combat >= power && combat >= speed && combat >= strength) {

            combat_count++;
            combat_list.push(hero.name)
            combat_pics.push(image[2])

        } if (durability == 100 || durability >= combat && durability >= intelligence &&
            durability >= power && durability >= speed && durability >= strength) {

            durability_count++;
            durability_list.push(hero.name)
            durability_pics.push(image[2])


        } if (intelligence == 100 || intelligence >= combat && intelligence >= durability &&
            intelligence >= power && intelligence >= speed && intelligence >= strength) {

            intelligence_count++;
            intelligence_list.push(hero.name)
            intelligence_pics.push(image[2])

        } if (power == 100 || power >= combat && power >= durability &&
            power >= intelligence && power >= speed && power >= strength || power == 100) {

            power_count++;
            power_list.push(hero.name)
            power_pics.push(image[2])

        } if (speed == 100 || speed >= combat && speed >= durability &&
            speed >= intelligence && speed >= power && speed >= strength) {

            speed_count++;
            speed_list.push(hero.name)
            speed_pics.push(image[2])

        } if (strength == 100 || strength >= combat && strength >= durability &&
            strength >= intelligence && strength >= power && strength >= speed) {

            strength_count++;
            strength_list.push(hero.name)
            strength_pics.push(image[2])

        };

        //fill alignment values for pie chart
        if (alignment == "g") {

            good_count++;


        } else {
            bad_count++;

        };

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
        title: "<b>Primary Statistic</b>",
        showlegend: true,
        legend: { "orientation": "h" },
        autosize: false,
        width: 350,
        height: 550,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
        paper_bgcolor: '#FFFF00',
        plot_bgcolor: '#FFFF00'
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
        title: "<b>Alignment Chart</b>",
        showlegend: true,
        legend: { "orientation": "h" },
        autosize: false,
        width: 350,
        height: 550,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
        paper_bgcolor: '#03F200',
        plot_bgcolor: '#03F200'
    };

    Plotly.newPlot("plot2", data, layout);

    //Publisher/Universe Query from app.py logic into dictionary and build Pie Chart
    d3.request("http://127.0.0.1:5000/universe").get(universe => {
        var universe_data = JSON.parse(universe.response)

        console.log(universe_data)
        //sort descending

        //call function to sort hair color values
        sorteduniverse = sortByValue(universe_data[0]);
        //console.log(sorteduniverse)


        var top_10_universe = sorteduniverse.slice(0, 10)
        var topuniverseValue = []
        //var topuniverseKey = []
        top_10_universe.forEach(item => {
            topuniverseValue.push(item[1])
            topuniverseKey.push(item[0])
        })

        //plotly code for gender pie chart
        var trace1 = {
            labels: topuniverseKey,
            values: topuniverseValue,
            type: 'pie',
            rotation: 45
        };
        var data = [trace1];
        var layout = {
            title: "<b>Hero Universes</b>",
            showlegend: true,
            legend: { "orientation": "h" },
            width: 350,
            height: 550,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            },
            paper_bgcolor: '#66CCFF',
            plot_bgcolor: '#66CCFF'
        };
        Plotly.newPlot("plot3", data, layout);
    });

    //powerstatlabels
    const alignmentsuperStats = superheroes[0].powerstats;
    powerstat_labels = Object.keys(alignmentsuperStats);

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

    mypanelDiv = document.getElementById("primarystatpanel");
    console.log(mypanelDiv)
    var panel = document.createElement("div");

    panel.innerHTML = '<div class="panel panel-primary">' +
        '<div class="panel-heading">' +
        '<h3 class="panel-title">Heroes/Villains</h3>' + '</div>' +
        '<div id="primarystatlist" class="panel-body">' +
        '<div id="card-container">' + '</div>' +
        '</div>' + '</div>'

    mypanelDiv.appendChild(panel);

    //select html for panel body
    var appHTML = d3.select("#card-container");


    //to only show current data called
    appHTML.html("")

    var myTableDiv = document.getElementById("card-container");

    console.log(myTableDiv)
    //default stat hero list to combat heroes
    build_list(myTableDiv, combat_list, combat_pics);

    mypanelDiv.appendChild(panel);

    //code to grab when a primary stat is selected from the dropdown
    document.addEventListener('input', function (event) {

        // Only run on our select menu
        if (event.target.id !== 'primarystat') return;

        // The selected value
        selected_value = event.target.value
        console.log(selected_value);

        //select html for panel table and clear out
        var tableHTML = d3.select("#card-container");
        console.log(tableHTML)

        //to only show current data called
        tableHTML.html("")

        //switch statement to populate superheroes based on primary stat selected
        switch (selected_value) {
            case "combat":

                //build combat hero panel
                build_list(myTableDiv, combat_list, combat_pics)

                break;

            case "durability":

                //build durability hero panel
                build_list(myTableDiv, durability_list, durability_pics)

                break;

            case "intelligence":

                //build intelligence hero panel
                build_list(myTableDiv, intelligence_list, intelligence_pics)

                break;

            case "power":

                //build power hero panel
                build_list(myTableDiv, power_list, power_pics)

                break;

            case "speed":

                //build speed hero panel
                build_list(myTableDiv, speed_list, speed_pics, speed_pics);

                break;

            case "strength":

                //build strength hero panel
                build_list(myTableDiv, strength_list, strength_pics)

                break;

            default:

                console.log('no stat selected');
        };

    }, false);

};

//display graphs
function displayGraphs(graph) {

    if (graph === "gender") {
        genderPie();
    }

    else if (graph === "alignment") {
        alignmentPie();
    }
};

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
    stats_keys = Object.keys(superStats)
    console.log(stats_keys)
    stats_values = Object.values(superStats)
    console.log(stats_values)

    var trace1 = {
        //labels: '',
        type: 'bar',
        x: stats_values,
        y: stats_keys,
        orientation: 'h',
        text: stats_values.map(String),
        textposition: 'auto',
        marker: {
            color: ['#73BA00', '#F4DD2D', '#EB8828', '#C11724', '#801C50', '#52194F']
        }
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


function dashboardCharImage(superhero) {

    const charImages = superheroes.filter(x => x.name === superhero)[0].images

    image = Object.values(charImages);
    
    d3.select(".charImage>img").attr("src", image[2]);
}

function dashboardApp(superhero) {

    const superApp = superheroes.filter(x => x.name === superhero)[0].appearance;

    //select html
    var appHTML = d3.select("#superApp");

    //to only show current data called
    appHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(superApp).forEach(([key, value]) => appHTML.append("h6").html(`<strong>${_.startCase(key)}:</strong> ${value}`));

}

function biography(superhero) {

    const biography = superheroes.filter(x => x.name === superhero)[0].biography;

    //select html
    var bioHTML = d3.select("#biography");

    //to only show current data called
    bioHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(biography).forEach(([key, value]) => bioHTML.append("h6").html(`<strong>${_.startCase(key)}: </strong> ${value}`));

}

function work(superhero) {

    const work = superheroes.filter(x => x.name === superhero)[0].work;

    //select html
    var workHTML = d3.select("#work");

    //to only show current data called
    workHTML.html("")

    //appends each key and value in the metaData to the html
    Object.entries(work).forEach(([key, value]) => workHTML.append("h6").html(`<strong>${_.startCase(key)}:</strong> ${value}`));

}

//========================Battle section============================


function battleChange1(superhero) {
    battleImages1(superhero);
    battlePowerStats(superhero, "battlePowerStats1");
    // calcStats(superhero);
    player1 = calcStats(superhero);
    console.log(player1)
    player1name = superheroes.filter(x => x.name === superhero)[0].name;
    console.log(player1name)

    image = superheroes.filter(x => x.name === superhero)[0].images;
    imageObject = Object.values(image);
    player1Image = imageObject[1]
    console.log(player1Image)
};

function battleChange2(superhero) {
    battleImages2(superhero);
    battlePowerStats(superhero, "battlePowerStats2");

    // calcStats(superhero);
    player2 = calcStats(superhero);
    console.log(player2)

    player2name = superheroes.filter(x => x.name === superhero)[0].name;
    console.log(player2name)

    image = superheroes.filter(x => x.name === superhero)[0].images;
    imageObject = Object.values(image);
    player2Image = imageObject[1]
    console.log(player2Image)

};

function battleWinner() {

    var winner;
    var winnerPic;

    // image for a tie
    image = superheroes.filter(x => x.name === "Chuck Norris")[0].images;
    imageObject = Object.values(image);
    tieImage = imageObject[1];
    console.log(tieImage);



    if (player1 > player2) {
        winner = `${player1name}`,
        winnerPic = player1Image
    }

    else if (player1 < player2) {
        winner = `${player2name}`,
        winnerPic = player2Image

    }

    else {
        winner = "It's a Tie. Chuck Norris",
        winnerPic = tieImage
    };

    // calling the alert
    return Swal.fire({

        title: `${winner} is the winner!`,
        text: 'Click to battle again',
        
        imageUrl: `${winnerPic}`,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',  
        backdrop: `
            rgba(255,82,71,0.4)
            url(https://tech4mag.com/wp-content/uploads/2020/03/1583577776_253_Want-To-Remove-Background-from-A-GIF-Or-Video-Try-Unscreen.gif)
            bottom left
            no-repeat
            `
    })
};


function battleImages1(superhero) {
    const battleImages1 = superheroes.filter(x => x.name === superhero)[0].images
    image1 = Object.values(battleImages1);
    d3.selectAll(".image1>img").attr("src", image1[1]);
    // console.log(image1[1])
}



function battleImages2(superhero) {
    const battleImages2 = superheroes.filter(x => x.name === superhero)[0].images
    image2 = Object.values(battleImages2);
    d3.selectAll(".image2>img").attr("src", image2[1]);
    // console.log(image2[1])
}


function calcStats(superhero) {
    const superStats = superheroes.filter(x => x.name === superhero)[0].powerstats;
    stats_values = Object.values(superStats)


    //getting sum of numbers
    sumStats = stats_values.reduce(function (a, b) {
        return a + b;
    }, 0); //the 0 is the initial value, i.e. the value to use as the first argument to the first call. we want the sum to start at 0.

    // console.log(sumStats)

    return sumStats;

}

function battlePowerStats(superhero, htmlTag) {
    const superStats = superheroes.filter(x => x.name === superhero)[0].powerstats;

    stats_keys = Object.keys(superStats)
    // console.log(stats_keys)
    stats_values = Object.values(superStats)
    // console.log(stats_values)


    var trace1 = {
        //labels: '',
        type: 'bar',
        x: stats_values,
        y: stats_keys,
        orientation: 'h',
        text: stats_values.map(String),
        textposition: 'auto',
        marker:{
            color: ['#73BA00', '#F4DD2D', '#EB8828', '#C11724', '#801C50', '#52194F']
        }
    };

    var data = [trace1];

    var layout = {
        xaxis: {
            range: [1, 100],
        }
    };

    Plotly.newPlot(htmlTag, data, layout);
}

