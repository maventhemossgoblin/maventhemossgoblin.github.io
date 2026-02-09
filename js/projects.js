// 1. Project Navigation (Vanilla JS)
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("p-menu");

  // Event delegation for .libtn clicks
  menu.addEventListener("click", function (e) {
    const btn = e.target.closest(".libtn");
    if (!btn) return; // Ignore clicks not on .libtn

    // Remove 'proj-active' from all buttons
    document.querySelectorAll("#p-menu .libtn").forEach(el => {
      el.classList.remove("proj-active");
    });

    // Add 'proj-active' to clicked button
    btn.classList.add("proj-active");

    // Get ID without 'btn' at the end
    const id = btn.id.slice(0, -3);

    // Remove active from all accordion sections
    document.querySelectorAll(".accord").forEach(el => {
      el.classList.remove("proj-active");
    });

    // Add active to the matching section
    const target = document.getElementById(id + "p");
    if (target) target.classList.add("proj-active");
  });
});