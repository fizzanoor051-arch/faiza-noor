export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiRequestOptions
  extends RequestInit {
  timeout?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}