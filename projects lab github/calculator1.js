function getHistory()
{
    return document.getElementById('history-value').innerText;
}
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num)
{
    if (num=="") {
                document.getElementById("output-value").innerText=num;
    }
    else
    {

        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}
function getFormattedNumber(num) {
    var n=Number(num);
    var value =n.toLocaleString("en");
    return value;
}

function removeNumberFormat(num)
{   
    return Number(num.replace(/,/g,''));
}


   var number = document.getElementsByClassName("number");
        for(var j=0;j<number.length;j++){
            number[j].addEventListener('click',function(){
                var answer=removeNumberFormat(getOutput());
                if(answer!=NaN){ //if answer is number
                    answer=answer+this.id;
                    printOutput(answer);
                }
            });
        }


var operator=document.getElementsByClassName('operator');
// console.log(operator[0]);


for(var i=0;i<operator.length;i++)
{
    operator[i].addEventListener('click', function() 
    {
        if(this.id=="clear"){
            // console.log(this.id)
                    printHistory("");
                    printOutput("0");
                }
                else if(this.id=="backspace"){
                    var answer=removeNumberFormat(getOutput()).toString();
                    if(answer){
                         answer=answer.substring(0,answer.length-1);
                         printOutput(answer);
                    }
              }
              else
              {
                    var answer=getOutput();
                    // console.log(answer);
                    var history=getHistory();
                    console.log(history);

             if (answer!='') {
                        answer=removeNumberFormat(answer);
                        history=history+answer;
                        // console.log(history)
                    
                    if(this.id=="="){
                            var result=eval(history);
                            printOutput(result);
                            printHistory("");
                    }
                      else{
                            history+=this.id;
                            // console.log(history)
                            printHistory(history);
                            printOutput("");
                        }
              }
          }
    });
}

//
