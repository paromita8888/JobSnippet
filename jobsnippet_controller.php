<?php
/*
The codes are part of the CakePHP framework. So some of the code conventions are part of the framework

The job snippet tool displays job snippet in Employment Guide  on selecting
the relevant city, state and ad size .

This is a internal tool used to check the jobs which have been printed on the specific city edition of employment guide. 

This class is the controller for the JobSniipet Tool
*/
class JobSnippetController extends AppController {

    var $helpers = array('Html', 'Javascript'); 
    var $uses = array('Jobsnippet');
 

function index()
  { 
  	$this->set('JS', array('jobSnippet')); // loads the js file  jobSnippet.js
 	 $this->set('CSS', array('snippets')); // loads the css file  snippets.css
     $startArray = array(''=>'Please Select');
     $cityArray = array();
     $categoryArray = array();
     $adArray = array();
     $entArr = array();
     $entity = $this->Jobsnippet->entityQuery(); //gets all entity from the database
      
    $i=1;
    foreach($entity as $entityArr ) 
    {
    	$entArr[$i] = $entityArr[0]['name'];
    	$i++;
    }
    
    $prEntity = $startArray + $entArr ; 
    
    $prCity = $startArray + $cityArray ;
    $prCategory = $startArray + $categoryArray;
    $prAds = $startArray + $adArray;
    
    
    $this->set('entity',$prEntity);
    $this->set('city', $prCity);
    $this->set('prcategory', $prCategory);
    $this->set('prAds', $prAds);
    $this->render('job_snippet');// render the html page. 
  }
  /*
  gets the jobs for a job category, city and ad size . 
  a random number of jobs is returned each time .
  the total number of jobs returned depends on the ad size selected.
  
  
  */
function ajaxGetJobs($categoryId,$cityId,$adId)
  { 
  	
	$this->autoRender = false;
    Configure::write('debug', 0);	
 	$resultSet= $this->Jobsnippet->getJobIDQuery($categoryId,$cityId);
    
    if(!empty($resultSet))
    {
    $resultArr= array();
    $tempAdSize = explode ( "=", $adId);
   
   
	$listingCount = $tempAdSize [1];
	

	if (is_array ( $resultSet ) && count ( $resultSet ) > $listingCount) { // select arandom number of jobs from the result set.
					$randResultSet = array_rand ( $resultSet, $listingCount );
				
				} elseif (is_array ( $resultSet ) && count ( $resultSet ) > 1) {
					$randResultSet = array_keys ( $resultSet );
				} else {
					$randResultSet = '';
				}
				
				if (is_array ( $randResultSet ) && count ( $randResultSet ) > 0) {
				
					foreach ( $randResultSet as $key => $val ) {
						$tempArr = array ( );
						$results =$resultSet[$val];
					    
						foreach($results as $result)
						{
							
						$i=0;
						$tempVar = explode ( " ", strip_tags($results[0]['job_title'] ));
						
						if (is_array ( $tempVar ) && count ( $tempVar ) > 0) {
							$countCheck = count ( $tempVar );
							for($i = 0; $i < count ( $tempVar ); $i ++) {
								$countCheck += strlen ( $tempVar [$i] );
								if ($countCheck <= '38') {
									$tempArr [$i] = $tempVar [$i];
								}
							}
						}
						$resultArr [$key] ['job_title'] = implode ( " ", $tempArr );
						$resultArr [$key] ['job_listing_id'] = $results[0]['job_listing_id'];
						$resultArr [$key] ['simple_id'] = $results[0]['simple_id'];
						
						}
						
					}
				}
				
	$resultSet = $resultArr;

    }
    else
    {
    	$resultSet[0][0]='';
    }
    $jsonArray =  json_encode($resultSet); 
    
    echo $jsonArray; 

    
  }
  /*
  gets the cities if a specific entity is selected in entity drop down list 
  
  */
 function ajaxSelectBox($entityId)  
    {	
    $this->autoRender = false;
    Configure::write('debug', 0);
    $prCity = $this->Jobsnippet->cityQuery();
    $startArray = array(''=>'Please Select');
 	$prCity = $this->Jobsnippet->cityQuery();
 
 	$cityName =array();
 	if(!empty ($prCity))
 	{
	    foreach($prCity as $city)
	    {
	    	$id= ($city[0]['PR_City_ID']);
	    	$cname= ($city[0]['PR_City_Name']);
	    	$cityName[$id] = $cname; 
	    }
	   
	   
	   $resultArray=  ($startArray+$cityName);
   }
   else
   {
   	 $resultArray[0][0] = '';
   }
   $jsonArray =  json_encode($resultArray ); // encode the results into a json array
    
       
	echo $jsonArray; 
    
  }
  /*
  gets all enitities and encodes them in a json array.
  */
    function ajaxGetEntity()
    {	
    $this->autoRender = false;
    Configure::write('debug', 0);
    
    $startArray = array(''=>'Please Select');
 	$entity = $this->Jobsnippet->entityQuery();
    $i=1;
    
 	if(!empty ($entity))
 	{
	    foreach($entity as $entityArr )
        {
    	$entArr[$i] = $entityArr[0]['name'];
    	$i++;
        }
	   
	   $resultArray=  ($startArray+$entArr);
   }
   else
   {
   	 $resultArray[0] = '';
   }
   
   $jsonArray =  json_encode($resultArray ); 
    
       
	echo $jsonArray; 
    
  } 
  /*
  gets the ad sizes  for a entity , city and job category 
  
  */  
   function ajaxAdSizeBox($entityId,$cityId,$categoryId)
    {	
    $this->autoRender = false;
    Configure::write('debug', 0);
     $startArray = array(''=>'Please Select');
    $prAds = $this->Jobsnippet->adSizeQuery($entityId, $cityId,$categoryId);
    
    
 	$adName =array();
 	if(!empty($prAds))
 	{
	    foreach($prAds as $adArray)
	    {
	    	$id= $adArray[0]['id'];
	    	$adsize= $adArray[0]['ad_dimension'];
	    	$adName[$adsize] = $adsize; 
	    }
	 
	  
	     $resultArray=  ($startArray+$adName);
     }
     else
     {
     	$resultArray[0][0]='';
     }
     $jsonArray =  json_encode($resultArray ); 
         
      echo $jsonArray; 
    
	 }
    /*
    gets the various job categories for a selected entity and city
    */
	function ajaxCategoryBox($entityId,$cityId)
    {	
    $this->autoRender = false;
    Configure::write('debug', 0);
    $startArray = array(''=>'Please Select');
    $prCategory = $this->Jobsnippet->categoryQuery($entityId, $cityId);
    
    
 	$categoryName =array();
 	if(!empty($prCategory))
 	{
	    foreach($prCategory as $category)
	    {
	    	$id= $category[0]['id'];
	    	$cname= $category[0]['name'];
	    	$categoryName[$id] = $cname; 
	    }
	 
	  
	     $resultArray=  ($startArray+$categoryName);
    }
    else
    {
    	$resultArray[0][0] = '';
    }
     $jsonArray =  json_encode($resultArray ); 
         
     echo $jsonArray; 
    
	 }
	 
     /*
    inserts the Job Ids and the CityId
    The jobs inserted are not returned back if the same city, job category and the ad size is selected.
  
    */ 
    function ajaxInsertJobs($cityId,$jobId)
    {	
	     $this->autoRender = false;
	   	 Configure::write('debug', 0);
   	
	    $prInsertJob = $this->Jobsnippet->insertJobQuery($cityId,$jobId);
	   
	    $jsonArray =  json_encode($prInsertJob ); 
	         
	    echo $jsonArray; 
    }
  }
  

?>