<?php
/*
This class extends the Appmodel class and is the layer which interacts with the database
*/
class Jobsnippet extends AppModel {
	
	var $useTable = false;
	
	function entityQuery()
	{
		$sql ="select * from entity";
		$result =  @$this->query($sql);
		return $result;
	}
	function cityQuery(){
			
		$sql = "SELECT [id] PR_City_ID,[name] PR_City_Name FROM [pr_city] WHERE [entity_id] = 1 AND [status] = 'A' ORDER BY [name]";
 
		$result =  @$this->query($sql);
		return $result;
	}
	
	function categoryQuery($entityId, $cityId){

		
		$sql="exec usp_snippets_get_category_count @entity=" . $entityId . ", @prcity=" . $cityId;
	
		$result =  @$this->query($sql);
	   
		return $result;
	}
		
    	function adSizeQuery($entityId, $cityId,$categoryId){

		
		$sql= "exec usp_snippets_get_ad_size @entity=" . $entityId . ", @prcity=" . $cityId . ", @categoryid=" . $categoryId;


		$result =  @$this->query($sql);
	
		return $result;
	}
	
	function getJobIDQuery($categoryID,$cityID)
	{
			
		$sql="EXEC [dbo].[usp_snippets_get_jobs]
             @prcity = ".$cityID.
            ",@categoryid = ".$categoryID ;
            
		$result =  @$this->query($sql);
	
		return $result;					

	}
	function insertJobQuery($cityID,$jobID)
	{
		$sql="EXEC usp_snippets_insert_used @pr_city_id = " .$cityID.",@job_id = ".$jobID;
              
        
		$result =  @$this->query($sql);
	    
		return $result;					

	}
	
}
	
?> 