$(document).ready(function () {

    const $form = $('#estimateForm');
    const $submitBtn = $('#submitBtn');
    const $submitBtnText = $('#submitBtnText');
    const $submitBtnSpinner = $('#submitBtnSpinner');

    function resetValidation() {
        $form.find('.form-control, .form-select').removeClass('is-invalid is-valid');
        $form.find('.invalid-feedback').text('');
    }

    function validateForm() {
        let isValid = true;
        resetValidation();

        // Name
        const $name = $('#name');
        if (!$name.val().trim()) {
            $name.addClass('is-invalid');
            $('#nameFeedback').text('Full Name is required.');
            isValid = false;
        } else {
            $name.addClass('is-valid');
        }

        // Email
        const $email = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!$email.val().trim()) {
            $email.addClass('is-invalid');
            $('#emailFeedback').text('Email is required.');
            isValid = false;
        } else if (!emailRegex.test($email.val().trim())) {
            $email.addClass('is-invalid');
            $('#emailFeedback').text('Enter a valid email (e.g. user@domain.com).');
            isValid = false;
        } else {
            $email.addClass('is-valid');
        }

        // Project type
        const $projectType = $('#project-type');
        if (!$projectType.val()) {
            $projectType.addClass('is-invalid');
            $('#project-typeFeedback').text('Please select a project type.');
            isValid = false;
        } else {
            $projectType.addClass('is-valid');
        }

        // Area
        const $area = $('#area');
        if ($area.val().trim()) {
            const areaValue = parseFloat($area.val());
            if (isNaN(areaValue) || areaValue < 1) {
                $area.addClass('is-invalid');
                $('#areaFeedback').text('Area must be a number ≥ 1 m².');
                isValid = false;
            } else {
                $area.addClass('is-valid');
            }
        }

        // Budget
        const $budget = $('#budget');
        if ($budget.val().trim()) $budget.addClass('is-valid');

        // Phone
        const $phone = $('#phone');
        if ($phone.val().trim()) $phone.addClass('is-valid');

        // Deadline
        const $deadline = $('#deadline');
        if ($deadline.val().trim()) $deadline.addClass('is-valid');

        return isValid;
    }

    $form.on('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const $name = $('#name');
        const $email = $('#email');
        const $phone = $('#phone');
        const $projectType = $('#project-type');
        const $area = $('#area');
        const $budget = $('#budget');
        const $deadline = $('#deadline');
        const $message = $('#message');

        const requestData = {
            name: $name.val().trim(),
            email: $email.val().trim(),
            phone: $phone.val().trim(),
            projectType: $projectType.val(),
            area: $area.val().trim(),
            budget: $budget.val().trim(),
            deadline: $deadline.val().trim(),
            message: $message.val().trim()
        };

        localStorage.setItem("lastEstimate", JSON.stringify(requestData));

        $submitBtn.prop('disabled', true).addClass('disabled');
        $submitBtnText.addClass('d-none');
        $submitBtnSpinner.removeClass('d-none');

        setTimeout(function () {
            $submitBtn.prop('disabled', false).removeClass('disabled');
            $submitBtnText.removeClass('d-none');
            $submitBtnSpinner.addClass('d-none');

            $('#successModal').modal('show');

            const successSound = document.getElementById('successSound');
            if (successSound) {
                successSound.currentTime = 0;
                successSound.play();
            }

            $form[0].reset();
            resetValidation();
        }, 1500);

    });

    $('#resetBtn').on('click', function () {
        $form[0].reset();
        resetValidation();
    });

    const saved = localStorage.getItem("lastEstimate");
    if (saved) {
        const data = JSON.parse(saved);
        $("#lastRequest")
            .removeClass("d-none")
            .html(`
      <div class="container">
      <h2 class="section-title">Last request</h2>
      <h5>Hello, ${data.name}!</h5>
      <div class="estimate-card p-4 col-12">
      <p><strong>Your project details:</strong></p>
      <ul>
        <li>Email: ${data.email}</li>
        <li>Phone: ${data.phone || '-'}</li>
        <li>Project type: ${data.projectType}</li>
        <li>Area(m²): ${data.area || '-'}</li>
        <li>Budget: ${data.budget || '-'}</li>
        <li>Deadline: ${data.deadline || '-'}</li>
        <li>Message: ${data.message || '-'}</li>
      </ul>
    </div>
    <h5 style="margin-top:1rem;">Please wait for our response.<h5>
    </div>
    `);
    }

});




$(document).ready(function () {
    const $progressBar = $('#scroll-progress-bar');
    function updateScrollProgress() {
        const docHeight = $(document).height();
        const windowHeight = $(window).height();
        const scrollPos = $(window).scrollTop();

        const scrollableHeight = docHeight - windowHeight;

        let percentage = 0;

        if (scrollableHeight > 0) {
            percentage = (scrollPos / scrollableHeight) * 100;
        } else {
            percentage = 100;
        }

        $progressBar.css('width', percentage + '%');
    }
    $(window).on('scroll', updateScrollProgress);

    updateScrollProgress();
});

$(document).ready(function () {
    $(".copy-btn").on("click", function () {
        let textToCopy = $(this).data("copy");
        let button = $(this);

        navigator.clipboard.writeText(textToCopy).then(function () {
            button.text("✅");
            button.attr("title", "Copied to clipboard!").tooltip({ trigger: "manual" }).tooltip("show");
            setTimeout(function () {
                button.text("📋");
                button.tooltip("hide").attr("title", "Copy");
            }, 1500);
        });
    });
});

