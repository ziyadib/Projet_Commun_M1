//var express = require('express')();
//var app = express();
var mysql = require('mysql');
var cors = require('express-cors');
var bodyParser = require('body-parser');
var userId;
//------- mode multi joueurs --------
var userConnected =[];
var resultats = [];
//var http = require('http').Server(app);
//var io = require('socket.io').(http);

//-------------------socket io param------------

/*var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8080);*/
var express = require('express')
  , http = require('http');
//make sure you keep this order
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);
//-------------------------


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'revisator',
});

//________________________________________________________connexion à la base de données
connection.connect(function(err){
if(!err) {
    console.log("connexion à la bdd reussi");    
} else {
    console.log("Erreur lors de la tentative de connexion....");  
    console.log(err.stack); 
}
});

//________________________________________________________config cors
app.use(cors({
	allowedOrigins : ['localhost'],
	headers : ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//_________________________________________________________recuperer choix de matiere (en fonction des formations)
app.get('/listeMatieres', function(req, res) {
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("select distinct matiere.nom, matiere.idMatiere from quizz, matiere where Niveau_etude_idNiveau_etude = (select Niveau_etude_idNiveau_etude from compte where id="+userId+") and idMatiere =Matiere_idMatiere;", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error");	
  });	
});



//_________________________________________________________pour récuperer la liste des quiz correspondant à la matiere choisie
app.get('/listeQuizz/:id_matiere', function(req, res) {
		res.status(200).json(req.currents_quizz);
      //  console.log(req.currents_quizz);
});

app.param('id_matiere', function(req, res, next, id){
	
	userId =req.headers.authorization; //recuperation de l'id
	//console.log("select * from quizz where Niveau_etude_idNiveau_etude = (select Niveau_etude_idNiveau_etude from compte where id= "+userId+") and Matiere_idMatiere="+id+" ;");
    connection.query("select * from quizz where Niveau_etude_idNiveau_etude = (select Niveau_etude_idNiveau_etude from compte where id= "+userId+") and Matiere_idMatiere="+id+" ;", function(err, rows, fileds){
	if(!err){
		//"+userId+"
		req.currents_quizz = rows;
		next();
	}else{
		res.status(404).send("error");
	}
  });
 });


//______________________________________________________________recuperer les questions qui se rapportent au quizz choisi

app.get('/quizz/:id_quizz', function(req,res){
	res.status(200).json(req.current_quizz)
});

app.param('id_quizz', function(req, res, next, id){
	
connection.query("select idQuestion, proposition, estValide, nom from proposition, question where Quizz_idQuizz = "+id+" and question.idQuestion= Question_idQuestion group by idQuestion, nom, proposition, estValide",function(err, rows, fileds){
	if(!err){
		
		req.current_quizz = rows;
		next();
	}else{
		
		res.status(404).send("error");
	}
  });

});

//________________________________________VUE PROF_______________________________________________________________

//recuperation des quizz du prof
app.get('/listeQuizzProf',function(req,res){
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("select * from Quizz where Compte_idCompte="+userId+";", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error recup liste quizz");	
  });	
});

//ajout de quizz
app.get('/listeMatiereProf',function(req,res){
	
	connection.query("select nom from matiere;", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error");	
  });	
});

//ajouter un quizz dans la base de données
app.post('/ajouterQuizz', function (req, resp) {
    var userId = req.headers.authorization;
    var nomQuizz = req.body.title;
    var nomMatiere = req.body.matiere.nom;
    var niveauEtude = req.body.year.niveau;
    var nombreQuestion = req.body.nbOfQuestions;
    var idMatiere = "";
    var idNiveauEtude = "";
    var idQuizz = "";
    var idQuestion = "";


    console.log(nomMatiere);


    niveauEtudeQuery = function () {
        console.log("Récupération du niveau d'étude");
        connection.query("SELECT * FROM niveau_etude WHERE niveau = '" + niveauEtude + "';", function select(err, rows, fields) {
            if (err) {
                console.log(err);
            }

            if (rows.length > 0) {
                var firstResult = rows[0];
                idNiveauEtude = firstResult['idNiveau_etude'];
                matiereQuery(function () {
                    console.log("Insertion du quiz");
                    connection.query("INSERT INTO quizz(nom, Compte_idCompte, Matiere_idMatiere, Niveau_etude_idNiveau_etude)\n VALUES(" + mysql.escape(nomQuizz) + ",\n " + userId + ",\n " + idMatiere + ",\n " + idNiveauEtude + ");", function (error, rows) {
                        if (error != null) {
                            console.log(error);
                        } else {
                            console.log("Success");
                            searchIdQuuiz();
                        }

                    })
                });
            } else {
                console.log("Pas de données nivieau d etude");
            }

        });
    };

    matiereQuery = function (callback) {
        console.log("Récupération de l'ID de la matière");
        connection.query("SELECT * FROM matiere WHERE nom = " + mysql.escape(nomMatiere) + ";", function select(err, rows, fields) {
            if (err) {
                console.log(err);
                connection.end();
                return;
            }

            if (rows.length > 0) {
                var firstResult = rows[0];
                idMatiere = firstResult["idMatiere"];
                callback();
            } else {
                console.log("Pas de données Matiere");
            }

        });

    };

    searchIdQuuiz = function () {
        console.log("Récupération de l'ID du quiz ajouté");
        connection.query("SELECT * FROM quizz ORDER BY idQuizz desc LIMIT 1;", function select(err, rows, fields) {
            if (err) {
                console.log(err);
                return;
            }

            if (rows.length > 0) {
                var firstResult = rows[0];
                idQuizz = firstResult['idQuizz'];
                console.log("Insertion de la question 1");
                connection.query("INSERT INTO question(nom, Quizz_idQuizz) VALUES (" + mysql.escape(req.body.questions[1].questionTitle) + ", " + idQuizz + ");", function (error, rows) {
                    if (error != null) {

                    } else {
                        insertQuestion();
                    }
                });

            } else {
                console.log("Pas de données idQuizz");
            }

        });
    };


    insertQuestion = function () {

        connection.query("SELECT * FROM question ORDER BY idQuestion desc LIMIT 1;", function select(err, rows, fields) {
            if (err) {
                console.log(err);
            }
            if (rows.length > 0) {
                var firstResult = rows[0];
                idQuestion = firstResult['idQuestion'];
                console.log("ID question après insertion du premier" + idQuestion);
                for (j = 1; j <= req.body.questions[1].nombreReponse; j++) {
                    proposition = req.body.questions[1].questionAnswer[j];
                    estValide = req.body.questions[1].correctAnswer[j];
                    if (estValide === undefined) {
                        estValide = false;
                    }
                    console.log("Insertion des réponses de la question " + 1);
                    connection.query("INSERT INTO proposition(proposition, estValide, Question_idQuestion) VALUES (" + mysql.escape(proposition) + ", " + estValide + ", " + (idQuestion) + ");", function (error, rows) {
                        if (error != null) {
                            console.log(error);
                        }
                        resp.end("Success");
                    });
                }
            }
        });

        for (NoQuestion = 2; NoQuestion <= req.body.nbOfQuestions; NoQuestion++) {

            nomQuestion = req.body.questions[NoQuestion].questionTitle;

            insertQuestions = function (callback) {
                console.log("Insertion de la question " + NoQuestion);
                connection.query("INSERT INTO question(nom, Quizz_idQuizz) VALUES (" + mysql.escape(nomQuestion) + ", " + idQuizz + ");", function (error, rows) {
                    if (error != null) {

                    } else {
                        callback();
                    }
                })
            };

            var startingPoin = function (NoQuestion) {
                insertQuestions(function () {
                    for (j = 1; j <= req.body.questions[NoQuestion].nombreReponse; j++) {
                        proposition = req.body.questions[NoQuestion].questionAnswer[j];
                        estValide = req.body.questions[NoQuestion].correctAnswer[j];
                        if (estValide === undefined) {
                            estValide = false;
                        }
                        console.log("Insertion des réponses de la question " + NoQuestion);
                        connection.query("INSERT INTO proposition(proposition, estValide, Question_idQuestion) VALUES (" + mysql.escape(proposition) + ", " + estValide + ", " + (idQuestion + NoQuestion - 1) + ");", function (error, rows) {
                            if (error != null) {
                                console.log(error);
                            }
                        });
                    }
                });
            };

            startingPoin(NoQuestion);

        }
    };

    niveauEtudeQuery();
});

//supp quizz
app.delete('/suppQuizz/:id_Quizz', function(req, res) {
		res.status(200).send();
});

app.param('id_Quizz', function(req, res, next, id){
	
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("delete from quizz where Compte_idCompte= "+userId+" and idQuizz ="+id+";", function(err, rows, fileds){
	if(!err){

		next();
	}else{
		res.status(404).send("error delete quizz");
	}
  });
 });

//_______________________________________________________STATISTIQUES____________________________________________________________

//gestion des stats
app.post('/resultats', function(req, res) {
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("INSERT INTO resultat (nbQuestionBonne, nbQuestionTotal, Compte_idCompte, Quizz_idQuizz) VALUES ("+req.body.bonneReponse+","+req.body.total+","+req.headers.authorization+","+req.body.idQuizz+")", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error");	
  });	
});


//retourner les stats
app.get('/statDetaille',function(req, res){
	userId = req.headers.authorization;
	connection.query("SELECT *, quizz.nom as quizz FROM resultat, quizz, matiere WHERE resultat.Quizz_idQuizz = idQuizz and Matiere_idMatiere = idMatiere and resultat.Compte_idCompte ="+userId+" order by idMatiere",function(err, rows, fields){
		if(!err)
			res.status(200).json(rows);
		else
			res.status(404).json("error");
	});
});

//stats Générales
app.get('/statsG',function(req, res){
	userId = req.headers.authorization;
	connection.query("select avg(nbQuestionBonne/nbQuestionTotal)*100 as moyenne, matiere.nom from resultat, quizz, matiere where idMatiere = Matiere_idMatiere and Quizz_idQuizz = idQuizz and resultat.Compte_idCompte ="+userId+" group by Matiere_idMatiere;",function(err, rows, fields){
		if(!err)
			res.status(200).json(rows);
		else
			res.status(404).json("error stats Générales");
	});
});


/*app.post('/inscription', function(req,res){
	var etablissement = "select idEtablissement from etablissement where nom ="+req.body.etablissement;
	var etude="select idNiveau_etude from niveau_etude where niveau="+req.body.niveau_etude;
	connection.query("INSERT INTO `compte` (`pseudo`, `nom`, `prenom`, `date_naissance`, `password`, `Type_idType`, `Etablissement_idEtablissement`, `Niveau_etude_idNiveau_etude`) VALUES ("+req.body.pseudo+","+req.body.nom+","+req.body.prenom+","+req.body.date_naissance+","+req.body.password+",1,"+etablissement+","+etude+");"),function(err, rows, fields){
	 	if(!err)
	 		console.log("succes de l'ajout");
	 	else
	 		console.log("erreur lors de l'ajout");
	 });
});
*/

// A voter
app.post('/listeQuizz/aVoter', function(req,res){
    userId =req.headers.authorization;
    console.log("req.body.idquizz"+req.body.idquizz);
    console.log("req.body"+req.body);
    console.log("req"+req);
    connection.query("INSERT INTO `aVoter`(`id_etudiant`, `id_quizz`) VALUES ("+userId+","+mysql.escape(req.body.idquizz)+")",function(err, rows, fields){
        if(!err){
            res.status(200).send();
            console.log("somatoline ca fonctionne");
        }
        else {
            console.log(err);
            res.status(404).json("a deja voter pour ce quizz");
        }
    });
});

//transmettre les scores de chaque quizz
app.get('/listeQuizz/aVoter/score',function(req, res){
    //console.log("coucou je vais te fournir le score des quizz");
    connection.query("SELECT id_quizz, count(*) as nbVotes FROM aVoter GROUP BY id_quizz",function(err, rows, fields){
        if(!err){
            console.log(rows);
            res.status(200).json(rows);
        }else
            res.status(405).json("error score aVoter");
    });
});
//supprimer le vote d'un utilisateur
app.delete('/listeQuizz/deVoter/:id_q', function(req, res) {
        res.status(200).send();
});

app.param('id_q', function(req, res, next, id){
    console.log("i am right here baby");
    userId = req.headers.authorization; //recuperation de l'id
    connection.query("delete from aVoter where id_etudiant= "+userId+" and id_quizz ="+id+";", function(err, rows, fileds){
    if(!err){

        next();
    }else{
        res.status(405).send("error delete quizz");
    }
  });
 });
//__________________________________________________Inscription__________________________________________________________

app.post('/vuep/inscription', function(req,res){
    //changer type par 2...;
    connection.query("INSERT INTO `compte`(`username`, `nom`, `prenom`, `date_naissance`, `password`, `Type_idType`, `Etablissement_idEtablissement`, `Niveau_etude_idNiveau_etude`) VALUES ("+mysql.escape(req.body.username)+","+mysql.escape(req.body.nom)+","+mysql.escape(req.body.prenom)+",'"+req.body.birthday+"',"+mysql.escape(req.body.password)+",2,"+req.body.school.idEtablissement+","+req.body.year.idNiveau_etude+")",function(err, rows, fields){
        if(!err)
            res.status(200).send();
        else {
            console.log(err);
            res.status(404).json("erreur inscription prof");
        }
    });
});

app.post('/inscription', function(req,res){

    connection.query("INSERT INTO `compte`(`username`, `nom`, `prenom`, `date_naissance`, `password`, `Type_idType`, `Etablissement_idEtablissement`, `Niveau_etude_idNiveau_etude`) VALUES ("+mysql.escape(req.body.username)+","+mysql.escape(req.body.nom)+","+mysql.escape(req.body.prenom)+",'"+req.body.birthday+"',"+mysql.escape(req.body.password)+",1,"+req.body.school.idEtablissement+","+req.body.year.idNiveau_etude+")",function(err, rows, fields){
       //console.log("INSERT INTO `compte`(`username`, `nom`, `prenom`, `date_naissance`, `password`, `Type_idType`, `Etablissement_idEtablissement`, `Niveau_etude_idNiveau_etude`) VALUES ("+req.body.username+","+req.body.nom+","+req.body.prenom+","+req.body.birthday+","+req.body.password+",1,"+req.body.school.idEtablissement+","+req.body.year.idNiveau_etude+"");
        if(!err)
            res.status(200).send();
        else {
            console.log(err);
            res.status(404).json("erreur inscription prof");
        }
    });
});


app.get('/inscription/formation', function(req, res) {
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("select * from niveau_etude;", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error");	
  });	
});

app.get('/inscription/etablissement', function(req, res) {
	userId = req.headers.authorization; //recuperation de l'id
	connection.query("select * from etablissement;", function(err, rows, fileds){
	if(!err)
		res.status(200).json(rows);
	else
		res.status(404).json("error");	
  });	
});

//----------------------------------------------Connexion -------------------------------------
app.post('/vuep/connexion', function(req, res) {

    connection.query("select * from compte where username = " + mysql.escape(req.body.username) + " and password= " + mysql.escape(req.body.password) + " and Type_idType=2;", function(err, rows, fileds){
        console.log(userConnected);
        if(!err){
            if(rows.length > 0) {
                res.status(200).json(rows);
                console.log(userConnected);
            }
            else{
                res.status(404).json("error");
            }
        }
        else
            res.status(404).json("error");
    });
});

app.post('/connexion', function(req, res) {
    connection.query("select * from compte where username = " + mysql.escape(req.body.username) + " and password= " + mysql.escape(req.body.password) + " and Type_idType=1;", function(err, rows, fileds){
        if(!err){
            if(rows.length > 0) {
                if(! userConnected.includes(req.body.username)){
                userConnected.push(req.body.username);
                console.log(userConnected);
                }

                res.status(200).json(rows)
            }
            else{
                res.status(404).json("error");
            }
        }
        else
            res.status(404).json("error");
    });
});

//---------------------------------MODE MULTI JOUEURS--------------------------------------------
app.get('/listeJoueursCo', function(req, res) {
    //userConnected =['kador','azatote','tahmirin'];
    if(typeof userConnected != 'undefined')
        res.status(200).json(userConnected);
    else
        res.status(404).json("error");  
    
});
//                                      Socket io babe!

/*io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});*/

io.sockets.on('connection', function (socket, pseudo) {
    
    // Quand un client se connecte, on lui envoie un message
    console.log("un client connecté a socket io");
    socket.emit('message', 'Vous êtes bien connecté !');
    // On signale aux autres clients qu'il y a un nouveau venu
    socket.broadcast.emit('listeMatieres', 'Un autre client vient de se connecter ! ');
    var tmp =0;
   // socket.brodacast.emit('listeQuizz',"le choix du quizz par l hote est en cours");
        socket.on('wichQuizz', function (message) {
            console.log("diffusons le message de ready");
        socket.broadcast.emit('ready',message);
        }); 
        socket.on('thisQuizz', function (message) {
            console.log("diffusons l'id Quizz aux autre client");
        socket.broadcast.emit('letsgo',message);
        }); 
        socket.on('ResultatQuizz',function(message){
            console.log("Hey j'ai reçu les resultats les voici:"+message.bonneReponse);
            message.user=userConnected[tmp++];
            resultats.push(message);
            console.log("le tableau resultatS : "+resultats);
                console.log("length"+resultats.length);
            if(resultats.length > 1){ // si on a reçu les deux réponses de nos joueurs on diffuse pour affichage
                    console.log("hey je broadcast les résultats petit!");
                    //message.joueur= userConnected[];
                    socket.broadcast.emit("resultats",resultats);
                    socket.emit("resultats",resultats);
                    //comparer les resultats et afficher un message sympatoches si = match nul sinon mess pour gagnant et perdant
            }

        });
});
 

//app.listen(8080);
