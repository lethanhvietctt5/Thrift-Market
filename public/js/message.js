function reloadPage() {
    $('#boxchat').scrollTop($('#boxchat').prop("scrollHeight"));
    $.get({
        url: `/getUsersChatted`,
        success: function(data) {
            if (data.length > 0) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].gender == 'Nam') avatar = '/images/avatars/male.jpg'
                    else avatar = '/images/avatars/female.jpg'
                    $('#user-box').append(`
                        <a href="/message/${data[i]._id}" class="user cursor-pointer flex items-center p-3 hover:bg-gray-100 transition duration-300 ease-in-out"
                            data-id="${data[i]._id}" style="height:80px; border-bottom: 1px solid rgb(233, 226, 226);">
                            <img src="${avatar}" style="height: 50px; border-radius: 50%; border: 1px solid black;">
                            <p class="font-bold text-sm pl-3">${data[i].name}</p>
                        </a>
                    `);
                }
            } else {
                $('#user-box').append(`<img src="images/no-user.png" style="margin-top:100px;">`);
            }
        }
    });

};

function loadChatbox() {
    if ($('#selected-user').data('id') != '') {
        $.get({
            url: `/loadChatbox/${$('#selected-user').data('id')}`,
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].id_sender != $('#user-info').data('id')) {
                        $('#boxchat').append(`
                        <div class="w-full flex">
                            <div class="rounded-2xl break-words bg-red-300 text-white mx-3 my-1 p-2" style="width: fit-content; max-width: 70%;">
                                <p>${data[i].content}</p>
                            </div>
                        </div>`);
                    } else {
                        $('#boxchat').append(`
                        <div class="w-full flex justify-end">
                            <div class="rounded-2xl break-words bg-purple-300 text-white mx-3 my-1 p-2" style="width: fit-content; max-width: 70%;">
                                <p>${data[i].content}</p>
                            </div>
                        </div>`);
                    }
                    $('#boxchat').stop(true, true);
                    $('#boxchat').animate({ scrollTop: $('#boxchat').prop("scrollHeight")}, 1000);
                }
            }
        });
    }
}

reloadPage();
loadChatbox();

$('.user').click(function() {
    $('#message').val('');
    // Load chat screen here
    reloadPage();
});

$(document).on('keypress',function(e) {
    if(e.which == 13 && !e.shiftKey) {
        //Nhấn phím Enter
        if($('#message').is(':focus')) {
            e.preventDefault();
            if ($('#message').val()) {
                data = { 
                    id_sender: $('#user-info').data('id'),
                    id_receiver: $('#selected-user').data('id'), 
                    content: $('#message').val(),
                    date: new Date()
                };
                $.post({
                    url: '/sendMessage',
                    data: JSON.stringify(data),
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        if (data == true) {
                            $('#boxchat').append(`
                            <div class="w-full flex justify-end">
                                <div class="rounded-2xl break-words bg-purple-300 text-white mx-3 my-1 p-2" style="width: fit-content; max-width: 70%;">
                                    <p>${$('#message').val()}</p>
                                </div>
                            </div>`);
                            $('#boxchat').stop(true, true);
                            $('#boxchat').animate({ scrollTop: $('#boxchat').prop("scrollHeight")}, 1000);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Gửi không thành công...',
                                text: 'Có lỗi trong quá trình gửi tin nhắn!'
                            })
                        }
                    }
                });

                $('#message').val('');
            }
        }
    }
});