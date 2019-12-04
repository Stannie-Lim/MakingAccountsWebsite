$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(){
    $(this).parent().fadeOut(250, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        let entry = $(this).val();
        $(this).val("");
        $(".todolist").append("<li><span><i class='fa fa-trash'></i></span> " + entry + "</li>");
    }
});