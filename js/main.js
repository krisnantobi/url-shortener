
$(document).ready(function () {

    /**
     * Function for check string is URL
     * 
     * @param {string} str 
     */
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }


    $('#loader').addClass('hidden');
    $('#result_short_url_card').addClass('hidden');

    /**
     * Event when click send shortener
     */
    $('#send_shortener').click(function () {

        /** Add classes for hiddend element */
        $('#result_short_url_card').addClass('hidden');
        $('#loader').removeClass('hidden');

        const long_url = $('#input_url').val();

        /** Disini untuk validate bahwa url harus valid dan tidak boleh kosong */
        if (long_url === '' || validURL(long_url) === false) {
            M.toast({ html: 'Error !! Masukkan link Url dengan benar', classes: 'toast-error' })
            $('#loader').addClass('hidden');
            return;
        }

        /** Prepare data to request body */
        let linkRequest = {
            destination: long_url,
            domain: {
                fullName: "rebrand.ly"
            },
            title: "S-Short Link yang ramah pengguna"
        }

        /** Prepare data to request headers */
        let requestHeaders = {
            "Content-Type": "application/json",
            "apikey": "ff2d37444b4140778a4d6d1697d33781",
        }

        /** Request ajax */
        $.ajax({
            url: "https://api.rebrandly.com/v1/links",
            type: "post",
            data: JSON.stringify(linkRequest),
            headers: requestHeaders,
            dataType: "json"
        }).done(function (res) {
            /** Cath response api and append to DOM */
            // $('#result_original_link').html(`Original Link <a href='${res.destination}' target='_blank'>${res.destination}</a>`);
            $('#result_short_url').val('https://' + res.shortUrl);

            $('#result_short_url_card').removeClass('hidden');
            $('#loader').addClass('hidden');
        }).fail(function (data) {
            console.log(data);
        });

    });


    // Utilities evvent and function
    // Berisi konfigurasi atau helper yang dibutuhkan untuk materialize
    // seperti open menu sidebar
    /**
     * Event click to copy short link
     */
    $('#copy_to_clipboard').click(function (e) {
        e.preventDefault();
        /* Get the text field */
        var copyText = document.getElementById('result_short_url');

        /* Select the text field */
        copyText.select();
        copyText.focus();
        copyText.setSelectionRange(0, 99999)

        /* Copy the text inside the text field */
        document.execCommand("copy");
        M.toast({ html: 'Coppied : ' + copyText.value, classes: 'toast-success' })
    });

    /**
     * Event click to visit link
     */
    $('#visit_link').click(function () {
        window.open($('#result_short_url').val(), '_blank');
    });

})

$(document).ready(function () {
    // Fungsi ini igunakan untuk membuka sidebar pada materialize

    $(function () {
        /** Use for show and hide sidebar - Materialize */
        $('.sidenav').sidenav();

    });

    /**
     * For use effect text typing
     */
    let i = 0;
    let sourceTxt = 'Ketik url Anda di sini';
    let txt = '';
    let speed = 50;
    function typeWriter() {
        if (i < sourceTxt.length) {
            txt += sourceTxt.charAt(i);
            $('#input_url').attr('placeholder', txt)
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
    /** Call function by interval - loop by interval time */
    let typer = setInterval(function () { i = 0; txt = ''; typeWriter(); }, 3000);
    let interval_control_start = false;

    /**
     * Event click check input has focus for controll stop and start effect typing
     */
    $('body').click(function () {
        const inputEl = document.querySelector('#input_url');

        if (inputEl === document.activeElement) {
            /** If has active element clear interval */
            clearInterval(typer);
            interval_control_start = true;
        } else {
            /** If has not active element set interval */
            if (interval_control_start) {
                typer = null;
                typer = setInterval(function () { i = 0; txt = ''; typeWriter(); }, 3000);
            }
            interval_control_start = false;
        }
    })
});

document.addEventListener("DOMContentLoaded", function () {
    $('.preloader-background').delay(1700).fadeOut('slow');

    $('.preloader-wrapper')
        .delay(1700)
        .fadeOut();
});