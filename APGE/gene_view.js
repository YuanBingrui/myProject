// JavaScript Document
function GFF_Primary(){
	var chromosome; //chromosome or scaffold or contig IDs
	var source; //experimental data or predicted results, here, the data are predicted by GenemarkE program
	var mRNA_start;
	var mRNA_end;
	var CDS_start;
	var CDS_end;
	var strand; // + or - strand
	var orientation; //the coding orientation of the gene, >>> stands for + strand, <<< stands for - strand
	var id; // gene id
	var name; //gene name
}

//解析gene_content
function geneContentAnatomise(gene_content,from,to,ratio_size,geneNameTrack,geneContentTrack){
	var gff_primary = new Array();
	var gff_primary_cds = new Array();
	var gene_line = gene_content.split('\n');
	var gene_count = 0;
	var cds_count = 0;
	var gene_other_info;
	for(var i = 0; i < gene_line.length; i++){
	   	cds_count++;
	   	gene_line_element = gene_line[i].split('	');
	   	if(gene_line_element[2] == "mRNA"){
		   	gene_count++;
		   	gff_primary[gene_count] = new GFF_Primary();
		   	gff_primary[gene_count].chromosome = gene_line_element[0];
		   	gff_primary[gene_count].source = gene_line_element[1];
		   	gff_primary[gene_count].mRNA_start = parseInt(gene_line_element[3]);
		   	gff_primary[gene_count].mRNA_end = parseInt(gene_line_element[4]);
		   	gff_primary[gene_count].strand = gene_line_element[6];
		   	if (gff_primary[gene_count].strand == "+"){
			   	gff_primary[gene_count].orientation = "→";
		   	}else{
			   	gff_primary[gene_count].orientation = "←";
		   	}
		   	gene_other_info = gene_line_element[8].match(/Name=(\w+);/i);
			//gene_other_info = gene_line_element[8].split(';');
			//id_info = gene_other_info[1].split('=');
			//name_info = gene_other_info[2].split('=');
			//gff_primary[gene_count].id = gene_other_info[0];
			gff_primary[gene_count].name = gene_other_info[1];
			//判别每个mRNA的的CDS的标志
			gff_primary_cds[cds_count] = new GFF_Primary();
			gff_primary_cds[cds_count].CDS_start = gene_count;
		 }else if (gene_line_element[2] == "CDS"){
			gff_primary_cds[cds_count] = new GFF_Primary();
			gff_primary_cds[cds_count].CDS_start = parseInt(gene_line_element[3]);
			gff_primary_cds[cds_count].CDS_end = parseInt(gene_line_element[4]);
		 }
	}
	gene_cds_view(gff_primary,gff_primary_cds,from,to,ratio_size,geneContentTrack);
	gene_name_view(gff_primary,gff_primary_cds,from,to,ratio_size,geneNameTrack);	 
}

//gene_name_view
function gene_name_view(gff_primary,gff_primary_cds,from,to,ratio_size,geneNameTrack){
	//var ratio_size=1020/(to-from+1);
	var gene_name_box_arr=[];
	var last_gene_cds_num=0;
	var last_cds_end;
	var next_gene_start;
	for(var gene_i=1;gene_i<gff_primary.length;gene_i++){
		var cds_num=gene_cds_count(gff_primary_cds,gene_i,last_gene_cds_num);// count cds of each gene 
		if(gff_primary.length <= 2){
			if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}else{
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var gene_box_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var gene_box_width=(to-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}	
				}else{
					if(gff_primary_cds[last_gene_cds_num+2].CDS_start > from){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(to-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}else{
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var gene_box_width=(gff_primary[gene_i].mRNA_end-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var gene_box_width=(to-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}
				}
				}else{
					if(gff_primary[gene_i].mRNA_start > from){
						var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
						gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
						var gene_box_width=(to-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
						gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
					}else{
						var gene_box_width=(to-from)*ratio_size+'px';
						gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
					}	
				}
			}else{
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
					if(gff_primary[gene_i].mRNA_end < to){
						var gene_box_width=(gff_primary[gene_i].mRNA_end-from)*ratio_size+'px';
						gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
						gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
					}else{
						var gene_box_width=(to-from)*ratio_size+'px';
						gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
					}
				}else{
					var gene_box_width=(to-from)*ratio_size+'px';
					gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
				}
			}		
		}else{
			if(gene_i == 1){
				if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
					if(cds_num == 1){
						if(gff_primary[gene_i].mRNA_start > from){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}else{
							var gene_box_width=(gff_primary[gene_i].mRNA_end-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}else{
						if(gff_primary[gene_i].mRNA_start > from){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}else{
							var gene_box_width=(gff_primary[gene_i].mRNA_end-from)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}
					}else{
						
					}
				}else{
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
					var gene_box_width=(gff_primary[gene_i].mRNA_end-from)*ratio_size+'px';
					gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");	
					}else{
					}
				}
			last_gene_cds_num=last_gene_cds_num+cds_num+1;
			}else if(gene_i == gff_primary.length-1){
				var middle_width=(gff_primary[gene_i].mRNA_start-gff_primary[gene_i-1].mRNA_end)*ratio_size+'px';
				gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+middle_width+"'></div>");
				if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
					if(cds_num == 1){
						if(gff_primary[gene_i].mRNA_end < to){
							var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var gene_box_width=(to-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}else{
						if(gff_primary[gene_i].mRNA_end < to){
							var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var gene_box_width=(to-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
						}
					}
					}else{
						var gene_box_width=(to-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
						gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
					}
				}else{
				}
			last_gene_cds_num=last_gene_cds_num+cds_num+1;	
			}else{
				var middle_width=(gff_primary[gene_i].mRNA_start-gff_primary[gene_i-1].mRNA_end)*ratio_size+'px';
				gene_name_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+middle_width+"'></div>");
				var gene_box_width=(gff_primary[gene_i].mRNA_end-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
				gene_name_box_arr.push("<div class='gene_name_box' style='width:"+gene_box_width+"'>"+gff_primary[gene_i].name+"</div>");
				last_gene_cds_num=last_gene_cds_num+cds_num+1;
			}
		}
	}
	document.getElementById(geneNameTrack).innerHTML=gene_name_box_arr.join("");
}

//gene_cds_view
function gene_cds_view(gff_primary,gff_primary_cds,from,to,ratio_size,geneContentTrack){
	//var ratio_size=1020/(to-from+1);
	var gene_cds_box_arr=[];
	var last_gene_cds_num=0;
	var cds_strand_label="";
	var intron_strand_label="";
	for(var gene_i=1;gene_i<gff_primary.length;gene_i++){
		var cds_num=gene_cds_count(gff_primary_cds,gene_i,last_gene_cds_num);// count cds of each gene    
		if(gff_primary[gene_i].orientation == "→"){
			cds_strand_label="cds_right_box";
			intron_strand_label="intron_right_box";
		}else{
			cds_strand_label="cds_left_box"
			intron_strand_label="intron_left_box";
		}
		if(gff_primary.length <= 2){
			if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
							var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}else{
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
							var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var CDS_width=(to-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}
				}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
							if(cds_j == last_gene_cds_num+2){
								if(gff_primary_cds[cds_j].CDS_start > from){
									var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
									var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}else{
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else if(cds_j == last_gene_cds_num+cds_num+1){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								if(gff_primary_cds[cds_j].CDS_end < to){
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
									var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
									var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
								}else{
									var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");  
								}
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}
					}
				}
				last_gene_cds_num=last_gene_cds_num+cds_num+1;
				}else{
					if(cds_num == 1){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
							if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
								var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
								var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
								var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
								var Intron_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							}else{
								var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
								var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");
								var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
							}
						}else{
							if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
								var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
								var Intron_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							}else{
								var CDS_width=(to-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
							}
						}
					}else{
						for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
							if(cds_j == last_gene_cds_num+2){
								if(gff_primary_cds[cds_j].CDS_start > from){
									var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
									var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}else{
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else if(cds_j == last_gene_cds_num+cds_num+1){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								if(gff_primary_cds[cds_j].CDS_end < to){
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
									var Intron_width=(to-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								}else{
									var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");  
								}
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
							}
						}
					}
					last_gene_cds_num=last_gene_cds_num+cds_num+1;
					}
			}else{
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var Intron_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
							var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");	
						}else{
							var Intron_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}else{
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
							var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
							var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
						}else{
							var CDS_width=(to-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}	
				}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
							if(cds_j == last_gene_cds_num+2){
								if(gff_primary_cds[cds_j].CDS_start > from){
									var Intron_width=(gff_primary_cds[cds_j].CDS_start-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}else{
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else if(cds_j == last_gene_cds_num+cds_num+1){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								if(gff_primary_cds[cds_j].CDS_end < to){
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
									var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
									var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
								}else{
									var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
							}
					}
				}
				last_gene_cds_num=last_gene_cds_num+cds_num+1;
				}else{
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var Intron_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
							var Intron_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
						}else{
							var Intron_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}else{
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end < to){
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
							var Intron_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
						}else{
							var CDS_width=(to-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}
				}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
							if(cds_j == last_gene_cds_num+2){
								if(gff_primary_cds[cds_j].CDS_start > from){
									var Intron_width=(gff_primary_cds[cds_j].CDS_start-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}else{
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else if(cds_j == last_gene_cds_num+cds_num+1){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								if(gff_primary_cds[cds_j].CDS_end < to){
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
									var Intron_width=(to-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								}else{
									var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
								}
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
							}
					}
				}
				last_gene_cds_num=last_gene_cds_num+cds_num+1;	
				}
			}
		}else{
		if (gene_i == 1){//view first gene
			if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
					if(cds_num == 1){
						if(gff_primary_cds[last_gene_cds_num+2].CDS_start > from){
							var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
							var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
						}else{
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}
					}else{
						for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
							if(cds_j == last_gene_cds_num+2){
								if(gff_primary_cds[cds_j].CDS_start > from){
									var left_margin_width=(gff_primary[gene_i].mRNA_start-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+left_margin_width+"'></div>");
									var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
								}else{
									var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
									gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");	
								}
							}else if(cds_j == last_gene_cds_num+cds_num+1){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
								var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");			
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");			
							}
						}
					}
					last_gene_cds_num=last_gene_cds_num+cds_num+1;
				}else{
				}
			}else{
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start > from){
						var Intron_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-from)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
						var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");			
					}else{
						var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-from)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");
					}
				}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
						if(cds_j == last_gene_cds_num+2){
							if(gff_primary_cds[cds_j].CDS_start > from){
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}else{
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-from)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}
						}else if(cds_j == last_gene_cds_num+cds_num+1){
							var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");
						}else{
							var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
						}
					}
				}
				last_gene_cds_num=last_gene_cds_num+cds_num+1;
			}else{
			}
			}
		}else if(gene_i == gff_primary.length-1){// view last gene
			var minddle_margin_width=(gff_primary[gene_i].mRNA_start-gff_primary[gene_i-1].mRNA_end)*ratio_size+'px';
			gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+minddle_margin_width+"'></div>");
			if(gff_primary_cds[last_gene_cds_num+2].CDS_start == gff_primary[gene_i].mRNA_start){
				if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end == gff_primary[gene_i].mRNA_end){
				if(cds_num == 1){
					if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end > to){
						var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
						var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
					}else{
						var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
						var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
						var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
						gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
					}
					last_gene_cds_num=last_gene_cds_num+cds_num+1;	
				}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
						if(cds_j == last_gene_cds_num+2){
							var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
							var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
						}else if(cds_j == last_gene_cds_num+cds_num+1){
							var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							if(gff_primary_cds[cds_j].CDS_end > to){
								var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}else{
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
								var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");	
								var right_margin_width=(to-gff_primary[gene_i].mRNA_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+right_margin_width+"'></div>");
							}
						}else{
							var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
						}
					}
					last_gene_cds_num=last_gene_cds_num+cds_num+1;
				}
				}else{
					if(cds_num == 1){
						if(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end > to){
							var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
							var CDS_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
						}else{
							var UTR5_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
							var CDS_width=(gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_start+"|"+gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end+"'></div>");
							var Intron_width=(to-gff_primary_cds[last_gene_cds_num+cds_num+1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
						}
						last_gene_cds_num=last_gene_cds_num+cds_num+1;
					}else{
					for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
						if(cds_j == last_gene_cds_num+2){
							var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");	
							var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
						}else if(cds_j == last_gene_cds_num+cds_num+1){
							var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
							gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							if(gff_primary_cds[cds_j].CDS_end > to){
								var CDS_width=(to-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}else{
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
								var Intron_width=(to-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
							}
							}else{
								var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
								var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
								gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
							}
					}
					last_gene_cds_num=last_gene_cds_num+cds_num+1;
					}
				}
			}
		}else{//中间基因
			var minddle_margin_width=(gff_primary[gene_i].mRNA_start-gff_primary[gene_i-1].mRNA_end)*ratio_size+'px';
			gene_cds_box_arr.push("<div class='sub_gene_box_minddle' style='width:"+minddle_margin_width+"'></div>");
			for(var cds_j=last_gene_cds_num+2;cds_j<=last_gene_cds_num+cds_num+1;cds_j++){
				if(cds_j == last_gene_cds_num+2){
					var UTR5_width=(gff_primary_cds[cds_j].CDS_start-gff_primary[gene_i].mRNA_start)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR5_width+"'></div>");
					var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");	
				}else if(cds_j == last_gene_cds_num+cds_num+1){
					var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
					var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");
					var UTR3_width=(gff_primary[gene_i].mRNA_end-gff_primary_cds[cds_j].CDS_end)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='UTR_box' style='width:"+UTR3_width+"'></div>");
					
				}else{
					var Intron_width=(gff_primary_cds[cds_j].CDS_start-gff_primary_cds[cds_j-1].CDS_end)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='"+intron_strand_label+"' style='width:"+Intron_width+"'></div>");
					var CDS_width=(gff_primary_cds[cds_j].CDS_end-gff_primary_cds[cds_j].CDS_start)*ratio_size+'px';
					gene_cds_box_arr.push("<div class='"+cds_strand_label+"' data-toggle='popover' data-placement='bottom' style='width:"+CDS_width+"' id='"+gff_primary[gene_i].name+"|"+gff_primary_cds[cds_j].CDS_start+"|"+gff_primary_cds[cds_j].CDS_end+"'></div>");			 
				}
			}
			last_gene_cds_num=last_gene_cds_num+cds_num+1;
		}
		}
	}
	document.getElementById(geneContentTrack).innerHTML=gene_cds_box_arr.join("");
}

//gene_cds_count
function gene_cds_count(gff_primary_cds,i,last_gene_cds_num){
	var CDS_num=0;
	if(last_gene_cds_num == 0){
			for(var j=i+1;j<gff_primary_cds.length;j++){
				if(gff_primary_cds[j].CDS_start == i+1){
					break;
				}else{
					CDS_num=CDS_num+1;
				}
			}
	}else{
		for(var j=last_gene_cds_num+2;j<gff_primary_cds.length;j++){
			if(gff_primary_cds[j].CDS_start == i+1){
				break;
			}else{
				CDS_num=CDS_num+1;
			}
		}	
	}
	return CDS_num;
}
	
