export class Sync {
  constructor(
    public state: string,
    public last_sync_started: number,
    public last_sync_duration: number,
    public songs_found: number,
    public new_songs_added: number,
    public new_songs_problems: number,
    public dangling_songs_found: number,
    public problem_songs: Map<string, string>,
    public dangling_songs: Map<string, string>,
    public empty_albums: Map<string, string>
  ) { }
}
