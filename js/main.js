$(document).ready(function(){
    $('.complete-button').click(function(){
        if($(this).is(":checked") === false){
            $('.text').attr('contenteditable', 'false');
            $('.text').removeClass('border-highlight');
            $('.complete-button-label').text(wordMapping.published);
            $('.icon-pen').hide();
            $('.icon-print').show();
        } else {
            $('.text').attr('contenteditable', 'true');
            $('.text').addClass('border-highlight');
            $('.complete-button-label').text(wordMapping.editing);
            $('.icon-pen').show();
            $('.icon-print').hide();
        }
    });

    var wordMapping = {
        published: 'published!!',
        editing : 'editing!!'
    }

    // https://codepen.io/danielsintrao/pen/OgWJae
    $(".drag-list").sortable({
        axis: 'y',
        placeholder: 'slide-placeholder',
        revert: 150,
        start: function (e, ui) {
            var placeholderHeight = ui.item.outerHeight();
            ui.placeholder.height(placeholderHeight);
            ui.placeholder.css({
                'margin-top': ui.item.css('margin-top'),
                'margin-right': ui.item.css('margin-right'),
                'margin-bottom': ui.item.css('margin-bottom'),
                'margin-left': ui.item.css('margin-left')
            });
            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
        },
        change: function (event, ui) {
            ui.placeholder.stop().height(0).animate({
                height: ui.item.outerHeight(),
                marginTop: parseInt(ui.item.css('margin-top')),
                marginRight: parseInt(ui.item.css('margin-right')),
                marginBottom: parseInt(ui.item.css('margin-bottom')),
                marginLeft: parseInt(ui.item.css('margin-left'))
            }, 150);
            placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));

            $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight).animate({
                height: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0
            }, 150, function () {
                $(this).remove();
                var placeholderHeight = ui.item.outerHeight();
                $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
            });
        },
        stop: function (e, ui) {
            console.log($(".drag-list drag-item").first().text());
            $(".slide-placeholder-animator").remove();
        },
    });
});