export interface User {
  id: string;
  name: string;
}

interface StoredUser {
  id: string;
  password: string;
  name: string;
}

const USERS_KEY = "eatsfine_users";
const SESSION_KEY = "eatsfine_session";

function getUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function signUp(id: string, password: string, name: string): { ok: true; user: User } | { ok: false; message: string } {
  const users = getUsers();

  if (users.some((u) => u.id === id)) {
    return { ok: false, message: "이미 사용 중인 아이디입니다." };
  }

  users.push({ id, password, name });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const user: User = { id, name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function login(id: string, password: string): { ok: true; user: User } | { ok: false; message: string } {
  const users = getUsers();
  const found = users.find((u) => u.id === id);

  if (!found) {
    return { ok: false, message: "존재하지 않는 아이디입니다." };
  }
  if (found.password !== password) {
    return { ok: false, message: "비밀번호가 일치하지 않습니다." };
  }

  const user: User = { id: found.id, name: found.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
