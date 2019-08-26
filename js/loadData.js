var primi= new Array();
var secondi = new Array();
var primiId=new Array();
var secondiId=new Array();
$(document).ready(function(){
	loadPrimi();
	loadSecondi();

	setInterval(loadPrimi, 5000);
    setInterval(loadSecondi, 5000);
	
});

function loadPrimi(){
	$.ajax({
        type: "GET",
        url: "ajax/ottieni_piatti_in_produzione.ajax.php",
        dataType:"json",
        data:{
        	categoria: 'primo'
        },
        timeout: 4000,
        success:function(response){
            if (response) {
            	//deleteDone(response, "primi");
            	var temp=_.differenceWith(response,primi, _.isEqual);
            	if(!$.isEmptyObject(temp)){
            		primi = response;
            	} 

                showData(temp, "primi", response);
            }
            else {
                // Process the expected results...
            }
        }

    });
}

function loadSecondi(){
	$.ajax({
        type: "GET",
        url: "ajax/ottieni_piatti_in_produzione.ajax.php",
        dataType:"json",
        data:{
        	categoria: 'secondo'
        },
        timeout: 4000,
        success:function(response){
            if (response) {
            	//deleteDone(response, "secondi");
            	var temp=_.differenceWith(response,secondi , _.isEqual);
            	if(!$.isEmptyObject(temp)){
            		secondi = response;
            	} 

                showData(temp, "secondi",response);
            }
            else {
                // Process the expected results...
            }
        }

    });
}

function showData(data, el, gets){
	$.each(data, function(index, value) {
		var idDiv=value.tavolo+value.indice+value.portata.replace(/ /g, '')+value.idprg;
		var _class = getColorClass();
		$('#'+el).append('<p class="combine">'+'COMBINE N. '+value.idprg+'</p><div class="col-11 my-1 space '+_class+'" id="'+idDiv+'">'
						+'Tav. '+value.tavolo+'/'+value.indice
						+' '+value.portata.substring(0,20)+' n. '+value.nr
						+'</div>');
		if(el === "primi"){
			primiId.push(idDiv);
		}else{
			secondiId.push(idDiv);
		}
	});
	deleteDone(gets,el);
}

function deleteDone(data, cat){
	var temp=new Array();
	$.each(data, function(index, value){
		var idDiv=value.tavolo+value.indice+value.portata.replace(/ /g, '')+value.idprg;
		temp.push(idDiv);
	});

	var divIds= new Array();
	if(cat==="primi"){
		divIds=_.difference(primiId, temp);
	}else{
		divIds=_.difference(secondiId, temp);
	}

	$.each(divIds, function(index, divId){
		$('#'+divId).remove();
	});
}

var color=[
	'red',
	'blue',
	'yellow',
	'gray',
	'green',
	'purple',
	'lightblue'
];

function getColorClass(){
	var _class=color[0];
	color.push(color.shift());
	return _class;
}