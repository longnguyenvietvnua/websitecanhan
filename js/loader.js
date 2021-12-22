var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content1").style.display = "block";
    document.getElementById("header").style.display = "block";
}
