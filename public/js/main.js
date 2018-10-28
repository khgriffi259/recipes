// var hamburger = document.getElementById("hamburger");

// hamburger.addEventListener("click", openNav);

// function openNav() {
//   document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
// }
$(document).ready(function() {
  $(".delete-recipe").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/recipe/" + id,
      success: function(response) {
        alert("Deleting Recipe");
        window.location.href = "/";
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});
