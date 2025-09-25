import conf from "../conf/conf";
import { ID, Account, Client } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            await this.account.deleteSession("current").catch(() => {}); 
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return this.login({ email, password }); // auto login
            }
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.deleteSession("current").catch(() => {});

            // ✅ Use createEmailPasswordSession
            console.log("Using createEmailPasswordSession()");
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;

        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch {
            return null; // no active session
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
