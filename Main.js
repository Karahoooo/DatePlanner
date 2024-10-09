let selectedLocation = ''; // Variable to hold the selected location
let selectedFood = ''; // Variable to hold the selected food

// Initialize EmailJS
(function() {
    emailjs.init("u-NlPL8eGnMsD1TvY"); // Replace with your actual EmailJS user ID
})();

function sendEmail() {
    const date = document.getElementById('datePicker').value;
    const time = formatTime(document.getElementById('timePicker').value); // Format the time
    const locationDisplay = selectedLocation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    // Send the email using EmailJS
    emailjs.send("service_9b7ekyf", "template_cw6z3oh", {
        date: date,
        time: time,
        location: locationDisplay,
        food: selectedFood,
        to_email: "balogochris12@gmail.com" // Your email address
    }).then(
        function(response) {
            console.log("Email sent successfully", response);
        },
        function(error) {
            console.log("Failed to send email", error);
        }
    );
}

function finishPlanning() {
    if (selectedFood) {
        document.getElementById('foodPicker').style.display = 'none';
        document.getElementById('confirmation').style.display = 'block';
        document.getElementById('foodError').style.display = 'none';
        displayDateDetails();
        sendEmail(); // Call the function to send the email after planning is finished
    } else {
        document.getElementById('foodError').style.display = 'block';
    }
}

function showDateTimePicker() {
    document.getElementById('proposal').style.display = 'none'; // Hide the proposal
    document.getElementById('dateTimePicker').style.display = 'block'; // Show date/time picker
}

function showRejection() {
    document.querySelector('.container').innerHTML = "<h1>Maybe next time... 😢</h1>"; // Display rejection message
}

function showLocationPicker() {
    const date = document.getElementById('datePicker').value; // Get selected date
    const time = document.getElementById('timePicker').value; // Get selected time
    if (date && time) { // Check if both date and time are selected
        document.getElementById('dateTimePicker').style.display = 'none'; // Hide date/time picker
        document.getElementById('locationPicker').style.display = 'block'; // Show location picker
        document.getElementById('dateTimeError').style.display = 'none'; // Hide error message
    } else {
        document.getElementById('dateTimeError').style.display = 'block'; // Show error message if not selected
    }
}

function selectLocation(location, event) {
    selectedLocation = location; // Store the selected location
    document.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected'); // Remove selected class from all options
    });
    event.currentTarget.classList.add('selected'); // Add selected class to the clicked option
}

function showFoodPicker() {
    if (selectedLocation) { // Check if a location has been selected
        document.getElementById('locationPicker').style.display = 'none'; // Hide location picker
        document.getElementById('foodPicker').style.display = 'block'; // Show food picker
        document.getElementById('locationError').style.display = 'none'; // Hide error message
        populateFoodOptions(); // Populate food options based on location
    } else {
        document.getElementById('locationError').style.display = 'block'; // Show error message if no location is selected
    }
}

function populateFoodOptions() {
    const foodOptionsDiv = document.getElementById('foodOptions');
    foodOptionsDiv.innerHTML = ''; // Clear previous options
    let foodChoices = [];

    // Define food options based on selected location
    switch (selectedLocation) {
        case 'sm_calamba':
            foodChoices = [
                { name: 'MC Ala King', img: 'chickenalaking.jpeg' },
                { name: 'Burger Steak', img: 'burger steak.jpg' },
                { name: 'Chicken Joy', img: 'chickenjoy.jpeg' },
                { name: 'Chicken Inasal', img: 'inasal.jpg' },
                { name: 'Shawarma', img: 'shawarma.jpg' },
                { name: 'Shawarma Rice', img: 'shawarmarice.jpeg' }, 
                { name: 'Chaofan', img: 'chaofan.jpg' },
                { name: 'Sweet & Sour Chicken',  img: 'Sweet and Sour chicken.jpg'}, 
                { name: 'Potato Corner', img: 'potato corner.jpg' }
            ];
            break;
        case 'moa':
            foodChoices = [
                { name: 'Kuro Ramen', img: 'kuroramen.jpg' },
                { name: 'Shiro Ramen', img: 'shiroramen.jpg' },
                { name: 'Ramen Tonkatsu Set', img: 'tonkatsuset.jpg' },
                { name: 'Ramen Gyoza Set', img: 'gyozaset.jpg' }, 
                { name: 'Ramen Teriyaki Pork Don Set', img: 'tereyakiporkdonset.jpg' },
                { name: 'Chickenjoy', img: 'chickenjoy.jpeg' },
                { name: 'Burger Steak', img: 'burger steak.jpg' },
                { name: 'Mc Ala King', img: 'chickenalaking.jpeg' },
                { name: 'Original Recipe Chicken', img: 'originalchicken.jpg' }
            ];
            break;
        case 'olivarez':
            foodChoices = [
                { name: 'Shawarma', img: 'shawarma.jpg' },
                { name: 'Bibimbowl', img: 'bibimbowl.jpg' },
                { name: 'Potato Corner', img: 'potato corner.jpg' },
                { name: 'Takoyaki', img: 'takoyaki.jpg' }, 
                { name: 'Pork Sisig', img: 'porksisig.jpg' },
                { name: 'Kreamy Kangkong', img: 'kreamykangkong.jpg' },
                { name: 'Beef & mushroom', img: 'beef&mushroom.jpg' },
                { name: 'Beef Bulgogi', img: 'bulgogi.jpg' },
                { name: 'Beef Yangnyeom', img: 'yangnyeom.jpg' }
            ];
            break;
        case 'sampaloc_lake':
            foodChoices = [
                { name: 'Beef Tapa', img: 'beeftapa.jpg' },
                { name: 'Pares', img: 'pares.jpg' },
                { name: 'Classic Burger', img: 'classicburger.jpg' },
                { name: 'Burger Steak', img: 'burgersteak.jpg' }, 
                { name: 'Fish & Fries', img: 'fish&fries.jpg' },
                { name: 'Spud Platter', img: 'spudplatter.jpg' },
                { name: 'Burgroup Steak', img: 'burgroupsteak.jpg' },
                { name: 'Beef Taco Garlic Mushroom Fries', img: 'beeftaco.jpg' },
                { name: 'Chicken Tempura', img: 'chickentempura.jpg' },
            ];
            break;
        default:
            console.warn('Unknown location:', selectedLocation);
            return; // Exit function if location is not recognized
    }

    // Create food option elements
    foodChoices.forEach(food => {
        const foodOption = document.createElement('div');
        foodOption.className = 'image-option';
        foodOption.onclick = (event) => selectFood(food.name, event); // Pass the event parameter to selectFood

        // Use the actual image and alt text
        foodOption.innerHTML = `
            <img src="${food.img}" alt="${food.name}">
            <span>${food.name}</span> <!-- Optional text label for the food -->
        `;
        
        foodOptionsDiv.appendChild(foodOption); // Append food option to the div
    });
}

function selectFood(food, event) {
    selectedFood = food;
    document.querySelectorAll('#foodOptions .image-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

function displayDateDetails() {
    const date = document.getElementById('datePicker').value;
    const time = formatTime(document.getElementById('timePicker').value); // Format the time
    const dateDetails = document.getElementById('dateDetails');
    const locationDisplay = selectedLocation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    dateDetails.innerHTML = `
        We'll go to ${locationDisplay} on ${date} at ${time} and enjoy some delicious ${selectedFood}!
        <br><br>
        I can't wait to see you! ❤️ 
    `;
}

// Function to format time to 12-hour format
function formatTime(time) {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}

// Heart animation
const heartContainer = document.querySelector('.heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Randomize the position and animation duration
    const randomLeft = Math.random() * 100; // Percentage
    const randomDuration = Math.random() * 3 + 2; // Between 2s and 5s

    heart.style.left = `${randomLeft}vw`;
    heart.style.animation = `float ${randomDuration}s linear forwards`;

    heartContainer.appendChild(heart);

    // Remove the heart after the animation ends
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Create hearts at intervals
setInterval(createHeart, 500); // Adjust the interval for more/less frequency
