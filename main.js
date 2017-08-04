// Write your JavaScript here
var $button = $("#calculate-change");
var $sale = $("#amount-due");
var $customer = $("#amount-received");

var $twenty = $("#twentyOutput");
var $ten = $("#tenOutput");
var $five = $("#fiveOutput");
var $two = $("#twoOutput");
var $dollar = $("#dollarsOutput");
var $quarter = $("#quartersOutput");
var $dime = $("#dimesOutput");
var $nickel = $("#nickelsOutput");
var $pennies = $("#penniesOutput");


function calculateChange(amountDue, amountRec) {
    var amountDue = parseInt(amountDue * 100);
    var amountRec = parseInt(amountRec * 100);

    var changeValue = {
        dollars: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
    }
    
    var change = amountRec - amountDue;

    //Calculate dollars
    if(change / 100 >= 1) {
    changeValue.dollars = Math.floor(change / 100);
    change = change % 100;
    }

    //calculate quarters
    if(change / 25 >= 1) {
    changeValue.quarters = Math.floor(change / 25);
    change = change % 25;
    }

    //calculate dimes
    if(change / 10 >= 1) {
    changeValue.dimes = Math.floor(change / 10);
    change = change % 10;
    }
    //calculate nickels
    if(change / 5 >= 1) {
    changeValue.nickels = Math.floor(change / 5);
    change = change % 5;
    }
    //calculate pennies
    changeValue.pennies = Math.floor(change / 1);

    return changeValue;
}

function handleClickEvent() {
    var amountDue = $sale.val();
    var amountRec = $customer.val();
    var change = calculateChange(amountDue, amountRec);

    $twenty.text(change.twenty);
    $ten.text(change.ten);
    $five.text(change.five);
    $two.text(change.two);
    $dollar.text(change.dollars);
    $quarter.text(change.quarters);
    $dime.text(change.dimes);
    $nickel.text(change.nickels);
    $pennies.text(change.pennies);
}

$button.click(handleClickEvent);