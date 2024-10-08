async function Load() {
    await createSettings();
    loadLocalSettings();
    console.table(settings);
}

$(document).ready(function() {
    Load(); 
});

$(document).on("click", "input", function() {
    var song_type = $(this).attr("class");
    var group_name = $(this).attr("id").split("-");
    for (let i = 0; i < 4; i++) {
        if(group_name[0] == groups[i][0]){
            updateInputSettings(i, song_type);;
        }
    }
});

$(document).on("click", ".option_image", function() {
    var group_name = $(this).attr("id");
    group_name = group_name.slice(0, group_name.length-4); //Removes the "_img" from the id
    var temp_set = getGroupSetting(group_name); 
    if(settings[temp_set[0]][temp_set[1]]){
        $(this).css("filter", "brightness(50%)");
    }else{
        $(this).css("filter", "brightness(100%)");
    }
    updateGroupSettings(temp_set);
});

$(document).on("click", ".nijigasaki-option", function() {
    var niji_name = $(this).attr("id");
    var niji_id = getNijigasakiSoloSettings(niji_name);

    if(settings[2][5][niji_id]){
        $("#"+niji_name+"_img").css("filter", "brightness(50%)");
        $(this).css("background-color", "#997F42");
    }else{
        $("#"+niji_name+"_img").css("filter", "brightness(100%)");
        $(this).css("background-color", "#FBD06C");
    }
    
    updateNijigasakiSoloSettings(niji_id);
});

function fadeOutSettings(){
    $('#panel-box').fadeOut(0);
    $('#img-exit-settings').fadeOut(0);
    $('.settings-background').fadeOut(0);
    $('#panel-box').css("display","none");
}

$("#button-settings").on( "click", function() {
    $('#panel-box').fadeIn(500);
    $('#img-exit-settings').fadeIn(500);
    $('.settings-background').fadeIn(500);
    $('#panel-box').css("display","flex");
});

$(document).on("click", "#img-exit-settings, .settings-background, #button_save", function() {
    fadeOutSettings();
});

$(document).on("click", "#button_reset", function() {
    resetSettings(settings);
    console.table(settings);
    localStorage.setItem("localSettings", JSON.stringify(settings));
    loadLocalSettings();
});

function resetSettings(settings) {
    settings.forEach(function(item, index) {
        if (Array.isArray(item)) {
            resetSettings(item); // recursive call for the nijigasaki solos sub array
        } else {
            settings[index] = 1;
        }
    });
}


$(document).keyup(function(e) {
    if (e.key === "Escape") { 
        fadeOutSettings();
   }
});