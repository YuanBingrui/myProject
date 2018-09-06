function submitForm() {
    var os_name = document.getElementById("os_name").value;
    var scaffold = document.getElementById("scaffold").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var url = "../APGE/gene_view.php";
    var ave = Math.round((to - from + 1) / 10);
    var ratio_size = 1050 / (to - from + 1);
    $.post(url, {
            os_name: os_name,
            scaffold: scaffold,
            from: from,
            to: to
        },
        function(allContent) {
            if (allContent == 'wrong') {
                alert("Range is wrong！");
            } else if (allContent == "no any information") {
                alert("no any information");
            } else {
                var geneContentBox = document.getElementById("gene_content");
                var toolBoxArr = allContent.split("|");
                var toolLabel;
                var geneNameTrack;
                var geneContentTrack;
                var gene_track_width;
                for (var tool_i = 0; tool_i < toolBoxArr.length - 1; tool_i++) {
                    var eachToolView = toolBoxArr[tool_i].split(">");
                    if (osNameVarify == 1) {
                        CreateDataTrackDiv(geneContentBox, tool_i);
                    }
                    toolLabel = "toolLabel".concat(tool_i.toString());
                    geneNameTrack = "gene_name_track".concat(tool_i.toString());
                    geneContentTrack = "gene_content_track".concat(tool_i.toString());
                    //gene_track_width = document.getElementById(geneContentTrack).offsetWidth;
                    //ratio_size = gene_track_width / (to - from + 1);
                    //ratio_size = 0.102;
                    document.getElementById(toolLabel).innerHTML = eachToolView[0];
                    geneContentAnatomise(eachToolView[1], from, to, ratio_size, geneNameTrack, geneContentTrack);
                    Popoverbind(os_name, scaffold, geneContentTrack, eachToolView[0]);
                }
            }
        });
    document.getElementById('count_1').innerHTML = from;
    document.getElementById('count_2').innerHTML = (parseInt(from) + parseInt(ave) - 1);
    document.getElementById('count_3').innerHTML = (parseInt(from) + 2 * parseInt(ave) - 1);
    document.getElementById('count_4').innerHTML = (parseInt(from) + 3 * parseInt(ave) - 1);
    document.getElementById('count_5').innerHTML = (parseInt(from) + 4 * parseInt(ave) - 1);
    document.getElementById('count_6').innerHTML = (parseInt(from) + 5 * parseInt(ave) - 1);
    document.getElementById('count_7').innerHTML = (parseInt(from) + 6 * parseInt(ave) - 1);
    document.getElementById('count_8').innerHTML = (parseInt(from) + 7 * parseInt(ave) - 1);
    document.getElementById('count_9').innerHTML = (parseInt(from) + 8 * parseInt(ave) - 1);
    document.getElementById('count_10').innerHTML = (parseInt(from) + 9 * parseInt(ave) - 1);
    document.getElementById('count_11').innerHTML = to;
    osNameVarify = osNameVarify + 1;
}

function CreateDataTrackDiv(geneContentBox, tool_i) {
    var divToolBox = document.createElement("div");
    divToolBox.setAttribute("class", "toolBox");
    divToolBox.innerHTML = "<div id='toolLabel" + tool_i + "' class='left_box toolLabel'></div><div class='right_box gene_box'><div class='gene_name_track' id='gene_name_track" + tool_i + "'></div><div class='gene_content_track' id='gene_content_track" + tool_i + "'></div></div>";
    geneContentBox.appendChild(divToolBox);
}

function Popoverbind(os_name, scaffold, geneContentTrack, toolLabel) {
    $("#" + geneContentTrack + " [data-toggle='popover']").popover({
        container: 'body',
        html: true,
        content: function() {
            var cdsBoxClass = $(this).css("background-image");
            var cdsBoxId = $(this).attr("id");
            return "<a class='btn cds' id='" + cdsBoxId + "|cds|" + cdsBoxClass + "'>CDS</a><br/><a class='btn gene' id='" + cdsBoxId + "|gene|" + cdsBoxClass + "'>gene</a>";
        },
    });
    $("#" + geneContentTrack + " [data-toggle='popover']").on('shown.bs.popover', function() {
        $(".cds").click(function() {
            var linkCdsBtnId = $(this).attr("id");
            GetCdsSquence(os_name, scaffold, geneContentTrack, linkCdsBtnId);
        });
        $(".gene").click(function() {
            var linkCdsBtnId = $(this).attr("id");
            GetGeneSquence(os_name, scaffold, geneContentTrack, toolLabel, linkCdsBtnId);
        });
    });
}
