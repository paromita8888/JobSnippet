/*
The js file is used to make json function calls to the controller JobSnippet .
*/
$(document).ready(function() { // certian functions have to be ready before the json calls are made
	
       $.ajaxSetup ({
        // Disable caching of AJAX responses especially for the  browsers like IE */
        cache: false
     });
      
      
       jobArray= Array();
      
       $("#submit").attr('disabled',true); 
       $("#next").attr('disabled',true); 
       $("#labelSnippet").hide();
       $("#labelNext").hide();
       $("#snippets").hide();
       $("#editEntity").change(function (){
        	entityId = $("#editEntity option:selected").val();
	        if(entityId==''){ // if no enity has been selected
        	  
        	  $("#snippets").hide(); // hides the table 
			  $("#snippets tr").remove(); // removes the rows of the table 
        	  adSizeClear();// resets the ad size select box to "please selct option"
	          clearCity(); // resets the city dropdown list
	          clearCategory();  // resets the job category drop down list
	          $("#submit").attr('disabled',true);
	          $("#next").attr('disabled',true);	
	          $("#labelSnippet").hide();
	          $("#labelNext").hide();
	          
        	    
        	}
        	else
        	{
		     changeCity(entityId,''); //display cities in the city drop down list
			}
});
       $("#editCity").change(function (){
        	entityId = $("#editEntity option:selected").val();
        	cityId =   $("#editCity option:selected").val();
        	
	        if(cityId==''){
     	      
     	      $("#snippets").hide();
     	      $("#snippets tr").remove();
     	       clearEntity();
        	   adSizeClear();
	           clearCity();
	           clearCategory();  
	           $("#submit").attr('disabled',true);
	           $("#next").attr('disabled',true);
	           $("#labelSnippet").hide();
			   $("#labelNext").hide();	
        	    
        	}
        	else
        	{
        	
		      changeCategory(entityId,cityId,'');// pre populate job categories when city and entity is selected.
			}
}); 

	 $("#editCategory").change(function (){
	        	entityId = $("#editEntity option:selected").val();
	        	cityId =   $("#editCity option:selected").val();
	        	categoryId = $("#editCategory option:selected").val();
	        	
		        if(categoryId==''){
	        	  $("#snippets").hide();
				  $("#snippets tr").remove(); 
				  clearEntity();
	        	  adSizeClear();
	              clearCity();
	              clearCategory();
				  $("#submit").attr('disabled',true);  
				  $("#next").attr('disabled',true);	
				  $("#labelSnippet").hide();
				  $("#labelNext").hide();
	        	    
	        	}
	        	else
	        	{
	        	  changeAdSize(entityId,cityId,categoryId); // prepopulate Ad sizes drop downlist when entity , city and category is selected
			     
				}
});
  
     $("#editPrAds").change(function(){
     	 
     	 adId =   $("#editPrAds option:selected").val();
     	 if(adId==''){
     	 	
     	 	 $("#snippets").hide(); 	
	         $("#snippets tr").remove(); 
			 clearEntity();  	   
	         adSizeClear();
	         clearCity();
	         clearCategory();
			 $("#submit").attr('disabled',true); 
			 $("#next").attr('disabled',true);
			 $("#labelSnippet").hide();
			 $("#labelNext").hide();	    
	      }
	      else
	       {
	       	$("#submit").attr('disabled',false);
		   }
     });
     
     
    $("#submit").click(function() { 
    	 cityId =   $("#editCity option:selected").val();
	     categoryId = $("#editCategory option:selected").val();
	     adId =   $("#editPrAds option:selected").val(); 
	     
        
	     jobArray = getJobs(categoryId,cityId,adId,'');	// display jobs in the table 
	    

	     $("#next").attr('disabled',false); 
	     $("#labelSnippet").show();
		 $("#labelNext").hide(); 
	    
	     
        }); 
   
    $("#next").click(function() { 
   	        
		cityId =   $("#editCity option:selected").val();
		categoryId = $("#editCategory option:selected").val();
	    for (var count = 0; count < jobArray.length; count++){
        jobId= (jobArray[count]);
        
        $.getJSON('/jobsnippet/ajaxInsertJobs/'+ cityId + '/' + jobId ,function(json){ // insert the jobs displayed in the database
            	
         } );
		
		}	
	      $("#labelNext").show(); 
	      $("#labelSnippet").hide();
	      $("#next").attr('disabled',true); 
	      $("#snippets").hide();
	      $("#snippets tr").remove();   
	      
        }); 
	    
	  
  
}
);
/*
get a list of cities when a entity is selected from the drop down list
*/
 
function changeCity(entityId){
  	
  	$.getJSON('/jobsnippet/ajaxSelectBox/'+entityId, function(json){
	  if(json == ''){
		alert('error retreiving City ');
		
		     $("#snippets").hide();
		     $("#snippets tr").remove();   
			 clearEntity();	   
	         adSizeClear();
	         clearCity();
	         clearCategory(); 
			 $("#submit").attr('disabled',true);
			 $("#next").attr('disabled',true);
			 $("#labelSnippet").hide();
			 $("#labelNext").hide();
		}
		else
		{
		  	$("#editCity option").remove(); // everytime a new entity is selected the old list of cities are removed.
			 var row;  
			  $.each(json, function(i, j){
			  
		  		 row = "<option value=\"" +  i +  "\">" +  j +  "</option>"; // a new table is created
		  	
                  $(row).appendTo("#editCity");  
              }) 
		  }  
		});
 	
  }
function changeCategory(entityId,cityId){
  	
  	$.getJSON('/jobsnippet/ajaxCategoryBox/'+ entityId + '/' + cityId, function(json){
  		
  		if(json=='')
  		{
  		  alert('error retreiving category');
  		  
  		  $("#snippets").hide();
  		  $("#snippets tr").remove();
  		  clearEntity();
  		  clearCity();
		  adSizeClear();
	      clearCategory();
		  $("#submit").attr('disabled',true);
		  $("#next").attr('disabled',true); 
		  $("#labelSnippet").hide();
		  $("#labelNext").hide();	
  		}
  		else
  		{
		  	$("#editCategory option").remove();
			 var row;  
			  $.each(json, function(i, j){
			  
		  		 row = "<option value=\"" +  i +  "\">" +  j +  "</option>";
		  	
                  $(row).appendTo("#editCategory");  
              })  
		} 
		});
 	
  }  
function changeAdSize(entityId,cityId,categoryId){
  	
  	$.getJSON('/jobsnippet/ajaxAdSizeBox/'+ entityId + '/' + cityId + '/' + categoryId, function(json){
  		
  		    if(json=='')
  		    {
  		     alert('error retreiving ad size');
  		     $("#snippets").hide();
  		     $("#snippets tr").remove();
  		     clearEntity();
  		     clearCity();
		     adSizeClear();
	         clearCategory(); 	
	         $("#submit").attr('disabled',true);
	         $("#next").attr('disabled',true);
	         $("#labelSnippet").hide();
	         $("#labelNext").hide();
  		    }
  		    else
  		    {
		  	$("#editPrAds option").remove();
			 var row;  
			  $.each(json, function(i, j){
			  
		  		 row = "<option value=\"" +  i +  "\">" +  j +  "</option>";
		  	
                  $(row).appendTo("#editPrAds");  
              }) 
			 }  
		});
 	
  }  

function getJobs(categoryId,cityId,adId){
  	
  var jobArray= Array();	
  $.getJSON('/jobsnippet/ajaxGetJobs/'+ categoryId + '/' + cityId + '/'+ adId, function(json){
  	   
  	  if(json=='')
  	  {
  		     alert('error retreiving jobs');
  		     
  		     $("#snippets").hide();
  		     $("#snippets tr").remove();
  		     clearEntity();
  		     clearCity();
		     adSizeClear();
	         clearCategory(); 	
	         $("#submit").attr('disabled',true);
	         $("#next").attr('disabled',true);
	         $("#labelSnippet").hide();
	         $("#labelNext").hide();
  	  }
  	  else
	 {	
	  
	
  	  $("#snippets").show();
  	  $("#snippets tr").remove(); 
  	   
	   $("#snippets").append("<tr><td id ='snippetstd1'></td><td id ='snippetstd2'></td></tr>");
      
	    $.each(json,function (i,j){ 
	    	
	    	 $("#snippetsJobid").prepend('value="'+j['job_listing_id']+'"');
	    	 if(i%2==0)
	    	 {
	   	     	$("#snippetstd1").prepend('<div>'+j['job_title'] +"<br>"+'Job ID'+' - '+j['simple_id'] + '<input type ="hidden" ' + 'value ="' +j['job_listing_id']+'"' + '</input></div><br>');
	   	     	
	   	     }
	   	     else
	   	     {
	   	      
	   	    	$("#snippetstd2").prepend('<div>' +j['job_title'] +"<br>"+'Job ID'+' - '+j['simple_id']+ '<input type ="hidden"' + 'value ="' +j['job_listing_id']+'"' + '</input></div><br>');
				  
				   
			}
	   	 	jobArray.push(j['job_listing_id']);
         }) ;    
          
	  }
 	});
 
    return jobArray;
    
  }

function clearEntity()
{
	 $.getJSON('/jobsnippet/ajaxGetEntity/', function(json){
	 	
	 	if(json=='')
  		    {
  		     alert('error retreiving entity');
  		     $("#snippets").hide();
  		     $("#snippets tr").remove();
  		     clearCity();
		     adSizeClear();
	         clearCategory(); 
			 $("#submit").attr('disabled',true);	
			 $("#next").attr('disabled',true);
			 $("#labelSnippet").hide();
			 $("#labelNext").hide();
			 
  		    }
  		    else
  		    {
  	        
		  	$("#editEntity option").remove();
			 var row;  
			  $.each(json, function(i, j){
			  
		  		 row = "<option value=\"" +  i +  "\">" +  j +  "</option>";
		  	
		  	      
                  $(row).appendTo("#editEntity");  
              }) 
			 } 
	 });
    
    
} 
   
function clearCity()
{
	 var row;  
	 $("#editCity option").remove();
     row = "<option value=\"" + ' ' +  "\">" +  'Please Select' +  "</option>"; 
		  	
     $(row).appendTo("#editCity");  
    
}
function clearCategory()
{
	 var row;  
	 $("#editCategory option").remove();
     row = "<option value=\"" + ' ' +  "\">" +  'Please Select' +  "</option>"; 
		  	
     $(row).appendTo("#editCategory");  
    
}
function adSizeClear()
{
	 var row;  
	 $("#editPrAds option").remove();
     row = "<option value=\"" + ' ' +  "\">" +  'Please Select' +  "</option>"; 
		  	
     $(row).appendTo("#editPrAds");  
    
}
