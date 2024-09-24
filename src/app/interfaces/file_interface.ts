export interface IFile {
    id: number;
    name: string;
    status: string;
    size: number;
}

export interface IFileToUpload {
    name: string;
    status: string;
}

export interface ICountAndTotalFile {
    count: number;
    files: IFile[];
}
