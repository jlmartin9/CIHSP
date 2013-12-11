var url_base = "http://wwwp.cs.unc.edu/Courses/comp426-f13/jamesml/site";
var reviewCount = 0;
// var reviewAvg = 0;
window.reviewAvg = 0;
$(document).ready(function () {
	var bid = $('#bid').val();

	// Load review list and display it
	$.ajax(url_base + "/php/bathrooms.php/"+bid+"/reviews/",
		{type: "GET",
		dataType: "json",
		success: function(review_ids, status, jqXHR) {
			if (review_ids===null) {
				$('#review_list').html("No Reviews yet");
			}else{
				reviewCount = review_ids.length;
				for (var i=0; i<review_ids.length; i++) {
					load_review_item(review_ids[i]);
				}
			}
		},
		error: function(jqXHR, status, error) {
			window.location.href = "http://wwwp.cs.unc.edu/Courses/comp426-f13/jamesml/site/index";
		}});

	$.ajax(url_base + "/php/bathrooms.php/"+bid,
		{type: "GET",
		dataType: "json",
		success: function(bathroom_json, status, jqXHR) {
			bathroom_json.count = reviewCount;
			bathroom_json.avg = reviewAvg;
			br = new Bathroom(bathroom_json);
			$('#bathroomHeader').html(br.makeHeader());
		},
		error: function(jqXHR, status, error) {
			window.location.href = "http://wwwp.cs.unc.edu/Courses/comp426-f13/jamesml/site/index";
		}});

	$(document).on('click', '#newReview',
		function (e) {
			url = url_base+"/create.php?bid="+bid;
			window.location.href = url;
		});
});

//Append Specific Review to list
var load_review_item = function (id) {
	$.ajax(url_base + "/php/reviews.php/" + id,
		{type: "GET",
		dataType: "json",
		success: function(review_json, status, jqXHR) {
			var t = new Review(review_json);
			$('#review_list').append(t.makeCompactDiv());
		},
		error: function(jqXHR, status, error) {
		}});
};
