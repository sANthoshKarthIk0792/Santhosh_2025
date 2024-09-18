---
layout: page
title: About!
permalink: /about/
---
<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
        margin: 10px 10px;
    }
    .grid-bulletpoints {
        font-family: monospace;
    }
    .grid-bulletpoints ul{
        font-family: monospace;
    }
    .grid-games {
        display: grid;
        border-style: solid;
        text-align: center;
        margin: 10px 10px;
    }
    .grid-games p {
        font-family: monospace;
    }
    .grid-games img {
        width: 100px;
        height: auto;
        float: left;
    }
    .grid-description {
        display: grid;
        text-align: center;
        margin: 10px 10px;
    }
    .grid-description p {
        font-family: monospace;
        border-style: solid;
    }
    .grid-description img {
        width: 100px;
        height: auto;
        float: left;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
    
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-description" id="grid_description">

</div> 

<div class="grid-container" id="grid_container">

</div>

<div class ="grid-bulletpoints" id ="grid_bulletpoints">

</div>

<div class = "grid-games" id ="grid_games">

</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_description");
    var container_2 = document.getElementById("grid_container"); // This container connects to the HTML div
    var container_3 = document.getElementById("grid_bulletpoints");
    var container_4 = document.getElementById("grid_games");
    
    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var favorite_games = [
        {"cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ8oaq9uAy8FpbAE3IL85Dbo0xhBfauk-ZYw&s", "game": "Minecraft", "description": "Minecraft is a Sandbox game that you can play on and offline"},
        {"cover": "https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg", "game": "TLOK: Tears of the Kingdom", "description": "Tears of the Kingdom is the latest Zelda game, and is an open world game with many side quests and storys"},
        {"cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT4TR8Hbgv3-TWZtWGHE-mFAW5pY0wpaRfpA&s", "game": "Pokemon Violet", "description": "Pokemon Violet is a semi open world pokemon game that I like because it is the frst pokemon game I've ever played"}

    ];
    var where_i_am_from = [
        {"flag": "4/41/Flag_of_India.svg", "greeting": "Hello!", "description": "My parents were born in India, but I was born in the United States"},
        {"flag": "a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg", "greeting": "Hello!", "description": "I was born in the United States in the state of California"},
        {"flag": "1/19/Flag_of_San_Diego%2C_California.svg", "greeting": "Born in Scripps Ranch Hospital", "description": "San Diego is the only city that I have ever lived in"},
        {"flag": "d/d9/Flag_of_Canada_%28Pantone%29.svg", "greeting": "Hi", "description": "I have seen Canada once from Niagra Falls"}
        
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax
    var interests = [ 
        {"image": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/906.png", "alt": "Picture of Sprigatito", "description": "I love pokemon a lot, has to be one of my favorite series. I think that              grass pokemon are the cutest, and my favorite current gen pokemon has to be Sprigattito :D"},
        {"image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353048590i/6334.jpg", "alt": "Cover of Never Let Me Go", "description": "I also enjoy reading books a lot, and while I have primarily read           fantasy books I am trying to read more classics like The Scarlet Letter. I am currently reading Never Let Me Go by Kazuo Ishiguro (sounds Japanese but he is actually British)"}
        ];
    var life_journey = [
        {"bullet": "I first went to school at Kid's Care Club, which was a daycare for before kindergarten"},                                 {"bullet": "My first Elementary school was Monterey Ridge Elementary School"},
        {"bullet": "When I was in second grade, to a different house, so instead I went to Del Sur Elementary"},
        {"bullet": "The middle school I went to was Oak Valley Middle School"},
        {"bullet": "Now I am currently a freshman at Del Norte High School!!!"}
        ];
    for (const location of interests) {
        // Create the div for "grid-description" to create the description of me 
        var my_background = document.createElement("div");
        my_background.className = "grid-description";
        
        // Create the images to better describe myself
        var description_img = document.createElement("img");
        description_img.src = location.image;
        description_img.alt = location.alt;
        
        // Adds the "p" HTML tag for the description of me
        var descriptions = document.createElement("p");
        descriptions.textContent = location.description;

        //Add the 2 elements to container
        my_background.appendChild(description_img);
        my_background.appendChild(descriptions);
        container.appendChild(my_background);
        
    }
    // 3b. Build grid items inside of our container for each row of data
    for (const location of where_i_am_from) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(greeting);
        gridItem.appendChild(img);
        gridItem.appendChild(description);

        // Append the grid item DIV to the container DIV
        container_2.appendChild(gridItem);
    } 
    for (const location of life_journey) {
    var lifeJourney = document.createElement("div");
    lifeJourney.className = "grid-bulletpoints";
    
    var bullets = document.createElement("ul");
    var bulletItem = document.createElement("li");
    bulletItem.textContent = location.bullet;
    bullets.appendChild(bulletItem);
    
    lifeJourney.appendChild(bullets);
    container_3.appendChild(lifeJourney);
    }
    
    for (const location of favorite_games){
    var games = document.createElement("div");
    games.className = "grid-games";

    var game_name = document.createElement("p");
    game_name.textContent = location.game;
    
    var game_image = document.createElement("img");
    game_image.src = location.cover;

    var game_description = document.createElement("p");
    game_description.textContent = location.description;    
    games.appendChild(game_name);
    games.appendChild(game_image);
    games.appendChild(game_description);
    container_4.appendChild(games);
    }
</script>

<a href="https://santhoshkarthik0792.github.io/Santhosh_2025/games/">
  <button> Click this to learn more about what games I like </button>
</a>
