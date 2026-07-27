export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type AuthErrorResponse = {
  message: string;
};

export type AuthResult =
  | {
      ok: true;
      data: AuthResponse;
    }
  | {
      ok: false;
      error: AuthErrorResponse;
    };

export async function signIn(
  request: SignInRequest
): Promise<AuthResult> {
  // Future backend integration:
  // POST /api/auth/sign-in

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    ok: true,
    data: {
      user: {
        id: "999",
        name: "Ahmad",
        email: request.email,
      },
      token: "fake-sign-in-token",
    },
  };
}

export async function signUp(
  request: SignUpRequest
): Promise<AuthResult> {
  // Future backend integration:
  // POST /api/auth/sign-up

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    ok: true,
    data: {
      user: {
        id: "999",
        name: request.name,
        email: request.email,
      },
      token: "fake-sign-up-token",
    },
  };
}

export function isAuthenticated(): boolean {
  return false;
}