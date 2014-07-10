(function($){
    'use strict';

    // Whats New object
    var whatsNew = {

        // Variable usage
        listVars: {
            pageCount: $('#whats-new').attr('data-pagecount'),
            remainingCount: 0,
            prevButton: $('.prev'),
            nextButton: $('.next'),
            temporaryTemplate: '<li><a href="#">Testing</a></li>',
            temporaryArray: ['Matt D', 'Matt L', 'Matt F'],
            listHeight: 1,
            listPosition: 1,
            curPosition: 0,
//            newPosition: 0,
            pageHeight: $('#whats-new').height(),
            listElement: $('#whats-new'),
            topShadowEl: $('.top-shadow'),
            botShadowEl: $('.bot-shadow'),
        },

        initialCheck: function(){
            if(this.listVars.pageCount > 1) {
                this.listVars.remainingCount = this.listVars.pageCount - 1;
                this.listVars.nextButtonState = true;
            }
        },

        prevPage: function(){
            whatsNew.listVars.listPosition--;
            whatsNew.listVars.nextButton.removeAttr('disabled');

            if(whatsNew.listVars.listPosition === 1){
                this.setAttribute('disabled', true);
            }
            console.log('move up');
            console.log('position is at ' + whatsNew.listVars.listPosition);
            whatsNew.moveListDown();
        },

        nextPage: function(){
            switch(whatsNew.listVars.listPosition){
                // At the bottom of the list so get more news
                case whatsNew.listVars.listHeight:
                    whatsNew.loadMoreNews();
                    console.log('get more');
                    break;

                // Move the list only
                default:
                    whatsNew.listVars.listPosition++;
                    whatsNew.listVars.prevButton.removeAttr('disabled');
                    console.log('move down');
                    whatsNew.moveListUp();
            }

            whatsNew.listVars.prevButton.removeAttr('disabled');
            console.log('position is at ' + whatsNew.listVars.listPosition + ' and remaining count is ' + whatsNew.listVars.remainingCount);

            if((whatsNew.listVars.remainingCount === 0) && (whatsNew.listVars.listPosition === whatsNew.listVars.listHeight)){
                this.setAttribute('disabled', true);
            }

        },

        loadMoreNews: function(){
            var newsPerPageCount = this.listVars.temporaryArray.length;

            for (var i = 0; i < newsPerPageCount; i++) {
                $('#whats-new').append(this.listVars.temporaryTemplate);
            }
            this.listVars.remainingCount--;
            this.listVars.listPosition++;
            this.listVars.listHeight++;
            if(whatsNew.listVars.remainingCount === 0){
                whatsNew.listVars.nextButton.attr('disabled', true);
            }
            this.moveListUp();
        },

        moveListUp: function(){
            whatsNew.listVars.curPosition -= whatsNew.listVars.pageHeight;
            whatsNew.listVars.listElement.css('top', whatsNew.listVars.curPosition + 'px');
            console.log(whatsNew.listVars.curPosition);
            this.addRemoveListShadows();
        },

        moveListDown: function() {
            whatsNew.listVars.curPosition += whatsNew.listVars.pageHeight;
            whatsNew.listVars.listElement.css('top', whatsNew.listVars.curPosition + 'px');
            console.log(whatsNew.listVars.curPosition);
            this.addRemoveListShadows();
        },

        addRemoveListShadows: function() {
            if((this.listVars.listPosition > 1) && (this.listVars.listHeight > 1)) {
                this.listVars.topShadowEl.addClass('items-above');
            }
            else {
                this.listVars.topShadowEl.removeClass('items-above');
            }
            console.log(whatsNew.listVars.listPosition + ' ' + whatsNew.listVars.listHeight);
            if((this.listVars.listHeight > 1) && (this.listVars.listHeight !== this.listVars.listPosition)) {
                this.listVars.botShadowEl.addClass('items-below');
            }
            else {
                this.listVars.botShadowEl.removeClass('items-below');
            }
        }

    };

    // Initiate
    whatsNew.initialCheck();

    // Event listeners
    $('.next').on('click', whatsNew.nextPage);
    $('.prev').on('click', whatsNew.prevPage);

    console.log(whatsNew.listVars.pageHeight);

}(jQuery));
