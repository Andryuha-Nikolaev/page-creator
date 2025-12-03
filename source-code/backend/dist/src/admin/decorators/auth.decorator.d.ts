export declare const authenticate: (email: string, password: string) => Promise<{
    email: string;
    password: string;
} | null>;
