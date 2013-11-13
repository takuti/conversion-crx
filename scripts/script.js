/*-- タブ処理 using jQuery --*/
$(function(){
	$("#wrapper").children().hide();
	if(localStorage.tabCondition) $("#" + localStorage.tabCondition + "-conv").show();
	else $("#num-conv").show();
});

$(".tab:nth-child(1)").click(function(){
	$("#wrapper").children().hide();
	$("#num-conv").show();
	localStorage.tabCondition = 'num';
});

$(".tab:nth-child(2)").click(function(){
	$("#wrapper").children().hide();
	$("#color-conv").show();
	localStorage.tabCondition = 'color';
});

$(".tab:nth-child(3)").click(function(){
	$("#wrapper").children().hide();
	$("#html-conv").show();
	localStorage.tabCondition = 'html';
});

/*--- 進数変換 ---*/
function numController($scope){
	function saveNumToLocalStorage(){
		localStorage.binary = $scope.num.binary;
		localStorage.decimal = $scope.num.decimal;
		localStorage.hex = $scope.num.hex;
	}

	// init
	$scope.num = {'binary':localStorage.binary, 'decimal':localStorage.decimal, 'hex':localStorage.hex};

	$scope.binary_pattern = /^[01]*$/;
	$scope.decimal_pattern = /^[0-9]*$/;
	$scope.hex_pattern = /^[0-9A-Fa-f]*$/;

	$scope.binary = function(){
		if($scope.num.binary && parseInt($scope.num.binary,2) < 9007199254740992){
			$scope.num.decimal = parseInt($scope.num.binary,2);
			$scope.num.hex = parseInt($scope.num.binary,2).toString(16);
		} else {
			$scope.num.decimal = '';
			$scope.num.hex = '';
		}
		saveNumToLocalStorage();
	};

	$scope.decimal = function(){
		if($scope.num.decimal && parseInt($scope.num.decimal) < 9007199254740992){
			$scope.num.binary = parseInt($scope.num.decimal).toString(2);
			$scope.num.hex = parseInt($scope.num.decimal).toString(16);
		} else {
			$scope.num.binary = '';
			$scope.num.hex = '';
		}
		saveNumToLocalStorage();
	};

	$scope.hex = function(){
		if($scope.num.hex && parseInt($scope.num.hex,16) < 9007199254740992){
			$scope.num.binary = parseInt($scope.num.hex,16).toString(2);
			$scope.num.decimal = parseInt($scope.num.hex,16);
		} else {
			$scope.num.binary = '';
			$scope.num.decimal = '';
		}
		saveNumToLocalStorage();
	};
}


/*--- カラーコード・RGB変換 ---*/
function colorController($scope) {
	function saveColorToLocalStolage(){
		localStorage.color = $scope.color.code;
	}

	// init
	if(localStorage.color) {
		var rgb_color = new RGBColor(localStorage.color);
		$scope.color = {'r':rgb_color.r, 'g':rgb_color.g, 'b':rgb_color.b, 'code':localStorage.color};
	} else {
		$scope.color = {'r':0, 'g':0, 'b':0, 'code':'#000000'};
	}

	$scope.rgb_pattern = /^[0-9]{1,3}$/;
	$scope.code_pattern = /^((|#)[0-9A-Fa-f]{6}|(|#)[0-9A-Fa-f]{3})$/;

	$scope.rgb2code = function(){
		if($scope.color.r && $scope.color.g && $scope.color.b){
			var rgb_color = new RGBColor("rgb("+$scope.color.r+","+$scope.color.g+","+$scope.color.b+")");
			$scope.color.code = rgb_color.toHex();
		} else {
			$scope.color.code = '';
		}
		saveColorToLocalStolage();
	};

	$scope.code2rgb = function(){
		if($scope.color.code){
			var code_color = new RGBColor($scope.color.code);
			$scope.color.r = code_color.r;
			$scope.color.g = code_color.g;
			$scope.color.b = code_color.b;
		} else {
			$scope.color.r = '';
			$scope.color.g = '';
			$scope.color.b = '';
		}
		saveColorToLocalStolage();
	};
}

/*--- HTMLエスケープ ---*/
function htmlEscapeController($scope) {
	$scope.escape = function(){
		var resultTmp = $scope.escape_target.replace(/&/g,"&amp;");
		resultTmp = resultTmp.replace(/"/g,"&quot;");
		resultTmp = resultTmp.replace(/'/g,"&#039;");
		resultTmp = resultTmp.replace(/</g,"&lt;");
		resultTmp = resultTmp.replace(/>/g,"&gt;");
		$scope.escape_result = resultTmp;
	};
}