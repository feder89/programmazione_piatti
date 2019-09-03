var primi= new Array();
var secondi = new Array();
var primiId=new Array();
var secondiId=new Array();
var contentId=new Array();
$(document).ready(function(){

	loadData();

	setInterval(loadData, 5000);
	
	
	
});

function reload(){
	setTimeout("location.reload(true);", 60000);
}

window.onload=reload();

function loadData(){
	$.ajax({
        type: "GET",
        url: "ajax/ottieni_piatti_in_produzione.ajax.php",
        dataType:"json",        
        timeout: 4000,
        success:function(response){
            if (response) {

                showData(response);
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
				var _class = 'blue';
				if(value.tavolo<200){
					_class = 'yellow';
				}
				$('#'+value.cat).append('<div class="col-11 my-1 space '+_class+'" id="'+idDiv+'">'
								+'Tav. '+value.tavolo+'/'+value.indice
								+' '+value.portata.substring(0,20)+' n. '+value.nr
								+'</div>');
				contentId.push(idDiv);		
			}			
		});		
		
	});
	var toRemove = _.difference(contentId, gets); 
	deleteDone(toRemove);
}

function deleteDone(data){
	$.each(data, function(index, value){
		$('#'+value).remove();
	});
	_.remove(contentId, data);
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