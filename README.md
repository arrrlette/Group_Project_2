SUPERHERO DATABASE
Have you ever wondered how powerful Superman is? How smart Bruce Banner is? Who would win in a superhero/villain battle? Well now you can know with our mega, ultimate, turbo superhero website. Fight!
Tools: Python, JSON, MongoDB, PyMongo, Javascript, HTML, CSS, and javascript libraries (D3, SweetAlert, LoDash)
Dataset:
Team: Arlette Varela, Nathan Bolt, Alexandra Taft, Anthony English

PROJECT SUMMARY:
For this project, we created a website that displays superhero and villain information from multiple universes. We also created a battle section that allows you to pick between two fighters and see who would win based on their stats.

We accessed the superhero database api listed above and loaded the json data into a mongo database. We created a website utilizing html, javascript, and css and used python and flask to connect the front end to the back end.


WEBSITE AND METHODOLOGY
The website has the following components:
Dashboard: Displays the selected characters alignment, powers, bio, hair color, gender, and other information.
Character Search: Displays stats like power, intelligence, and speed.
Battle Royale: Select two characters to battle to determine a winner.

LANDING PAGE
The website is a one page site with a navigation bar that will navigate the user to each section.

DASHBOARD
The dashboard section displays the selected characters demographic information as well as their primary stats. There are two dropdowns to choose from: appearance and alignment.
When alignment is selected, it will display another dropdown that allows you to view characters based on their primary stat(s). i.e. characters that have 100 in the selected stat.

Methodology: Created routes using flask that hit the mongodb server and pull the chosen characters information. Below are examples of some of the routes built in our app.py:

CHARACTER SEARCH
The character search section allows users to view biographic information of the selected character as well as their power stats (strength, speed, power, intelligence, durability, and combat).

Methodology: Created functions utilizing javascript (instead of py routes) to create the character profile section. The functions filter by character selected and pull the keys and values of the json to populate each section.

BATTLE SECTION
Allows you to select two characters to battle.

Methodology: In this section, the user selects two characters two battle. Javascript functions were created to load the data for each character. When the user clicks "Begin Fight", a function is called to calculate the winner and display the results. The winner is the character whose total sum of stats is greatest.

CONCLUSION:
This project was a lot of fun to build. We were able to successfully build a dynamic dashboard that populates data from a mongo database real-time as well as determine who would win a fight in the superhero universes!