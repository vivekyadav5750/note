// Making new folder and + toggle
$(document).ready(function () {
    console.log('partA 1');
    $('#save_folder').click(function () {
        console.log('partA 2');
        let x = $("#new_folder_name").val();
        let user_random = $("random1").val();
        let csr = $("input[name=csrfmiddlewaretoken]").val();
        if (x == '') {
            console.log("none jquey");
        }
        else {
            mydata = { new_folder_name: x, csrfmiddlewaretoken: csr, user_random: user_random };
            $.ajax({
                url: 'addfolder',
                method: 'POST',
                data: mydata,
                success: function (data) {
                    if (data.status == 1) {
                        y = data.folder_name;
                        for (i = 0; i < y.length; i++) {
                            if (y[i].foldername == x) {
                                console.log("tRUE");
                                $('#sub-part-2B').append("<div class='fold-edit folder-name w3-btn w3-round-medium w3-white w3-card-2' data-sid='" + y[i].random2 + "'> <i class='foldericon fa fa-bars fa-lg w3-opacity  w3-left w3-hover-shadow' data-sid='" + y[i].random2 + "' style='margin-left:-5px;margin-top: 4px;' aria-hidden='true'></i> <h4 class='foldernameh4' style='margin:0px'></h4></div >");
                                $('#new_folder_name').val('');
                                // $('.foldernameh4').text(y[i].foldername);
                                $('.foldernameh4').eq(i).text(y[i].foldername);
                            }
                        }
                        console.log("success save");
                    }
                    else {
                        console.log("error");
                    }
                }
            })
        }
    });

    $(".fa-plus-square-o").click(function () {
        $('.sub-part2-A').toggle();
    });

    $(".button-tick-cross").click(function () {
        $('.sub-part2-A').toggle();
    });


    // Double click rename option
    $('div').on('dblclick', '.fold-edit', function () {
        console.log('partB 2');
        console.log('rename douoble click');
        let a = $(this).text();
        a = $.trim(a);
        let datasid = $(this).attr("data-sid");
        console.log(datasid);
        $(this).after("<input class='rename-button fold-new-value folder-name w3-btn w3-round-medium w3-white w3-card-2' type='text' value='" + a + "'><div class='rename-button'><button style='width:96%;Font-weight:500;' data-sid='" + datasid + "' class='folder-rename-button w3-btn w3-round-medium  w3-card-2 w3-green  w3-opacity-min'>Rename</button></div>");
        $(this).remove();
    });

    // Hide ✔ and ☒ and load folder 
    $(document).on('click', 'body', function (divclose) {
        if ($('div').hasClass("rename-button") == true) {

            if ($(divclose.target).closest('.rename-button').length == 0) {
                let csr = $("input[name=csrfmiddlewaretoken]").val();
                let user_random = $("random1").val();
                mydata = { csrfmiddlewaretoken: csr, user_random: user_random };
                $.ajax({
                    url: 'loadfolder',
                    method: 'POST',
                    data: mydata,
                    success: function (data) {
                        if (data.status == 1) {
                            x = data.folder_name;
                            output = "";
                            for (i = 0; i < x.length; i++) {
                                output += "<div class='fold-edit folder-name w3-btn w3-round-medium w3-white w3-card-2' data-sid='" + x[i].random2 + "'><i class='foldericon fa fa-bars fa-lg w3-opacity  w3-left w3-hover-shadow' data-sid='" + x[i].random2 + "' style = 'margin-left:-5px;margin-top: 4px;' aria-hidden='true' ></i><h4 class='foldernameh4' style='margin:0px'></h4></div >";
                            }
                            $('#sub-part-2B').html(output);

                            for (var i = 0; i < x.length; i++) {
                                $('.foldernameh4').eq(i).text(x[i].foldername);
                            }

                            $(".rename-button").remove();
                        }
                        else {
                            console.log("error in load folder");
                        }
                    }
                });
            }
        }
        else {
            console.log('runnning rename button click');
        }
    });
});

// Edit Foldername
$('div').on('click', '.folder-rename-button', function () {
    let datasid = $(this).attr("data-sid");
    let a = $('.fold-new-value').val();
    let user_random = $("random1").val();
    let csr = $("input[name=csrfmiddlewaretoken]").val();

    mydata = { data_sid: datasid, folder_name: a, csrfmiddlewaretoken: csr, user_random: user_random  };
    console.log(mydata);

    console.log('lll');
    $.ajax({
        url: 'editfolder',
        method: 'POST',
        data: mydata,
        success: function (data) {
            if (data.status == 1) {
                x = data.folder_name;
                output = "";
                for (i = 0; i < x.length; i++) {
                    output += "<div class='fold-edit folder-name w3-btn w3-round-medium w3-white w3-card-2' data-sid='" + x[i].random2 + "'><i class='foldericon fa fa-bars fa-lg w3-opacity  w3-left w3-hover-shadow' data-sid='" + x[i].random2 + "' style = 'margin-left:-5px;margin-top: 4px;' aria-hidden='true' ></i><h4 class='foldernameh4' style='margin:0px'></h4></div >";
                }
                $('#sub-part-2B').html(output);

                for (var i = 0; i < x.length; i++) {
                    $('.foldernameh4').eq(i).text(x[i].foldername);
                }

                $(".rename-button").remove();
            }
            else {
                console.log("error in load folder");
            }
        }
    });
});











