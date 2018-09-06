function GetCdsSquence(os_name,scaffold,geneContentTrack,linkCdsBtnId){
    var arr = linkCdsBtnId.split("|");
    var strand = arr[4].match(/.*cds_(\w+).png.*/);
    $.post("sequence_cds_view.php",
        { 
            geneName: arr[0], 
            start: arr[1], 
            end: arr[2], 
            osName: os_name, 
            scaffold: scaffold,
            strand: strand[1] 
        },
        function(result){
            //localStorage.sequence = result;
            if(result == "noSequence"){
                alert("Do not support download!!!!")
            }else{
                var newWindow = window.open();
                newWindow.document.write(result);
                newWindow.document.title = arr[0];
            }   
    });    
}

function GetGeneSquence(os_name,scaffold,geneContentTrack,toolLabel,linkCdsBtnId){
    var arr = linkCdsBtnId.split("|");
    var strand = arr[4].match(/.*cds_(\w+).png.*/);
    $.post("sequence_gene_view.php",
        { 
            geneName: arr[0],  
            osName: os_name, 
            scaffold: scaffold,
            toolLabel: toolLabel,
            strand: strand[1] 
        },
        function(result){
            //localStorage.sequence = result;
            if(result == "noSequence"){
                alert("Do not support download!!!!")
            }else{
                var newWindow = window.open();
                newWindow.document.write(result);
                newWindow.document.title = arr[0];
            }   
    });    
}
    

