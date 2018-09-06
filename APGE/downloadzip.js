function DownLoadZip() {
    showMask();
    $.post("downloadzip.php",
        function(zipfile) {
            DownLink();
            $("#loadingcover").removeClass("is-active");
        });
}

function DownLink() {
    $("a#downloadziplink")[0].click();
}

function showMask() {
    $("#loadingcover").addClass("is-active");
}
