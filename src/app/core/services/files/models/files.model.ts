export interface FileResponse {
    success: boolean;
    data? : {
        message: string;
    }
}

export  interface FileParams {
    email: string;
    file: File;
    description: string;
    filename?: string;
}