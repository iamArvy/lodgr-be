export const PROPERTY_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'List Properties',
    message: '',
  },
  GET: {
    method: 'GET',
    path: ':id',
    name: 'Get Property',
    message: '',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create Property',
    message: '',
  },
  PATCH: {
    method: 'PATCH',
    path: ':id',
    name: 'Patch Property',
    message: '',
  },
  UPDATE: {
    method: 'PUT',
    path: ':id',
    name: 'Update Property',
    message: '',
  },
  DELETE: {
    method: 'DELETE',
    path: ':id',
    name: 'Delete Property',
    message: '',
  },
} as const;
