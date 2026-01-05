export const USER_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'List Users',
    message: '',
  },
  GET: {
    method: 'GET',
    path: ':id',
    name: 'Get User',
    message: '',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create User',
    message: '',
  },
  PATCH: {
    method: 'PATCH',
    path: ':id',
    name: 'Patch User',
    message: '',
  },
  UPDATE: {
    method: 'PUT',
    path: ':id',
    name: 'Update User',
    message: '',
  },
  ACTIVATE: {
    method: 'DELETE',
    path: ':id/activate',
    name: 'Activate User',
    message: '',
  },
  DEACTIVATE: {
    method: 'DELETE',
    path: ':id/deactivate',
    name: 'Deactivate User',
    message: '',
  },
  DELETE: {
    method: 'DELETE',
    path: ':id',
    name: 'Delete User',
    message: '',
  },
} as const;
