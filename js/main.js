// Cache selectors
var lastId,
    topMenu = $("#mainNav"),
    topMenuHeight = topMenu.outerHeight() + 1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    console.log(offsetTop);
    $('html, body').stop().animate({
        scrollTop: offsetTop + 128
    }, 350);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;
    console.log();

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top + 128 < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
});


$(".modal-trigger").click(function(e){
  e.preventDefault();
  dataModal = $(this).attr("data-modal");
  $("#" + dataModal).css({"display":"block"});
  //$("body").addClass("modal-open"); // 禁用主視窗滾動
  // $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
});

$(".close-modal, .modal-sandbox").click(function(){
  $(".modal").css({"display":"none"});
  //$("body").removeClass("modal-open"); // 恢復主視窗滾動
  // $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
});