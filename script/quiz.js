	(function() {
	  var questions = [{
		question: "Wil je later in een lab werken? ",
		choices: ["ja","Nee"],
		correctAnswer: 1
	  }, {
		question: "Ben je bereid later 80% van je werktijd achter de computer te werken?",
		choices: ["ja","Nee"],
		correctAnswer: 0
	  }, {
		question: "Ben je geïnteresseerd in de kleine onderdelen van de biologie zoals DNA, eiwitten en moleculen?",
		choices: ["ja","Nee"],
		correctAnswer: 0
	  }, {
		question: " Gaat samenwerken in groepsverband jouw goed af?",
		choices: ["ja","Nee"],
		correctAnswer: 0
	  }, {
		question: "Ben je redelijk goed of goed in wiskunde of logisch beredeneren?",
		choices: ["ja","Nee"],
		correctAnswer: 0
		}, {
		question: "Ben je creatief ingesteld en kijk je kritisch naar je werk? ",
		choices: ["ja","Nee"],
		correctAnswer: 0
	  },{
		question: " Wat voor computerprogamma’s verwacht je te schrijven?",
		choices: ["Voor hoe je een verzekeringkantoor kunt helpen hun verzekeringen te ordenen", "Voor game software bedrijven",
		"Voor biologische problemen"],
		correctAnswer: 2
	  }];
	  
	  var questionCounter = 0; //Tracks question number
	  var selections = []; //Array containing user choices
	  var quiz = $('#quiz'); //Quiz div object
	  
	  // Display initial question
	  displayNext();
	  
	  // Click handler for the 'next' button
	  $('#next').on('click', function (e) {
		e.preventDefault();
		
		// Suspend click listener during fade animation
		if(quiz.is(':animated')) {        
		  return false;
		}
		choose();
		
		// If no user selection, progress is stopped
		if (isNaN(selections[questionCounter])) {
		  alert('Wilt u graag een antwoordt aankliken!');
		} else {
		  questionCounter++;
		  displayNext();
		}
	  });
	  
	  // Click handler for the 'prev' button
	  $('#prev').on('click', function (e) {
		e.preventDefault();
		
		if(quiz.is(':animated')) {
		  return false;
		}
		choose();
		questionCounter--;
		displayNext();
	  });
	  
	  // Click handler for the 'Start Over' button
	  $('#start').on('click', function (e) {
		e.preventDefault();
		
		if(quiz.is(':animated')) {
		  return false;
		}
		questionCounter = 0;
		selections = [];
		displayNext();
		$('#start').hide();
	  });
	  
	  // Animates buttons on hover
	  $('.button').on('mouseenter', function () {
		$(this).addClass('active');
	  });
	  $('.button').on('mouseleave', function () {
		$(this).removeClass('active');
	  });
	  
	  // Creates and returns the div that contains the questions and 
	  // the answer selections
	  function createQuestionElement(index) {
		var qElement = $('<div>', {
		  id: 'question'
		});
		
		var header = $('<h2>Vraag ' + (index + 1) + ':</h2>');
		qElement.append(header);
		
		var question = $('<p>').append(questions[index].question);
		qElement.append(question);
		
		var radioButtons = createRadios(index);
		qElement.append(radioButtons);
		
		return qElement;
	  }
	  
	  // Creates a list of the answer choices as radio inputs
	  function createRadios(index) {
		var radioList = $('<ul>');
		var item;
		var input = '';
		for (var i = 0; i < questions[index].choices.length; i++) {
		  item = $('<li>');
		  input = '<input type="radio" name="answer" value=' + i + ' />';
		  input += questions[index].choices[i];
		  item.append(input);
		  radioList.append(item);
		}
		return radioList;
	  }
	  
	  // Reads the user selection and pushes the value to an array
	  function choose() {
		selections[questionCounter] = +$('input[name="answer"]:checked').val();
	  }
	  
	  // Displays next requested element
	  function displayNext() {
		quiz.fadeOut(function() {
		  $('#question').remove();
		  
		  if(questionCounter < questions.length){
			var nextQuestion = createQuestionElement(questionCounter);
			quiz.append(nextQuestion).fadeIn();
			if (!(isNaN(selections[questionCounter]))) {
			  $('input[value='+selections[questionCounter]+']').prop('checked', true);
			}
			
			// Controls display of 'prev' button
			if(questionCounter === 1){
			  $('#prev').show();
			} else if(questionCounter === 0){
			  
			  $('#prev').hide();
			  $('#next').show();
			}
		  }else {
			var scoreElem = displayScore();
			quiz.append(scoreElem).fadeIn();
			$('#next').hide();
			$('#prev').hide();
			$('#start').show();
		  }
		});
	  }
	  
	  // Computes score and returns a paragraph element to be displayed
	  function displayScore() {
		var score = $('<p>' , {id: 'question'});
		
		var numCorrect = 0;
		for (var i = 0; i < selections.length; i++) {
		  if (selections[i] === questions[i].correctAnswer) {	
			numCorrect++; 	
		  }
		} 
		score.append('Je hebt ' + numCorrect + ' vragen van de ' +
					 questions.length + ' goed !');
		if (numCorrect <= 2){
			score.append('<br><br>' + " Het is mischien slim om nog meer inforamtie te zoeken over bio-informatici, want je weet niet goed wat deze opleiding inhoud.");
		} else if (numCorrect <= 5){
			score.append("<br><br>" + " Je heb een redelijk beeld van wat een bio-informatici doet, het is altijd handig om meer inforamtie te krijgen over dit vak." + '<br>' + "Dat kan je vinden op internet of op een open dag.");
		} else{
			score.append('<br><br>' + " Jij weet goed wat bio-informatica inhoudt, het is mischien leuk om een keer met een proefstuderen dag mee te doen.");
		}
		return score;
	  }
	})();
