/*jslint devel: true, unparam: true, sloppy: true, vars: false, nomen: true, plusplus: true, maxerr: 1000, indent: 2 */
/*global window, document, setInterval, clearInterval, setTimeout, Image, jQuery*/
(function (doc, win, $, $doc) {

  function Gallery() {
    this.root = $('#gallery');
  }

  Gallery.prototype.build = function () {
    this.displayImages();
    this.observeClearButton();
  };

  Gallery.prototype.displayImages = function () {
    var that = this, images = $doc.triggerHandler('storage.getImages');

    images.forEach(function (dataURL, index) {
      var img = new Image();
      img.src = dataURL;
      img.className = "img-polaroid";
      that.root.append(img);
    });
  };

  Gallery.prototype.observeClearButton = function () {
    var that = this;
    $('#clearButton').bind('click', function () {
      that.removeImage();
      $doc.triggerHandler('storage.clearAll');
    });
  };

  Gallery.prototype.removeImage = function () {
    this.root.empty();
  };

  Gallery.prototype.appearImage = function (img) {
    this.root.append(img);
  };

  // global Export
  win.Gallery = Gallery;

}(document, window, jQuery, jQuery(document)));
