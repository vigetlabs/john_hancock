//= require signature_pad

function initializeJohnHancock() {
  const canvas = document.getElementById("JohnHancock-canvas");
  const hidden_field = document.getElementById("JohnHancock-hidden");

  if (canvas && hidden_field) {
    if (canvas.johnHancockInitialized) {
      return;
    }

    const parent_form = canvas.closest("form");
    const signaturePad = new SignaturePad(canvas);

    parent_form.onsubmit = function() {
      hidden_field.value = signaturePad.toDataURL()
    }

    function resizeCanvas() {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
      signaturePad.clear();
    }

    window.addEventListener("resize", resizeCanvas, true);
    resizeCanvas();

    canvas.johnHancockInitialized = true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    const canvas = document.getElementById("JohnHancock-canvas");
    if (canvas && !canvas.johnHancockInitialized) {
      initializeJohnHancock();
    }
  }, 100);
});

window.signatureClear = function() {
  var canvas = document.getElementById("JohnHancock-canvas");
  if (canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

window.JohnHancock = {
  init: initializeJohnHancock
};
