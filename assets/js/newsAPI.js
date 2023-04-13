// // Replace API_KEY with your News API key
// const apiKey = "748b841297bc487b9bf6c0bfeb1ba1dd";

// // Replace COUNTRY_CODE with the country code you want to get news from
// const countryCode = "us";

// // Replace CATEGORY with the news category you want to get news from
// const category = "technology";

// // Replace PAGE_SIZE with the number of articles you want to retrieve
// const pageSize = "20";


// const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}&pageSize=20&language=en&sortBy=publishedAt`;

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // Do something with the data here
//     })
//     .catch(error => {
//         console.log(error);
//     });


const apiKey = "748b841297bc487b9bf6c0bfeb1ba1dd";
const countryCode = "us";
const category = "technology";
const keywords = "alternative fuel";
// vehicles, cars, automobiles, fuel, gasoline, diesel, electric vehicles, EVs, hybrid vehicles,
const pageSize = "20";
const images = ["/assets/img/news1.jpg", "/assets/img/news2.jpg", "/assets/img/news3.jpg", "/assets/img/news4.jpg", "/assets/img/news5.jpg",
    "/assets/img/news6.jpg", "/assets/img/news7.jpg", "/assets/img/news9.jpg", "/assets/img/news10.jpg"]; //hard coding images because the article.urlToImage is paid

// const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}&pageSize=20&language=en&sortBy=publishedAt`;
const url = `https://newsapi.org/v2/everything?q=${keywords}&pageSize=${pageSize}&apiKey=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        const newsContainer = document.getElementById("news-container");

        // Loop through the articles and create a new element for each one
        data.articles.forEach(article => {
            const articleElement = document.createElement("div");

            const titleElement = document.createElement("h2");
            titleElement.textContent = article.title;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = article.description;
            console.log(article.description)

            const imageElement = document.createElement("img");
            // imageElement.src = article.urlToImage; this doesn't return anything because the NewsAPI is free for now
            const randomIndex = Math.floor(Math.random() * images.length);
            imageElement.src = images[randomIndex];
            imageElement.classList.add("news-image"); //to add the style which will make them equal

            const contentElement = document.createElement("p");
            contentElement.textContent = article.content;

            // Extract the first 7 sentences of the article   --- doesn't work because current version is free
            const firstSevenSentences = article.content;

            const previewElement = document.createElement("p");
            previewElement.textContent = `${firstSevenSentences}...`;

            const linkElement = document.createElement("a");
            linkElement.href = article.url;
            linkElement.target = '_blank'
            linkElement.textContent = "Read more";
            linkElement.classList.add('green-blink')

            // Apply black color to the paragraphs
            titleElement.style.color = "black";
            descriptionElement.style.color = "black";
            previewElement.style.color = "black";


            // Add the elements to the article container
            articleElement.appendChild(titleElement);
            articleElement.appendChild(descriptionElement);
            articleElement.appendChild(imageElement);
            articleElement.appendChild(previewElement);
            articleElement.appendChild(linkElement);

            // Add the article container to the news container
            newsContainer.appendChild(articleElement);
        });
    })
    .catch(error => {
        console.log(error);
    });