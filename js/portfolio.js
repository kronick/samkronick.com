$(document).ready(function() {
    $(".headline").on("click", function(ev) {
        var el = $($(ev.target).parents(".project")[0]);
        
        toggleProject(el);

    })
    
    // Open up to project given in the URL hash
    var project = location.hash.substring(1);
    if(project != "") {
        var element = $("[data-name=" + project + "]");
        window.setTimeout(function() { 
            toggleProject(element);
        }, 500);
    }
})



function toggleProject(el) {
    if(!el.hasClass("expanded")) {
        // Close any open projects
        $(".project.expanded").each(function(idx, e) { toggleProject($(e)) });

        // Open this one
        el.addClass("expanded");
        
        // Highlight the headline
        var headline = el.children(".headline")
        headline.transition({"background-color": "white"}, 2000);
        
        // Add detail element, download content, and replace
        var detail = el.children(".detail")
        detail.addClass("expanded");
        detail.css({"height": "0px"});
        detail.transition({"height": detail[0].scrollHeight  + "px"}, 1000, function() {
            $("html, body").animate({scrollTop: el.offset().top - 20}, 500);
            window.setTimeout(function() { resizeDetailEl(el); }, 100);
        });
        
        ga('send', 'event', 'Project', 'open', el.data("name"));

        
    }
    else {
        // Close
        el.removeClass("expanded");
        
        // Highlight the headline
        var headline = el.children(".headline")
        headline.transition({"background": "none"}, 2000);
        
        el.children(".detail").each(function(idx, e) { $(e).transition({"height": "0px"}, 500); });
    }    

}

function resizeDetailEl(el) {
    if(el.hasClass("expanded")) {
        var detail = el.children(".detail")
        detail.css({"height": detail[0].scrollHeight  + "px"});
        window.setTimeout(function() { resizeDetailEl(el); }, 500);
    }
}

function randRange(low, high) {
    return Math.random() * (high-low) + low;
}
function randInt(low,high) {
    return Math.floor(randRange(low,high));
}