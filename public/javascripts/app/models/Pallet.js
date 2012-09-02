/*jslint devel: true, unparam: true, sloppy: true, vars: false, nomen: true, plusplus: true, maxerr: 1000, indent: 2 */
/*global window, document, setInterval, clearInterval, setTimeout, Image, jQuery, URL, WebKitIntent*/
(function (doc, win, $, $doc) {

  function Pallet() {
    this.root = $('#pallet');
    this.intentRes = null;
  }

  Pallet.prototype.build = function () {
    this.observeDropPallet();
    this.observeEditButton();
    this.observeSaveButton();
  };

  Pallet.prototype.observeDropPallet = function () {
    this.root.find('#dropBox').bind('drop', function (evt) {
      var blob, img = new Image(), dropBox = $(this);
      evt.originalEvent.preventDefault();
      blob = evt.originalEvent.dataTransfer.files[0];
      img.src = URL.createObjectURL(blob);
      img.className = 'img-polaroid';
      dropBox.html(img);
    });
  };

  Pallet.prototype.observeEditButton = function () {
    var that = this;
    this.root.find('#editButton').bind('click', function (evt) {
      var intent, pallet = that.root.find('#dropBox img');
      if (pallet.length === 0) {
        alert('画像を用意してから押してね。');
        return true;
      }

      intent = new WebKitIntent('http://webintents.org/edit', 'image/*', that.imgToDataURL(pallet.get(0)));
      win.navigator.webkitStartActivity(intent, function (res) {
        var img = new Image();
        img.src = res;
        img.className = "img-polaroid";
        that.intentRes = res;
        $('#mirrorBox').html(img);
      });
    });
  };

  Pallet.prototype.observeSaveButton = function () {
    var that = this;
    that.root.find('#saveButton').bind('click', function (evt) {
      var img = that.root.find('#mirrorBox img');
      if (img.length === 0) {
        alert('画像を編集した後に押してね。');
        return true;
      }
      $doc.triggerHandler('storage.saveImage', [that.intentRes]);
      $doc.triggerHandler('gallery.appearImage', img);
    });
  };

  Pallet.prototype.imgToDataURL = function (img) {
    var canvas = doc.createElement('canvas'), ctx;
    canvas.setAttribute('width', img.width);
    canvas.setAttribute('height', img.height);
    ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
  };

  // global Export
  win.Pallet = Pallet;

}(document, window, jQuery, jQuery(document)));
