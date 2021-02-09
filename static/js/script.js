let div_input = document.getElementById("input");

/*let div_divider = document.getElementById("divider");
let div_multiplier = document.getElementById("multiplier");
let div_clear = document.getElementById("clear");
let div_delete = document.getElementById("delete");
let div_minus = document.getElementById("minus");
let div_equal = document.getElementById("equal");
let div_comma = document.getElementById("comma");

let div_zero = document.getElementById("zero");
let div_one = document.getElementById("one");
let div_two = document.getElementById("two");
let div_three = document.getElementById("three");
let div_four = document.getElementById("four");
let div_five = document.getElementById("five");
let div_six = document.getElementById("six");
let div_seven = document.getElementById("seven");
let div_eight = document.getElementById("eight");
let div_nine = document.getElementById("nine");*/

let content = "";
let first_half = 0;
let second_half = 0;
let is_second_half = false;

function clearall() {
    content = "";
    first_half = 0;
    second_half = 0;
    is_second_half = false
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

        case "+":
            
            break;
        default:
            if (div_content >= 0 && div_content <= 9) {
                if(content.length > 12) 
                    return;
                content += div_content;
            }
    }

    // If content is empty add &nbsp so that div_input doesn't collapse else just set it to content
    if(content.length == 0) {
        div_input.innerHTML = "&nbsp"
        return;
    }
    div_input.innerHTML = content;
}