<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>SuperHero Database</title>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
    <!-- Font Awesome icons (free version)-->
    <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossorigin="anonymous"></script>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet" type="text/css" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/styles.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-md-12 jumbotron text-center"  style="background-image: url('assets/img/battle1.jpg');">
                <h1 style="color: white;">SuperHero Database</h1>
                <p style="color: white;">Thank you for visiting!</p>
            </div>
        </div>
    </div>

    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <h4>Superhero Database</h4>
                <strong>Have you ever wondered how powerful Superman is? How smart Bruce Banner is? Who would win in a superhero/villain battle? Well now you can know with our mega, ultimate, turbo superhero website. Fight!</strong><br>
                <!-- Dataset: <a href="https://akabab.github.io/superhero-api/api/" target="_blank">https://akabob.github.io/superhero-api/api/</a><br> -->
                Tools: Python, JSON, MongoDB, PyMongo, Javascript, HTML, CSS, and javascript libraries (D3, SweetAlert, LoDash)<br>
                Dataset:<br>
                Team: Arlette Varela, Nathan Bolt, Alexandra Taft, Anthony English
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h4>Project Summary:</h4></p>
                <p>
                    For this project, we created a website that displays superhero and villain information from multiple universes. We also created a battle section that allows you to pick between two fighters and see who would win based on their stats. <br>
                    <br>
                    We accessed the superhero database api listed above and loaded the json data into a mongo database. We created a website utilizing html, javascript, and css and used python and flask to connect the front end to the back end.
                    
                </p>
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h4>Website and Methodology</h4></p>
                <p> 
                The website has the following components:<br>
                Dashboard: Displays the selected characters alignment, powers, bio, hair color, gender, and other information.<br>
                Character Search: Displays stats like power, intelligence, and speed.<br>
                Battle Royale: Select two characters to battle to determine a winner. 
                </p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h5>Landing Page</h5></p>
                The website is a one page site with a navigation bar that will navigate the user to each section.
            </div>
        </div>

        <div class="row">
            <div class="col-md-2 col-sm-12" style="padding-left:0"></div>
            <div class="col-md-6 col-sm-12" style="padding-left:0">
                <img class="zoom" src="assets/img/superhero_db/landing_page.jpg" style="width:100%" alt="genderpieroute">
            </div>
        </div>

        <br><br>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h5>Dashboard</h5></p>
                The dashboard section displays the selected characters demographic information as well as their primary stats. There are two dropdowns to choose from: appearance and alignment.
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 col-sm-12" style="padding-left:0">
                <img class="zoom" src="assets/img/superhero_db/dashboard_alignment.jpg" style="width:100%" alt="alignment">
            </div>
            <div class="col-md-6 col-sm-12" style="padding-left:0">
                <img class="zoom" src="assets/img/superhero_db/dashboard_appearance.jpg" style="width:100%" alt="appearance">
            </div>
        </div>

        <br>

        <div class="row">      
            <p>When alignment is selected, it will display another dropdown that allows you to view characters based on their primary stat(s). i.e. characters that have 100 in the selected stat.</p><br>
            <div class="col-md-2 col-sm-12"></div>
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/dashboard_alignment_primary_stat.jpg" style="width:100%" alt="genderpieroute">
            </div>
        </div>

        <br><br>

        <div class="row">      
            <p>Methodology: Created routes using flask that hit the mongodb server and pull the chosen characters information. Below are examples of some of the routes built in our app.py:</p><br>
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/genderPie.jpg" style="width:61%" alt="genderpieroute">
            </div>
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/universepie.jpg" style="width:65%" alt="genderpieroute">
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h5>Character Search</h5></p>
                The character search section allows users to view biographic information of the selected character as well as their power stats (strength, speed, power, intelligence, durability, and combat).
            </div>
        </div>

        <br><br>

        <div class="row">
            <div class="col-md-2 col-sm-12"></div>      
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/character_profile.jpg" style="width:100%" alt="character_profile">
            </div>
        </div>

        <br>

        <div class="row">      
            <p>Methodology: Created functions utilizing javascript (instead of py routes) to create the character profile section. The functions filter by character selected and pull the keys and values of the json to populate each section. </p><br>

        </div>

        <div class="row">
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/dashboard_powerstats.jpg" style="width:80%" alt="dashboard_powerstats">
            </div>
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/dashboard_functions.jpg" style="width:88%" alt="dashboard_functions">
            </div>
        </div>


        <br>

        <div class="row">
            <div class="col-md-12 col-sm-12" style="padding-left:0">
                <p><h5>Battle Section</h5></p>
                
            </div>
        </div>

        <br><br>

        <div class="row">
            <div class="col-md-6 col-sm-12">
                Choose your characters:
                <img class="zoom" src="assets/img/superhero_db/battle.jpg" style="width:100%" alt="battle">
            </div>
            <div class="col-md-6 col-sm-12">
                Results:
                <img class="zoom" src="assets/img/superhero_db/battle_results.jpg" style="width:100%" alt="balle_results">
            </div>
        </div>

        <br>

        <div class="row">      
            <p>Methodology: In this section, the user selects two characters two battle. Javascript functions were created to load the data for each character. When the user clicks "Begin Fight", a function is called to calculate the winner and display the results. The winner is the character whose total sum of stats is greatest.</p><br>
        </div>

        <div class="row">
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/battle_change.jpg" style="width:80%" alt="battle_change">
            </div>
            <div class="col-md-6 col-sm-12">
                <img class="zoom" src="assets/img/superhero_db/battle_winner.jpg" style="width:100%" alt="battle_winner">
            </div>
        </div>

        <br>

        <div class="row">
            <h4>Conclusion:</h4>
        </div>

        <br>

        <div class = "row">
            <p>
                This project was a lot of fun to build. We were able to successfully build a dynamic dashboard that populates data from a mongo database real-time as well as determine who would win a fight in the superhero universes!
            </p>

        </div>


    </div>
    






</body>
