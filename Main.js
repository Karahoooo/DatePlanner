let selectedLocation = ''; // Variable to hold the selected location
        let selectedFood = ''; // Variable to hold the selected food
        function sendEmail() {
            const date = document.getElementById('datePicker').value;
            const time = document.getElementById('timePicker').value;
            const locationDisplay = selectedLocation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

            const formData = new FormData();
            formData.append('date', date);
            formData.append('time', time);
            formData.append('location', locationDisplay);
            formData.append('food', selectedFood);

            fetch('send_email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function finishPlanning() {
            if (selectedFood) {
                document.getElementById('foodPicker').style.display = 'none';
                document.getElementById('confirmation').style.display = 'block';
                document.getElementById('foodError').style.display = 'none';
                displayDateDetails();
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

        function selectLocation(location) {
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
                { name: 'Potato Corner', img: 'potato corner.jpg' }
            ];
            break;
        case 'moa':
            foodChoices = [
                { name: 'S&R', img: 'images/sr.jpg' },
                { name: 'Chowfan', img: 'images/chowfan.jpg' },
                { name: 'Chooks to Go', img: 'images/chooks.jpg' },
                { name: 'Vikings', img: 'images/vikings.jpg' }
            ];
            break;
        case 'olivarez':
            foodChoices = [
                { name: 'Shawarma', img: 'images/shawarma_olivarez.jpg' },
                { name: 'Bonchon', img: 'images/bonchon.jpg' },
                { name: 'Potato Corner', img: 'images/potatocorner.jpg' },
                { name: 'Sisig House', img: 'images/sisig.jpg' }
            ];
            break;
        case 'sampaloc_lake':
            foodChoices = [
                { name: 'Qweck Qweck', img: 'images/qweck.jpg' },
                { name: 'Pares', img: 'images/pares.jpg' },
                { name: 'Kwatogs', img: 'images/kwatogs.jpg' },
                { name: 'Lomi House', img: 'images/lomi.jpg' }
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
        foodOption.onclick = () => selectFood(food.name); // Attach click event to select food

        // Use the actual image and alt text
        foodOption.innerHTML = `
            <img src="${food.img}" alt="${food.name}">
            <span>${food.name}</span> <!-- Optional text label for the food -->
        `;
        
        foodOptionsDiv.appendChild(foodOption); // Append food option to the div
    });
}


        function selectFood(food) {
            selectedFood = food;
            document.querySelectorAll('#foodOptions .image-option').forEach(option => {
                option.classList.remove('selected');
            });
            event.currentTarget.classList.add('selected');
        }

        function finishPlanning() {
            if (selectedFood) {
                document.getElementById('foodPicker').style.display = 'none';
                document.getElementById('confirmation').style.display = 'block';
                document.getElementById('foodError').style.display = 'none';
                displayDateDetails();
                sendEmail(); // Call the function to send the email
            } else {
                document.getElementById('foodError').style.display = 'block';
            }
        }

        function displayDateDetails() {
    const date = document.getElementById('datePicker').value;
    const time = document.getElementById('timePicker').value;
    const dateDetails = document.getElementById('dateDetails');
    const locationDisplay = selectedLocation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    dateDetails.innerHTML = `
        We'll go to ${locationDisplay} on ${date} at ${time} and enjoy some delicious ${selectedFood}!
        <br><br>
        I can't wait to see you! ❤️ 
    `;
}
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

function sendEmail() {
    const date = document.getElementById('datePicker').value;
    const time = document.getElementById('timePicker').value;
    const locationDisplay = selectedLocation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    emailjs.send("service_9b7ekyf", "template_cw6z3oh", {
        date: date,
        time: time,
        location: locationDisplay,
        food: selectedFood,
        to_email: "balogochris12@gmail.com"
    }).then(
        function(response) {
            console.log("Email sent successfully", response);
        },
        function(error) {
            console.log("Failed to send email", error);
        }
    );
}
