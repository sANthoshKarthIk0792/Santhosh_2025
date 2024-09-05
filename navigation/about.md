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
    .grid-description {
        display: grid;
        background-color: orange;
        text-align: center;
        border-style: dotted;
        margin: 10px 10px;
    }
    .grid-description p {
        font-family: monospace;
    }
    .grid-description img {
    width: 100px;
    height: 100px;
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

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_description");
    var container_2 = document.getElementById("grid_container"); // This container connects to the HTML div
    
    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var where_i_am_from = [
        {"flag": "4/41/Flag_of_India.svg", "greeting": "Hello!", "description": "My parents were born in India, but I was born in the United States"},
        {"flag": "a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg", "greeting": "Hello!", "description": "I was born in the United States in the state of California"},
        {"flag": "1/19/Flag_of_San_Diego%2C_California.svg", "greeting": "I was born in Scripps Ranch Hospital", "description": "San Diego is the only city that I have ever lived in"},
        {"flag": "d/d9/Flag_of_Canada_%28Pantone%29.svg", "greeting": "Hi", "description": "I have seen Canada once from Niagra Falls"}
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax
    var favorite_color = "My favorite color is orange, specifically a light orange because I don't like dark oranges that much";
    var games_i_like = ["image
    var interests = [ 
        {"image": "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/906.png", "alt": "Picture of Sprigatito", "description": "I love pokemon a lot, has to be one of my favorite series. I think that              grass pokemon are the cutest, and my favorite current gen pokemon has to be Sprigattito :D"},
        {"image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353048590i/6334.jpg", "alt": "Cover of Never Let Me Go", "description": "I also enjoy reading books a lot, and while I have primarily read           fantasy books I am trying to read more classics like The Scarlet Letter. I am currently reading Never Let Me Go by Kazuo Ishiguro (sounds Japanese but he is actually British)"}
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
    
</script>
