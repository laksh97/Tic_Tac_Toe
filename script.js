  const game_status = document.querySelector('.game-results');

  var is_game = true;
  var current_player = "X";
  var game_list = ["", "", "", "", "", "", "", "", ""];

  const player_wins_msg = () => "Player " + current_player + " has won!";
  const draw_msg = () => "Game ended in a draw!";
  const current_player_turn_msg = () => current_player + "'s turn";

  game_status.innerHTML = current_player_turn_msg();

  //Indices of the grid cells stored where the player wins
  const win_list = [
  	[0, 1, 2],
  	[3, 4, 5],
  	[6, 7, 8],
  	[0, 3, 6],
  	[1, 4, 7],
  	[2, 5, 8],
  	[0, 4, 8],
  	[2, 4, 6]
  ];

  function handle_player_change() {
  	current_player = current_player === "X" ? "O" : "X";
  	game_status.innerHTML = current_player_turn_msg();
  }

  function handle_game_result() {
  	var game_won = false;

  	for (var i = 0; i < 8; i++) {
  		const win_data = win_list[i];
  		var a = game_list[win_data[0]];
  		var b = game_list[win_data[1]];
  		var c = game_list[win_data[2]];
  		if (a === '' || b === '' || c === '') {
  			continue;
  		}
  		if (a === b && b === c) {
  			game_won = true;
  			break
  		}
  	}

  	if (game_won) {
  		game_status.innerHTML = player_wins_msg();
  		is_game = false;
  		return;
  	}

  	var game_draw = !game_list.includes("");
  	if (game_draw) {
  		game_status.innerHTML = draw_msg();
  		is_game = false;
  		return;
  	}

  	handle_player_change();
  }

  function cell_clicked(event) {
  	const current_cell = event.target;
  	const clickedCellIndex = parseInt(current_cell.getAttribute('data-cell-index'));

  	if (game_list[clickedCellIndex] !== "" || !is_game) {
  		return;
  	}
  	game_list[clickedCellIndex] = current_player;
  	current_cell.innerHTML = current_player;

  	handle_game_result();
  }

  function restart_game() {
  	is_game = true;
  	current_player = "X";
  	game_list = ["", "", "", "", "", "", "", "", ""];
  	game_status.innerHTML = current_player_turn_msg();
  	var cells = document.querySelectorAll('.cell')
  	cells.forEach(cell => cell.innerHTML = "");
  }

  var grid_cells = document.querySelectorAll('.cell')
  grid_cells.forEach(cell => cell.addEventListener('click', cell_clicked));

  var restart_button = document.querySelector('.game-restart')
  restart_button.addEventListener('click', restart_game);