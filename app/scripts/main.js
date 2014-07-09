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
        },

        nextPage: function(){
            switch(whatsNew.listVars.listPosition){
                // At the bottom of the list so get more news
                case whatsNew.listVars.listHeight:
                    whatsNew.loadMoreNews();
                    console.log('get more');
                    break;

                default:
                    whatsNew.listVars.listPosition++;
                    whatsNew.listVars.prevButton.removeAttr('disabled');
                    console.log('move down');
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
        }



    };

    // Initiate
    whatsNew.initialCheck();

    // Event listeners
    $('.next').on('click', whatsNew.nextPage);
    $('.prev').on('click', whatsNew.prevPage);
}(jQuery));
