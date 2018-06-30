// Select color input
    const color = $("#colorPicker");
    var pickedColor = $(color).val();
	console.log(color);
// Select size input
	const height = $("#inputHeight");
	const width = $("#inputWeight");
//Submit button
	$("input[type='submit']").on("click", function(event){
	event.preventDefault();
    let submittedHeight = $(height).val();
    let submittedWidth = $(width).val();
	
	
	$("#pixelCanvas").empty();
	makeGrid(submittedHeight, submittedWidth);
});
	// When size is submitted by the user, call makeGrid()

	function makeGrid(height, width) {

        // Your code goes here!

        
        
        //for number up to height
        for(var x = 0; x < height; x++){
            
            //create a row
            $("#pixelCanvas").append("<tr></tr>");
            
            //for number up to width
            for (var y = 0; y < width; y++){
                
                //add a td to row
                $("tr").last().append("<td></td>");
                    }
        }
        
    //     //color square when clicked or dragged
    $("td").on("mousedown mouseover", function(e){
        console.log(e.buttons);
        if(e.buttons === 1)
        {   //change background color of event target's
            $(this).css("background-color", pickedColor);
             }
        });
            
    }

    $('#colorPicker').on('change', function(){
        pickedColor= $(this).val();
        console.log(pickedColor);
    });