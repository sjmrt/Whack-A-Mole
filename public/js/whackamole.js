$(document).ready(function() {
    "use strict"
    var game = {
        time: 60,
        timer: $('#timer'),
        score: 0,
        scorebox: $('#scorebox'),
        moles: $('.mole'),
        main: $('#main-box'),
        lils: $('.sub-box'),
        round: null,
        timerloop: null,

        genRand: function(){
            return Math.floor(Math.random() * 15) + 1;
        },

        runGame: function(){
            var increment = 1000;
            
            this.score = 0;
            this.scorebox.html(this.score);
            this.scorebox.fadeIn();
            this.runTimer();
            this.round = setInterval(function () {
                game.moles.fadeOut();
                game.moles.off();
                var randNum = game.genRand();
                var randBox = game.moles.get(randNum - 1);           
                $(randBox).fadeIn(300);
                $(randBox).click(function() {
                    // $(this).off();
                    game.score += 10;
                    game.scorebox.html(game.score);
                    $(this).fadeOut();
                });
                if (game.time <= 0) {
                    game.stopGame();
                };
            }, increment);
        },

        stopGame: function(){
            clearInterval(this.round);        
            this.moles.fadeOut(1000);
            clearInterval(this.timerloop);
            this.timer.fadeOut(1000);
        },

        runTimer: function(){
            this.time = 60;
            this.timer.html(this.time);
            this.timer.fadeIn();
            this.timerloop = setInterval(function () {
                game.time--;
                game.timer.html(game.time);
            }, 1000);
        }
    };


    $('#start-btn').click(function(){
        game.runGame();
        $('#start-btn').hide();

    });
    $('#stop-btn').click(function(){
        game.stopGame();
        $('#start-btn').show();
    });        
});