import { file, type BunFile } from "bun";


export class DataGetter {
    file_used: BunFile;
  constructor(file_path: string) {
    this.file_used = file(file_path);

  }
    async base64() {
    const data = (await this.file_used.bytes()).toBase64();
    return data
  }
}