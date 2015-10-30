$(document).ready(function() {
    "use strict"
    var game = {
        time: 60,
        timer: $('#timer'),
        score: 0,
        scorebox: $('#scorebox'),
        moles: $('.mole'),
        round: null,
        timerloop: null,
        startbutton: $('#start-btn'),
        difficulty: 1,
        increment: 1000,
        difficultyList: $('#difficulty'),

        switchDifficulty: function(){
            var difficulty = $('select[name="difficulty"]').val();
            var multiplier = '';
            switch(difficulty)
            {
                case '2':
                    multiplier= 2;
                    break;
                
                case '1':
                    multiplier= 1;
                    break;

                case '0.5':
                    multiplier= 0.5;
                    break;
            }
            game.increment *= multiplier;
        },

        genRand: function(){
            return Math.floor(Math.random() * 15) + 1;
        },

        runGame: function(){
            game.increment = 1000;
            this.switchDifficulty();
            console.log(this.increment);
            this.startbutton.hide();
            this.difficultyList.hide();
            this.score = 0;
            this.scorebox.html(this.score);
            this.scorebox.fadeIn();
            this.runTimer();
            this.round = setInterval(function () {
                game.moles.fadeOut();
                game.moles.off();
                var randNum = game.genRand();
                var randBox = game.moles.eq(randNum - 1);
                

                $(randBox).fadeIn(500);
                $(randBox).click(function() {
                    game.score += 10;
                    game.scorebox.html(game.score);
                    $(this).hide("explode", {pieces: 36 }, 1000);
                });
                if (game.time <= 0) {
                    game.stopGame();
                    if(game.score >= 250){
                        alert('You have won this battle!');
                    } else{
                        alert('DEFEATED!');
                    };
                };
            }, this.increment);
        },

        stopGame: function(){
            clearInterval(this.round);        
            this.moles.fadeOut(1000);
            clearInterval(this.timerloop);
            this.timer.fadeOut(1000);
            this.startbutton.show();
            this.difficultyList.show();
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
    });
    $('#stop-btn').click(function(){
        game.stopGame();   
    });        
});