<?php
	require_once '../include/core.inc.php';
	$link=connectToDb();
	$portate=array();
    if(isset($_GET['index'])){
    	$idprg=$_GET['index'];
    	$query="SELECT *,COUNT(id) AS nr FROM programmazioneordini 
		WHERE idprogrammazione=$idprg 
		AND stato=2
		GROUP BY portata, tavolo ,indice, idprogrammazione
		ORDER BY idprogrammazione, tavolo, portata";

		$result = mysqli_query($link, $query) or die("#error#".mysqli_error($link));
	    while ($row = mysqli_fetch_assoc($result)) {
	    	array_push($portate, array('portata' => $row['portata'], 
	    								'indice' => $row['indice'],
	    								'tavolo' => $row['tavolo'],
	    								'nr' => $row['nr'],
	    								'idprg' => $row['idprogrammazione'],
										'cat' => $row['categoria']));
	    }  
    }
		

	disconnetti_mysql($link, NULL); #visto che non ho un result_set gli passo NULL.. nella funzione in core.in.php ho aggiunto il controllo

	echo json_encode($portate);
	

?>

 