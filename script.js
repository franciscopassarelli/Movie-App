const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=es';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=es&query="';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const navLinks = document.querySelectorAll('.nav-link');
const contactSection = document.getElementById('contact');
const helpModal = document.getElementById('help-modal');
const closeModalBtn = document.querySelector('.close-btn');
const helpText = document.getElementById('help-text');
const nextBtn = document.getElementById('next-btn');




// Get initial movies
getMovies(API_URL);

// Function to fetch movies
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

// Function to display movies
function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// Function to determine class based on rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});

// Event listeners for navigation links
document.getElementById('home-link').addEventListener('click', () => {
    main.classList.remove('hidden');
    contactSection.classList.add('hidden');
    helpModal.classList.add('hidden');
    getMovies(API_URL);
});

document.getElementById('contact-link').addEventListener('click', () => {
    main.classList.add('hidden');
    contactSection.classList.remove('hidden');
    helpModal.classList.add('hidden');
});

document.getElementById('help-link').addEventListener('click', () => {
    helpModal.classList.remove('hidden');
    currentIndex = 0; // Reset index when opening help modal
    helpText.textContent = helpContent[currentIndex];
});

closeModalBtn.addEventListener('click', () => {
    helpModal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === helpModal) {
        helpModal.classList.add('hidden');
    }
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active'); // Cambia el estado activo del botón
});










const helpContent = [
    "¿Qué es Movie App - Francisco? Movie App - Francisco es una aplicación diseñada para todos los amantes del cine. Nuestra plataforma ofrece una manera fácil y accesible de descubrir, explorar y disfrutar de una vasta colección de películas de diversos géneros y épocas.",
    "Funcionalidades Principales: Búsqueda y Exploración. Encuentra películas por título, género, director o año de lanzamiento, nuestra potente herramienta de búsqueda te ayudará a localizar rápidamente cualquier película que desees ver.",
    "¿Cómo usar Movie App - Francisco? 1. Registro y Configuración de la Cuenta: Crea una cuenta en Movie App - Francisco proporcionando tu información básica. Una vez registrado, puedes configurar tus preferencias de usuario.",
    "2. Explorar y Buscar Películas: Utiliza la barra de búsqueda para encontrar películas específicas o navega por nuestras categorías y listas destacadas.",
    "3. Ver Películas: Algunas películas pueden estar disponibles para ver directamente en la plataforma, mientras que otras pueden estar vinculadas a servicios de streaming externos.",
    "Si tienes alguna pregunta o necesitas asistencia, no dudes en contactar a nuestro equipo de soporte a través del formulario de contacto disponible en la plataforma."
];

let currentIndex = 0;

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < helpContent.length) {
        helpText.textContent = helpContent[currentIndex];
    } else {
        Swal.fire({
            icon: 'info',
            title: '¡Gracias!',
            text: '¡Gracias por ver nuestra sección de ayuda! ¡Disfruta de tu tiempo en Movie App - Francisco y feliz visualización!',
        }).then(() => {
            helpModal.classList.add('hidden');
            currentIndex = 0; // Reset index when closing modal
        });
    }
});

closeModalBtn.addEventListener('click', () => {
    helpModal.classList.add('hidden');
    currentIndex = 0; // Reset index when closing modal
});

window.addEventListener('click', (event) => {
    if (event.target === helpModal) {
        helpModal.classList.add('hidden');
        currentIndex = 0; // Reset index when closing modal
    }
});







/*form*/

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    // Verificar que todos los campos estén llenos
    if (name === "" || email === "" || message === "") {
        // Resaltar los campos vacíos
        if (name === "") {
            document.getElementById("name").classList.add("invalid");
        } else {
            document.getElementById("name").classList.remove("invalid");
        }

        if (email === "") {
            document.getElementById("email").classList.add("invalid");
        } else {
            document.getElementById("email").classList.remove("invalid");
        }

        if (message === "") {
            document.getElementById("message").classList.add("invalid");
        } else {
            document.getElementById("message").classList.remove("invalid");
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos.',
        });
    } else {
        // Mostrar la alerta personalizada
        Swal.fire({
            icon: 'success',
            title: '¡Gracias!',
            text: 'Hola ' + name + '! Gracias por enviarnos un mensaje. Cuando tengamos información, te enviaremos un mensaje a tu correo ' + email + ' para avisarte sobre tu sugerencia. ¡Saludos!',
        });

        // Limpiar el formulario
        document.getElementById("contactForm").reset();

        // Eliminar las clases de error si los campos se llenaron correctamente
        document.getElementById("name").classList.remove("invalid");
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("message").classList.remove("invalid");
    }
});



setTimeout(() => {
    Swal.fire({
        title: '¿Qué te pareció la página?',
        html: `
            <div class="star-rating">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
            </div>
            <textarea id="feedback" class="swal2-textarea" placeholder="Deja tus comentarios aquí..."></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        preConfirm: () => {
            const rating = document.querySelector('.star.selected') ? document.querySelector('.star.selected').dataset.value : null;
            const feedback = document.getElementById('feedback').value;

            if (!rating) {
                Swal.showValidationMessage('Por favor, selecciona una calificación');
                return false;
            }

            return {
                rating: rating,
                feedback: feedback
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Calificación:', result.value.rating);
            console.log('Comentarios:', result.value.feedback);
            Swal.fire('¡Gracias!', 'Tu calificación ha sido enviada.', 'success');
        }
    });

    // Manejo de la selección de estrellas
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });
    });
}, 60000);