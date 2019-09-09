
export interface IUserState { // TODO consider combining with the interface in shared
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const initUserState: IUserState = {
  id: null,
  email: null,
  password: null,
  firstName: null,
  lastName: null
};
