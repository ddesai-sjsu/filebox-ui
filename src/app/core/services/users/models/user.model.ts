export interface UserResponse {
        success: boolean;
        user: User
    
}

export interface User {
    lastname: string;
    files: 
        {
            downloadUrl: string;
            modifiedDate: string;
            description: string;
            fileName: string;
            uploadedDate: string;
        }[];
    userId: string;
    firstname: string;
    username: string;
    isAdmin: boolean;
    password_SHA512: string;
}

export interface AllUsers {
    success: boolean;
    users: User[];
}

export interface DeleteResponse {
    success: boolean;
    data?: {
        message: string;
    };
}