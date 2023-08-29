
function getValues(){
    let amount = document.getElementById("loanAmt").value;
    let payments = document.getElementById("payments").value;
    let rate = document.getElementById("rate").value;

    amount = Number.parseInt(amount);
    payments = Number.parseInt(payments);
    rate = Number.parseInt(rate);

    let results = calculatePayments(amount, payments, rate);

    displayPayments(results, amount)

}

function calculatePayments(amount, payments, rate){

    let results = []
    let month = 0;
    let monthPayment = 0;
    let principal = 0;
    let interest = 0;
    let totalInterest = 0;
    let balance = amount;

    for(let i = 1; i<= payments; i ++ ){
        month = i;
        monthPayment = amount * (rate / 1200) / (1- (1+rate/1200)**(-payments));
        interest = balance * rate/1200;
        principal = monthPayment - interest;
        balance = balance- principal;
        totalInterest = totalInterest + interest;

        //need to add this into table data
        results.push(month);
        results.push(monthPayment.toFixed(2));
        results.push(principal.toFixed(2));
        results.push(interest.toFixed(2));
        results.push(totalInterest.toFixed(2));
        results.push(balance.toFixed(2));

    }
    return results

}

function displayPayments(results, amount){
     //get the table body element from the page
     let tableBody = document.getElementById("results");

     //get the row from the template
     let templateRow = document.getElementById("calcTemplate");
 
     //clear table first
     tableBody.innerHTML = "";

     let monthlyPayments = 0;
     let totalInterest = 0;
 
     for (let i = 0; i < results.length; i += 6) {
         let tableRow = document.importNode(templateRow.content, true);
         //grab only the columns in the template
         let rowCols = tableRow.querySelectorAll("td");
 
         rowCols[0].classList.add(results[i]);
         rowCols[0].textContent = results[i];
         
        
         rowCols[1].classList.add(results[i+ 1]);
         rowCols[1].textContent = results[i + 1];
         monthlyPayments = results[i+1];
        
         rowCols[2].classList.add(results[i+2]);
         rowCols[2].textContent = results[i + 2];
        
         rowCols[3].classList.add(results[i+3]);
         rowCols[3].textContent = results[i + 3];
        
         rowCols[4].classList.add(results[i+4]);
         rowCols[4].textContent = results[i + 4];
         totalInterest = results[i + 4];

         rowCols[5].classList.add(results[i+5]);
         rowCols[5].textContent = results[i + 5];
 
         tableBody.appendChild(tableRow);
     }

     amount = Number.parseInt(amount);
     totalInterest = Number.parseInt(totalInterest);
     let totalCost = totalInterest + amount;
     document.getElementById("monthlyPay").innerText = "$"+monthlyPayments;
     document.getElementById("monthlyPay").classList.remove("invisible");
     document.getElementById("monthlyPay").classList.add("boldM");

     document.getElementById("totalPrincipal").innerText = "$"+amount;
     document.getElementById("totalPrincipal").classList.remove("invisible");

     document.getElementById("totalInterest").innerText = "$"+totalInterest;
     document.getElementById("totalInterest").classList.remove("invisible");
     
     document.getElementById("totalCost").innerText = "$"+totalCost;
     document.getElementById("totalCost").classList.remove("invisible");
     document.getElementById("totalCost").classList.add("boldM");
}