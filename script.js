// Store listings data
let listings = {
    properties: [],
    vehicles: []
};

// DOM Elements
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('admin-modal');
const closeBtn = document.querySelector('.close');
const adminLoginForm = document.getElementById('admin-login-form');
const propertiesGrid = document.getElementById('properties-grid');
const vehiclesGrid = document.getElementById('vehicles-grid');

// Admin password
const ADMIN_PASSWORD = 'Lemmy565';

// Admin Modal
adminBtn.onclick = () => adminModal.style.display = 'block';
closeBtn.onclick = () => adminModal.style.display = 'none';
window.onclick = (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
    }
};

// Admin Login
adminLoginForm.onsubmit = (e) => {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === ADMIN_PASSWORD) {
        adminModal.style.display = 'none';
        showAdminDashboard();
    } else {
        alert('Incorrect password!');
    }
};

// Show Admin Dashboard
function showAdminDashboard() {
    // Create and append admin dashboard
    const dashboard = document.createElement('div');
    dashboard.className = 'admin-dashboard';
    dashboard.innerHTML = `
        <div class="admin-section">
            <h2>Add New Property</h2>
            <form id="property-form" class="upload-form">
                <input type="text" placeholder="Property Title" required>
                <input type="number" placeholder="Price" required>
                <textarea placeholder="Description" required></textarea>
                <input type="file" accept="image/*" required>
                <img class="preview-image" style="display: none;">
                <button type="submit">Save Property</button>
            </form>
        </div>
        <div class="admin-section">
            <h2>Add New Vehicle</h2>
            <form id="vehicle-form" class="upload-form">
                <input type="text" placeholder="Vehicle Title" required>
                <input type="number" placeholder="Price" required>
                <textarea placeholder="Description" required></textarea>
                <input type="file" accept="image/*" required>
                <img class="preview-image" style="display: none;">
                <button type="submit">Save Vehicle</button>
            </form>
        </div>
    `;
    
    document.body.insertBefore(dashboard, document.querySelector('footer'));
    setupFormHandlers();
}

// Setup Form Handlers
function setupFormHandlers() {
    const propertyForm = document.getElementById('property-form');
    const vehicleForm = document.getElementById('vehicle-form');
    
    // Handle property form
    propertyForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(propertyForm);
        const property = {
            title: formData.get('Property Title'),
            price: formData.get('Price'),
            description: formData.get('Description'),
            image: URL.createObjectURL(formData.get('image'))
        };
        listings.properties.push(property);
        updateListings();
        propertyForm.reset();
    };
    
    // Handle vehicle form
    vehicleForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(vehicleForm);
        const vehicle = {
            title: formData.get('Vehicle Title'),
            price: formData.get('Price'),
            description: formData.get('Description'),
            image: URL.createObjectURL(formData.get('image'))
        };
        listings.vehicles.push(vehicle);
        updateListings();
        vehicleForm.reset();
    };
    
    // Handle image previews
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.onchange = (e) => {
            const preview = e.target.parentElement.querySelector('.preview-image');
            const file = e.target.files[0];
            if (file) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
            }
        };
    });
}

// Update Listings Display
function updateListings() {
    // Update properties
    propertiesGrid.innerHTML = listings.properties.map(property => `
        <div class="listing-card">
            <img src="${property.image}" alt="${property.title}" class="listing-image">
            <div class="listing-details">
                <h3>${property.title}</h3>
                <p class="listing-price">$${property.price}</p>
                <p>${property.description}</p>
            </div>
        </div>
    `).join('');
    
    // Update vehicles
    vehiclesGrid.innerHTML = listings.vehicles.map(vehicle => `
        <div class="listing-card">
            <img src="${vehicle.image}" alt="${vehicle.title}" class="listing-image">
            <div class="listing-details">
                <h3>${vehicle.title}</h3>
                <p class="listing-price">$${vehicle.price}</p>
                <p>${vehicle.description}</p>
            </div>
        </div>
    `).join('');
}

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.onsubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
};

// Initialize search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.onkeyup = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Filter properties
    const filteredProperties = listings.properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm)
    );
    
    // Filter vehicles
    const filteredVehicles = listings.vehicles.filter(vehicle =>
        vehicle.title.toLowerCase().includes(searchTerm) ||
        vehicle.description.toLowerCase().includes(searchTerm)
    );
    
    // Update display with filtered results
    propertiesGrid.innerHTML = filteredProperties.map(property => `
        <div class="listing-card">
            <img src="${property.image}" alt="${property.title}" class="listing-image">
            <div class="listing-details">
                <h3>${property.title}</h3>
                <p class="listing-price">$${property.price}</p>
                <p>${property.description}</p>
            </div>
        </div>
    `).join('');
    
    vehiclesGrid.innerHTML = filteredVehicles.map(vehicle => `
        <div class="listing-card">
            <img src="${vehicle.image}" alt="${vehicle.title}" class="listing-image">
            <div class="listing-details">
                <h3>${vehicle.title}</h3>
                <p class="listing-price">$${vehicle.price}</p>
                <p>${vehicle.description}</p>
            </div>
        </div>
    `).join('');
};
