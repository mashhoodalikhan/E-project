$(document).ready(function () {
    let selectedCameras = JSON.parse(localStorage.getItem("selectedCameras")) || [];

    // Add camera to comparison
    $(".add-to-compare").click(function () {
        const cameraData = {
            title: $(this).data("title"),
            resolution: $(this).data("resolution"),
            lens: $(this).data("lens"),
            iso: $(this).data("iso"),
            weight: $(this).data("weight"),
        };

        // Limit to 2 cameras
        if (selectedCameras.length >= 2) {
            alert("You can only compare two cameras at a time!");
            return;
        }

        selectedCameras.push(cameraData);
        localStorage.setItem("selectedCameras", JSON.stringify(selectedCameras));

        alert(`${cameraData.title} added to compare!`);
        $(".compare-button").prop("disabled", selectedCameras.length < 2);
        window.location.href = "compare.html"; // Redirect to compare page
    });

    // Populate comparison page
    if (window.location.pathname.includes("compare.html")) {
        const selectedContainer = $(".selected-cameras");

        // Populate selected cameras
        selectedCameras.forEach((camera, index) => {
            selectedContainer.append(
                `<div>${camera.title} <button class="remove-camera" data-index="${index}">Remove</button></div>`
            );
        });

        $(".compare-button").prop("disabled", selectedCameras.length < 2);

        // Compare cameras
        $(".compare-button").click(function () {
            if (selectedCameras.length < 2) {
                alert("Please select two cameras to compare.");
                return;
            }

            const [camera1, camera2] = selectedCameras;

            $("#camera1-title").text(camera1.title);
            $("#camera1-resolution").text(camera1.resolution);
            $("#camera1-lens").text(camera1.lens);
            $("#camera1-iso").text(camera1.iso);
            $("#camera1-weight").text(camera1.weight);

            $("#camera2-title").text(camera2.title);
            $("#camera2-resolution").text(camera2.resolution);
            $("#camera2-lens").text(camera2.lens);
            $("#camera2-iso").text(camera2.iso);
            $("#camera2-weight").text(camera2.weight);

            $(".comparison-result").removeClass("hidden");
        });

        // Remove camera from selection
        $(document).on("click", ".remove-camera", function () {
            const index = $(this).data("index");
            selectedCameras.splice(index, 1);
            localStorage.setItem("selectedCameras", JSON.stringify(selectedCameras));
            location.reload();
        });
    }
});
