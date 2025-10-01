import { file } from "bun";

export const enum DataType {
  use_default = 0,
  use_downloaded_file = 1,
}

export class ChosenOption {
        downloaded_file_path: string | undefined;
        chosen_option: DataType;
      constructor(chosen_option: DataType, file_path: string)
      {
        this.chosen_option = chosen_option
        if (this.chosen_option == DataType.use_downloaded_file) {
            
        }
      }
}

export class BinaryFileDataAsUInt8 {
  file_used: Bun.BunFile;
  constructor(options: ChosenOption) {
    switch (options)
    this.file_used = file(file_path);
  }
}
