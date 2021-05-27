interface ICommand {
  id: string;
  guild_id: string;
  input: string;
  output: string;
  author_id: string;
}

export default ICommand;
