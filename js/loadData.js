var primi= new Array();
var secondi = new Array();
var primiId=new Array();
var secondiId=new Array();
var contentId=new Array();
$(document).ready(function(){
	/*loadPrimi();
	loadSecondi();

	setInterval(loadPrimi, 5000);
    setInterval(loadSecondi, 5000);
	*/
	loadData();

	setInterval(loadData, 5000);
	
});
function loadData(){
	$.ajax({
        type: "GET",
        url: "ajax/ottieni_piatti_in_produzione.ajax.php",
        dataType:"json",        
        timeout: 4000,
        success:function(response){
            if (response) {
            	//deleteDone(response, "primi");
            	/*var temp=_.differenceWith(response,primi, _.isEqual);
            	if(!$.isEmptyObject(temp)){
            		primi = response;
            	}*/ 

                showData(response);
            }
            else {
                // Process the expected results...
            }
        }

    });
}	
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
function showData(data){
	var arrays=_.groupBy(data, 'idprg');
	var gets=new Array();
	$.each(arrays, function(index, arr) {
		$('#content').empty();
		$('#content').append('<p class="combine">'+'COMBINE N. '+index+'</p>');
		
		
		
		$.each(arr, function(idx,value){
			var idDiv=value.tavolo+value.indice+value.portata.replace(/ /g, '')+value.idprg;
			gets.push(idDiv);
			if(!_.includes(contentId, idDiv)){
				var _class = getColorClass();
				$('#'+value.cat).append('<div class="col-11 my-1 space '+_class+'" id="'+idDiv+'">'
								+'Tav. '+value.tavolo+'/'+value.indice
								+' '+value.portata.substring(0,20)+' n. '+value.nr
								+'</div>');
				contentId.push(idDiv);		
			}			
		});		
		
	});
	var toRemove = _.difference(contentId, gets); 
	//deleteDone(gets,el);
}

function deleteDone(data){
	/*var temp=new Array();
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
	});*/
	$.each(data, function(index, value){
		$('#'+value).remove();
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