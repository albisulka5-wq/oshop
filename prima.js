const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const adminOpen = document.getElementById('adminOpen');
const adminClose = document.getElementById('adminClose');
const adminModal = document.getElementById('adminModal');
const adminForm = document.getElementById('adminForm');
const adminStatus = document.getElementById('adminStatus');

function toggleAdminModal(isOpen) {
    adminModal?.classList.toggle('is-visible', isOpen);
    adminModal?.setAttribute('aria-hidden', String(!isOpen));
}

adminOpen?.addEventListener('click', () => toggleAdminModal(true));
adminClose?.addEventListener('click', () => toggleAdminModal(false));
adminModal?.addEventListener('click', (event) => {
    if (event.target === adminModal) toggleAdminModal(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') toggleAdminModal(false);
});

adminForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!adminForm.checkValidity()) {
        adminForm.reportValidity();
        return;
    }

    adminStatus.textContent = 'Hyrja do të lidhet me panelin e administrimit.';
    adminStatus.classList.add('is-success');
});

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        formStatus.textContent = 'Ju lutem plotësoni të gjitha fushat.';
        formStatus.classList.add('is-error');
        contactForm.reportValidity();
        return;
    }

    formStatus.textContent = 'Faleminderit! Mesazhi juaj u dërgua me sukses.';
    formStatus.classList.remove('is-error');
    formStatus.classList.add('is-success');
    contactForm.reset();
});