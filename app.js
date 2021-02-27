new Vue({
    el: "#app",

    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false, //oyunun başlayıpp başlamadıgı
        logs: []
    },
    methods: {
        start_game: function () {
            this.game_is_on = true

        },
        attack: function () {
            let point = Math.ceil(Math.random() * 10);
            this.monster_heal -= point;
          
            this.add_to_log({
                turn: "p",
                text: "oyucu atağı(" + point + ")"
            });
               this.monster_attack();

        },
        special_attack: function () {
            let point = Math.ceil(Math.random() * 25);
            this.monster_heal -= point;
              this.add_to_log({turn: "p", text: "özel oyucu atağı(" + point + ")"});
            this.monster_attack();
             
        },
        heal_up: function () {
            let point = Math.ceil(Math.random() * 20);
            this.player_heal += point;
            this.add_to_log({turn: "p", text: "ilk yardım(" + point + ")"});
            this.monster_attack();
            
        },
        give_up: function () {
            //pes et
            this.player_heal = 0;
              this.add_to_log({turn: "p", text: "oyucu pes etti (" + point + ")"});

        },
        monster_attack: function () {
            let point = Math.ceil(Math.random() * 10);
            this.player_heal -= point;
              this.add_to_log({turn: "m", text: "canavar atağı(" + point + ")"});
        },
        add_to_log: function(log){
            this.logs.push(log);
        }


    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu KAYBETTİN!")) {
                    this.player_heal =  100;
                    this.monster_heal =  100;
                    this.logs = []

                }
            } else if (value >= 100) {
                this.player_heal = 100;
            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0;
                 if (confirm("Oyunu KAZANDIN!")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                     this.logs = []

                }
            } else if (value >= 100) {
                this.monster_heal = 100;
            }
        }
    }


})
