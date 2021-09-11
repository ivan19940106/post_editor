$(document).ready(function(){
    var wordMapping = {
        published: 'published!!',
        editing : 'editing!!',
        layoutChangeCompleted : 'layout change completed!!',
        layoutChanging : 'layout changing!!'
    }

    $('.complete-button').click(function(){
        if($(this).is(":checked") === false){
            $('.text').attr('contenteditable', 'false');
            $('.text').removeClass('border-highlight');
            $('.text').unbind('mouseenter mouseleave');
            $('.complete-button-label').text(wordMapping.published);
            $('.complete-button-wrapper .icon-print').removeClass('hidden');
            $('.complete-button-wrapper .icon-pen').addClass('hidden');
        } else {
            // editing
            $('.text').attr('contenteditable', 'true');
            $('.text').addClass('border-highlight');
            enableAddTemplate();
            $('.complete-button-label').text(wordMapping.editing);
            $('.complete-button-wrapper .icon-print').addClass('hidden');
            $('.complete-button-wrapper .icon-pen').removeClass('hidden');
        }
    });

    $('.layout-button').click(function(){
        if($(this).is(":checked") === true){
            enableSort();
            $('.layout-button-label').text(wordMapping.layoutChanging);
            $('.layout-button-wrapper .icon-pen').removeClass('hidden');
            $('.layout-button-wrapper .icon-print').addClass('hidden');
        } else {
            disableSort();
            $('.layout-button-label').text(wordMapping.layoutChangeCompleted);
            $('.layout-button-wrapper .icon-pen').addClass('hidden');
            $('.layout-button-wrapper .icon-print').removeClass('hidden');
        }
    });
    
    enableAddTemplate();

    function enableAddTemplate() {
        $('.text.border-highlight').hover(function(){
            var textNode = $(this);
            var addTemplateButton = document.createElement('i');
            addTemplateButton.className = "icon-plus add-template-button";
            addTemplateButton.style.display = 'none';
            textNode.prepend(addTemplateButton);
            $('.icon-plus.add-template-button').fadeIn();
            // $(this).prepend('<i class="icon-plus add-template-button"></i>');
            $('.icon-plus.add-template-button').click(function(){
                var newTextNode = textNode.clone().text('');
                newTextNode.insertAfter(textNode);
            });
        }, function(){
            $(this).find('.icon-plus').remove();
        });
    }
    
    function enableSort(){
        $('.text-wrapper').addClass('drag-list');
        $( ".drag-list" ).sortable();
    }

    function disableSort(){
        $( ".drag-list" ).sortable('destroy');
        $("drag-item").removeClass('ui-state-default');
    }
});