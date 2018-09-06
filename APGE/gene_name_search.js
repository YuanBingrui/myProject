function submitGeneName() {
    var os_name = document.getElementById("os_name").value;
    var gene_name = document.getElementById("gene_name").value;
    var toolLabel = document.getElementById("toolLabel0").innerText;
    var url = "../APGE/gene_name_select.php";
    $.post(url, {
            os_name: os_name,
            gene_name: gene_name,
            tool_label: toolLabel
        },
        function(gene_name_selected_range) {
            if (gene_name_selected_range == '') {
                alert("The species does not exist the gene！");
                window.location.reload();
            } else {
                var range = gene_name_selected_range.split(';');
                document.getElementById('scaffold').value = range[0];
                document.getElementById('from').value = range[1];
                document.getElementById('to').value = range[2];
                submitForm();
            }
        });
}
