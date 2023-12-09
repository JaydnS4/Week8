class Player {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  describe() {
    return "${this.name} plays ${position}.";
  }
}

class Team {
  constructor(name) {
    this.name = name;
    this.players = [];
  }

  addPlayer(player) {
    if (player instanceof Player) {
      this.players.push(player);
    } else {
      throw new error(
        "You can only add am instance of player. argument is not a player: ${player}"
      );
    }
  }

  describe() {
    return "${this.name} has ${this.players.length} players.";
  }
}

class Menu {
  constructor() {
    this.teams = [];
    this.selectedTeam = null;
  }
  start() {
    let selection = this.showMainMenuOptions();
    while (selection !== 0) {
      switch (selection) {
        case "1":
          this.createTeam();
          break;
        case "2":
          this.viewTeam();
          break;
        case "3":
          this.deleteTeam();
          break;
        case "4":
          this.displayTeams();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert("Goodbye!");
  }

  showMainMenuOptions() {
    let message = "0) exit\n";
    message += "1) create new roll\n";
    message += "2) view rolls\n";
    message += "3) delete roll\n";
    message += "4) display all rolls";

    return prompt(message);
  }

  showTeamsMenuOptions(teamInfo) {
    let version = "0) back\n";
    version += "1) create champion\n";
    version += "2) delete champion\n";
    version += teamInfo;
    return prompt(version);
  }

  displayTeams() {
    let teamString = "";
    for (let i = 0; i < this.teams.length; i++) {
      teamString += i + ") " + this.teams[i].name + "\n";
    }
    alert(teamString);
  }

  createTeam() {
    let name = prompt("Enter name for new roll:");
    this.teams.push(new Team(name));
  }

  viewTeam() {
    let index = prompt("enter the index of the roll you wish to view:");
    if (index > -1 && index < this.teams.length) {
      this.selectedTeam = this.teams[index];
      let description = "Roll Name: " + this.selectedTeam.name + " ";

      for (let i = 0; i < this.selectedTeam.players.length; i++) {
        description +=
          i +
          ") " +
          this.selectedTeam.players[i].name +
          " - " +
          this.selectedTeam.players[i].position +
          "\n";
      }

      let selection = this.showTeamsMenuOptions(description);
      switch (selection) {
        case "1":
          this.createPlayer();
          break;
        case "2":
          this.deletePlayer();
      }
    }
  }

  createPlayer() {
    let name = prompt("Enter name of your champion:");
    let position = prompt("Enter lane for champion");
    this.selectedTeam.players.push(new Player(name, position));
  }

  deletePlayer() {
    let index = prompt(" Enter the index of the champion you wish to delete:");
    if (index > -1 && index < this.selectedTeam.players.length) {
      this.selectedTeam.players.splice(index, 1);
    }
  }

  deleteTeam() {
    let index = prompt(" Enter the index of the roll you wish to delete:");
    if (index > -1 && index < this.teams.length) {
      this.teams.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
