var serviceURL = "http://192.168.40.2/api/";
var ledURL = "http://192.168.40.2/led/";
var ledWireIP = "";
var ledCashIP = "";
var defaultColor = '';
$.get(serviceURL + 'hardware.php?f=getColor&type=colorHelp', function(data) 
{
	var color4 = data;	
});
$.get(serviceURL + 'hardware.php?f=getColor&type=colorOn', function(data) 
{
	defaultColor = data;	
})
function goToURL(url)
{
	$.mobile.changePage(url);
}// JavaScript Document

function startLed(command, value, ip){
	//alert(color + 'IP: ' + ip);
	$.ajax({
	    type: 'POST',
	    url: ledURL +'led.php?' + command + '=' + value + '&ip=' + ip + '',
	    data: '',
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json'
    });
}

function checkpin(pincode){
	$.get(serviceURL + 'checkout.php?f=checkPin&pin=' + pincode  + '', function(data) {
			if(data == 'y'){
				$.get(serviceURL + 'checkout.php?f=changeStatus&pincode=' +  pincode + '&statusID=2', function(data){
					goToURL('displaycheckout.html?pincode=' + pincode);	
				});
			}else{
				document.getElementById('code').innerHTML = "INCORRECT PIN";
				$("#code").css('color', '#FF0000');
			}
	});
}
function resetPin(){
		if ($("#code").html == "INCORRECT PIN"){
			$("#code").html = '';
		}
		$("#code").css('color', '#00A0E0');
}

function insertIntoOrder(barcode, pincode){
	$.get(serviceURL + 'products.php?f=addProductCheckout&barcode=' + barcode + '&pincode=' + pincode + '', function(data){
		getOrderListByPin(pincode);
	});	
}
function removeProduct(lineID) {
	$.get(serviceURL + 'checkout.php?f=deleteLine&odID=' + lineID + '', function(data){
		getOrderListByPin(pincode);
	});
}
function getOrderListByPin(pincode) {
	$.get(serviceURL + 'checkout.php?f=getOrderList&pincode=' + pincode + '', function(data) {
	$('#orderList').html(data);
	$(".deleteFromList").on("touchstart", function()
	{
		
		var lineID = $(this).attr('id');
		//alert(lineID);
		removeProduct(lineID);	
	});
	
	/*$("#orderListTable tr.maySwipe").swipe( {
        
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).css("background-color","#FF0000");
			$(this).fadeOut(400, function(){
				$(this).remove();
				removeProduct($(this).attr('id'));
				});
				return false;
        },
        
        threshold:0
      });*/
	});
}

function getAllProducts(type, pincode) {

	$.getJSON(serviceURL + 'products.php?f=getAllProducts&type=' + type + '', function(data) {
		order = data.items;
		$.each(order, function(index, product) {
			$('#slider_' + type).append('<li><img src="./' + product.pImage + '" width="75" height="75" /><br /><div class="linkje" href="#" onTouchStart="javascript:insertIntoOrder(' + product.pBarcode + ', '+ pincode + ');">' + product.pName + ' <nobr>&euro; ' + parseFloat(product.pPrice).toFixed(2).replace(".",",") + '</nobr></div></li>');
		});
		
	 $('#slider_' + type).carouFredSel({
		 auto		: false,
		 swipe		: {
			 onTouch		: true,
			 onMouse		: true
		 }
	 });
	
	});
}

function zetCashModuleAan(){
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hBindedIpLedCash', function(data) {
	$("#ipLedCash").val(data);
		ledCashIP = data;
		startLed("cmd","on",ledCashIP);
		GroenTimer = setInterval(function(){ maakGroen(ledCashIP) },150);
	});
}
function startLed(command, value, ip){
	//alert(color + 'IP: ' + ip);
	$.ajax({
	    type: 'POST',
	    url: ledURL +'led.php?' + command + '=' + value + '&ip=' + ip + '',
	    data: '',
	    contentType: 'application/json; charset=utf-8',
	    dataType: 'json'
    });
}
function bindButtons()
{
	$(".btnSettings").on('touchstart', function()
	{
		goToURL('settings.html');	
	});
	$('.btnINeedHelp').on("touchstart", function(e) {
		setHelpButton();
	});
}






var help = 'off';
//var helpInterval = setInterval();
function setHelpButton()
{
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hBindedIpLedWire', function(data) {
		//$("#ipLedWire").val(data);
		ledWireIP = data;
		if(help == 'off')
		{
			help = 'on';	
			helpBlink('start',ledWireIP, color4);
		}
		else
		{
			help = 'off';
			helpBlink('stop',ledWireIP, defaultColor);
		}
	});
}
var h = 0;
var helpState = 'on';
var firstHit = 'off';
var setLast = 'off';
function helpBlink(startstop, IP, setColor)
{
		if(startstop == 'start')
		{
			startLed("cmd", "effectup", IP);
		}
		else if(startstop == "stop")
		{
			startLed("hue", defaultColor, IP);
		}
		else
		{

		}	
}

var i = 0;
var fadeInterval = setInterval();
function FadeColor(NewColor, ip)
{
	
	console.log(i + ' count');
	
	if(
		(i >= 0) && (i < 8)
	)
	{
		console.log(i + 'bright - down');
		startLed('cmd','brightdown',ip);
	}
	else if(
		( i >= 8) && (i < 9)
	)
	{
		console.log(i + 'uit zetten');
		startLed('cmd','off',ip);
		
	}
	else if(
		(i >= 9) && (i < 10)
	)
	{
		console.log(i + 'aan zetten');
		startLed('cmd','on',ip);
	}
	else if(
		(i >= 10) && (i < 11)
	)
	{
		console.log(i + 'kleur ' + NewColor);
		startLed('hue',NewColor,ip);
		
	}
	else if(
		(i >= 11) && (i < 19)
	)
	{
		console.log(i + 'bright - up');
		startLed('cmd','brightup',ip);
	}
	else if(i = 19)
	{
		console.log(i + 'clear interval');
		clearInterval(fadeInterval);
	}
	i ++;
}