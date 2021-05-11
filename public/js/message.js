$('#boxchat').scrollTop($('#boxchat').prop("scrollHeight"));

$('.user').click(function() {
    $('#selected-user').find('p').text($(this).find('p').text());
    $('#selected-user').find('img').attr('src', $(this).find('img').attr('src'));

    $('#message').val('');
    // Load chat screen here
    $('#boxchat').scrollTop($('#boxchat').prop("scrollHeight"));
});

$(document).on('keypress',function(e) {
    if(e.which == 13 && !e.shiftKey) {
        //Nhấn phím Enter
        if($('#message').is(':focus')) {
            e.preventDefault();
            if ($('#message').val()) {
                $('#boxchat').append(`
                <div class="w-full flex justify-end">
                    <div class="rounded-2xl break-words bg-purple-300 text-white mx-3 my-1 p-2" style="width: fit-content; max-width: 70%;">
                        <p>${$('#message').val()}</p>
                    </div>
                </div>`);
                $('#boxchat').stop(true, true);
                $('#boxchat').animate({ scrollTop: $('#boxchat').prop("scrollHeight")}, 1000);
                // Send message here
                $('#message').val('');
            }
        }
    }
});