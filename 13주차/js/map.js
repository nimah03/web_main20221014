// 지도 생성
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 초기 좌표 (예: 서울시청)
    level: 3
};
var map = new kakao.maps.Map(container, options);

// 지도 타입 및 줌 컨트롤 추가
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 마커 생성
var marker = new kakao.maps.Marker({
    position: map.getCenter()
});
marker.setMap(map);

// 클릭 시 마커 이동 + 위/경도 표시
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    var latlng = mouseEvent.latLng;
    marker.setPosition(latlng);

    var message = '위도: ' + latlng.getLat() + ', 경도: ' + latlng.getLng();
    document.getElementById('clickLatlng').innerHTML = message;

    // 주소 변환
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var addr = result[0].address.address_name;
            document.getElementById('clickLatlng').innerHTML += '<br>주소: ' + addr;
        }
    });
});
