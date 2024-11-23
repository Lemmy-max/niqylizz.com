document.addEventListener('DOMContentLoaded', function() {
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
    const contactForm = document.getElementById('contact-form');
    const searchInput = document.querySelector('.search-box input');

    // Admin password
    const ADMIN_PASSWORD = 'Lemmy565';

    // Admin Modal
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            adminModal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            adminModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Admin Login
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            
            if (password === ADMIN_PASSWORD) {
                adminModal.style.display = 'none';
                showAdminDashboard();
            } else {
                alert('Incorrect password!');
            }
        });
    }

    // Show Admin Dashboard
    function showAdminDashboard() {
        const existingDashboard = document.querySelector('.admin-dashboard');
        if (existingDashboard) {
            existingDashboard.remove();
        }

        const dashboard = document.createElement('div');
        dashboard.className = 'admin-dashboard';
        dashboard.style.display = 'block';
        dashboard.innerHTML = `
            <div class="admin-section">
                <h2>Add New Property</h2>
                <form id="property-form" class="upload-form">
                    <input type="text" name="title" placeholder="Property Title" required>
                    <input type="number" name="price" placeholder="Price" required>
                    <textarea name="description" placeholder="Description" required></textarea>
                    <input type="file" name="image" accept="image/*" required>
                    <img class="preview-image" style="display: none;">
                    <button type="submit">Save Property</button>
                </form>
            </div>
            <div class="admin-section">
                <h2>Add New Vehicle</h2>
                <form id="vehicle-form" class="upload-form">
                    <input type="text" name="title" placeholder="Vehicle Title" required>
                    <input type="number" name="price" placeholder="Price" required>
                    <textarea name="description" placeholder="Description" required></textarea>
                    <input type="file" name="image" accept="image/*" required>
                    <img class="preview-image" style="display: none;">
                    <button type="submit">Save Vehicle</button>
                </form>
            </div>
        `;
        
        const footer = document.querySelector('footer');
        if (footer) {
            document.body.insertBefore(dashboard, footer);
        } else {
            document.body.appendChild(dashboard);
        }
        setupFormHandlers();
    }

    // Setup Form Handlers
    function setupFormHandlers() {
        const propertyForm = document.getElementById('property-form');
        const vehicleForm = document.getElementById('vehicle-form');
        
        if (propertyForm) {
            propertyForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const property = {
                    title: formData.get('title'),
                    price: formData.get('price'),
                    description: formData.get('description'),
                    image: URL.createObjectURL(formData.get('image'))
                };
                listings.properties.push(property);
                updateListings();
                this.reset();
                alert('Property added successfully!');
            });
        }
        
        if (vehicleForm) {
            vehicleForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const vehicle = {
                    title: formData.get('title'),
                    price: formData.get('price'),
                    description: formData.get('description'),
                    image: URL.createObjectURL(formData.get('image'))
                };
                listings.vehicles.push(vehicle);
                updateListings();
                this.reset();
                alert('Vehicle added successfully!');
            });
        }
        
        // Handle image previews
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', function(e) {
                const preview = this.parentElement.querySelector('.preview-image');
                const file = this.files[0];
                if (file) {
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = 'block';
                }
            });
        });
    }

    // Update Listings Display
    function updateListings() {
        if (propertiesGrid) {
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
        }
        
        if (vehiclesGrid) {
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
    }

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Initialize search functionality
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = this.value.toLowerCase();
            
            const filteredProperties = listings.properties.filter(property =>
                property.title.toLowerCase().includes(searchTerm) ||
                property.description.toLowerCase().includes(searchTerm)
            );
            
            const filteredVehicles = listings.vehicles.filter(vehicle =>
                vehicle.title.toLowerCase().includes(searchTerm) ||
                vehicle.description.toLowerCase().includes(searchTerm)
            );
            
            if (propertiesGrid) {
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
            }
            
            if (vehiclesGrid) {
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
            }
        });
    }
});
