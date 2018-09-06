function FormValidation() {
    $.post("os_name_index.php",
        function(osNameIndex) {
            OsNameList(osNameIndex);
        });
}

function OsNameList(osNameIndex) {
    var osNameIndexArr = osNameIndex.split(';');
    var listStr = "";
    for (var i = 1; i < osNameIndexArr.length; i++) {
        listStr = listStr + "<li><a>" + osNameIndexArr[i] + "</a></li>";
    }
    $("#osnamelist ul").html(listStr);
    $("#osnamelist ul li").addClass("lihover");
    $("#osnamelist ul li").click(function() {
        $("#osname").val($(this).text());
    })
}

function UploadFile() {
    var osName = $("#osname").val();
    var toolClassLabel = $("#toolClassLabel").val();
    if (osName === "" || toolClassLabel === "") {
        alert("The species and toollabel cannot be empty!");
    } else {
        $.post("os_name_index.php",
            function(osNameIndex) {
                var flag = 0;
                var osNameIndexArr = osNameIndex.split(';');
                for (var i = 1; i < osNameIndexArr.length; i++) {
                    if (osNameIndexArr[i] == osName) {
                        flag = 1;
                        $.post("toollabel_index.php", {
                                osName: osName
                            },
                            function(toolLabelIndex) {
                                var scaffold_flag = 0;
                                var toolLabelIndexArr = toolLabelIndex.split(';');
                                for (var j = 1; j < toolLabelIndexArr.length; j++) {
                                    if (toolLabelIndexArr[j].toLowerCase() == toolClassLabel.toLowerCase()) {
                                        if (confirm(toolClassLabel + "already existed，confirm？")) {
                                            scaffold_flag = 1;
                                            AddNewOsName(osName, toolClassLabel);
                                        } else {}
                                    }
                                }
                                if (scaffold_flag == 0) {
                                    if (confirm(osName + "determines to increase new data track？")) {
                                        AddNewOsName(osName, toolClassLabel);
                                    } else {}
                                }

                            });
                        break;
                    }
                }
                if (flag == 0) {
                    if (confirm("Determine to increase new species？")) {
                        AddNewOsName(osName, toolClassLabel);
                    } else {}
                }
            });
    }

}

function AddNewOsName(osName, toolClassLabel) {
    $.ajaxFileUpload({
        url: "gfffile_upload.php",
        type: "post",
        data: { osName: osName, toolClassLabel: toolClassLabel },
        secureuri: false,
        fileElementId: "gffFile",
        dataType: "text",
        success: function(data) {
            alert(data);
            window.location.reload();
        },
        error: function(data, status, e) {
            alert(data);
            window.location.reload();
        }
    });
}
