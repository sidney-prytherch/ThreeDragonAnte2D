//shift removes from front, unshift adds to front. pop removes from back, push adds to back

var locoEnum = {
    "HAND" : 0,
    "FLIGHT" : 1,
    "ANTE" : 2,
    "DISCARD" : 3,
    "DECK" : 4
};
var cardTypeEnum = {
    "EVIL" : 0,
    "GOOD" : 1,
    "MORTAL": 2
};

/**
 * Two players per game. This is the class for the player:
 * @param playerName
 * @param playerId
 * @constructor
 */
function Player(playerName, playerId) {
	this.name = playerName;
	this.id = playerId;
	this.hand = cardGroupHashTable(false);
	//this.handSize = 0;
    this.flight = cardGroupHashTable(false);
    //this.flightSize = 0;
	this.setName = function(name) {
		this.name = name;
	};
	this.drawCards = function(num) {
		for (var i = 0; i < num; i++){
			if (deck.length == 0) {
				discardToDeck();
			}
			if (this.handSize < 10) {
				this.hand[this.hand.length] = deck[0];
				deck.splice(0, 1);
				this.handSize++;
			}
		}
	};
	this.removeCardFromHand = function(index) {
	    var card = this.hand[index];
		this.hand.splice(index, 1);
        return card;
	};
    this.removeCardFromFlight = function(index) {
        var card = this.flight[index];
        this.flight.splice(index, 1);
        return card;
    };
	this.addCardToHand = function(card) {
		if (this.handSize < 10) {
			this.hand[this.hand.length] = card;
			//this.handSize++;
		}
	};
	this.addCardToFlight = function(card) {
	    this.flight[this.flight.length] = card;
        //this.flightSize++;
    };
	this.cardSelectEnum = {
		NONE : 0,
		ANTE : 1,
		FLIGHT : 2
	};
}

/**
 * Card class: each card has the following (There are 70 unique cards in the game)
 * @param cardName
 * @param cardStrength
 * @param cardImageSrc
 * @param cardType
 * @param method
 * @constructor
 */
function Card(cardName, cardStrength, cardType, method) {
	this.name = cardName;
	this.strength = cardStrength;
	this.type = cardType;
    this.index = -1;
    this.location = locoEnum.DECK;  //which array card is in

	/*
	 (x1, y1) is upper right coordinate of card location (in pixels)
	 (x2, y2) is lower left coordinate of card location
	 (a1, b1) is where the "saved coordinates" (previous coordinates when card moves) (upper right)
	 (a2, b2) is lower left of previous location (saved coordinates)

	this.x1 = null;
	this.x2 = null;
	this.y1 = null;
	this.y2 = null;
	this.a1 = null;
	this.b1 = null;
	this.a2 = null;
	this.b2 = null;
	*/
	//all card types have unique ability:
	this.action = function(player) {method(player);};


	//this.otherFunction = function(stuff) {printMessage(stuff)}; //shouldn't be necessary anymore
	this.toString = function() {
	    if (this.type == "mortal" || this.name == "Bahamut" || this.name == "Dracolich" ||this.name == "Tiamat") {
            return "the" + this.name + " with strength " + this.strength;
        } else {
            return "a " + this.name + "Dragon with strength " + this.strength;
        }
	};

	this.getId = function() {
	    return this.name+this.strength;
    };
}

var black = function(player) {
        alert(player);
    },
    blue = function(player) {
        alert(player);
    },
    brass = function(player) {
        alert(player);
    },
    bronze = function(player) {
        alert(player);
    },
    copper = function(player) {
        alert(player);
    },
    gold = function(player) {
        alert(player);
    },
    green = function(player) {
        alert(player);
    },
    red = function(player) {
        alert(player);
    },
    silver = function(player) {
        alert(player);
    },
    white = function(player) {
        alert(player);
    };

var deck, ante, discardPile;

var cards = [
    new Card("Archmage", 9, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Bahamut", 13, cardTypeEnum.GOOD, function(player) {
        alert(player);
    }),
    new Card("Dracolich", 10, cardTypeEnum.EVIL, function(player) {
        alert(player);
    }),
    new Card("Dragonslayer", 8, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Druid", 6, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Fool", 3, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Priest", 5, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Princess", 4, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Thief", 7, cardTypeEnum.MORTAL, function(player) {
        alert(player);
    }),
    new Card("Tiamat", 13, cardTypeEnum.EVIL, function(player) {
        alert(player);
    }),
    new Card("Black", 1, cardTypeEnum.EVIL, black),
    new Card("Black", 2, cardTypeEnum.EVIL, black),
    new Card("Black", 3, cardTypeEnum.EVIL, black),
    new Card("Black", 5, cardTypeEnum.EVIL, black),
    new Card("Black", 7, cardTypeEnum.EVIL, black),
    new Card("Black", 9, cardTypeEnum.EVIL, black),
    new Card("Blue", 1, cardTypeEnum.EVIL, blue),
    new Card("Blue", 2, cardTypeEnum.EVIL, blue),
    new Card("Blue", 4, cardTypeEnum.EVIL, blue),
    new Card("Blue", 7, cardTypeEnum.EVIL, blue),
    new Card("Blue", 9, cardTypeEnum.EVIL, blue),
    new Card("Blue", 11, cardTypeEnum.EVIL, blue),
    new Card("Brass", 1, cardTypeEnum.GOOD, brass),
    new Card("Brass", 2, cardTypeEnum.GOOD, brass),
    new Card("Brass", 4, cardTypeEnum.GOOD, brass),
    new Card("Brass", 5, cardTypeEnum.GOOD, brass),
    new Card("Brass", 7, cardTypeEnum.GOOD, brass),
    new Card("Brass", 9, cardTypeEnum.GOOD, brass),
    new Card("Bronze", 1, cardTypeEnum.GOOD, bronze),
    new Card("Bronze", 3, cardTypeEnum.GOOD, bronze),
    new Card("Bronze", 6, cardTypeEnum.GOOD, bronze),
    new Card("Bronze", 7, cardTypeEnum.GOOD, bronze),
    new Card("Bronze", 9, cardTypeEnum.GOOD, bronze),
    new Card("Bronze", 11, cardTypeEnum.GOOD, bronze),
    new Card("Copper", 1, cardTypeEnum.GOOD, copper),
    new Card("Copper", 3, cardTypeEnum.GOOD, copper),
    new Card("Copper", 5, cardTypeEnum.GOOD, copper),
    new Card("Copper", 7, cardTypeEnum.GOOD, copper),
    new Card("Copper", 8, cardTypeEnum.GOOD, copper),
    new Card("Copper", 10, cardTypeEnum.GOOD, copper),
    new Card("Gold", 2, cardTypeEnum.GOOD, gold),
    new Card("Gold", 4, cardTypeEnum.GOOD, gold),
    new Card("Gold", 6, cardTypeEnum.GOOD, gold),
    new Card("Gold", 9, cardTypeEnum.GOOD, gold),
    new Card("Gold", 11, cardTypeEnum.GOOD, gold),
    new Card("Gold", 13, cardTypeEnum.GOOD, gold),
    new Card("Green", 1, cardTypeEnum.EVIL, green),
    new Card("Green", 2, cardTypeEnum.EVIL, green),
    new Card("Green", 4, cardTypeEnum.EVIL, green),
    new Card("Green", 6, cardTypeEnum.EVIL, green),
    new Card("Green", 8, cardTypeEnum.EVIL, green),
    new Card("Green", 10, cardTypeEnum.EVIL, green),
    new Card("Red", 2, cardTypeEnum.EVIL, red),
    new Card("Red", 3, cardTypeEnum.EVIL, red),
    new Card("Red", 5, cardTypeEnum.EVIL, red),
    new Card("Red", 8, cardTypeEnum.EVIL, red),
    new Card("Red", 10, cardTypeEnum.EVIL, red),
    new Card("Red", 12, cardTypeEnum.EVIL, red),
    new Card("Silver", 2, cardTypeEnum.GOOD, silver),
    new Card("Silver", 3, cardTypeEnum.GOOD, silver),
    new Card("Silver", 6, cardTypeEnum.GOOD, silver),
    new Card("Silver", 8, cardTypeEnum.GOOD, silver),
    new Card("Silver", 10, cardTypeEnum.GOOD, silver),
    new Card("Silver", 12, cardTypeEnum.GOOD, silver),
    new Card("White", 1, cardTypeEnum.EVIL, white),
    new Card("White", 2, cardTypeEnum.EVIL, white),
    new Card("White", 3, cardTypeEnum.EVIL, white),
    new Card("White", 4, cardTypeEnum.EVIL, white),
    new Card("White", 6, cardTypeEnum.EVIL, white),
    new Card("White", 8, cardTypeEnum.EVIL, white)
];

function resetGame() {
    deck = cardGroupHashTable(true);
    ante = cardGroupHashTable(false);
    discardPile = cardGroupHashTable(false);
}

function startGame() {
    resetGame();
    shuffle(deck);
    players[0].drawCards(7);
    players[1].drawCards(7);

    //call each clients' start() function

}

function cardGroupHashTable(isDeck) {
    this.cards = {};
    this.length = 0; //number of cards in the card group
    this.toArray = [];
    this.addCard = function(card) {
        this.cards[card.getId()] = card;
        this.toArray.unshift(card);
    };
    this.addCardsFrom = function(cardGroup, shuffle) {
        if (shuffle) {
            cardGroup.shuffle();
        }
        var card;
        for (var i=0; i < cardGroup.length; i++) {
            card = cardGroup.removeLastCard();
            this.toArray.unshift(card);
            this.cards[card.getId()] = card;
            this.length++;
        }
    };
    this.addCardFrom = function(cardGroup, key) {
        var card = cardGroup.removeCard(key);
        this.toArray.unshift(card);
        card.index = this.length;
        this.length++;
    };
    this.getCard = function(key) {
        return this.cards[key];
    };
    this.removeCard = function(key) {
        var card = this.cards[key];
        this.cards[key] = null;
        this.toArray.splice(card.index, 1);
        this.length--;
        return card;
    };
    this.removeLastCard = function() {
        var card = this.toArray.pop();
        this.cards[card.getId()] = null;
        this.length--;
        return card;
    };
    this.contains = function(key) {
        return this.cards[key]!=null;
    };
    this.containsType = function(type) {
        for (var i = 0; i < this.length; i++) {
            if (this.toArray[i].type == type) {
                return true;
            }
        }
    };
    this.shuffle = function() {
        for (var i=0; i<this.length; i++) {
            var randomIndex = Math.floor(Math.random()*this.length),
                tempCard = this.toArray[randomIndex];
            this.toArray[randomIndex] = this.toArray[i];
            this.toArray[i] = tempCard;
            this.toArray[randomIndex].index = randomIndex;
            this.toArray[i].index = i;
        }
    };
    for (var i = 0; i < 70; i++) {
        if (isDeck) {
            this.cards[cards[i].getId()] = cards[i];
            this.length++;
            this.toArray.unshift(cards[i]);
            cards[i].index = i;
        } else {
            this.cards[cards[i].getId()] = null;
        }
    }
}

















var players = new Array(2);


var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets,
	playerIds = new Array(2);


mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if (err) throw err;

	client.on('connection', function(socket) {

		var col = db.collection('messages'),
		sendToSocket = function(stream, s) {
			socket.emit(stream, s);
		},
		sendToClient = function(stream, s) {
			client.emit(stream, s);
		}


		//wait for input
		socket.on('input', function(data) {
			var playerId = data.playerId,
				name = data.name,
				message = data.message,
				whitespacePattern =  /^\s*$/;


			if (players[0] == undefined){   //if someone logs in and there's no players[0], make them that
				players[0] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
			} else if (players[1] == undefined && players[0].id != playerId) {  //otherwise, there already is a players[0], so make players[1]
				players[1] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
				sendToClient('onLogin', {   //when player 2 is created, send player IDs to both players/clients
					player1Id: players[0].id,
					player2Id: players[1].id,
                    player1Name: players[0].name,
                    player2Name: players[1].name
				});
				//Emit all messages
				if (players[0] != undefined){
					col.find({"playerId" : players[0].id}).limit(100).toArray(function(err, res){
						if (err) throw err;
						socket.emit('output', res);
						//}
					});
				}
			} else if (players[0].id != playerId && players[1].id != playerId) {
                sendToSocket('command', 'already2');
				sendToSocket('status', {
					message: 'Not connected',
					clear: true
				});
			} else if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
				sendToSocket('status', 'Name and message is required');
			} else {
				col.insert({playerId: playerId, name: name, message: message}, function(){
					
					//emit latest message to all clients
					sendToClient('output', [data]);

					sendToSocket('status', {
						message: "Message sent",
						clear: true
					});

				});
			}
		});

	});

});