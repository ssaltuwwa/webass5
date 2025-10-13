// Task 1: Form Validation
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous error messages
    clearErrors();
    
    // Validate Full Name
    if (fullName === '') {
        showError('fullName', 'Full name is required');
        isValid = false;
    } else if (fullName.length < 2) {
        showError('fullName', 'Full name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone
    const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
    if (phone === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate Message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        showSuccess('Thank you! Your message has been sent successfully.');
        form.reset();
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.form-custom');
    if (form) {
        form.parentNode.insertBefore(successDiv, form);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Task 2: Accordion for FAQs
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            // Close all other items
            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.classList.remove('show');
                }
            });
            
            document.querySelectorAll('.accordion-icon').forEach(item => {
                if (item !== icon) {
                    item.textContent = '+';
                }
            });
            
            document.querySelectorAll('.accordion-header').forEach(item => {
                if (item !== this) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove('show');
                icon.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add('show');
                icon.textContent = '−';
            }
        });
    });
}

// Task 3: Popup Subscription Form
function initPopupForm() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const popupForm = document.getElementById('popupForm');
    const closeBtn = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');
    
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            popupForm.style.display = 'block';
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closePopup() {
        popupForm.style.display = 'none';
        popupOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePopup();
        }
    });
}

// Task 4: Change Background Color - FIXED VERSION
let currentColorIndex = 0;

function changeBackgroundColor() {
    const colors = [
        '#FFD1DC', '#EAE0C8', '#EFA94A', '#BEBD7F', 
        '#AFDAFC', '#3EB489', '#ECEABE', '#E6E6FA',
        '#B0E0E6', '#FDF4E3', '#BC987E', '#4682B4',
        '#FAF0E6', '#2E8B57', '#536872', '#c3b091'
    ];
    
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const newColor = colors[currentColorIndex];
    
    // Меняем фон у всех основных контейнеров
    document.body.style.backgroundColor = newColor;
    
    // Также меняем фон у основных контейнеров контента
    const containers = document.querySelectorAll('.container, .container-fluid, .main-content, .sidebar, .card, .navbar');
    containers.forEach(container => {
        container.style.backgroundColor = 'transparent';
        container.style.background = 'none';
    });
    
    // Убираем белый фон у карточек для прозрачности
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.backgroundColor = 'rgba(255,255,255,0.9)';
    });
    
    showColorNotification(`Background color changed!`);
}

function resetBackgroundColor() {
    document.body.style.backgroundColor = '';
    
    // Сбрасываем стили контейнеров
    const containers = document.querySelectorAll('.container, .container-fluid, .main-content, .sidebar, .card, .navbar');
    containers.forEach(container => {
        container.style.backgroundColor = '';
        container.style.background = '';
    });
    
    // Возвращаем белый фон карточкам
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.backgroundColor = '';
    });
    
    currentColorIndex = 0;
    showColorNotification('Background reset to original!');
}

function showColorNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.color-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'color-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Task 5: Display Current Date and Time
function updateDateTime() {
    const now = new Date();
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
    };
    
    const formattedDateTime = now.toLocaleDateString('en-US', options);
    
    const datetimeElement = document.getElementById('currentDateTime');
    if (datetimeElement) {
        datetimeElement.textContent = formattedDateTime;
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion
    initAccordion();
    
    // Initialize popup form
    initPopupForm();
    
    // Update date and time immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Add background color changer buttons if not exists - UPDATED
    if (!document.getElementById('colorChangerBtn')) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'color-buttons-container';
        
        const colorBtn = document.createElement('button');
        colorBtn.id = 'colorChangerBtn';
        colorBtn.className = 'btn color-changer-btn';
        colorBtn.innerHTML = '🎨 Change BG Color';
        colorBtn.onclick = changeBackgroundColor;
        
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetColorBtn';
        resetBtn.className = 'btn color-reset-btn';
        resetBtn.innerHTML = '🔄 Reset BG';
        resetBtn.onclick = resetBackgroundColor;
        
        buttonContainer.appendChild(colorBtn);
        buttonContainer.appendChild(resetBtn);
        document.body.appendChild(buttonContainer);
    }
});