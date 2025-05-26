
import config from '../config/config';
import { Client, Account, ID } from "appwrite";

export class Service {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl) // Your Appwrite endpoint
            .setProject(config.appwriteProjectId); // Your project ID
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                // Auto-login after account creation
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AuthService :: logout :: error", error);
        }
    }
}

const authService = new Service();

export default authService;
