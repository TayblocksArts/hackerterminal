

function smart_split(input, del, empty_space) {
    if (input.length === 0) return input;
    var outputs = [""];

    var compare = function(base, insert, position) {
        if ((position + insert.length) > base.length) return false;
        for (var i = 0; i < insert.length; i++) {
            if (!(base.charAt(position + i) === insert.charAt(i))) return false;
        }
        return true;
    };

    var quotes = false;
    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        if (char === '"') {
            quotes = !quotes;
            continue;
        }

        if (!quotes && compare(input, del, i)) {
            outputs.push("");
            i += del.length - 1;
            continue;
        }

        outputs[outputs.length - 1] += char;
    }

    if (!empty_space) {
        for (var i = 0; i < outputs.length; i++) {
            if (outputs[i] === "") {
                outputs.splice(i, 1);
            }
        }
    }

    return outputs;
}

var terminal_user_title = "C: Undefined/username";

function update_user_title(title) {
    terminal_user_title = title;
    document.getElementById("input_title").innerText = terminal_user_title + " > ";
}

update_user_title(terminal_user_title);

var current_block;

function new_block() {
    var wrapper = document.getElementById('wrapper');
    current_block = document.createElement("div");
    current_block.classList.add("log");
    wrapper.appendChild(current_block);
}

function block_log(message) {
    current_block.innerHTML += "<p>" + message + "</p>";
}

function log(message) {
    var wrapper = document.getElementById('wrapper');
    wrapper.innerHTML += "<div class='log'><p>" + message + "</p></div>";
}

document.getElementById('input_source').onblur = function() {
    document.getElementById("input_source").focus();
};

document.getElementById('input_source').addEventListener('keyup', submit_command);

var registry = new Map();

function register_cmd(cmd_name, func) {
    registry.set(cmd_name.toString().toUpperCase(), func);
}

function submit_command() {
    event.preventDefault();
    if (!(event.keyCode === 13)) return;
    var command = document.getElementById("input_source").value;
    document.getElementById("input_source").value = "";

    new_block();
    block_log(terminal_user_title + " > " + command);

    if (registry.has(command.split(" ")[0].toUpperCase())) {
        registry.get(command.split(" ")[0].toUpperCase())(command);
    } else {
        block_log("'" + command.split(" ")[0].toUpperCase() + "' ist kein registierter Befehl. \nSchreibe `befehle`, um alle Befehle zu sehen.");
    }
}

register_cmd("befehle", function(cmd) {
    block_log("Registierte Befehle: ");
    registry.forEach(function(value, key, map) {
        block_log("    - " + key);
    });
});


register_cmd("start", function(cmd) {
    block_log("In der Polizeistation, gibt es auf Rechner-U8 einen Code, um auf die Knastzelle zuzugreifen.\nMit rechnerliste, kriegst du alle Rechner aus dem Polizeinetzwerk.");

    let audio2 = document.getElementById("voice2");
   
    function playAudio() {
      audio2.play();
    }
    
    playAudio()
});


register_cmd("rechnerliste", function(cmd) {
    block_log("Rechner-U1, Rechner-U2, Rechner-U3, Rechner-U4, Rechner-U5, Rechner-U6, Rechner-U7, Rechner-U8, Rechner-U9, Rechner-U10");
    block_log("Mit `connect+`, dann der Rechnername, verbindest du dich mit deinem gewuenschten Rechner.")
    
    let audio = document.getElementById("voice3");
   
    function playAudio() {
      audio.play();
    }
    
    playAudio()
});

register_cmd("connect+Rechner-U8", function(cmd) {
    block_log('Super! Jetzt hast du Zugriff auf die Webcam ...<br><img src="webcam.png" alt="Webcam Access" width="500" />');
    console.log("https://pngtree.com/freepng/camera-viewfinder_5534237.html'")
    block_log("Schaue dir das Bild gut an, denn im Bild ist der naechste Code versteckt.")
    block_log("Tipp: Schaue dir gut die roten Balken an und das + in der Mitte.")
    block_log("Wenn du den Code hast, dann druecke Alt und gleichzeitig die Taste F4, um das Terminal zu schliessen.")
    
    let audio = document.getElementById("voice4");
   
    function playAudio() {
      audio.play();
    }
    
    playAudio()
});




register_cmd("hilfe", function(cmd) {
    var parameters = smart_split(cmd, " ", false).slice(1);
    console.log(parameters);
    if (parameters.length === 0) {
        block_log("Schreibe `befehle`, um alle Befehle zu sehen mit einer Erklearung.");
        return;
    }

    if (parameters[0].toString().toUpperCase() === "TITLE") {
        if (parameters.length === 1) {
            block_log("Please Specify title you would like to update the User Title!");
            return;
        }
        update_user_title(parameters[1]);
        block_log("Successfully Updated User Title!");
        return;
    }

});