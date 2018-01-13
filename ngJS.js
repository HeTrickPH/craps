(function() {

angular.module('crapsApp', [])
                   .controller('crapsCtrlr', 
function myCtlr($scope) {

$scope.PassLine = 0;
$scope.OddPassLine = 0;

var placeNumbers = [
	{'num': 4, 'placeodd': 9/5, 'trueodd': 2/1, amtbet: 0},
	{'num': 5, 'placeodd': 7/5, 'trueodd': 3/2, amtbet: 0},
	{'num': 6, 'placeodd': 7/6, 'trueodd': 6/5, amtbet: 0},
	{'num': 8, 'placeodd': 7/6, 'trueodd': 6/5, amtbet: 0},
	{'num': 9, 'placeodd': 7/5, 'trueodd': 3/2, amtbet: 0},
	{'num': 10, 'placeodd': 9/5, 'trueodd': 2/1, amtbet: 0}
];

var hardWaysNumbers = [
	{'num': "2-2", 'easyWay': 4, 'placeodd': 8, amtbet: 0},
	{'num': "3-3", 'easyWay': 6, 'placeodd': 10, amtbet: 0},
	{'num': "4-4", 'easyWay': 8, 'placeodd': 10, amtbet: 0},
	{'num': "5-5", 'easyWay': 10, 'placeodd': 8, amtbet: 0}
];

var hornNumbers = [
	{'num': "1-1", 'placeodd': 30, amtbet: 0},
	{'num': "1-2", 'placeodd': 15, amtbet: 0},
	{'num': "6-5", 'placeodd': 15, amtbet: 0},
	{'num': "6-6", 'placeodd': 30, amtbet: 0}
];

var D1_dot;
var D2_dot;
	
 $scope.currentBetAmount = 1;
// Not sure?
$scope.onNumber = 'off';
$scope.diceNum = "";
$scope.eren = 0;
$scope.loose = 0;
$scope.betOnTheBoard = 0;
	
var placeWillBeON;
var MoneyYouWin = 0;
// Initialize values that get "bind"ed
$scope.cashInWallet = 8000000000;
$scope.placeNumbers = [];
placeNumbers.map( pn => $scope.placeNumbers.push(pn));
$scope.hardWaysNumbers = [];
hardWaysNumbers.map( hwn => $scope.hardWaysNumbers.push(hwn));
$scope.hornNumbers = [];
hornNumbers.map( x => $scope.hornNumbers.push(x) );
 
//betting on place bet
$scope.addToPlaceBet = function(numberToBetOn) {     
                var placeBet = _.find($scope.placeNumbers, x => x.num == numberToBetOn) ;
                if (placeBet!=undefined) {
                    placeBet.amtbet += $scope.currentBetAmount;
                	$scope.cashInWallet -= $scope.currentBetAmount;
                }            
                $scope.currentOp = "done with addtoplacebet..." + numberToBetOn;
	BetOnBoard();
};

//betting on Hard Way
$scope.betOnHardWays = function(hardwaycallout) {
                var HardWaysbet = _.find(hardWaysNumbers, { 'num' : hardwaycallout });
                if (HardWaysbet!=undefined) {
                                HardWaysbet.amtbet += $scope.currentBetAmount;
                                $scope.cashInWallet -= $scope.currentBetAmount;
                }
                $scope.currentOp = "done with betOnHardWays..." + hardwaycallout;
	BetOnBoard();
};

//betting on Horn Bet
$scope.betOnHorn = function(horncallout) {
                var HornBet = _.find(hornNumbers, { 'num' : horncallout });
                if (HornBet!=undefined) {
                                HornBet.amtbet += $scope.currentBetAmount;
                                $scope.cashInWallet -= $scope.currentBetAmount;
                }
                $scope.currentOp = "done with betOnHorn..." + horncallout;
	BetOnBoard();
};

// this is choose $scope.currentBetAmount that I want use
$scope.chooseCurrentBetAmount = function(value) {
                $scope.currentBetAmount = value;
};
 
// This function handles the come out roll or th first roll
$scope.comeoutRoll = function() {
				$scope.loose = 0;
                var DiceDot = newDiceRoll();
                if (DiceDot == 7 || DiceDot == 11) {
                                $scope.cashInWallet += $scope.PassLine * 1;
								MoneyYouWin += $scope.PassLine * 1
                } else if (DiceDot == 2 || DiceDot ==  3 || DiceDot == 12) {
                                $scope.PassLine = 0;
                } else {
                                $scope.onNumber = DiceDot;
                                placeWillBeON = "onBtn" + DiceDot;
                                document.getElementById(placeWillBeON).innerHTML = "<img class='onBut' src='img/onButton.png' width='42px' height='42px'>";
                                //displayRollDice(true);
                }
                calcHardWaysbet();
                calcHornbet();
				//Need To ask better Way!!!!!!!
                hornNumbers.forEach(item => $scope.loose+= item.amtbet);
				hornNumbers.forEach(item => item.amtbet= 0);
				if ($scope.loose == 0) {
					$scope.loose = "";
				}
				thatIGot();
	BetOnBoard();
};


// Place a pass line bet
$scope.addToPassLineBet = function() {
	if ($scope.PassLine != undefined) {
		$scope.PassLine += $scope.currentBetAmount;
        $scope.cashInWallet -= $scope.currentBetAmount;
	}
	$scope.currentOp = "done with Pass Line...Pass Line";
	BetOnBoard();
};
 
// Place a odd pass line bet
$scope.OddPassLineBet = function() {
	if ($scope.OddPassLine != undefined) {
		$scope.OddPassLine += $scope.currentBetAmount;
        $scope.cashInWallet -= $scope.currentBetAmount;
	}
	$scope.currentOp = "done with Pass Line...Odd Pass Line";
	BetOnBoard();
};

$scope.rollDice = function(){
	debugger;
		   		$scope.loose = 0;
                var DiceDot = newDiceRoll();
                if (DiceDot == 7) {
					placeNumbers.forEach(item => $scope.loose+= item.amtbet,);
					placeNumbers.forEach(item => item.amtbet= 0);
                	hardWaysNumbers.forEach(item => $scope.loose+= item.amtbet) ;
					hardWaysNumbers.forEach(item => item.amtbet= 0) ;
                	$scope.PassLine = 0;
                	$scope.OddPassLine = 0;
                	$scope.onNumber = "Off";
                	document.getElementById(placeWillBeON).innerHTML = "";
					$scope.currentBetAmount = 0;
                	//displayRollDice(false);
                }
                else if (DiceDot == $scope.onNumber) {
					$scope.cashInWallet += ($scope.PassLine * 1);
					MoneyYouWin += $scope.PassLine * 1;
                	calcOddPassLineBet(DiceDot);
                	document.getElementById(placeWillBeON).innerHTML = "";
					calcPlaceBet(DiceDot);
					calcHardWaysbet();
                	calcHornbet();
                	//displayRollDice(false);
				}
				if (placeBet!=undefined) {
					calcPlaceBet(DiceDot);
                	calcHardWaysbet();
                	calcHornbet();
				}
	hornNumbers.forEach(item => $scope.loose+= item.amtbet);
	hornNumbers.forEach(item => item.amtbet= 0);
	thatIGot();
	if ($scope.loose == 0) {
		$scope.loose = "";
	}
	BetOnBoard();
};

function BetOnBoard() {
	debugger;
	$scope.betOnTheBoard = 0;
	placeNumbers.forEach(item => $scope.betOnTheBoard+= item.amtbet);
	hardWaysNumbers.forEach(item => $scope.betOnTheBoard+= item.amtbet);
	hornNumbers.forEach(item => $scope.betOnTheBoard+= item.amtbet);
}
	
function thatIGot() {
	if (MoneyYouWin != 0) {
		$scope.eren = "You eren $" + MoneyYouWin;
		MoneyYouWin = 0;
	} else {
		$scope.eren = "";
	}
} 

function displayRollDice(comeOutRoll) {
                if (comeOutRoll == true) {
                // show the second roll button
                $("#Roll_second").show();
                // hide the first Roll button
                $("#Roll_first").hide();
                } else {
                // show the second roll button
                $("#Roll_second").hide();
                // hide the first Roll button
                $("#Roll_first").show();
                }
}

// This function rolls the dice

function newDiceRoll() {
                D1_dot = _.random(1,6);
                D2_dot = _.random(1,6);
                document.getElementById("D1").innerHTML = "<img src='img/redDice"+ D1_dot + ".png' width='60px' height='60px'>";
                document.getElementById("D2").innerHTML = "<img src='img/redDice"+ D2_dot + ".png' width='60px' height='60px'>";
                var Dot_sum = D1_dot + D2_dot;
				$scope.diceNum = D1_dot + D2_dot
                return Dot_sum;
}



function calcOddPassLineBet(Dot) {
                var placeBet = _.find(placeNumbers, { 'num' : Dot });
				$scope.cashInWallet += Math.floor($scope.OddPassLine * placeBet.trueodd);
	               $scope.onNumber = "Off";
				MoneyYouWin += Math.floor($scope.OddPassLine * placeBet.trueodd);
}
 
//calculate place bet
function calcPlaceBet(Dot) {
	debugger;
                var placeBet = _.find(placeNumbers, { 'num' : Dot }) ;
                if (placeBet!=undefined) {
					$scope.cashInWallet += Math.floor(placeBet.amtbet * placeBet.placeodd);
					MoneyYouWin += Math.floor(placeBet.amtbet * placeBet.placeodd);
                }
}
 
//calculate Hard Way bet
function calcHardWaysbet() {
                var Dot;
                var HardWaysbet;
                if (D1_dot == D2_dot) {
                                Dot = D1_dot + "-" + D2_dot;
                                HardWaysbet = _.find(hardWaysNumbers, { 'num' : Dot }) ;
                                if (HardWaysbet!=undefined) {
                                    $scope.cashInWallet += Math.floor(HardWaysbet.amtbet * HardWaysbet.placeodd);
									MoneyYouWin += Math.floor(HardWaysbet.amtbet * HardWaysbet.placeodd);
                                }
                } else {
                                Dot = D1_dot + D2_dot;
                                HardWaysbet = _.find(hardWaysNumbers, { 'easyWay' : Dot }) ;
                                if (HardWaysbet!=undefined) {
									$scope.loose += HardWaysbet.amtbet;
									HardWaysbet.amtbet = 0;
                                }
                }
}
 
function calcHornbet() {
                debugger;
                var Dot = D1_dot + "-" + D2_dot;
                var HornBet = _.find(hornNumbers, { 'num' : Dot }) ;
                if (HornBet!=undefined) {
                   $scope.cashInWallet += Math.floor(HornBet.amtbet * HornBet.placeodd);
					MoneyYouWin +=  Math.floor(HornBet.amtbet * HornBet.placeodd);                
				}
}                         
  });
}) ();