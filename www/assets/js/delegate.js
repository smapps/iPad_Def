var pincode = getParameterByName("pincode");
var operatorModus = "off";
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var mayPayCard = '';
var mayPayMobile = '';
var mayPayCash = '';
var color1 = ''; //Color On
var color2 = ''; //Color Off
var color3 = ''; //Color Cash
var color4 = ''; //Color Help
var colorOperator = ''; //Color Operator Modus
$(document).delegate('#indexStart', 'pageshow', function () {
	
	//LOAD DEFAULTS: SETS LED 
		$.get(serviceURL + 'hardware.php?f=getColor&type=colorOn', function(data) 
		{
			color1 = data;	
		});
		$.get(serviceURL + 'hardware.php?f=getColor&type=colorOff', function(data) 
		{
			color2 = data;	
		});
		$.get(serviceURL + 'hardware.php?f=getColor&type=colorCash', function(data) 
		{
			color3 = data;	
		});
		$.get(serviceURL + 'hardware.php?f=getColor&type=colorHelp', function(data) 
		{
			color4 = data;	
		});
		$.get(serviceURL + 'hardware.php?f=getColor&type=colorOperator', function(data) 
		{
			colorOperator = data;	
		});
		
		
		
		$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayCash', function(data) {
			if (data=="y"){
				mayPayCash = true;
			}else{
				mayPayCash = false;
			}
		});
		//haal paycard status op
		$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayCard', function(data) {
			if (data=="y"){
				mayPayCard = true;
			}else{
				mayPayCard = false;
			}
		});
		//haal paymobile status op
		$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayMob', function(data) {
			if (data=="y"){
				//alert('y');
				mayPayMobile = true;
			}else{
				//alert('n');
				mayPayMobile = false;
			}
		});

	var startIt = setInterval();
	var c = 0;
	//checkoutClosed
	
		$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hBindedIpLedCash', function(data) 
		{
			$("#ipLedCash").val(data);
			ledCashIP = data;
			$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hBindedIpLedWire', function(data2) {
					ledWireIP = data2;
					c = 0;
					startIt = setInterval(function(){ setAllLeds(ledCashIP, ledWireIP, color3, color1) },300);
			});
		});	
	
		function setAllLeds(IP1, IP2, colorCash, colorWire)
		{
			//IP1: cash, IP2: Wire
			if(c == 0)
			{
				startLed("cmd", "on", IP1);
			}
			else if(c == 1)
			{
				startLed("hue", colorCash, IP1);
			}
			else if(c == 2)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 3)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 4)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 5)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 6)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 7)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 8)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 9)
			{
				startLed("cmd", "brightup", IP1);
			}
			else if(c == 10)
			{
				startLed("cmd", "off", IP1);
			}
			else if(c == 11)
			{
				startLed("cmd", "off", IP1);
			}
			else if(c == 12)
			{
				startLed("cmd", "on", IP2);
			}
			else if(c == 13)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 14)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 15)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 16)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 17)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 18)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 19)
			{
				startLed("cmd", "brightup", IP2);
			}
			else if(c == 20)
			{
				startLed("cmd", "on", IP2);
			}
			else if(c == 21)
			{
				startLed("cmd", "off", IP2);
			}
			else if(c == 22)
			{
				startLed("cmd", "on", IP2);
			}
			else if(c == 23)
			{
				startLed("cmd", "on", IP2);
			}
			else if(c == 25)
			{
				//c = 0;
				clearInterval(startIt);
				goToURL('code.html');
			
			}
			console.log(c + ' ' + ' ip1 = ' + IP1 + ' IP2 = ' + IP2);
			
			c += 1;
		}
	  

		
});
$(document).delegate('#pageCode', 'pageshow', function () {

	
	getKassaNaam();
	bindButtons();
	setTimeout(function(){startLed("cmd", "on", ledWireIP)},20);		
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPowered', function(data) {
		if (data == 'y'){
			setTimeout(function(){startLed("hue", color1, ledWireIP)},50);
			
			//startLed("hue", "20", ledWireIP);
		}else{
			setTimeout(function(){startLed("hue", color2, ledWireIP)},100);
			setTimeout(function(){ goToURL("checkoutClosed.html"); },100);
			//startLed("hue", "180", ledWireIP);
		}
	});
	function getKassaNaam(){
		$.get(serviceURL + 'hardware.php?f=getCheckoutName', function(data) {
			$("#kassanaam").append(data);
		});
	}

	$(".button").on('touchstart', function()
	{
		var number = $(this).attr('id');
		$(this).addClass('hoverPincode');
		if(number == 'bs')
		{
	        var element = document.getElementById('code');
	        str = element.innerHTML;
			str = str.substring(0,str.length - 1);
			element.innerHTML = str;
			
		}
		else if(number == 'cc')
		{
       	 	var element = document.getElementById('code');
			element.innerHTML = '';
			
		}
		else
		{
			var element = document.getElementById('code');
			resetPin();
	        element.innerHTML = element.innerHTML + number;
			if (element.innerHTML.length == 4){
				pincode = element.innerHTML;
				checkpin(pincode);
			}
			else if (element.innerHTML.length > 4){
				element.innerHTML = number;	
			}	
		}
		
	});
	$(".button").on("touchend",function()
	{
		$(this).removeClass('hoverPincode');	
	});
	
	
});

$(document).delegate('#pageDisplayCheckout', 'pageshow', function () {
	
	bindButtons();
	//PAYMENT METHODS ON/OFF
	
	
	//GET ORDER LIST BY PIN
	getOrderListByPin(pincode);
	//alert(mayPayMob);
	if(pincode == '9999')
	{
		operatorModus = "on";
		mayPayMobile = false;
		startLed("hue", colorOperator, ledWireIP);
		
		$("#topName").append("Operatormodus <span class=\"logOutOperator\">Log out</span>");	
		$(".logOutOperator").bind("touchstart", function()
		{
			operatorModus = 'off';
			$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayMob', function(data) {
				if (data=="y"){
					//alert('y');
					mayPayMobile = true;
				}else{
					//alert('n');
					mayPayMobile = false;
				}
			});
			startLed("hue", color1, ledWireIP);
			$.get(serviceURL + 'checkout.php?f=logOutOperator', function()
			{
				goToURL('code.html');
			});
		});
		$(".btnINeedHelp").hide();
	}
	
	//name
	if(operatorModus == "off")
	{
		$.get(serviceURL + 'checkout.php?f=getKlantName&pincode=' + pincode, function(data) {
			$("#topName").append("Welcome " + data);
		});
	}
	
	if(mayPayCash === true)
	{
		$('#cashPay').append('<img src="./assets/images/icons/i_pay_cash_on.png">');	
	}
	else
	{
		$('#cashPay').append('<img src="./assets/images/icons/i_pay_cash_off.png">');	
	}
	if(mayPayCard === true)
	{
		$('#cardPay').append('<img src="./assets/images/icons/i_pay_card_on.png">');	
	}
	else
	{
		$('#cardPay').append('<img src="./assets/images/icons/i_pay_card_off.png">');	
	}
	if(mayPayMobile === true)
	{
		$('#mobilePay').append('<img src="./assets/images/icons/i_pay_mobile_on.png">');	
	}
	else
	{
		$('#mobilePay').append('<img src="./assets/images/icons/i_pay_mobile_off.png">');	
	}
	
	
	
	
	getAllProducts("food", pincode);
	getAllProducts("nonfood", pincode);
	
	
	$('#cashPay').bind("touchstart", function(){
		if(mayPayCash === true)
		{
			goToURL('paycash.html?pincode=' + pincode);
		}
	});
	$('#cardPay').bind("touchstart", function(){
		if(mayPayCard === true)
		{
			goToURL('paycard.html?pincode=' + pincode);
		}
	});
	$('#mobilePay').bind("touchstart", function(){
		if(mayPayMobile === true)
		{
			$.get(serviceURL + 'checkout.php?f=changeStatus&statusID=8&pincode=' + pincode + '', function(data){
				goToURL('paymobile.html?pincode=' + pincode);
			});
		}
	});
	
});




$(document).delegate('#pagePayCard', 'pageshow', function () {

	if(operatorModus == 'on')
	{
		$(".btnINeedHelp").hide();	
		$(".btnLine").hide();
	}
	bindButtons();
	setTimeout(function(){ 
		$("#swipeTxt").hide(0, function()
		{
			$("#pinnerdepin").show();		
		});
	 },3000);
	
	
	$('.button').bind("touchstart", function() {
			$(this).addClass('hoverPincode');
			
			var number = $(this).attr('id');
			$(this).addClass('hoverPincode');
			if(number == 'bs')
			{
		        var element = document.getElementById('code');
		        str = element.innerHTML;
				str = str.substring(0,str.length - 1);
				element.innerHTML = str;
				
			}
			else if(number == 'cc')
			{
	       	 	var element = document.getElementById('code');
				element.innerHTML = '';
				
			}
			else
			{
				$('#code').append('*');
				if (document.getElementById('code').innerHTML.length==4){
					$.get(serviceURL + 'checkout.php?f=changeStatus&statusID=10&pincode=' + pincode + '', function(data){
						goToURL('paymentComplete.html?pincode=' + pincode);
					});
				}
			}
	});
	$(".button").bind("touchend",function()
	{
		$(this).removeClass('hoverPincode');	
	});
});


$(document).delegate('#pagePayCash', 'pageshow', function () {
	
	if(operatorModus == 'on')
	{
		$(".btnINeedHelp").hide();	
		$(".btnLine").hide();
	}
	
	bindButtons();
	var GroenTimer = setInterval();
	
	function zetCashModuleAan()
	{
		startLed("cmd","on",ledCashIP);
		GroenTimer = setInterval(function(){ maakGroen(ledCashIP) },150);
	}
	
	zetCashModuleAan();
	//var i = 1;
	//function zetCashModuleUit(){
	//	startLed("cmd","off",ledCashIP);
	//	clearInterval(timing);
	//}
	var x = 0;
	function maakGroen(ip)
	{
		console.log(x + ' count');
		//alert(x);
		if(x == 0)
		{
			startLed('hue','100',ip);	
		}
		if(
			(x >= 0) && (x < 8)
		)
		{
			
			console.log(x + 'bright - up');
			startLed('cmd','brightup',ip);
		}
		else if(
			( x >= 8) && (x < 50)
		)
		{
			console.log(x + 'wachten');
			//startLed('cmd','off',ledCashIP);
			
		}
		else if(
			(x >= 51) && (x < 55)
		)
		{
			console.log(x + 'uit zetten');
			if(x == 51)
			{
				startLed('cmd','off',ip);
			}
		}
		else if(
			(x >= 56) && (x < 60)
		)
		{
			console.log(x + 'aan zetten');
			if(x == 56)
			{
				startLed('cmd','on',ip);
			}
		}
		else if(
			(x >= 61) && (x < 65)
		)
		{
			console.log(x + 'uit zetten');
			if(x == 61)
			{
				startLed('cmd','off',ip);
			}
		}
		else if(
			(x >= 66) && (x < 70)
		)
		{
			console.log(x + 'aan zetten');
			if(x == 66)
			{
				startLed('cmd','on',ip);
			}
		}
		else if(
			(x >= 71) && (x < 75)
		)
		{
			console.log(x + 'uit zetten');
			if(x == 71)
			{
				startLed('cmd','off',ip);
			}
		}
		else if(
			(x >= 76) && (x < 80)
		)
		{
			console.log(x + 'aan zetten');
			if(x == 76)
			{
				startLed('cmd','on',ip);
			}
		}
		else if(
			(x >= 80) && (x < 89)
		)
		{
			console.log(x + 'bright - down');
			startLed('cmd','brightdown',ip);
		}
		else if(x == 89)
		{
			startLed("cmd","off",ledCashIP);
			console.log(x + 'clear interval');
			
			
		}
		else if(x == 90)
		{
			clearInterval(GroenTimer);
			$.get(serviceURL + 'checkout.php?f=changeStatus&statusID=10&pincode=' + pincode + '', function(data){
				goToURL('paymentComplete.html?pincode=' + pincode);
			});
			//x = 0;	
		}
		x ++;
	}


});

$(document).delegate('#pagePaymentComplete', 'pageshow', function () {	
		bindButtons();
		if(operatorModus == "on")
		{
			$.get(serviceURL + 'checkout.php?f=renewOperator', function(data) {
					var timeOut = setTimeout(function(){ 
						goToURL('displaycheckout.html?code=9999');
					},5000)
				
			});
		}
		else
		{			
			var timeOut = setTimeout(function(){ 
				goToURL('code.html'); 
			},5000);		
		}
});


$(document).delegate('#pageSettings', 'pageshow', function () {

	bindButtons();
	$("#ipLedWire").val(ledWireIP);
	$("#ipLedCash").val(ledCashIP);
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPowered', function(data) {
		if (data == 'y'){
			$(".cbPoweredSwitch").prop('checked', true);
		}else{
			$(".cbPoweredSwitch").prop('checked', false);
		}
	});
	
	
	
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayCash', function(data) {
		if (data == 'y'){
			$(".cbPayCashSwitch").prop('checked', true);
		}else{
			$(".cbPayCashSwitch").prop('checked', false);
		}
	});
	
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayCard', function(data) {
		if (data == 'y'){
			$(".cbPayCardSwitch").prop('checked', true);
		}else{
			$(".cbPayCardSwitch").prop('checked', false);
		}
	});
	
	
	$.get(serviceURL + 'hardware.php?f=getHardwareSetting&type=hPayMob', function(data) {
		if (data == 'y'){
			$(".cbPayMobileSwitch").prop('checked', true);
		}else{
			$(".cbPayMobileSwitch").prop('checked', false);
		}
	});
	
	
	
	$('#poweredSwitch input').change( function () {
		if ($('#poweredSwitch input:checked').val() == "on") {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPowered&value=y');
		} else {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPowered&value=n');
		}
	});
	
	$('#payCashSwitch input').change( function () {
		if ($('#payCashSwitch input:checked').val() == "on") {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayCash&value=y');
		} else {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayCash&value=n');
		}
	});
	
	$('#payCardSwitch input').change( function () {
		if ($('#payCardSwitch input:checked').val() == "on") {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayCard&value=y');
		} else {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayCard&value=n');
		}
	});
	
	$('#payMobileSwitch input').change( function () {
		if ($('#payMobileSwitch input:checked').val() == "on") {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayMob&value=y');
		} else {
			$.get(serviceURL + 'hardware.php?f=changeHardwareSetting&type=hPayMob&value=n');
		}
	});
	
	$(".btnBack").on("touchstart", function()
	{
		goToURL('index.html');	
	});
	
	$("#effectup").on("touchstart", function()
	{
			startLed('cmd','effectup',ledWireIP);
	});
	$("#effectdown").on("touchstart", function()
	{
			startLed('cmd','effectdown',ledWireIP);
	});
	
	$("#resetButton").on("touchstart",function()
	{
		$.get(serviceURL + 'checkout.php?f=MEGARESTORE', function()
		{
			$("#reset").html('All orders have been removed');
		});
		//alert('via API all statusses of table.order	will be set to 10');
	});
});

$(document).delegate('#pagePayMobile', 'pageshow', function () {

	bindButtons();
	var tellertje = setInterval();
	var returnValue = "";
	function getPayStatus() 
	{
		$.get(serviceURL + 'checkout.php?f=checkStatus&pincode=' +  pincode + '', function(data){
			returnValue = data;
		});
		return returnValue;
		
	}

	function checkStatus()
	{
		var orderstatus = getPayStatus();
		if (orderstatus == "1"){
			//getPayStatus();
		}else if(orderstatus  == "2")
		{
			clearInterval(tellertje);
			goToURL('displaycheckout.html?pincode=' + pincode);
		}
		else if(orderstatus  == "8")
		{
			//$.get(serviceURL + 'checkout.php?f=getTotalAmount&pincode=' +  pincode, function(data){
//	
			//});
	
		}
		else if(orderstatus  == "10")
		{
			clearInterval(tellertje);
			//$.get(serviceURL + 'checkout.php?f=getOrderListWithQR&pincode=' +  pincode, function(data){
				goToURL('paymentComplete.html?pincode=' + pincode);
			//});
		}
		console.log("DE STATUS IS: " + orderstatus);
	}

	tellertje = setInterval(function(){checkStatus()},20);
});

$(document).delegate('#checkoutClosed', 'pageshow', function () {

	$("#hiddenButton").on("touchstart", function()
	{
		goToURL('settings.html');
	});	

});