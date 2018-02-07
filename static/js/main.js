
function photosByTags(tags) {
  return "https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=e6c1d675825f14620f39cfeb5b7da30c&user_id=24379772@N05&extras=description,url_l,url_m&format=json&tags=" + tags + "&jsoncallback=?";
}

function photoInfo(imageId) {
  return "https://api.flickr.com/services/rest?method=flickr.photos.getInfo&api_key=e6c1d675825f14620f39cfeb5b7da30c&photo_id=" + imageId + "&format=json&jsoncallback=?";
}

function setPreview(element, tags) {
  $.getJSON(photosByTags(tags))
  .done(function(data) {
    console.log(data);
    photo = data.photos.photo[0];
    $(element).attr("src", photo["url_m"]);
  });
}

function setProjectPreview(image, caption, tags) {
  $.getJSON(photosByTags(tags))
  .done(function(data) {
    console.log(data);
    photo = data.photos.photo[0];
    $(image).attr("src", photo["url_m"]);
    $(caption).html(photo["title"]);
  });
}

function setSrc(element, imageId) {
  $.getJSON(photoInfo(imageId))
  .done(function(data) {
    var photo = data.photo;
    var url = "https://farm" + photo["farm"] + ".staticflickr.com/" + photo["server"] + "/" + photo["id"] + "_" + photo["secret"] + ".jpg";
    $(element).attr("src", url);
  });
}

function loadGallery(gallery, tags) {
  $.getJSON(photosByTags(tags))
  .done(function(data) {
    $.each(data.photos.photo, function(i) {
      var photo = data.photos.photo[i]
      $("section#full-photo-gallery").append('<figure class="photo-gallery-cell"><a href="' + photo["url_l"] + '" data-lightbox="' + gallery + '" data-title="' + photo["title"] + '"><img src="' + photo["url_m"] + '" /></a></figure>')
    });
  });
}

$(document).ready(function() {
  $("section#photo-galleries").ready(function() {
    $("img.photo-gallery-preview").each(function() {
      var tags = $(this).data("photo-gallery-tags");
      if (tags != "") {
        setPreview(this, tags);
      }
    });
  });
  
  $("section#full-photo-gallery").ready(function() {
    var gallery = $("section#full-photo-gallery").data("photo-gallery");
    var tags = $("section#full-photo-gallery").data("photo-gallery-tags");
    loadGallery(gallery, tags);
  });

  $("section#projects").ready(function() {
    $("figure.project-preview-img").each(function() {
      var image = $(this).children("img");
      var caption = $(this).children("figcaption");
      var tags = $(image).data("project-gallery-tags");
      if (tags != "") {
        console.log(tags);
        setProjectPreview(image, caption, tags);
      }
    });
  });
});
