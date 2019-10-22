function initMap() {
    var coordinates = {lat: 59.938867, lng: 30.323058},
    
        map = new google.maps.Map(document.getElementById('map'), {
             zoom: 17,
     		 center: coordinates
        });
        
}