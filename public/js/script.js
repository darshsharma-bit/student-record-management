/**
 * Student Record Management System - Client-side JavaScript
 * Demonstrates: DOM manipulation, Event Handling, and Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DOM Element References
  // =========================================================================
  const studentForm = document.getElementById('studentForm');
  const studentIdInput = document.getElementById('studentId');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const courseInput = document.getElementById('course');

  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const cancelBtn = document.getElementById('cancelBtn');
  const validationAlert = document.getElementById('validationAlert');

  const editButtons = document.querySelectorAll('.btn-edit');
  const deleteForms = document.querySelectorAll('.delete-form');

  // =========================================================================
  // 2. Helper Functions
  // =========================================================================

  /**
   * Display an error alert banner on the form
   * @param {string} message - Validation message to display
   */
  function showError(message) {
    validationAlert.textContent = message;
    validationAlert.style.display = 'block';
  }

  /**
   * Hide the error alert banner
   */
  function clearError() {
    validationAlert.textContent = '';
    validationAlert.style.display = 'none';
    [nameInput, emailInput, courseInput].forEach(input => input.classList.remove('is-invalid'));
  }

  /**
   * Reset the form back to "Add Student" mode
   */
  function resetFormToAddMode() {
    studentForm.reset();
    studentForm.action = '/students/add';
    studentIdInput.value = '';

    formTitle.textContent = 'Add New Student';
    formSubtitle.textContent = 'Enter student details to save them in MongoDB.';
    submitBtnText.textContent = 'Add Student';
    cancelBtn.style.display = 'none';

    clearError();
  }

  // =========================================================================
  // 3. Edit Student Interaction (DOM Manipulation)
  // =========================================================================
  // When an Edit button is clicked in the table, populate the form with that student's data
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Read data attributes from the clicked button
      const id = button.getAttribute('data-id');
      const name = button.getAttribute('data-name');
      const email = button.getAttribute('data-email');
      const course = button.getAttribute('data-course');

      // Populate input values
      studentIdInput.value = id;
      nameInput.value = name;
      emailInput.value = email;
      courseInput.value = course;

      // Update form action and UI labels for EDIT mode
      studentForm.action = `/students/edit/${id}`;
      formTitle.textContent = 'Edit Student Details';
      formSubtitle.textContent = `Updating record for: ${name}`;
      submitBtnText.textContent = 'Update Student';
      cancelBtn.style.display = 'inline-flex';

      clearError();

      // Smoothly scroll to the form card so the user sees it immediately
      studentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInput.focus();
    });
  });

  // Cancel button resets the form back to ADD mode
  cancelBtn.addEventListener('click', () => {
    resetFormToAddMode();
  });

  // =========================================================================
  // 4. Delete Confirmation Interaction (Event Handling)
  // =========================================================================
  // Intercept the delete form submit event and ask for user confirmation
  deleteForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      const deleteButton = form.querySelector('.btn-delete');
      const studentName = deleteButton ? deleteButton.getAttribute('data-name') : 'this student';

      const confirmed = window.confirm(
        `Are you sure you want to delete the record for "${studentName}"?\nThis action cannot be undone.`
      );

      // If user clicks "Cancel" in the confirm dialog, stop form submission
      if (!confirmed) {
        event.preventDefault();
      }
    });
  });

  // =========================================================================
  // 5. Client-Side Form Validation (DOM & Regular Expressions)
  // =========================================================================
  studentForm.addEventListener('submit', (event) => {
    clearError();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const courseValue = courseInput.value.trim();

    // Check if Name is empty
    if (!nameValue) {
      event.preventDefault();
      nameInput.classList.add('is-invalid');
      showError('Please enter the student\'s full name.');
      nameInput.focus();
      return;
    }

    // Check if Email is empty
    if (!emailValue) {
      event.preventDefault();
      emailInput.classList.add('is-invalid');
      showError('Please enter the student\'s email address.');
      emailInput.focus();
      return;
    }

    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      event.preventDefault();
      emailInput.classList.add('is-invalid');
      showError('Please enter a valid email address (e.g., student@university.edu).');
      emailInput.focus();
      return;
    }

    // Check if Course is empty
    if (!courseValue) {
      event.preventDefault();
      courseInput.classList.add('is-invalid');
      showError('Please enter the student\'s course or major.');
      courseInput.focus();
      return;
    }
  });

  // Clear validation styling when user starts typing again
  [nameInput, emailInput, courseInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      clearError();
    });
  });
});

