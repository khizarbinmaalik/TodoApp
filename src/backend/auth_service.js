import config from "../config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appUrl).setProject(config.projectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      if (user) {
        return this.login({ email, password });
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      // First, check if there's an existing session and delete it
      try {
        await this.account.deleteSessions();
      } catch (error) {
        // Ignore errors if no session exists
      }
      
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401 || error.type === 'general_unauthorized_scope') {
        return null; // User is not logged in
      }
      console.error("Get current user error:", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
