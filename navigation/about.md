---
layout: page
title: About
permalink: /about/
---
<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    const container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    const http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    const living_in_the_world = [
        {flag: "0/01/Flag_of_California.svg", greeting: "Hey", description: "California - forever"},
        {flag: "b/b9/Flag_of_Oregon.svg", greeting: "Hi", description: "Oregon - 9 years"},
        {flag: "b/be/Flag_of_England.svg", greeting: "Alright mate", description: "England - 2 years"},
        {flag: "e/ef/Flag_of_Hawaii.svg", greeting: "Aloha", description: "Hawaii - 2 years"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    living_in_the_world.forEach(location => {
        // Create a "div" with "class grid-item" for each row
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements

        // Add "img" HTML tag for the flag
        const img = document.createElement("img");
        img.src = `${http_source}${location.flag}`; // concatenate the source and flag
        img.alt = `${location.flag} Flag`; // add alt text for accessibility

        // Add "p" HTML tag for the description
        const description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        const greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    });
</script>
