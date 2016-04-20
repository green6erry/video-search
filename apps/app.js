


function clearEntry(){
	$('#user-input').val('').focus();
}

$(function() {
	console.log('start');
	clearEntry();
	$('#search-form').submit(function(event){
		event.preventDefault();
		var searchTerm = $('#user-input').val();
		getRequest(searchTerm);
	});





function showResults(results){
	console.log('show');
	var html='';
	$.each(results, function(index, value){
    	
		var result = results[index];
		var position = index+1;
		if (result.id.kind == 'youtube#channel'){
			var url = 'https://www.youtube.com/channel/'+result.id.channelId;
		}
		else {
			var url = 'https://www.youtube.com/watch?v='+result.id.videoId;
		}

    	var title = result.snippet.title;
    	var thumb = '<a href="'+url+'" target="_blank"><div class="thumb" style="background-image: url('+result.snippet.thumbnails.high.url+')"></div></a>';
  
	    html += '<div class="result"><h3>'+ position +'. '+title+'</h3>'+thumb+'<p>'+result.snippet.description+'<br>'+ position +'</p></div>';
		$('#search-results').html(html).hide().fadeIn(500);


	});
	clearEntry();
}



function getRequest(searchTerm) {
	console.log('get');
	var params = {
		// s: searchTerm,
		r: 'json',
		q: searchTerm,
		part: 'snippet',
		order: 'viewCount',
		maxResults: 10,
		key: 'AIzaSyA5KnfmKw5qQc6iFwxuLlXw2lgd5ydWb8M'

	};
	url = 'https://www.googleapis.com/youtube/v3/search';

	$.getJSON(url, params, function(data){
		showResults(data.items);
		});
}

$('#reset').click(event, function(){
	event.preventDefault();
	$('#search-results').empty();
});
});

