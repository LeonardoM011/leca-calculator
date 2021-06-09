// USER DEFINED VARIABLES

const MAX_CHAR = 12;

// -------------------------
let div_input = document.getElementById("input");
let table_history = document.getElementById("history");

let content = "";
let result = "";

function isCharNumber(chr) {
    let num = Number(chr);
    if (num >= 0 && num <= 9)
        return true;
    return false;
}

function removeLastIfIllegal(str) {
    // Remove last character if it's not a number
    if (!isCharNumber(str.slice(-1))) {
        str = str.slice(0, -1);
    }
    return str;
}

function calculate(str) {
    // Do calculations if str not empty
    if (str.length > 0) {
        str = eval(str);
    }
    return str;
}

function updateDiv(str) {
    // Keep content length at max defined length
    if (content.length >= MAX_CHAR) {
        content = content.slice(0, MAX_CHAR);
    }
    // Update html element with content
    div_input.innerHTML = content;
    return content;
}

function updateTable(num, str) {
    let row = table_history.insertRow(-1);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = "0";
    let cell2 = row.insertCell(1);
    cell2.innerHTML = str;
}

function clicked(element) {
    let div_content = element.textContent;

    switch(div_content) {
        case "C":
            // Deletes whole string
            content = "";
            break;
        case "del":
            // Removes last letter
            content = content.slice(0, -1);
            break;
        case "=":
            // Cast result to string and add it to content
            result = content = removeLastIfIllegal(content);
            content = String(calculate(content));

            content = updateDiv(content);

            // Add content to result so 2+2 gets equal to 2+2=4
            result += "=" + content;
            postResult(result);
            break;
        default:
            // If it's a number
            if (isCharNumber(div_content)) {
                // If it's longer than defined
                if(content.length > MAX_CHAR) 
                    return;
                content += div_content;
            }
            // If it's a character / * + -
            else {
                // It looks better
                if (div_content == ',') {
                    div_content = '.'
                }
                // If it's longer than defined or if the special character is 2 times in a row
                if (content.length > MAX_CHAR || !isCharNumber(content.slice(-1))) {
                    // Just replace last character with new character
                    content = content.slice(0, -1);
                }
                // If its not first char or - sign add it to content
                if (content.length > 0 || div_content == '-') {
                    content += div_content;
                }
            }
    }

    // If content is empty add &nbsp so that div_input doesn't collapse else just set it to content
    if (content.length == 0) {
        div_input.innerHTML = "&nbsp"
        return;
    }
    
    content = updateDiv(content);
}

// Sends json post request to server
function postResult(str) {
    $.ajax({
        type : "POST",
        url : '/',
        dataType: "json",
        data: JSON.stringify(str),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            updateTable(0, str);
            console.log(data);
            
        }
    });
}