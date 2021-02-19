// USER DEFINED VARIABLES

const MAX_CHAR = 12;

// -------------------------

let div_input = document.getElementById("input");

let content = "";

function isCharNumber(chr) {
    let num = Number(chr);
    if (num >= 0 && num <= 9)
        return true;
    return false;
}

function calculate(str) {
    
    let cont = [];
    let res = 0;

    // if last character is special character remove it
    if (!isCharNumber(str.slice(-1))) {
        str = str.slice(0, -1);
    }

    // Split string with signs at the end
    let n = str.length;
    let tmp = "";
    for (let i = 0; i < n; i++) {
        if (!isCharNumber(str[i])) {
            cont.push({ "num" : Number(tmp), "sign" : str[i] });
            tmp = "";
            continue;
        }
        
        tmp += str[i];
    }
    cont.push({ "num" : Number(tmp), "sign" : "" });
    
    // Actually calculate whole string with signs
    let signs = [ ['*', '/'], ['+', '-'] ];
    for (let i = 0; i < 2; i++) {
        n = cont.length;

        for (let j = 0; j < n; j++) {
            // Check if its multiplication first then for addition
            if ((cont[j]).sign == signs[i][0] || (cont[j]).sign == signs[i][1]) {
                switch ((cont[j]).sign) {
                    case '*':
                        res = (cont[j]).num * (cont[j + 1]).num;
                        break;
                    case '/':
                        res = (cont[j]).num / (cont[j + 1]).num;
                        break;
                    case '+':
                        res = (cont[j]).num + (cont[j + 1]).num;
                        break;
                    case '-':
                        res = (cont[j]).num - (cont[j + 1]).num;
                        break;
                }
                // Set next object in a row to result then delete this object
                (cont[j + 1]).num = res;
                cont.splice(j, 1);
                // Basically repeat this whole section
                n--;
                i--
            }
        }
    }
    // Return the last number standing
    return (cont[0]).num;
}

function clearall() {
    content = "";
}

function clicked(element) {
    let div_content = element.textContent;

    switch(div_content) {
        case "C":
            clearall();
            break;
        case "del":
            // Removes last letter
            content = content.slice(0, -1);
            break;
        case ",":
            // TODO: Float numbers
            break;
        case "=":
            // Cast result to string and add it to content
            content = String(calculate(content));
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
                // Can't be the first char
                if (content == "")
                    return;
                // If it's longer than defined or if the special character is 2 times in a row
                if (content.length > MAX_CHAR || !isCharNumber(content.slice(-1))) {
                    // Just replace last character with new character
                    content = content.slice(0, -1);
                }

                content += div_content;
            }
    }

    // If content is empty add &nbsp so that div_input doesn't collapse else just set it to content
    if (content.length == 0) {
        div_input.innerHTML = "&nbsp"
        return;
    }
    div_input.innerHTML = content;
}