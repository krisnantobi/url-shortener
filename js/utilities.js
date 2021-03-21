// Fungsi ini igunakan untuk membuka sidebar pada materialize
(function ($) {
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
        if(interval_control_start){
          typer = null;
          typer = setInterval(function () { i = 0; txt = ''; typeWriter(); }, 3000);
        }
        interval_control_start = false;
    }
  })

})(jQuery);